import {MyContext} from "../bot";
import {deleteOutdatedMsg} from "../utils/DeleteOutdatedMessageUtil";
import outdatedTimeConfig from "../configuration/outdatedTimeConfig";

export class DefaultResponse {
    protected longLifeTime: number = outdatedTimeConfig().longLifeTime;
    protected midLifeTime: number = outdatedTimeConfig().midLifeTime;
    protected shortLifeTime: number = outdatedTimeConfig().shortLifeTime;
    protected nullLifeTime: number = outdatedTimeConfig().nullLifeTime;

    constructor() {}

    public async displayError(ctx: MyContext ,error: any){
        const msg = await ctx.reply(error.message);
        await deleteOutdatedMsg(ctx, msg, this.shortLifeTime);
    }

    public async successfullyCreated(ctx: MyContext, ...args: any[]): Promise<void>{
        const msg = await ctx.reply(`Успішно створено.`);
        await deleteOutdatedMsg(ctx, msg, this.shortLifeTime);
    }

    public async successfullyUpdated(ctx: MyContext, ...args: any[]): Promise<void>{
        const msg = await ctx.reply(`Успішно оновлено.`);
        await deleteOutdatedMsg(ctx, msg, this.shortLifeTime);
    }

    public async successfullyDeleted(ctx: MyContext, ...args: any[]): Promise<void>{
        const msg = await ctx.reply(`Успішно видалено.`);
        await deleteOutdatedMsg(ctx, msg, this.shortLifeTime);
    }
}