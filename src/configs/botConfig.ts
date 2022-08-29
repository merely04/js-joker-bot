import logger from "../logger";
import dotenv from "dotenv";

dotenv.config()

export const getBotConfig = (): string => {
    const token = process.env.BOT_TOKEN as string;
    if (!token) {
        logger.error('BOT_TOKEN is empty');
    }

    return token;
};
