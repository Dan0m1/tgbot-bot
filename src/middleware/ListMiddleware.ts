import {Composer, InlineKeyboard} from "grammy";
import {MyContext} from "../bot";
import {listService, listResponse} from "../init/ListInit";
import {ListApiResponseData} from "../../lib/data/apiResponses/ListApiResponseData";
import {deleteOutdatedMsg} from "../utils/DeleteOutdatedMessageUtil";

export const listMiddleware: Composer<MyContext> = new Composer<MyContext>();

listMiddleware.command(
    "show_lists",
    async (ctx: MyContext) => tryExecuteRelatedFunction(ctx, showLists)
)
listMiddleware.command(
    "add_list",
    async (ctx: MyContext) => tryExecuteRelatedFunction(ctx, addList)
)
listMiddleware.command(
    "delete_list",
    async (ctx: MyContext) => tryExecuteRelatedFunction(ctx, deleteList)
)

listMiddleware.callbackQuery(
    /list-title=[a-zA-Z0-9]+/g,
    async (ctx: MyContext) => tryExecuteRelatedFunction(ctx, showListByTitle)
)
async function tryExecuteRelatedFunction(ctx: MyContext, fn: (ctx: MyContext) => Promise<void>): Promise<void>{
    try {
        await fn(ctx);
    }catch(err){
        await listResponse.displayError(ctx, err);
    }
}

async function showLists(ctx: MyContext): Promise<void>{
    await deleteOutdatedMsg(ctx, ctx.msg, 800);
    const listsInline: InlineKeyboard = await listService.getListsInline();
    await listResponse.displayLists(ctx, listsInline);
}

async function addList(ctx: MyContext): Promise<void>{
    await deleteOutdatedMsg(ctx, ctx.msg, 800);
    const title: string = ctx.match as string;
    await listService.addNew({title});
    await listResponse.successfullyCreated(ctx, title);
}

async function deleteList(ctx: MyContext): Promise<void>{
    await deleteOutdatedMsg(ctx, ctx.msg, 800);
    const title: string = ctx.match as string;
    await listService.delete({title});
    await listResponse.successfullyDeleted(ctx, title);
}

async function showListByTitle(ctx: MyContext): Promise<void>{
    await ctx.answerCallbackQuery();
    const title: string = ctx.callbackQuery.data.slice(11);        // data = "list-title=" + list.title
    const list: ListApiResponseData = await listService.getListByTitle(title);
    await listResponse.displaySingleList(ctx, list);
}
