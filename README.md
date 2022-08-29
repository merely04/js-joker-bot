# About the project

This is bot powered by `grammy` and `prisma`. It also contains preconfigured logger `pino` and a bunch of helpful
middlewares for `grammy`. Bot supports multiple languages to respond to users.

You can add a text / picture joke with `/addjoke` command and get a random joke with `/joke` command.

# Installation

1. Download source code
2. Rename `.env.example` to `.env`.
3. Paste your `Telegram bot token` to `BOT_TOKEN` and `database url` to `DATABASE_URL`.
4. Install `node_modules` with command `npm i` or `yarn install`.
5. Build project with command `npm run build` or `yarn build`.
6. Start project with command `npm start` or `yarn start`.
