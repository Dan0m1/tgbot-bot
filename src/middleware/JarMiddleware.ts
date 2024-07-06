import {Composer} from "grammy";
import {MyContext} from "../bot";
import {JarUserApiResponseData} from "../../lib/data/apiResponses/JarUserApiResponseData";
import {JarApiResponseData} from "../../lib/data/apiResponses/JarApiResponseData";
import {jarUserService} from "../init/JarUserInit";
import {jarResponse, jarService} from "../init/JarInit";
import {deleteOutdatedMsg} from "../utils/DeleteOutdatedMessageUtil";

export const jarMiddleware: Composer<MyContext> = new Composer<MyContext>()

jarMiddleware.command(
    "jar",
    async (ctx: MyContext) => await tryExecuteRelatedFunction(ctx, displayJar)
)

async function tryExecuteRelatedFunction(ctx: MyContext, fn: (ctx: MyContext) => Promise<void>): Promise<void> {
    try {
        await fn(ctx);
    }catch(err){
        await jarResponse.displayError(ctx, err);
    }
}

async function displayJar(ctx: MyContext){
    await deleteOutdatedMsg(ctx, ctx.msg, 800);
    const jar: JarApiResponseData = await jarService.getJarInfo();
    const jarUser: JarUserApiResponseData[] = await jarUserService.getAll();
    await jarResponse.displayJar(ctx, jar, jarUser);
}
