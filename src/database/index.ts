import {PrismaClient} from "@prisma/client";
import logger from "../logger";

const prisma = new PrismaClient()

export const user = prisma.user;
export const joke = prisma.joke;

export const startDatabase = () => {
    return prisma.$connect()
        .then(() => logger.info('Database connected!'))
        .catch((error: unknown) =>
            logger.error(`Error with database connection: ${error}`)
        );
};

export const stopDatabase = () => {
    return prisma.$disconnect();
};
