import {Message} from "@grammyjs/types";
import {MyContext} from "../bot";

export async function deleteOutdatedMsg(ctx: MyContext, msg: Message, timeoutMs: number): Promise<void> {
    setTimeout( async() =>{
        try {
            await ctx.api.deleteMessage(msg.chat.id, msg.message_id)
        }
        catch(err){}
    }, timeoutMs)
}