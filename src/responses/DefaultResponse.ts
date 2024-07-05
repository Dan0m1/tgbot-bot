import {MyContext} from "../bot";

export class DefaultResponse {
    private timeoutTime: number = 5000;

    constructor() {}

    public async displayError(ctx: MyContext ,error: any){
        await ctx.reply(error.message);
    }

    public async successfullyCreated(ctx: MyContext, ...args: any[]): Promise<void>{
        const msg = await ctx.reply(`Успішно створено.`);
        setTimeout(async () => {
            await ctx.api.deleteMessage(msg.chat.id, msg.message_id);
        }, this.timeoutTime)
    }

    public async successfullyUpdated(ctx: MyContext, ...args: any[]): Promise<void>{
        const msg = await ctx.reply(`Успішно оновлено.`);
        setTimeout(async () => {
            await ctx.api.deleteMessage(msg.chat.id, msg.message_id);
        }, this.timeoutTime)
    }

    public async successfullyDeleted(ctx: MyContext, ...args: any[]): Promise<void>{
        const msg = await ctx.reply(`Успішно видалено.`);
        setTimeout(async () => {
            await ctx.api.deleteMessage(msg.chat.id, msg.message_id);
        }, this.timeoutTime)
    }
}