import React, { useEffect } from "react";
/* import { useAuth } from "../hooks/useAuth"; */
import { useDispatch } from "react-redux";
import { logOut } from "../store/users";

const LogOut = () => {
    // Переезд на редакс
    /* const { logOut } = useAuth(); */
    const dispatch = useDispatch();

    useEffect(() => {
        /*  logOut(); */
        dispatch(logOut());
    }, []);

    return <div>Logged out from logOut.jsx</div>;
};

export default LogOut;
