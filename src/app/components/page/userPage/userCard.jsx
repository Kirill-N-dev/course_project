import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Qualities } from "../../ui/qualities";
import { useHistory } from "react-router-dom";
import api from "../../../api";

const UserCard = ({ userId }) => {
    //
    const history = useHistory();
    const [user, getUserById] = useState();
    useEffect(() => {
        api.users.getById(userId).then((usr) => getUserById(usr));
        console.log(user);
    }, []);

    const handleClick = ({ target }) => {
        /* console.log(history); */
        target.name === "allUsers"
            ? history.push("/users")
            : history.push(`/users/${userId}/edit`);
    };
    //
    if (user) {
        return (
            <ul>
                <h1>{user.name}</h1>
                <h4>Профессия: {user.profession.name}</h4>
                <h6>
                    <Qualities qualities={user.qualities} />
                </h6>
                <h6>completedMeetings: {user.completedMeetings}</h6>
                <h4>Rate: {user.rate}</h4>

                <h6 style={{ color: "red" }}>{user.email}</h6>

                <button
                    className="btn btn-light"
                    style={{
                        border: "1px solid blue"
                    }}
                    onClick={handleClick}
                    name="allUsers"
                >
                    Все пользователи
                </button>
                <button
                    className="btn btn-light mx-2"
                    style={{
                        border: "1px solid blue"
                    }}
                    onClick={handleClick}
                    name="edit"
                >
                    Редактировать
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
