import React from "react";
import Comment from "./comment";
import PropTypes from "prop-types";

const CommentsList = ({ sortedComments, onDelete }) => {
    /* ЭТО МАССИВ ОБЪЕКТОВ ТИПА
    {_id: "4Fyg7AriqkVr0YcKm7FlT";
    content: "ддд";
    created_at: 1693418837701;
    pageId: "KlQ8DFBRG2dEbaEJI1e1bT488bZ2";
    userId: "RTi6CN9bpUejT8w3uiVAFoSABvu1";} */

    return sortedComments.map((comment) => (
        <Comment key={comment._id} {...comment} onDelete={onDelete} />
    ));
};

CommentsList.propTypes = {
    sortedComments: PropTypes.array.isRequired,
    onDelete: PropTypes.func
};

export default CommentsList;
