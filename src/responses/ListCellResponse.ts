import {ResponseError} from "./ResponseError";
import {MyContext} from "../bot";
import {ListCellSingleApiResponseData} from "../../lib/data/apiResponses/ListCellSingleApiResponseData";
import {InlineKeyboard} from "grammy";

export class ListCellResponse extends ResponseError{
    protected ctx: MyContext;

    constructor(ctx: MyContext) {
        super(ctx);
        this.ctx = ctx;
    }

    async displayCell(cell: ListCellSingleApiResponseData, inline: InlineKeyboard){
        let payload = "";
        payload += `Назва: ${cell.item}\n`;
        if(cell.amount){
            payload += `Кількість: ${cell.amount}\n`;
        }
        if(cell.assignee){
            payload += `Доручено: ${cell.assignee}\n`;
        }
        if (cell.isDone) {
            payload += "Виконано: ✔️\n"
        }else{
            payload += "Виконано: ❌\n"
        }
        await this.ctx.reply(payload, {reply_markup: inline});
    }

    async successfullyDeleted(chatId: number, msgId: number){
        await this.ctx.api.editMessageText(chatId, msgId, "Видалено", {reply_markup: null});
    }
}