import {MyContext} from "../bot";
import {ResponseError} from "./ResponseError";

export class JarUserResponse extends ResponseError{
    protected ctx: MyContext;

    constructor(ctx: MyContext) {
        super(ctx);
        this.ctx = ctx;
    }

    public async successfullyAdded() {
        await this.ctx.reply(`Успішно додано.`);
    }

    public async successfullyUpdated() {
        await this.ctx.reply(`Успішно оновлено.`);
    }
}