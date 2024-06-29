import {JarApiResponseData} from "../../../lib/data/JarApiResponseData";
import {JarUserApiResponseData} from "../../../lib/data/JarUserApiResponseData";
import {MyContext} from "../../bot";

export class JarResponse {
    private ctx: MyContext;

    constructor(ctx: MyContext) {
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

    public async displayError(response: any){
        await this.ctx.reply(response.message);
    }
}