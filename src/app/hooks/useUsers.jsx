import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import userService from "../services/userService";
import { useSelector } from "react-redux";
import { getCurrentUserData } from "../store/users";
/* import { useAuth } from "./useAuth"; */

const UserContext = React.createContext();

export const useUser = () => {
    return useContext(UserContext);
};

// provider for all users
const UserProvider = ({ children }) => {
    //
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // переезд на редакс (АВТОР ТУТ НИЧЕГ ОНЕ ДЕЛАЛ, ТАК КАК ТИПА ХУК)
    // Так как отсюда берутся качества для userPage, то именно тут надо обновить стейт юзеров при изменении текущего:
    /* const { currentUser } = useAuth(); */
    const currentUser = useSelector(getCurrentUserData());

    useEffect(() => {
        if (!loading) {
            /* const theUser = users.filter((u) => u._id === currentUser._id);
            const newUsers = [{ ...theUser, qualities: currentUser.qualities }];
            console.log(newUsers, 111);
            setUsers(newUsers); */

            /* console.log(currentUser.qualities); */ // реагируют сразу
            // надо найти в юзерс по id currentUser, а затем в этом найденном вставить качества currentUser и обновить
            // (автор решил по другому, я оставлю своё, а у него по findIndex)
            const currentUserInUsers = users.filter(
                (u) => u._id === currentUser._id
            );
            /* console.log(currentUserInUsers, 444); */ // найден
            currentUserInUsers[0].qualities = currentUser.qualities;
            /* console.log(currentUserInUsers, 444); */ // качества обновляются
            setUsers([...users, ...currentUserInUsers]);
            console.log(users);
        }
    }, [currentUser]);

    useEffect(() => {
        getUsers();
    }, []);

    useEffect(() => {
        if (error !== null) {
            toast(error);
            setError(null);
        }
    }, [error]);

    async function getUsers() {
        try {
            const { content } = await userService.get();
            // Качества должны быть ["","",...], и именно такого формата, иначе ФЭ будет выдавать ошибки
            /* console.log(content, 222); */
            // ПРОВЕРКА ПОЛУЧЕННЫХ С ФБ ЮЗЕРОВ, ГДЕ
            // QUALITIES И PROFESSION ЯВЛЯЮТСЯ СТРИНГОВЫМИ ID
            setUsers(content);
            setLoading(false);
        } catch (error) {
            errorCatcher(error);
        }
    }

    function errorCatcher(error) {
        const { message } = error.response.data;
        setError(message);
        setLoading(false);
    }

    // При багах попробовать сделать асинхронной
    function getUserById(userId) {
        return users.find((u) => u._id === userId);
    }

    // ПОЧЕМУ-ТО НИЧЕГО НЕ ОБЁРНУТО В ЭТОТ ПРОВАЙДЕР - ВОПРОС ПОЧЕМУ? КОД АВТОРА - тру делет
    return (
        <UserContext.Provider value={{ users, getUserById }}>
            {!loading ? children : "loading from useUsers.jsx"}
        </UserContext.Provider>
    );
};

UserProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default UserProvider;
