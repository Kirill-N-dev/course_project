import React from "react";
import PropTypes from "prop-types";
/* import api from "../../../api"; */
import UserCard from "../../ui/userCard";
import QualitiesCard from "../../ui/qualities/qualitiesCard";
import MeetingsCard from "../../ui/meetingsCard";
import Comments from "../../ui/comments";
import { useUser } from "../../../hooks/useUsers";
import { CommentsProvider } from "../../../hooks/useComments";

const UserPage = ({ userId }) => {
    // Это страница конкретного юзера
    // Комментится для ухода от фейк апи
    /* const [user, setUser] = useState();

    useEffect(() => {
        api.users.getById(userId).then((data) => setUser(data));
    }, []);
 */
    /*     console.log(userId, 111111); */ // id левые

    const { getUserById } = useUser();
    const user = getUserById(userId);

    if (user) {
        return (
            <div className="container">
                <div className="row gutters-sm">
                    <div className="col-md-4 mb-3">
                        <UserCard user={user} />
                        <QualitiesCard qualities={user.qualities} />
                        <MeetingsCard value={user.completedMeetings} />
                    </div>
                    <div className="col-md-8">
                        <CommentsProvider>
                            <Comments />
                        </CommentsProvider>
                    </div>
                </div>
            </div>
        );
    } else {
        return <h1>Loading!!</h1>;
    }
};

UserPage.propTypes = {
    userId: PropTypes.string.isRequired
};

export default UserPage;
