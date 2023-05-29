import React from "react";
import { useParams } from "react-router-dom";
import UsersList from "../components/usersList";
import UserCard from "../components/userCard";

const Users = () => {
    const params = useParams();
    const { userId } = params;
    return <>{userId ? <UserCard userId={userId} /> : <UsersList />}</>;
};

export default Users;
