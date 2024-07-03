import {MyContext} from "../bot";

export class ResponseError {
    constructor(protected ctx: MyContext) {}

    public async displayError(error: any){
        await this.ctx.reply(error.message);
    }
}