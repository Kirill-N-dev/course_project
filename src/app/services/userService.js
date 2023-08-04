import httpService from "./httpService";
import { localStorageService } from "./localStorageService";

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
    },
    getCurrentUser: async () => {
        const { data } = await httpService.get(
            userEndpoint + localStorageService.getUserByFirebaseId()
        );
        return data;
    },
    update: async (payload) => {
        const { data } = await httpService.patch(
            userEndpoint + payload._id,
            payload
        );
        return data;
    }
};

export default userService;
