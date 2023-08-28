import { useDispatch, useSelector } from "react-redux";
import {
    getIsLoggedIn,
    getUsersLoadingStatus,
    loadUsersList
} from "../../../store/users";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { loadQualitiesList } from "../../../store/qualities";
import { loadProfessionsList } from "../../../store/professions";

// Автор почему-то назвал хок по иному, не с with
const AppLoader = ({ children }) => {
    const dispatch = useDispatch();
    // Новый селектор
    const isLoggedIn = useSelector(getIsLoggedIn());
    const usersStatus = useSelector(getUsersLoadingStatus()); // ***
    useEffect(() => {
        dispatch(loadQualitiesList());
        dispatch(loadProfessionsList());
        // Это всё с App.js
        // Если в ЛС есть id текущего юзера***, то запрашиваем юзеров для стора и обновляем его
        if (isLoggedIn) dispatch(loadUsersList());
    }, [isLoggedIn]);

    if (usersStatus) return "Loading of users from appLoader.jsx";
    return children;
};

AppLoader.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default AppLoader;
