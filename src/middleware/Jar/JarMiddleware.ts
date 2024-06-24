import {Composer, Context} from "grammy";
export const jarMiddleware = new Composer()

jarMiddleware.command(
    "jar",
    async (ctx, next) => await tryExecuteFunction(ctx, displayJar)
)

async function tryExecuteFunction(ctx: Context, fn: (ctx: Context, jar: Jar) => Promise<any>){
    const jar = new Jar();
    try {
        await fn(ctx, jar);
    }catch(err){
        await new JarResponse(ctx).displayError(err);
    }
}

async function displayJar(ctx:Context, jar: Jar){
    const response = await jar.getJarInfo();
    await new JarResponse(ctx).displayJar(response);
}