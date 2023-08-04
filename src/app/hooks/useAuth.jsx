import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import userService from "../services/userService";
import { toast } from "react-toastify";
import {
    localStorageService,
    setTokens
} from "../services/localStorageService";
import { randomInt } from "../utils/randomInt";
import { useHistory } from "react-router";
/* import httpService from "../services/httpService"; */
/* import configFile from "../config.json"; */

const AuthContext = React.createContext();

// Код ниже нативный, но автор в уроке по ФБ (6) уже имеет нижезаписанный код, почти копипасту с httpService.js
// Объяснений, как обычно, не было. Потому делаю копипасту, хоят работало и так.
/* const httpAuth = axios.create(); */
// Изменённый невесть когда автором код + я сам добавил в config.json нужный эндпойнт:
export const httpAuth = axios.create({
    baseURL: "https://securetoken.googleapis.com/v1/",
    params: { key: process.env.REACT_APP_FIREBASE_KEY }
});

export const useAuth = () => {
    return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
    // Ниже удалил первичное значение, так как с ним происходил баг и юзеры не были фалс в навбаре
    const [currentUser, setCurrentUser] = useState();
    const [error, setError] = useState(null);
    const [isLoading, setLoading] = useState(true);

    const history = useHistory();
    //

    const getUserData = async () => {
        try {
            const { content } = await userService.getCurrentUser();
            setCurrentUser(content);
        } catch (error) {
            errorCatcher(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (localStorageService.getAccessToken()) {
            getUserData();
        } else {
            setLoading(false);
        }
    }, []);
    // Копипаста с другого хука
    useEffect(() => {
        if (error !== null) {
            toast.error(error);
        }
    }, [error]);
    //
    const logOut = () => {
        localStorageService.removeAuthData();
        setCurrentUser(null);
        history.push("/");
    };

    //
    const signUp = async ({ email, password, ...rest }) => {
        // константы с лк ФБ
        /* const key = "AIzaSyBwls6Lur4lee-s0W2zNy4pLcTncUajY-Q"; */
        // Эндпойнт для регистрации и апи кей
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_FIREBASE_KEY}`;
        /* console.log(process.env, 77777777); */

        try {
            const { data } = await httpAuth.post(url, {
                email,
                password,
                returnSecureToken: true
            });
            /* console.log(data, 776); */
            // Новое для токенов
            setTokens(data);
            await createUser({
                _id: data.localId,
                email,
                rate: randomInt(1, 5),
                completedMeetings: randomInt(0, 200),
                image: `https://avatars.dicebear.com/api/avataaars/${(
                    Math.random() + 1
                )
                    .toString(36)
                    .substring(7)}.svg`,
                ...rest
            });
        } catch (error) {
            //

            /*  console.log(error, "!!!"); */
            const { code, message } = error.response.data.error;
            /*  console.log(code, message, 5000); */
            //
            if (code === 400) {
                //
                if (message === "EMAIL_EXISTS") {
                    //
                    const newErrorMessage = "Юзер с таким email уже существует";
                    const errorObj = {
                        email: newErrorMessage
                    };
                    setError(newErrorMessage);
                    throw errorObj;
                }
                //
            }

            console.log(code, message, "new log");
        }
    };

    // ДОМАШКА:
    const logIn = async ({ email, password, ...rest }) => {
        // Эндпойнт для залогина и апи кей
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_FIREBASE_KEY}`;
        /*  console.log(process.env, 77777777); */
        try {
            const { data } = await httpAuth.post(url, {
                email,
                password,
                returnSecureToken: true
            });
            console.log(data, "домашка успех");
            // МАКС, Я НЕ УВЕРЕН, ЧТО НУЖНЫ В ХРАНИЛИЩЕ ИМЕННО ЭТИ ТОКЕНЫ, Я ТОЛКОМ ЕЩЁ НЕ РАЗОБРАЛСЯ,
            // ЗАЧЕМ ОНИ ТАМ (ПРИ РЕГИСТРАЦИИ ЯСНО, А ПРИ ЗАЛОГИНЕ - НЕТ), А АВТОР В ЗАДАНИИ НЕ УТОЧНИЛ
            setTokens(data);
            // Забытый await, иначе нет переадресации из-за первичного отсутствия currentUser
            await getUserData();
        } catch (error) {
            //
            /* console.log(error, "домашка облом!"); */
            const { code, message } = error.response.data.error;
            /* console.log(message); */
            //
            if (code === 400) {
                //
                if (message === "INVALID_PASSWORD") {
                    //

                    const newErrorMessage = "Неверный пароль";
                    const errorObj = {
                        password: newErrorMessage
                    };
                    setError(newErrorMessage);
                    throw errorObj;
                }
                if (message === "EMAIL_NOT_FOUND") {
                    //
                    const newErrorMessage =
                        "Пользователя с таким email не существует";
                    const errorObj = {
                        email: newErrorMessage
                    };
                    setError(newErrorMessage);
                    throw errorObj;
                }
                //
            }

            /* console.log(code, message, "new log"); */
        }
    };

    // Копипаста с другого хука
    function errorCatcher(error) {
        /* console.log(error, 4321); */
        const { message } = error.response.data.error;
        setError(message);
    }

    // Создание функции для конца регистрации юзера + выше создаётся стейт currentUser
    const createUser = async (data) => {
        try {
            const { content } = await userService.create(data);
            setCurrentUser(content);
            /* console.log(content, 123); */
        } catch (error) {
            // код видео 9:39 - начинает переносить сюда эроркетчер с другого файла
            errorCatcher(error);
        }
    };

    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

    // ДОМАШКА
    const updateUser = async (data) => {
        // data не совсем правильная, там qualities это не простой [], а [{},{}...]
        // потому при обновлении юзера (в БД) возникал баг, когда повторно запрашивались его качества
        // подобный баг и с профессиями
        // Форматирую карентЮзера для отправки на ФБ:
        const newData = {
            ...data,
            qualities: data.qualities.map((q) => q.value),
            profession: data.profession
        };
        /* console.log(data.profession, 444); */ // нужна именно data.profession, это айдишник
        console.log(data, newData); // +++
        try {
            const { content } = await userService.update(newData);
            setCurrentUser(content);
            /* console.log(content, 123); */
        } catch (error) {
            /* console.log(error); */
            errorCatcher(error);
        }
    };

    return (
        <AuthContext.Provider
            value={{ signUp, logIn, logOut, currentUser, updateUser }}
        >
            {!isLoading ? children : "loading!!!&&&"}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default AuthProvider;
