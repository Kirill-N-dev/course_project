import React from "react";
import Bookmark from "./bookmark";
import Qualities from "./qualities";
import PropTypes from "prop-types";

const User = (props) => {
    //
    return (
        <tr key={props._id}>
            <td>{props.name}</td>
            <td>
                <Qualities qualities={props.qualities} />
            </td>
            <td>{props.profession.name}</td>
            <td>{props.completedMeetings}</td>
            <td>{props.rate} /5</td>

            <td>
                <Bookmark
                    bookmarkSelected={props.bookmark}
                    id={props._id}
                    onClick={() => props.handleColorizer(props._id)}
                />
            </td>
            <td>
                <button
                    className="btn btn-danger"
                    onClick={() => props.handleDelete(props._id)}
                >
                    delete
                </button>
            </td>
        </tr>
    );
};

User.propTypes = {
    handleDelete: PropTypes.func.isRequired,
    handleColorizer: PropTypes.func.isRequired,
    _id: PropTypes.string.isRequired,
    bookmark: PropTypes.bool.isRequired,
    rate: PropTypes.number.isRequired,
    profession: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    qualities: PropTypes.array.isRequired,
    completedMeetings: PropTypes.number.isRequired
};

export default User;
