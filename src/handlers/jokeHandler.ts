import {BotContext} from "../context";
import jokeService from "../services/jokeService";
import userService from "../services/userService";
import CustomError from "../exceptions/customError";
import {trimBotCommand} from "../utils";

class JokeHandler {
    async addJoke(ctx: BotContext) {
        const photo = ctx.message?.photo;
        const content = trimBotCommand(ctx?.message?.caption ?? ctx.message?.text);
        if (!content && !photo) {
            throw new CustomError(ctx.i18n.t('error_empty_content'));
        }

        const user = await userService.findOrCreateUser(ctx.user.id, ctx.username, ctx.user.language_code);
        const joke = await jokeService.addJoke(user.userId, content, photo && photo[0]?.file_id);

        return await ctx.reply(`${ctx.i18n.t('joke_created')}. ID: ${joke.id}.`);
    }

    async getJoke(ctx: BotContext) {
        const lastJokeId = ctx.session.lastJokeId;
        const {joke, skipNumber} = await jokeService.getOneJokeWithIgnoreId(lastJokeId);
        if (!joke) {
            throw new CustomError(ctx.i18n.t('error_empty_joke'));
        }

        const content = joke.content + `
${ctx.i18n.t('joke_added_by')} <a href="tg://user?id=${joke.author.userId}">${joke.author.username}</a>.
        `;

        ctx.session.lastJokeId = skipNumber;

        if (joke.source) {
            return await ctx.replyWithPhoto(joke.source, {
                caption: content
            });
        }

        if (joke.content) {
            return await ctx.reply(content);
        }
    }
}

export default new JokeHandler();
