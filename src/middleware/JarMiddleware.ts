import {Composer, Context} from "grammy";
import {JarService} from "../service/JarService";
import {JarResponse} from "../responses/JarResponse";
import {JarUserService} from "../service/JarUserService";
import {MyContext} from "../bot";
import {JarUserApiResponseData} from "../../lib/data/apiResponses/JarUserApiResponseData";
import {JarApiResponseData} from "../../lib/data/apiResponses/JarApiResponseData";
export const jarMiddleware = new Composer<MyContext>()

jarMiddleware.command(
    "jar",
    async (ctx, next) => await tryExecuteRelatedFunction(ctx, displayJar)
)

async function tryExecuteRelatedFunction(ctx: MyContext, fn: (ctx: MyContext, jarService: JarService) => Promise<any>){
    const jarService: JarService = new JarService(ctx);
    try {
        await fn(ctx, jarService);
    }catch(err){
        await new JarResponse(ctx).displayError(err);
    }
}

async function displayJar(ctx: MyContext, jarService: JarService){
    const jarResponse: JarApiResponseData = await jarService.getJarInfo();
    const jarUserService: JarUserService = new JarUserService(ctx);
    const jarUserResponse: JarUserApiResponseData[] = await jarUserService.getAll();
    await new JarResponse(ctx).displayJar(jarResponse, jarUserResponse);
}
