import httpService from "./httpService";

// Черта в конце обязательна, из уроков
// как понял, это будет запрос качеств в БД users (да???)

// Проверил, именно по этому адресу лежит объект!
const qualitiesEndpoint = "quality/";

// ...
const qualitiesService = {
    get: async () => {
        const { data } = await httpService.get(qualitiesEndpoint);
        console.log(123321);
        return data;
    }
};

export default qualitiesService;
