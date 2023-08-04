import React from "react";
import Comment from "./comment";
import PropTypes from "prop-types";

const CommentsList = ({ sortedComments, onDelete }) => {
    // коммент запропсил по своему
    /*  console.log(sortedComments, 666); */
    return sortedComments.map((comment) => (
        <Comment key={comment._id} {...comment} onDelete={onDelete} />
    ));
};

CommentsList.propTypes = {
    sortedComments: PropTypes.array.isRequired,
    onDelete: PropTypes.func
};

export default CommentsList;
