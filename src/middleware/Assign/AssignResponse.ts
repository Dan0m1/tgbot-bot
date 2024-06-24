import {Context} from "grammy";

export class AssignResponse {
    private ctx: Context;

    constructor(ctx: Context) {
        this.ctx = ctx;
    }

    public async successfullyAssigned(response: any) {
        console.log(response)
        await this.ctx.reply(`Successfully Assigned!\n`);
    }

    public async displayAssignedToUser(response: any) {
        console.log(response);
        let reply = ""
        response.tasks.forEach((task:any) => {
            reply = reply + `Завдання:  ${task.description}\n`
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
        console.log(response);
    }

    public async displayError(response: any){
        await this.ctx.reply("Error: " + response.message);
    }
}