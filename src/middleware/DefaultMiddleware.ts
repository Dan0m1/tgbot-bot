import {Composer} from "grammy";
import {MyContext} from "../bot";
import {deleteOutdatedMsg} from "../utils/DeleteOutdatedMessageUtil";

export const defaultMiddleware: Composer<MyContext> = new Composer<MyContext>();

defaultMiddleware.command(
    "start",
    async (ctx: MyContext) => await start(ctx)
)
defaultMiddleware.command(
    "help",
    async(ctx: MyContext) => await help(ctx)
)
defaultMiddleware.command(
    "help_lists",
    async(ctx: MyContext) => await helpLists(ctx)
)
defaultMiddleware.command(
    "help_assign",
    async(ctx: MyContext) => await helpAssign(ctx)
)
defaultMiddleware.command(
    "help_extort",
    async(ctx: MyContext) => await helpExtort(ctx)
)

async function start(ctx: MyContext): Promise<void> {
    await ctx.reply("Привіт. Гачі розкумар вже близько)\nДавай готуватись!");
    await ctx.reply("*/help* \\- для опису взаємодії з ботом", {parse_mode: "MarkdownV2"});
}

async function help(ctx: MyContext): Promise<void> {
    const msg = await ctx.reply("Корисні команди:\n" +
        "*/jar* \\- показати відомості про банку для збору грошей\n" +
        "*/show\\_lists* \\- показати меню списків\n" +
        "*/help\\_lists* \\- команди для операцій зі списками\n" +
        "*/help\\_assign* \\- команди для призначення завдань\n" +
        "*/help\\_extort* \\- команди для вимагання грошей зі слейвів\n"
        , {parse_mode: "MarkdownV2"});
    await deleteOutdatedMsg(ctx, msg, 120000);
}

async function helpLists(ctx: MyContext): Promise<void> {
    const msg = await ctx.reply("Команди для списків:\n" +
        "*/add\\_list* *_назва\\_латинськими\\_літерами_* \\- додати новий список\n" +
        "*/delete\\_list* *_назва\\_існуючого\\_списку_* \\- видалити існуючий список\n"
        , {parse_mode: "MarkdownV2"});
    await deleteOutdatedMsg(ctx, msg, 120000);
}

async function helpAssign(ctx: MyContext): Promise<void> {
    const msg = await ctx.reply("Команди для вимагання грошей:\n" +
        "*/assign\\_to* *_тегнути\\_користувачів_* *_зміст\\_завдання_* \\- призначити завдання для тегнутих слейвів\n" +
        "*/delete\\_entry* *_тегнути\\_користувача_* *_номер\\_завдання_* \\- видалити відповідне завдання\n" +
        "*/check\\_assigned\\_to* *_тегнути\\_користувача_* \\- переглянути завдання тегнутого слейва\n" +
        "*/assigned\\_to\\_me* \\- переглянути свої завдання\n"
        , {parse_mode: "MarkdownV2"});
    await deleteOutdatedMsg(ctx, msg, 120000);
}

async function helpExtort(ctx: MyContext): Promise<void> {
    const msg = await ctx.reply("Команди для вимагання грошей:\n" +
        "*/extort\\_from* *\\[_перелік\\_імен_\\]* *_сума_* \\- вимагати гроші у перелічених слейвів\n" +
        "*/change\\_extort* *\\[_перелік\\_імен_\\]* *_сума_* \\- змінити суму вимагання у перелічених слейвів\n"
        , {parse_mode: "MarkdownV2"});
    await deleteOutdatedMsg(ctx, msg, 120000);
}
