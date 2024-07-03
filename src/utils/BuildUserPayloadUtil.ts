import {User} from "../../lib/data/custom/User";
import {Context} from "grammy";

export async function buildUserPayloadFromCtx(ctx: Context) {
    const user: {userId: string, username: string} = {
        userId: null,
        username: null,
    }
    if(ctx.msg.from.username){
        user.username= "@"+ctx.msg.from.username;
    }
    else if(ctx.msg.from.id){
        user.userId = ctx.msg.from.id.toString();
    }

    return user;
}

export async function buildUserPayloadFromUser(user: User){
    return {
        userId: user.userId,
        username: user.username,
    }
}