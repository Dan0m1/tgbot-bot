import {Composer, Context} from "grammy";
import {JarUser} from "./JarUser";
import {JarUserResponse} from "./JarUserResponse";
import {JarUserApiResponseData} from "../../../lib/data/JarUserApiResponseData";
import {MyContext} from "../../bot";

export const jarUserMiddleware = new Composer<MyContext>()

jarUserMiddleware.command(
    "extort_from",
    async (ctx: MyContext, next) => await tryExecuteRelatedFunction(ctx, addJarUsers)
)
jarUserMiddleware.command(
    "change_extort",
    async (ctx: MyContext, next) => await tryExecuteRelatedFunction(ctx, changeJarUser)
)

async function tryExecuteRelatedFunction(ctx: MyContext, fn: (ctx: MyContext, jarUser: JarUser) => Promise<any>){
    const jarUser: JarUser = new JarUser(ctx);
    try {
        await fn(ctx, jarUser);
    }catch(err){
        await new JarUserResponse(ctx).displayError(err);
    }
}

async function addJarUsers(ctx: MyContext, jarUser: JarUser){
    const response: JarUserApiResponseData[] = await jarUser.create();
    await new JarUserResponse(ctx).successfullyAdded();
}

async function changeJarUser(ctx: MyContext, jarUser: JarUser){
    await jarUser.update();
    await new JarUserResponse(ctx).successfullyUpdated();
}
