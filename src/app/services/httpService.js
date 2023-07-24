import axios from "axios";
import { toast } from "react-toastify";
import configFile from "../config.json";

// ниже код с добавкой метода сентри и тоаст библиотеки

// Схема такая: серверное приложение запущено на 4000 порте. Ендпойнт ниже это как раз прослушка оного
// Строка ниже - новая, экземпляр объекта эксиос, из урока по ФБ-8
const http = axios.create({ baseURL: configFile.apiEndpoint });

// Нижний код комментируется после урока ФБ-8
/* axios.defaults.baseURL = configFile.apiEndpoint; */
/* console.log(axios.defaults.baseURL); */

// Обработка запроса на сервер (из недели феирбейса) (почти копипаста с https://axios-http.com/docs/interceptors)
http.interceptors.request.use(
    //
    function (config) {
        // Do something before request is sent
        /* console.log(config, 321); */
        if (configFile.isFirebase) {
            //
            // Для ендпойнта (проверка на конечный слеш)
            // АВТОР НЕ ПОЯСНИЛ, ЧТО ЗА GI - I НЕИЗВЕСТЕН!
            /* config.url = "PROF/888"; */
            const containSlash = /\/$/gi.test(config.url);
            //
            config.url =
                (containSlash ? config.url.slice(0, -1) : config.url) + ".json";
            /* console.log(config.url, 666); */
        }
        // Возврат конфига (изменённого с фаирбейсом ли начального, с сервером)
        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    }
);

// Трансформер даты с фаирбейса
const transformData = (data) => {
    // МАКС, может лучше закомментированная функция? Она сохраняет данные, например число 200 (статус).
    /* return data ? Object.values(data) : "error123"; */
    return data
        ? Object.keys(data).map((key) => ({ ...data[key] }))
        : "error123";
};

// Обработка ответа сервера
http.interceptors.response.use(
    (data) => {
        /* console.log(transformData(data), 44); */
        /* console.log(data.data, "всё ок", 678); */
        if (configFile.isFirebase) {
            data.data = { content: transformData(data.data) };
        }
        return data;
    },
    (error) => {
        console.log("сработает первее");

        const expectedErrors =
            error.response &&
            error.response.status >= 400 &&
            error.response.status < 500;

        if (!expectedErrors) {
            console.log(error);
            toast.error("Unexpected errors");
        }

        return Promise.reject(error);
    }
);

const httpService = {
    get: http.get,
    post: http.post,
    put: http.put,
    delete: http.delete
};

export default httpService;
