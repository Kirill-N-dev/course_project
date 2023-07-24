import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import userService from "../services/userService";
import { toast } from "react-toastify";
import { setTokens } from "../services/localStorageService";

const AuthContext = React.createContext();

const httpAuth = axios.create();

export const useAuth = () => {
    return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
    //
    const [currentUser, setCurrentUser] = useState({});
    const [error, setError] = useState(null);
    //
    // Копипаста с другого хука
    useEffect(() => {
        if (error !== null) {
            toast.error(error);
        }
    }, [error]);

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
            await createUser({ _id: data.localId, email, ...rest });
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
        console.log(error, 4321);
        const { message } = error.response.data.error;
        setError(message);
    }

    // Создание функции для конца регистрации юзера + выше создаётся стейт currentUser
    const createUser = async (data) => {
        try {
            const { content } = userService.create(data);
            setCurrentUser(content);
        } catch (error) {
            // код видео 9:39 - начинает переносить сюда эроркетчер с другого файла
            errorCatcher(error);
        }
    };

    return (
        <AuthContext.Provider value={{ signUp, logIn, currentUser }}>
            {children}
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
