import {Composer, Context} from "grammy";
import {JarUserService} from "../service/JarUserService";
import {JarUserResponse} from "../responses/JarUserResponse";
import {JarUserApiResponseData} from "../../lib/data/apiResponses/JarUserApiResponseData";
import {MyContext} from "../bot";

export const jarUserMiddleware = new Composer<MyContext>()

jarUserMiddleware.command(
    "extort_from",
    async (ctx: MyContext, next) => await tryExecuteRelatedFunction(ctx, addJarUsers)
)
jarUserMiddleware.command(
    "change_extort",
    async (ctx: MyContext, next) => await tryExecuteRelatedFunction(ctx, changeJarUser)
)

async function tryExecuteRelatedFunction(ctx: MyContext, fn: (ctx: MyContext, jarUserService: JarUserService) => Promise<any>){
    const jarUserService: JarUserService = new JarUserService(ctx);
    try {
        await fn(ctx, jarUserService);
    }catch(err){
        await new JarUserResponse(ctx).displayError(err);
    }
}

async function addJarUsers(ctx: MyContext, jarUserService: JarUserService){
    const response: JarUserApiResponseData[] = await jarUserService.create();
    await new JarUserResponse(ctx).successfullyAdded();
}

async function changeJarUser(ctx: MyContext, jarUserService: JarUserService){
    await jarUserService.update();
    await new JarUserResponse(ctx).successfullyUpdated();
}
