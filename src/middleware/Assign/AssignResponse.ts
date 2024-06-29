import {Context} from "grammy";
import {MyContext} from "../../bot";

export class AssignResponse {
    private ctx: MyContext;

    constructor(ctx: MyContext) {
        this.ctx = ctx;
    }

    public async successfullyAssigned() {
        await this.ctx.reply(`Успішно додано завдання.`);
    }

    public async displayAssignedToUser(response: any) {
        let reply = ""
        response.tasks.forEach((task:any, index: number) => {
            reply = reply + `Завдання №${index+1}:  ${task.description}\n`
        })

        if(response.userId){
            await this.ctx.reply(`[${response.name}](tg://user?id=${response.userId})\n` + reply, {
                parse_mode: "Markdown"
            })
        }
        else{
            await this.ctx.reply(`${response.username}\n` + reply)
        }
    }

    public async successfullyDeleted(response: any) {
        // TODO
        console.log(response);
    }

    public async displayError(response: any){
        await this.ctx.reply(response.message);
    }
}