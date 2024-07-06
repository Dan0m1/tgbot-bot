require('dotenv').config("/var/www/vacationbot/_work/.env");
import {Bot, Context, GrammyError, HttpError,  session, SessionFlavor} from "grammy";
import {run} from "@grammyjs/runner";
import {
    type Conversation,
    type ConversationFlavor,
    conversations,
} from "@grammyjs/conversations";

import {assignMiddleware} from "./middleware/AssignMiddleware";
import {jarMiddleware} from "./middleware/JarMiddleware";
import {jarUserMiddleware} from "./middleware/JarUserMiddleware";
import {listMiddleware} from "./middleware/ListMiddleware";
import {listCellMiddleware} from "./middleware/ListCellMiddleware";
import {defaultMiddleware} from "./middleware/DefaultMiddleware";

interface SessionData {
}

export type MyContext = Context & SessionFlavor<SessionData> & ConversationFlavor;
export type MyConversation = Conversation<MyContext>;

async function bootstrap(){
    const bot = new Bot<MyContext>(process.env.BOT_TOKEN);

    bot.use(session({ initial: () => ({}) }));
    bot.use(conversations());
    bot.use(defaultMiddleware);
    bot.use(assignMiddleware);
    bot.use(jarMiddleware);
    bot.use(jarUserMiddleware);
    bot.use(listMiddleware);
    bot.use(listCellMiddleware);

    console.log("Бот працює.")

    bot.catch((err) => {
        const ctx: MyContext = err.ctx;
        console.error(`Error while handling update ${ctx.update.update_id}:`);
        const e = err.error;

        if (e instanceof GrammyError) {
            console.error("Error in request:", e.description);
        } else if (e instanceof HttpError) {
            console.error("Error in request:", e);
        } else {
            console.error("Unknown error:", e);
        }
    });

    const handle = run(bot);
    handle.task().then(() => {
        console.log("Бот завершив обробку!");
    });
}

bootstrap().catch(console.error);
