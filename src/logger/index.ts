import pino from "pino";

const logger = () => {
    if (process.env.NODE_ENV == 'production') {
        return pino({}, pino.destination('logs/combined.log'))
    }

    return pino({
        transport: {
            target: 'pino-pretty'
        }
    });
};

export default logger();
