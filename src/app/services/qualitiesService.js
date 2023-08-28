import httpService from "./httpService";

// Черта в конце обязательна, из уроков
// как понял, это будет запрос качеств в БД users (да???)

// Проверил, именно по этому адресу лежит объект!
const qualitiesEndpoint = "quality/";

// У автора почему-то fetchAll
const qualitiesService = {
    get: async () => {
        const { data } = await httpService.get(qualitiesEndpoint);
        /* console.log(data, 12345); */ // +++, баг с качествами, но тут они приходят
        return data;
    }
};

export default qualitiesService;
