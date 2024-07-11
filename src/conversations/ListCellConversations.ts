import {MyContext, MyConversation} from "../bot";
import {InlineKeyboard} from "grammy";
import {CreateListCellDTO} from "../../lib/data/DTOs/CreateListCellDTO";
import {listCellApi} from "../init/ListCellInit";
import {listResponse, listService} from "../init/ListInit";
import {deleteOutdatedMsg} from "../utils/DeleteOutdatedMessageUtil";
import outdatedTimeConfig from "../configuration/outdatedTimeConfig";

export async function update(conversation: MyConversation, ctx: MyContext){
    const inline = new InlineKeyboard()
        .text("Змінити опис.", "description").row()
        .text("Змінити дорученого.", "assignee").row()
        .text("Змінити статус.", "isDone").row();
    const cellId: number = parseInt(ctx.callbackQuery.data.match(/(?<=listCell-update=)\d+/g)[0]);
    await ctx.editMessageReplyMarkup({reply_markup: inline});
    const callback = await conversation.waitForCallbackQuery(["description", "assignee", "isDone"]);
    await callback.answerCallbackQuery();
    switch(callback.callbackQuery.data){
        case "description": await updateDescription(conversation, ctx, cellId); break;
        case "assignee": await updateAssignee(conversation, ctx, cellId); break;
        case "isDone": await updateIsDone(conversation, ctx, cellId); break;
    }
    await ctx.editMessageText("Змінено.", {reply_markup: null});
    await deleteOutdatedMsg(ctx, ctx.msg, outdatedTimeConfig().shortLifeTime);
}

async function updateDescription(conversation: MyConversation, ctx: MyContext, cellId: number){
    const description: string = await askAndGetInput(ctx, conversation, "Введіть новий опис", /^[a-zA-Z0-9а-яА-Я_і\s]+$/);
    await conversation.external(async () => {
        await listCellApi.update({
            id: cellId,
            description
        })
    })
}

async function updateAssignee(conversation: MyConversation, ctx: MyContext, cellId: number){
    const assignee = await askAndGetInput(ctx, conversation, "Введіть нового призначеного", /^[a-zA-Z0-9а-яА-Я_і\s]+$/);
    await conversation.external(async () => {
        await listCellApi.update({
            id: cellId,
            assignee
        })
    })
}

async function updateIsDone(conversation: MyConversation, ctx: MyContext, cellId: number){
    const inline = new InlineKeyboard()
        .text("Так", "yes").text("Ні", "no")
    await ctx.editMessageText("Виконано?", {reply_markup: inline});
    const callback = await conversation.waitForCallbackQuery(["yes","no"])
    let isDone = false;
    if(callback.callbackQuery.data === "yes"){
        isDone = true;
    }
    await conversation.external(async () => {
        await listCellApi.update({
            id: cellId,
            isDone
        });
    });
}

export async function add(conversation: MyConversation, ctx: MyContext){
    const title = ctx.callbackQuery.data.match(/(?<=listCell-add-title=)[a-zA-Z0-9а-яА-Я_і]+/g)[0]
    const payload: CreateListCellDTO = await getAddPayload(ctx, conversation)
    await conversation.external(async () => {
        await listCellApi.createCell(payload);
    });
    const msg = await ctx.reply("Запис успішно створено.");
    await deleteOutdatedMsg(ctx, msg, outdatedTimeConfig().shortLifeTime);
    setTimeout(async () => {
        await conversation.external(async () => {
            const list = await listService.getListByTitle(title);
            await listResponse.displaySingleList(ctx, list);
        })
    }, 500);
}

async function getAddPayload(ctx: MyContext, conversation: MyConversation): Promise<CreateListCellDTO>{
    const inline: InlineKeyboard = new InlineKeyboard().text("Пропустити", "skip");
    const listTitle: string = ctx.callbackQuery.data.match(/(?<=listCell-add-title=)[a-zA-Z0-9а-яА-Я_і]+/g)[0];
    const item = await askAndGetInput(ctx, conversation, "Введіть назву:", /^[a-zA-Z0-9а-яА-Я_і\s]+$/);
    const description = await askAndGetInput(ctx, conversation, "Введіть додатковий опис:", /^[a-zA-Z0-9а-яА-Я_і\s]+$/, inline)
    const assignee = await askAndGetInput(ctx, conversation, "Введіть дорученого:", /^[a-zA-Z0-9а-яА-Я_і\s]+$/, inline);
    await ctx.deleteMessage();
    return {
        listTitle,
        item,
        description,
        assignee
    }
}

async function askAndGetInput(ctx: MyContext, conversation: MyConversation, message: string, regex: RegExp, inline?: InlineKeyboard): Promise<string> {
    await ctx.api.editMessageText(ctx.msg.chat.id, ctx.msg.message_id, message, {reply_markup: inline});
    const context: MyContext = await conversation.waitUntil(
        (ctx) => regex.test(ctx.msg.text) || ctx.hasCallbackQuery("skip"),
        async (ctx: MyContext) => ctx.deleteMessage()
    );
    if(context.hasCallbackQuery("skip")) {
        await context.answerCallbackQuery();
        return null;
    }
    await ctx.api.deleteMessage(context.msg.chat.id, context.msg.message_id);
    return context.msg.text;
}
