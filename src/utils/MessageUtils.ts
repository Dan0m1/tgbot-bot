import {Context} from "grammy";
import {User} from "../../lib/data/custom/User";
import {MentionEntity} from "../../lib/data/custom/MentionEntity";

export class MessageUtils {
    private lastUserIndex = -1;
    private ctx: Context;

    constructor(ctx:Context){
        this.ctx = ctx;
    }

    public async getMentionedUsers(): Promise<User[]>{
        const messageEntities: MentionEntity[] = await this.getMessageEntities();
        const mentionedUsers: User[] = await this.extractUsersFromEntities(messageEntities);

        return mentionedUsers;
    }

    private async getMessageEntities() {
        const entities: MentionEntity[] = this.ctx.entities(['mention','text_mention']);
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

    public async getTextWithoutUsernames(): Promise<string>{
        if(this.lastUserIndex == -1){
            return null;
        }
        return this.ctx.message.text.slice(this.lastUserIndex).trim();
    }

    public async getNumberInText(): Promise<number>{
        const regExp = new RegExp(/\b\d+\b/g)
        return +this.ctx.message.text.match(regExp)[0];
    }

    public async getNames(): Promise<string[]>{
        const regExp = new RegExp(/\[.+\]/)
        const msgText = this.ctx.message.text;
        const stringWithNames = msgText.match(regExp)[0].slice(1,-1);
        return stringWithNames.trim().split(" ");
    }
}