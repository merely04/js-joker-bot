import {BotContext} from "../context";
import {NextFunction} from "grammy";

export const getUser = () => {
    return async (ctx: BotContext, next: NextFunction) => {
        if (!ctx.from) {
            throw new Error('User is empty')
        }

        ctx.user = ctx.from;
        ctx.username = ctx.user.username ?? ctx.user.first_name;

        await next();
    };
}
