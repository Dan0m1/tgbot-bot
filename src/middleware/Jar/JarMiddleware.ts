import {Composer, Context} from "grammy";
import {Jar} from "./Jar";
import {JarResponse} from "./JarResponse";
import {JarUser} from "../JarUser/JarUser";
import {MyContext} from "../../bot";
export const jarMiddleware = new Composer<MyContext>()

jarMiddleware.command(
    "jar",
    async (ctx, next) => await tryExecuteRelatedFunction(ctx, displayJar)
)

async function tryExecuteRelatedFunction(ctx: MyContext, fn: (ctx: MyContext, jar: Jar) => Promise<any>){
    const jar = new Jar(ctx);
    try {
        await fn(ctx, jar);
    }catch(err){
        await new JarResponse(ctx).displayError(err);
    }
}

async function displayJar(ctx: MyContext, jar: Jar){
    const jarResponse = await jar.getJarInfo();
    const jarUser: JarUser = new JarUser(ctx);
    const jarUserResponse = await jarUser.getAll();
    await new JarResponse(ctx).displayJar(jarResponse, jarUserResponse);
}
