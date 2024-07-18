import {JarApiResponseData} from "../../lib/data/apiResponses/JarApiResponseData";
import {JarUserApiResponseData} from "../../lib/data/apiResponses/JarUserApiResponseData";
import {MyContext} from "../bot";
import {DefaultResponse} from "./DefaultResponse";
import {Message} from "@grammyjs/types";
import {deleteOutdatedMsg} from "../utils/DeleteOutdatedMessageUtil";
import {replaceReservedCharacters} from "../utils/ReservedCharacterReplacer";

export class JarResponse extends DefaultResponse{
    constructor() {
        super();
    }

    public async displayJar(ctx: MyContext, jarResponse: JarApiResponseData, jarUserResponse: JarUserApiResponseData[]){
        let payload: string = `\t*${jarResponse.title}*\n_${jarResponse.description}_\n\nЗібрано: ${replaceReservedCharacters((jarResponse.balance/100).toString())}\n`;
        if(jarUserResponse) {
            for (const jarUser of jarUserResponse) {
                const cat = jarUser.fulfilled ? "✅" : replaceReservedCharacters(jarUser.moneyStatus);
                payload += `\n>${jarUser.name}:\t${cat}`;
            }
        }
        console.log(payload)
        const msg: Message.TextMessage = await ctx.reply(payload, { parse_mode: "MarkdownV2" });
        await deleteOutdatedMsg(ctx, msg, this.longLifeTime);
    }
}