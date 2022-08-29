import {BotContext} from "../context";
import {Composer} from "grammy";
import {BOT_COMMANDS} from "../types";
import jokeHandler from "../handlers/jokeHandler";

const composer = new Composer<BotContext>();

composer.command(BOT_COMMANDS.GET_JOKE.replace('/', ''), jokeHandler.getJoke);

composer.filter(async (ctx) => {
    const content = ctx.message?.caption ?? ctx.message?.text;

    return content?.startsWith(BOT_COMMANDS.ADD_JOKE) ?? false;
}, jokeHandler.addJoke);

export default composer;
