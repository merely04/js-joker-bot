import logger from "../logger";
import {BotError, GrammyError, HttpError} from "grammy";
import CustomError from "../exceptions/customError";
import {BotContext} from "../context";

export const getErrorHandler = (error: BotError<BotContext>) => {
    const ctx = error.ctx;
    const err = error.error;

    logger.error(`Error while handling update ${ctx.update.update_id}`);

    if (err instanceof CustomError) {
        return ctx.reply(`<a href="tg://user?id=${ctx.user.id}">${ctx.username}</a>, ${err.message}.`);
    } else if (err instanceof GrammyError) {
        logger.error('Error in request:', err.description);
    } else if (err instanceof HttpError) {
        logger.error('Could not contact Telegram:', JSON.stringify(err));
    } else {
        console.log(err);
        logger.error('Unknown error:', JSON.stringify(err));
    }
};
