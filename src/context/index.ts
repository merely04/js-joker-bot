import {Context, SessionFlavor} from "grammy";
import {I18nContextFlavor} from "@grammyjs/i18n";
import {ParseModeContext} from "@grammyjs/parse-mode";
import {User} from "@grammyjs/types";

export interface UserContext {
    user: User;
    username: string;
}

export interface SessionData {
    lastJokeId?: number;
}

export type BotContext = Context & I18nContextFlavor & ParseModeContext & UserContext & SessionFlavor<SessionData>;
