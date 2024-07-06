import {MyContext} from "../bot";
import {deleteOutdatedMsg} from "../utils/DeleteOutdatedMessageUtil";

export class DefaultResponse {
    private timeoutTime: number = 15000;

    constructor() {}

    public async displayError(ctx: MyContext ,error: any){
        const msg = await ctx.reply(error.message);
        await deleteOutdatedMsg(ctx, msg, this.timeoutTime);
    }

    public async successfullyCreated(ctx: MyContext, ...args: any[]): Promise<void>{
        const msg = await ctx.reply(`Успішно створено.`);
        await deleteOutdatedMsg(ctx, msg, this.timeoutTime);
    }

    public async successfullyUpdated(ctx: MyContext, ...args: any[]): Promise<void>{
        const msg = await ctx.reply(`Успішно оновлено.`);
        await deleteOutdatedMsg(ctx, msg, this.timeoutTime);
    }

    public async successfullyDeleted(ctx: MyContext, ...args: any[]): Promise<void>{
        const msg = await ctx.reply(`Успішно видалено.`);
        await deleteOutdatedMsg(ctx, msg, this.timeoutTime);
    }
}