import {User} from "../../lib/data/custom/User";
import {MentionEntity} from "../../lib/data/custom/MentionEntity";
import {MyContext} from "../bot";

export class MessageUtils {
    private lastUserIndex: number;

    constructor(){
    }

    public async getMentionedUsers(ctx: MyContext): Promise<User[]>{
        this.lastUserIndex = -1;
        const messageEntities: MentionEntity[] = await this.getMessageEntities(ctx);
        return this.extractUsersFromEntities(messageEntities);
    }

    private async getMessageEntities(ctx: MyContext): Promise<MentionEntity[]>{
        const entities: MentionEntity[] = ctx.entities(['mention','text_mention']);
        if(entities){
            return entities;
        }
        else{
            throw new Error("messageEntities is undefined");
        }
    }

    private async extractUsersFromEntities(entities: MentionEntity[]): Promise<User[]>{
        return entities.map((entity: MentionEntity)=> {
            if(entity.type === "mention"){
                this.lastUserIndex = entity.offset+entity.length+1;
                return {
                    userId: null,
                    name: null,
                    username:entity.text
                };
            }
            if(entity.type === "text_mention"){
                this.lastUserIndex = entity.offset+entity.length+1;
                return {
                    userId: entity.user.id.toString(),
                    name: entity.text,
                    username: null,
                };
            }
        })
    }

    public async getTextWithoutUsernames(ctx: MyContext): Promise<string>{
        if(this.lastUserIndex == -1){
            return null;
        }
        return ctx.message.text.slice(this.lastUserIndex).trim();
    }

    public async getNumberInText(ctx: MyContext): Promise<number>{
        const regExp: RegExp = new RegExp(/\b\d+\b/g)
        const msgText: string = ctx.match as string;
        if(!regExp.test(msgText)){
            throw new Error("Помилка вводу суми. /help_extort");
        }
        return +msgText.match(regExp)[0];
    }

    public async getNames(ctx: MyContext): Promise<string[]>{
        const regExp: RegExp = new RegExp(/\[.+\]/)
        const msgText: string = ctx.match as string;
        if(!regExp.test(msgText)){
            throw new Error("Помилка вводу імен. /help_extort");
        }
        const stringWithNames: string = msgText.match(regExp)[0].slice(1,-1);
        return stringWithNames.trim().split(" ");
    }
}