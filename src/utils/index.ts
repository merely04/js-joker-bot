export const trimBotCommand = (content?: string) => {
    return content?.trim().split(' ').slice(1).join(' ');
}
