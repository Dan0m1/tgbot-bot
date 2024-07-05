import {Composer} from "grammy";
import {MyContext} from "../bot";
import {jarUserService, jarUserResponse} from "../init/JarUserInit";

export const jarUserMiddleware: Composer<MyContext> = new Composer<MyContext>()

jarUserMiddleware.command(
    "extort_from",
    async (ctx: MyContext, next) => await tryExecuteRelatedFunction(ctx, addJarUsers)
)
jarUserMiddleware.command(
    "change_extort",
    async (ctx: MyContext, next) => await tryExecuteRelatedFunction(ctx, changeJarUser)
)

async function tryExecuteRelatedFunction(ctx: MyContext, fn: (ctx: MyContext) => Promise<void>): Promise<void>{
    try {
        await fn(ctx);
    }catch(err){
        await jarUserResponse.displayError(ctx, err);
    }
}

async function addJarUsers(ctx: MyContext): Promise<void>{
    await jarUserService.create(ctx);
    await jarUserResponse.successfullyCreated(ctx);
}

async function changeJarUser(ctx: MyContext): Promise<void>{
    await jarUserService.update(ctx);
    await jarUserResponse.successfullyUpdated(ctx);
}
