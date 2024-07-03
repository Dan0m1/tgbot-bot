import {Composer, NextFunction} from "grammy";
import {MyContext} from "../bot";
import {ListCellService} from "../service/ListCellService";
import {ListCellResponse} from "../responses/ListCellResponse";
import {add, update} from "../conversations/ListCellConversations";
import {createConversation} from "@grammyjs/conversations";

export const listCellMiddleware = new Composer<MyContext>();
listCellMiddleware.use(createConversation(update));
listCellMiddleware.use(createConversation(add));

listCellMiddleware.on("msg:text").filter(
    (ctx) => checkIfListCellRequested(ctx),
    async (ctx: MyContext, next: NextFunction) => tryExecuteRelatedFunction(ctx, showCell)
)

listCellMiddleware.callbackQuery(
    /(?<=listCell-update=)\d+/g,
    async (ctx: MyContext, next: NextFunction) => tryExecuteRelatedFunction(ctx, updateCell)
)
listCellMiddleware.callbackQuery(
    /(?<=listCell-delete=)\d+/g,
    async (ctx: MyContext, next: NextFunction) => tryExecuteRelatedFunction(ctx, deleteCell)
)
listCellMiddleware.callbackQuery(
    /(?<=listCell-add-title=)[a-zA-Z0-9а-яА-Я_і]+/g,
    async (ctx: MyContext, next: NextFunction) => tryExecuteRelatedFunction(ctx, addCell)
)

async function tryExecuteRelatedFunction(ctx: MyContext, fn: (ctx: MyContext, listService: ListCellService) => Promise<any>){
    const listCellService: ListCellService = new ListCellService();
    try {
        await fn(ctx, listCellService);
    }catch(err){
        await new ListCellResponse(ctx).displayError(err);
    }
}

async function showCell(ctx: MyContext, listCellService: ListCellService) {
    const data = ctx.msg.text?.split("_");
    const cellId = parseInt(data[3]);
    const cell = await listCellService.getOneById(cellId);
    const inlineKeyboard = await listCellService.getInlineForListCell(cellId);
    await new ListCellResponse(ctx).displayCell(cell, inlineKeyboard);
}

function checkIfListCellRequested(ctx:MyContext){
    const text = ctx.msg.text;
    const matches = text.match(/\/show_cell_[a-zA-Zа-яА-Я0-9]+_\d+/);
    return matches && matches.length > 0;
}

async function updateCell(ctx: MyContext, listCellService: ListCellService) {
    await ctx.answerCallbackQuery();
    await ctx.conversation.enter("update");
}

async function deleteCell(ctx: MyContext, listCellService: ListCellService) {
    await ctx.answerCallbackQuery();
    const cellId = parseInt(ctx.callbackQuery.data.match(/(?<=listCell-delete=)\d+/g)[0]);
    await listCellService.deleteCellById(cellId);
    const chatId = ctx.callbackQuery.message.chat.id;
    const msgId = ctx.callbackQuery.message.message_id;
    await new ListCellResponse(ctx).successfullyDeleted(chatId, msgId);
}

async function addCell(ctx: MyContext, listCellService: ListCellService){
    await ctx.answerCallbackQuery();
    await ctx.conversation.enter("add");
}