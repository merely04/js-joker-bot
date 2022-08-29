import logger from "./logger";
import {apiThrottler} from "@grammyjs/transformer-throttler";
import {Bot, session} from "grammy";
import {BotContext} from "./context";
import {ignoreOld, sequentialize} from 'grammy-middlewares'
import {hydrateReply, parseMode} from "@grammyjs/parse-mode";
import {getBotConfig} from "./configs/botConfig";
import dotenv from "dotenv";
import composer from "./composer";
import {getUser} from "./middlewares/userMiddleware";
import {getI18n} from "./middlewares/i18nMiddleware";
import {startDatabase, stopDatabase} from "./database";
import {limit} from "@grammyjs/ratelimiter";
import {getErrorHandler} from "./middlewares/errorMiddleware";
import {commands} from "./templates/commands";

const bot = new Bot<BotContext>(getBotConfig());

function startLogExceptions() {
    process.on('unhandledRejection', reason => {
        logger.error(`Rejection: ${reason}`);
    });
    process.on('uncaughtException', err => {
        logger.error(`Exception: ${err}`);
    });
}

async function startBot() {
    dotenv.config();

    bot.use(sequentialize());
    bot.use(ignoreOld());
    bot.use(limit());
    bot.use(session({initial: () => ({})}));
    bot.use(getI18n());
    bot.use(hydrateReply);
    bot.use(getUser());

    bot.api.config.use(parseMode('HTML'));
    bot.api.config.use(apiThrottler());

    await bot.api.setMyCommands(commands);

    bot.use(composer);
    bot.catch(getErrorHandler);

    bot.start();

    await bot.init();
    logger.info(`Bot ${bot.botInfo.username} started!`);
}

async function stop() {
    await stopDatabase();
    await bot.stop();
}

async function main() {
    startLogExceptions();

    await startDatabase();
    await startBot();

    process.once('SIGINT', stop);
    process.once('SIGTERM', stop);
}

main()
    .catch(e => logger.error(e))
    .finally(stop)

