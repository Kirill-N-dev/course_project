import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Qualities } from "../../ui/qualities";
import { useHistory } from "react-router-dom";
import api from "../../../api";
import CommentsList from "../../common/form/commentsList";
/* import CardWrapper from "../../common/card"; */

const UserCard = ({ userId }) => {
    //
    const history = useHistory();
    const [user, getUserById] = useState();
    useEffect(() => {
        api.users.getById(userId).then((usr) => getUserById(usr));
        /* console.log(user); */
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
            <div className="container">
                <div className="row gutters-sm">
                    <div className="col-md-4 mb-3">
                        <div className="card mb-3">
                            <div className="card-body">
                                <button
                                    className="position-absolute top-0 end-0 btn btn-link"
                                    onClick={handleClick}
                                    name="edit"
                                    style={{
                                        position: "absolute",
                                        right: 15,
                                        top: 10,
                                        cursor: "pointer",
                                        zIndex: 2
                                    }}
                                >
                                    <i className="bi bi-gear"></i>
                                </button>
                                <div className="d-flex flex-column align-items-center text-center position-relative">
                                    <img
                                        src={`https://avatars.dicebear.com/api/avataaars/${(
                                            Math.random() + 1
                                        )
                                            .toString(36)
                                            .substring(7)}.svg`}
                                        className="rounded-circle shadow-1-strong me-3"
                                        alt="avatar"
                                        width="150"
                                        height="150"
                                    />
                                    <div className="mt-3">
                                        <h4>{user.name}</h4>
                                        <p className="text-secondary mb-1">
                                            {user.profession.name}
                                        </p>
                                        <div className="text-muted">
                                            <i
                                                className="bi bi-caret-down-fill text-primary"
                                                role="button"
                                            ></i>
                                            <i
                                                className="bi bi-caret-up text-secondary"
                                                role="button"
                                            ></i>
                                            <span className="ms-2">
                                                {user.rate}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="card mb-3">
                            <div className="card-body d-flex flex-column justify-content-center text-center">
                                <h5 className="card-title">
                                    <span>Qualities</span>
                                </h5>
                                <p className="card-text">
                                    <Qualities qualities={user.qualities} />
                                </p>
                            </div>
                        </div>

                        <div className="card mb-3">
                            <div className="card-body d-flex flex-column justify-content-center text-center">
                                <h5 className="card-title">
                                    <span>Completed meetings</span>
                                </h5>

                                <h1 className="display-1">
                                    {user.completedMeetings}
                                </h1>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-8">
                        <CommentsList
                            userId={userId}
                            tranceUser={user}
                        ></CommentsList>
                    </div>
                </div>
            </div>

            // --------------------------------------------------------
        );
    } else {
        return <h1>Loading</h1>;
    }
};

UserCard.propTypes = {
    userId: PropTypes.string.isRequired
};

export default UserCard;
