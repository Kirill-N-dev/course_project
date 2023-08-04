import React, { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";

const LogOut = (props) => {
    //
    const { logOut } = useAuth();

    useEffect(() => {
        logOut();
    }, []);

    return <div>LOOOODING</div>;
};

export default LogOut;
