import {Composer, InlineKeyboard} from "grammy";
import {MyContext} from "../bot";
import {add, update} from "../conversations/ListCellConversations";
import {createConversation} from "@grammyjs/conversations";
import {listCellService, listCellResponse} from "../init/ListCellInit";
import {ListCellSingleApiResponseData} from "../../lib/data/apiResponses/ListCellSingleApiResponseData";
import {deleteOutdatedMsg} from "../utils/DeleteOutdatedMessageUtil";

export const listCellMiddleware: Composer<MyContext> = new Composer<MyContext>();
listCellMiddleware.use(createConversation(update));
listCellMiddleware.use(createConversation(add));

listCellMiddleware.on("msg:text").filter(
    (ctx: MyContext) => checkIfListCellRequested(ctx),
    async (ctx: MyContext) => tryExecuteRelatedFunction(ctx, showCell)
)

listCellMiddleware.callbackQuery(
    /(?<=listCell-update=)\d+/g,
    async (ctx: MyContext) => tryExecuteRelatedFunction(ctx, updateCell)
)
listCellMiddleware.callbackQuery(
    /(?<=listCell-delete=)\d+/g,
    async (ctx: MyContext) => tryExecuteRelatedFunction(ctx, deleteCell)
)
listCellMiddleware.callbackQuery(
    /(?<=listCell-add-title=)[a-zA-Z0-9]+/g,
    async (ctx: MyContext) => tryExecuteRelatedFunction(ctx, addCell)
)

async function tryExecuteRelatedFunction(ctx: MyContext, fn: (ctx: MyContext) => Promise<void>): Promise<void>{
    try {
        await fn(ctx);
    }catch(err){
        await listCellResponse.displayError(ctx, err);
    }
}

async function showCell(ctx: MyContext): Promise<void>{
    await deleteOutdatedMsg(ctx, ctx.msg, 800);
    const data: string[] = ctx.msg.text?.split("_");
    const cellId: number = parseInt(data[3]);
    const cell: ListCellSingleApiResponseData = await listCellService.getOneById(cellId);
    const inlineKeyboard: InlineKeyboard = await listCellService.getInlineForListCell(cellId);
    await listCellResponse.displayCell(ctx, cell, inlineKeyboard);
}

function checkIfListCellRequested(ctx:MyContext): boolean{
    const text: string = ctx.msg.text;
    const matches: RegExpMatchArray = text.match(/\/show_cell_[a-zA-Zа-яА-Я0-9]+_\d+/);
    return matches && matches.length > 0;
}

async function updateCell(ctx: MyContext): Promise<void>{
    await ctx.answerCallbackQuery();
    await ctx.conversation.enter("update");
}

async function deleteCell(ctx: MyContext): Promise<void>{
    await ctx.answerCallbackQuery();
    const cellId: number = parseInt(ctx.callbackQuery.data.match(/(?<=listCell-delete=)\d+/g)[0]);
    const callbackMsg = ctx.callbackQuery.message;
    await ctx.api.deleteMessage(callbackMsg.chat.id, callbackMsg.message_id);
    await listCellService.deleteCellById(cellId);
    await listCellResponse.successfullyDeleted(ctx);
}

async function addCell(ctx: MyContext): Promise<void>{
    await ctx.answerCallbackQuery();
    await ctx.conversation.enter("add");
}