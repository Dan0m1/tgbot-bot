import {JarApiResponseData} from "../../lib/data/apiResponses/JarApiResponseData";
import {JarUserApiResponseData} from "../../lib/data/apiResponses/JarUserApiResponseData";
import {MyContext} from "../bot";
import {DefaultResponse} from "./DefaultResponse";
import {Message} from "@grammyjs/types";
import {deleteOutdatedMsg} from "../utils/DeleteOutdatedMessageUtil";

export class JarResponse extends DefaultResponse{
    constructor() {
        super();
    }

    public async displayJar(ctx: MyContext, jarResponse: JarApiResponseData, jarUserResponse: JarUserApiResponseData[]){
        let payload: string = `\t*${jarResponse.title}*\n_${jarResponse.description}_\n\nЗібрано: ${(jarResponse.balance/100).toString().replace(".", "\\.")}/${jarResponse.goal/100}\n`;
        if(jarUserResponse) {
            for (const jarUser of jarUserResponse) {
                payload += `\n>${jarUser.name}:\t${jarUser.moneyStatus.replace(".", "\\.")}`;
            }
        }
        const msg: Message.TextMessage = await ctx.reply(payload, { parse_mode: "MarkdownV2" });
        await deleteOutdatedMsg(ctx, msg, this.longLifeTime);
    }
}