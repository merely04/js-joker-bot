import {BotCommand} from "@grammyjs/types";
import {BOT_COMMANDS} from "../types";

export const commands: BotCommand[] = [
    {command: BOT_COMMANDS.GET_JOKE, description: 'Get random joke'},
    {command: BOT_COMMANDS.ADD_JOKE, description: 'Add new joke to bot'}
]
