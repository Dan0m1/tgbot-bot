import {DefaultResponse} from "./DefaultResponse";
import {MyContext} from "../bot";
import {InlineKeyboard} from "grammy";
import {ListApiResponseData} from "../../lib/data/apiResponses/ListApiResponseData";

export class ListResponse extends DefaultResponse {
    constructor() {
        super();
    }

    override async successfullyCreated(ctx: MyContext, ...args: any[]): Promise<void>{
        await ctx.reply(`Список \"${args[0]}\" успішно створено.`)
    }

    override async successfullyDeleted(ctx: MyContext, ...args: any[]): Promise<void>{
        await ctx.reply(`Список \"${args[0]}\" успішно видалено.`)
    }

    async displayLists(ctx: MyContext, inlineKeyboard: InlineKeyboard): Promise<void>{
        const msg = await ctx.reply("Оберіть список:", {reply_markup: inlineKeyboard})
        setTimeout( async() =>{
            try {
                await ctx.api.deleteMessage(msg.chat.id, msg.message_id)
            }
            catch(err){}
        }, 120000)
    }

    async displaySingleList(ctx: MyContext, list: ListApiResponseData): Promise<void>{
        const payload: string = this.buildListPayload(list);
        const msg = await ctx.reply(payload, {parse_mode: "MarkdownV2", reply_markup: new InlineKeyboard().text("Додати запис",`listCell-add-title=${list.title}`)});
        setTimeout( async() =>{
            try {
                await ctx.api.deleteMessage(msg.chat.id, msg.message_id)
            }
            catch(err){}
        }, 120000)
    }

    buildListPayload(list: ListApiResponseData): string{
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