import {Composer, NextFunction} from "grammy";
import {MyContext} from "../bot";
import {ListService} from "../service/ListService";
import {ListResponse} from "../responses/ListResponse";

export const listMiddleware = new Composer<MyContext>();

listMiddleware.command(
    "show_lists",
    async (ctx: MyContext, next: NextFunction) => tryExecuteRelatedFunction(ctx, showLists)
)
listMiddleware.command(
    "add_list",
    async (ctx: MyContext, next: NextFunction) => tryExecuteRelatedFunction(ctx, addList)
)
listMiddleware.command(
    "delete_list",
    async (ctx: MyContext, next: NextFunction) => tryExecuteRelatedFunction(ctx, deleteList)
)

listMiddleware.callbackQuery(
    /list-title=[a-zA-Z0-9а-яА-Я_і]+/g,
    async (ctx: MyContext, next: NextFunction) => tryExecuteRelatedFunction(ctx, showListByTitle)
)
async function tryExecuteRelatedFunction(ctx: MyContext, fn: (ctx: MyContext, listService: ListService) => Promise<any>){
    const listService: ListService = new ListService(ctx);
    try {
        await fn(ctx, listService);
    }catch(err){
        await new ListResponse(ctx).displayError(err);
    }
}

async function showLists(ctx: MyContext, listService: ListService){
    const listsInline = await listService.getListsInline();
    await new ListResponse(ctx).displayLists(listsInline);
}

async function addList(ctx: MyContext, listService: ListService){
    const title = ctx.match as string;
    await listService.addNew({title});
    await new ListResponse(ctx).successfullyCreated(title);
}

async function deleteList(ctx: MyContext, listService: ListService){
    const title = ctx.match as string;
    await listService.delete({title});
    await new ListResponse(ctx).successfullyDeleted(title);
}

async function showListByTitle(ctx: MyContext, listService: ListService) {
    await ctx.answerCallbackQuery();
    if(ctx.callbackQuery.data){
        const title = ctx.callbackQuery.data.slice(11);        // data = "list-title=" + list.title
        const list = await listService.getListByTitle(title);
        await new ListResponse(ctx).displaySingleList(list);
    }
}
