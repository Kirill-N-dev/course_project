import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import QualitiesList from "./qualitiesList";
import { useHistory } from "react-router-dom";
import api from "../api";

const UserCard = ({ userId }) => {
    //
    const history = useHistory();
    const [user, getUserById] = useState();
    useEffect(() => {
        api.users.getById(userId).then((usr) => getUserById(usr));
    });
    const handleClick = () => {
        history.push("/users");
    };
    //
    if (user) {
        return (
            <ul>
                <h1>{user.name}</h1>
                <h4>Профессия: {user.profession.name}</h4>
                <h6>
                    <QualitiesList qualities={user.qualities} />
                </h6>
                <h6>completedMeetings: {user.completedMeetings}</h6>
                <h4>Rate: {user.rate}</h4>
                <button
                    className="btn btn-outline-light"
                    style={{
                        border: "1px solid blue"
                    }}
                    onClick={handleClick}
                >
                    Все пользователи
                </button>
            </ul>
        );
    } else {
        return <h1>Loading</h1>;
    }
};

UserCard.propTypes = {
    userId: PropTypes.string.isRequired
};

export default UserCard;
