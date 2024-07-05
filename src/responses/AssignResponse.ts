import {MyContext} from "../bot";
import {DefaultResponse} from "./DefaultResponse";
import {UserWithTasksApiResponseData} from "../../lib/data/apiResponses/UserWithTasksApiResponseData";
import {Message} from "@grammyjs/types";

export class AssignResponse extends DefaultResponse{
    constructor() {
        super();
    }

    public override async successfullyCreated(ctx: MyContext) {
        const msg = await ctx.reply(`Успішно додано завдання.`);
        setTimeout(async () => {
            await ctx.api.deleteMessage(msg.chat.id, msg.message_id);
        }, 5000)
    }

    public async displayAssignedToUser(ctx: MyContext, response: UserWithTasksApiResponseData) {
        let reply: string = ""
        response.tasks.forEach((task:any, index: number) => {
            reply = reply + `Завдання №${index+1}:  ${task.description}\n`
        })
        let msg: Message.TextMessage;
        if(response.userId){
            msg = await ctx.reply(`[${response.name}](tg://user?id=${response.userId})\n` + reply, {
                parse_mode: "Markdown"
            })
        }
        else{
            msg = await ctx.reply(`${response.username}\n` + reply)
        }
        setTimeout( async() =>{
            try {
                await ctx.api.deleteMessage(msg.chat.id, msg.message_id)
            }
            catch(err){}
        }, 120000)
    }
}