import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import userService from "../services/userService";

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

    // ПОЧЕМУ-ТО НИЧЕГО НЕ ОБЁРНУТО В ЭТОТ ПРОВАЙДЕР - ВОПРОС ПОЧЕМУ? КОД АВТОРА - тру делет
    return (
        <UserContext.Provider value={{ users }}>
            {!loading ? children : "loading..."}
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
