import React from "react";
import PropTypes from "prop-types";
import { dater } from "../../../utils/dater";
import { useUser } from "../../../hooks/useUsers";
import { useAuth } from "../../../hooks/useAuth";
/* import api from "../../../api"; */
/* import _ from "lodash"; */

const Comment = ({
    content,
    created_at: created,
    _id: id,
    userId,
    onDelete
}) => {
    // Получение юзера
    const { getUserById } = useUser();
    const { currentUser } = useAuth();
    const user = getUserById(userId);
    /* const [loading, setLoading] = useState(false); */

    /* useEffect(() => {
        setLoading(true);
        api.users.getById(userId).then((user) => {
            setUser(user);
            setLoading(false);
        });
    }, []); */

    return (
        <div className="bg-light card-body  mb-3">
            <div className="row">
                {
                    <div className="col">
                        <div className="d-flex flex-start ">
                            <img
                                src={user.image}
                                className="rounded-circle shadow-1-strong me-3"
                                alt="avatar"
                                width="65"
                                height="65"
                            />
                            <div className="flex-grow-1 flex-shrink-1">
                                <div className="mb-4">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <p className="mb-1 ">
                                            {user && user.name}
                                            <span className="small">
                                                {" "}
                                                - {dater(created)}
                                            </span>
                                        </p>
                                        {currentUser._id === userId && (
                                            <button
                                                className="btn btn-sm text-primary d-flex align-items-center"
                                                onClick={() => onDelete(id)}
                                            >
                                                <i className="bi bi-x-lg"></i>
                                            </button>
                                        )}
                                    </div>
                                    <p className="small mb-0"> {content}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
};

Comment.propTypes = {
    content: PropTypes.string,
    edited_at: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    created_at: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    userId: PropTypes.string,
    onDelete: PropTypes.func,
    _id: PropTypes.string
};

export default Comment;
