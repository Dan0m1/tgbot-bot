import {MyContext, MyConversation} from "../bot";
import {ListCellAPI} from "../../lib/api/ListCellAPI";
import {InlineKeyboard} from "grammy";
import {CreateListDTO} from "../../lib/data/DTOs/CreateListDTO";
import {CreateListCellDTO} from "../../lib/data/DTOs/CreateListCellDTO";
const listCellApi = new ListCellAPI();

export async function update(conversation: MyConversation, ctx: MyContext){
    const chatId: number = ctx.msg.chat.id;
    const msgId: number = ctx.msg.message_id;
    const cellId: number = parseInt(ctx.callbackQuery.data.match(/(?<=listCell-update=)\d+/g)[0]);
    const inline = new InlineKeyboard()
        .text("Змінити кількість.", "amount").row()
        .text("Змінити дорученого.", "assignee").row()
        .text("Змінити статус.", "isDone").row();
    await ctx.api.editMessageReplyMarkup(chatId, msgId, {reply_markup: inline});
    const callback = await conversation.waitForCallbackQuery(["amount", "assignee", "isDone"]);
    await callback.answerCallbackQuery();
    switch(callback.callbackQuery.data){
        case "amount": await updateAmount(conversation, ctx, chatId, msgId, cellId); break;
        case "assignee": await updateAssignee(conversation, ctx, chatId, msgId, cellId); break;
        case "isDone": await updateIsDone(conversation, ctx, chatId, msgId, cellId); break;
    }
    await ctx.api.editMessageText(chatId, msgId, "Змінено.", {reply_markup: null});
}

async function updateAmount(conversation: MyConversation, ctx: MyContext, chatId: number, msgId: number, cellId: number){
    await ctx.api.editMessageText(chatId, msgId, "Введіть нову кількість", {reply_markup: null});
    const context: MyContext = await conversation.waitUntil((ctx) => {
        return /^\d+$/.test(ctx.msg.text);
    })
    const amount: number = parseInt(context.msg.text);
    await conversation.external(async () => {
        await listCellApi.update({
            id: cellId,
            amount
        })
    })
}

async function updateAssignee(conversation: MyConversation, ctx: MyContext, chatId: number, msgId: number, cellId: number){
    await ctx.api.editMessageText(chatId, msgId, "Введіть нового призначеного", {reply_markup: null});
    const context: MyContext = await conversation.waitUntil((ctx) => {
        return /^[a-zA-Z0-9а-яА-Я_і]+$/.test(ctx.msg.text);
    })
    const assignee: string = context.msg.text;
    await conversation.external(async () => {
        await listCellApi.update({
            id: cellId,
            assignee
        })
    })
}

async function updateIsDone(conversation: MyConversation, ctx: MyContext, chatId: number, msgId: number, cellId: number){
    const inline = new InlineKeyboard()
        .text("Так", "yes").text("Ні", "no")
    await ctx.api.editMessageText(chatId, msgId, "Виконано?", {reply_markup: inline});
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
    const chatId: number = ctx.msg.chat.id;
    const msgId: number = ctx.msg.message_id;
    const listTitle: string = ctx.callbackQuery.data.match(/(?<=listCell-add-title=)[a-zA-Z0-9а-яА-Я_і]+/g)[0];
    const inline: InlineKeyboard = new InlineKeyboard().text("Пропустити", "skip")
    await ctx.reply("Введіть назву:");
    let context: MyContext = await conversation.waitUntil((ctx) => {
        return /^[a-zA-Z0-9а-яА-Я_і]+$/.test(ctx.msg.text);
    })
    const item: string = context.msg.text;
    await ctx.reply("Введіть кількість:", {reply_markup: inline});
    context = await conversation.waitUntil((ctx) => {
        return /^\d+$/.test(ctx.msg.text) || ctx.hasCallbackQuery("skip");
    })
    await context.answerCallbackQuery();
    let amount: number | null;
    if(/^\d+$/.test(context.msg.text)){
        amount = parseInt(context.msg.text);
    }
    await ctx.reply("Введіть дорученого:", {reply_markup: inline});
    context = await conversation.waitUntil((ctx) => {
        return /^[a-zA-Z0-9а-яА-Я_і]+$/.test(ctx.msg.text) || ctx.hasCallbackQuery("skip");
    })
    await context.answerCallbackQuery();
    let assignee: string;
    if(/^[a-zA-Z0-9а-яА-Я_і]+$/.test(context.msg.text)){
        assignee = context.msg.text;
    }
    const payload: CreateListCellDTO = {
        listTitle,
        item,
        amount,
        assignee
    }
    await conversation.external(async () => {
        await listCellApi.createCell(payload);
    });
    await ctx.api.deleteMessage(chatId, msgId);
    await ctx.reply("Запис успішно створено.");
}