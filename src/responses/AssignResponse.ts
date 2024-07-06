import {MyContext} from "../bot";
import {DefaultResponse} from "./DefaultResponse";
import {UserWithTasksApiResponseData} from "../../lib/data/apiResponses/UserWithTasksApiResponseData";
import {Message} from "@grammyjs/types";
import {deleteOutdatedMsg} from "../utils/DeleteOutdatedMessageUtil";

export class AssignResponse extends DefaultResponse{
    constructor() {
        super();
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
        await deleteOutdatedMsg(ctx, msg, 120000);
    }
}