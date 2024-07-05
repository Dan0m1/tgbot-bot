import {DefaultResponse} from "./DefaultResponse";
import {MyContext} from "../bot";
import {ListCellSingleApiResponseData} from "../../lib/data/apiResponses/ListCellSingleApiResponseData";
import {InlineKeyboard} from "grammy";

export class ListCellResponse extends DefaultResponse{
    constructor() {
        super();
    }

    async displayCell(ctx: MyContext, cell: ListCellSingleApiResponseData, inline: InlineKeyboard){
        let payload: string = "";
        payload += `Назва: ${cell.item}\n`;
        if(cell.amount){
            payload += `Кількість: ${cell.amount}\n`;
        }
        if(cell.assignee){
            payload += `Доручено: ${cell.assignee}\n`;
        }
        if (cell.isDone){
            payload += "Виконано: ✔️\n"
        }else{
            payload += "Виконано: ❌\n"
        }
        const msg = await ctx.reply(payload, {reply_markup: inline});
        setTimeout( async() =>{
            try {
                await ctx.api.deleteMessage(msg.chat.id, msg.message_id)
            }
            catch(err){}
        }, 120000)
    }
}