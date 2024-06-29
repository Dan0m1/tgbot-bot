import {MyContext} from "../../bot";

export class JarUserResponse {
    private ctx: MyContext;

    constructor(ctx: MyContext) {
        this.ctx = ctx;
    }

    public async successfullyAdded() {
        await this.ctx.reply(`Успішно додано.`);
    }

    public async successfullyUpdated() {
        await this.ctx.reply(`Успішно оновлено.`);
    }

    public async displayError(response: any){
        await this.ctx.reply(response.message);
    }

}