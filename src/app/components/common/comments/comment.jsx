import React /* useEffect */ from "react";
import PropTypes from "prop-types";
import { dater } from "../../../utils/dater";
/* import { useUser } from "../../../hooks/useUsers"; */
/* import { useAuth } from "../../../hooks/useAuth"; */
import { useSelector } from "react-redux";
import { getCurrentUserId, getUserById } from "../../../store/users";
/* import api from "../../../api"; */
/* import _ from "lodash"; */

const Comment = ({
    content,
    created_at: created,
    _id: id,
    userId,
    onDelete,
    pageId
}) => {
    // id of each comment
    /* console.log(id); */

    // Получение юзера (закомментил), переход на редакс
    /*     const { getUserById } = useUser(); */
    const user = useSelector(getUserById(userId));

    /* console.log(user, 888); */
    /* Object { _id: "RTi6CN9bpUejT8w3uiVAFoSABvu1", completedMeetings: 69, email: "1122222221@2.3",
    image: "https://avatars.dicebear.com/api/avataaars/a3fb3.svg", license: true, name: "ДЯДЯ ПЕТЯ ПАРОЛЬ GGGG6666",
    profession: "67rdca3eeb7f6fgeed471820", qualities: (1) [67rdca3eeb7f6fgeed471102], rate: 3, sex: "male" } */

    // Переезд на редакс
    /* const { currentUser } = useAuth(); */
    const currentUserId = useSelector(getCurrentUserId());

    /* const user = getUserById(userId); */
    /* const [loading, setLoading] = useState(false); */

    /* useEffect(() => {
        setLoading(true);
        api.users.getById(userId).then((user) => {
            setUser(user);
            setLoading(false);
        });
    }, []); */
    if (!user) return null;
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
                                        {currentUserId === userId && (
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
    _id: PropTypes.string,
    pageId: PropTypes.string
};

export default Comment;
