require('dotenv').config();
import {Bot, GrammyError, HttpError} from "grammy";
import {run} from "@grammyjs/runner";
import {assignMiddleware} from "./middleware/Assign/AssignMiddleware";
import {jarMiddleware} from "./middleware/Jar/JarMiddleware";
import Configuration from "../lib/config/Configuration";


// @ts-ignore
async function bootstrap(){
    const bot = new Bot(Configuration().botToken);

    bot.use(assignMiddleware);
    bot.use(jarMiddleware);

    bot.catch((err) => {
        const ctx = err.ctx;
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
