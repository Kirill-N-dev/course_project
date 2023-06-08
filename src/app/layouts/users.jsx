import React from "react";
import { useParams } from "react-router-dom";
import UsersListPage from "../components/page/usersListPage";
import UserCard from "../components/page/userPage";
import { UserEdit } from "../components/ui";

const Users = () => {
    const params = useParams();
    const { userId, edit } = params;
    /* console.log(userId); */
    return (
        <>
            {userId ? (
                edit ? (
                    <UserEdit userId={userId} />
                ) : (
                    <UserCard userId={userId} />
                )
            ) : (
                <UsersListPage />
            )}
        </>
    );
};

export default Users;

// запилить <UserEdit/>
