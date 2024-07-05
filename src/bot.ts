import {listMiddleware} from "./middleware/ListMiddleware";

require('dotenv').config();
import {Bot, Context, GrammyError, HttpError,  session, SessionFlavor} from "grammy";
import {run} from "@grammyjs/runner";
import {assignMiddleware} from "./middleware/AssignMiddleware";
import {jarMiddleware} from "./middleware/JarMiddleware";
import {jarUserMiddleware} from "./middleware/JarUserMiddleware";
import Configuration from "../lib/config/Configuration";
import {
    type Conversation,
    type ConversationFlavor,
    conversations,
    createConversation,
} from "@grammyjs/conversations";
import {listCellMiddleware} from "./middleware/ListCellMiddleware";


interface SessionData {
}

export type MyContext = Context & SessionFlavor<SessionData> & ConversationFlavor;
export type MyConversation = Conversation<MyContext>;

// @ts-ignore
async function bootstrap(){
    const bot = new Bot<MyContext>(Configuration().botToken);

    bot.use(session({ initial: () => ({}) }));
    bot.use(conversations());
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
