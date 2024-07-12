import {DefaultResponse} from "./DefaultResponse";
import {MyContext} from "../bot";
import {ListCellSingleApiResponseData} from "../../lib/data/apiResponses/ListCellSingleApiResponseData";
import {InlineKeyboard} from "grammy";
import {deleteOutdatedMsg} from "../utils/DeleteOutdatedMessageUtil";

export class ListCellResponse extends DefaultResponse{
    constructor() {
        super();
    }

    async displayCell(ctx: MyContext, cell: ListCellSingleApiResponseData, inline: InlineKeyboard){
        let payload: string = "";
        payload += `Назва: ${cell.item.replace("-", "\\-")}\n`;
        if(cell.description){
            console.log(cell.description);
            payload += `Опис: ${cell.description.replace("-", "\\-")}\n`;
        }
        if(cell.assignee){
            console.log(cell.assignee);
            payload += `Доручено: ${cell.assignee.replace("-", "\\-")}\n`;
        }
        if (cell.isDone){
            payload += "Виконано: ✔️\n"
        }else{
            payload += "Виконано: ❌\n"
        }
        const msg = await ctx.reply(payload, {reply_markup: inline});
        ctx.session.ListCellTimeoutId =  await deleteOutdatedMsg(ctx, msg, this.longLifeTime);
    }
}