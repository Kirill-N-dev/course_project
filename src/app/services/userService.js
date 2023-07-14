import httpService from "./httpService";

const userEndpoint = "user/";

// Вроде кастомный хук
const userService = {
    get: async () => {
        const { data } = await httpService.get(userEndpoint);
        return data;
    }
};

export default userService;
