import httpService from "./httpService";

const userEndpoint = "user/";

// Вроде кастомный хук
const userService = {
    get: async () => {
        const { data } = await httpService.get(userEndpoint);
        return data;
    },
    create: async (payload) => {
        const { data } = await httpService.put(
            userEndpoint + payload._id,
            payload
        );
        return data;
    }
};

export default userService;
