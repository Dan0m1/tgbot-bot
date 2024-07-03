import {ResponseError} from "./ResponseError";
import {MyContext} from "../bot";
import {InlineKeyboard} from "grammy";
import {ListApiResponseData} from "../../lib/data/apiResponses/ListApiResponseData";

export class ListResponse extends ResponseError {
    protected ctx: MyContext;

    constructor(ctx: MyContext) {
        super(ctx);
        this.ctx = ctx;
    }

    async successfullyCreated(title: string){
        await this.ctx.reply(`Список \"${title}\" успішно створено.`)
    }

    async successfullyDeleted(title: string){
        await this.ctx.reply(`Список \"${title}\" успішно видалено.`)
    }

    async displayLists(inlineKeyboard: InlineKeyboard){
        await this.ctx.reply("Оберіть список:", {reply_markup: inlineKeyboard})
    }

    async displaySingleList(list: ListApiResponseData){
        const payload = await this.buildListPayload(list);
        await this.ctx.reply(payload, {parse_mode: "MarkdownV2", reply_markup: new InlineKeyboard().text("Додати запис",`listCell-add-title=${list.title}`)});
    }

    async buildListPayload(list: ListApiResponseData){
        let payload: string = `*${list.title}*\n`;
        if(!list.cells || list.cells.length == 0){
            payload += "Список пустий\\.";
        }else {
            list.cells.forEach(cell => {
                payload += `\n**>Назва: ${cell.item}\n`
                if(cell.amount){
                    payload += `>Кількість: ${cell.amount}\n`;
                }
                if(cell.assignee){
                    payload += `>Доручено: ${cell.assignee}\n`;
                }
                if (cell.isDone) {
                    payload += ">Виконано: ✔️\n"
                }else{
                    payload += ">Виконано: ❌\n"
                }
                payload += `>Оглянути: /show\\_cell\\_${list.title}\\_${cell.id}`
            })
        }
        return payload;
    }
}