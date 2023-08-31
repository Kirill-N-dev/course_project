export const generateAuthError = (message) => {
    // Ниже частичная копипаста с UseAuth ф-ий логина и сайнапа, переделанная под свитч кейс, как у автора
    switch (message) {
        case "INVALID_PASSWORD":
            return "Неверный пароль";
        case "EMAIL_NOT_FOUND":
            return "Пользователя с таким email не существует";

        default:
            throw new Error("Попытки залогиниться превысили лимит на 146%"); // можно так
    }
};
