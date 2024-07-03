import {JarApiResponseData} from "../../lib/data/apiResponses/JarApiResponseData";
import {JarUserApiResponseData} from "../../lib/data/apiResponses/JarUserApiResponseData";
import {MyContext} from "../bot";
import {ResponseError} from "./ResponseError";

export class JarResponse extends ResponseError{
    protected ctx: MyContext;

    constructor(ctx: MyContext) {
        super(ctx);
        this.ctx = ctx;
    }

    public async displayJar(jarResponse: JarApiResponseData, jarUserResponse: JarUserApiResponseData[]){
        let payload = `\t*${jarResponse.title}*\n_${jarResponse.description}_\n\nЗібрано: ${(jarResponse.balance/100).toString().replace(".", "\\.")}/${jarResponse.goal/100}\n`;
        if(jarUserResponse) {
            for (const jarUser of jarUserResponse) {
                payload += `\n>${jarUser.name}:\t${jarUser.moneyStatus.replace(".", "\\.")}`;
            }
        }
        await this.ctx.reply(payload, { parse_mode: "MarkdownV2" });
    }
}