import httpService from "./httpService";
import { localStorageService } from "./localStorageService";

const userEndpoint = "user/";

// Вроде кастомный хук
// В методе update автор в домашке брал id из локалсториджа
// Также говорит, что можно и методом post, но тогда недостающие при передаче данные сотрутся и их надо будет отсылать тоже
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
