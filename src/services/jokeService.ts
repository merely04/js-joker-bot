import {joke} from "../database";

class JokeService {
    randomNumber(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    async getOneJokeWithIgnoreId(ignoreJokeId?: number) {
        const itemCount = await joke.count();

        let tryCount = 0;
        let skipNumber = ignoreJokeId;
        do {
            skipNumber = this.randomNumber(0, itemCount - 1);
            ++tryCount;
        } while (ignoreJokeId == skipNumber && tryCount < 4);

        const item = await joke.findFirst({
            skip: skipNumber,
            take: 1,
            // where: {
            //     id: {
            //         not: ignoreJokeId
            //     }
            // },
            include: {
                author: true
            }
        })

        return {joke: item, skipNumber};
    }

    async addJoke(authorId: number, content?: string, source?: string) {
        return joke.create({
            data: {
                content,
                source,
                authorId
            }
        });
    }
}

export default new JokeService();
