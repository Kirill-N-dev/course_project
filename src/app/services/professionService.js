import httpService from "./httpService";

// Черта в конце обязательна, из уроков
const userEndpoint = "profession/";

// Вроде кастомный хук
const professionService = {
    get: async () => {
        const { data } = await httpService.get(userEndpoint);
        return data;
    }
};

export default professionService;
