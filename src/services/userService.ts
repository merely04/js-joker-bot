import {user} from "../database";

class UserService {
    async findOrCreateUser(userId: number, username: string, language = 'en') {
        return user.upsert({
            where: {userId},
            update: {username},
            create: {userId, username, language}
        });
    }

    async findUser(userId: number) {
        return user.findFirst({
            where: {userId},
            include: {
                jokes: true
            }
        });
    }
}

export default new UserService();
