import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router";
/* import { useAuth } from "./useAuth"; */
/* import { idGen } from "../utils/idGen"; */
import { nanoid } from "nanoid";
import commentService from "../services/commentService";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getCurrentUserId } from "../store/users";

// Почти копипаста с юсПрофешн

const CommentsContext = React.createContext();

export const useComments = () => {
    return useContext(CommentsContext);
};

export const CommentsProvider = ({ children }) => {
    //
    const [loading, setLoading] = useState(true);
    const [comments, setComments] = useState([]);
    const [error, setError] = useState(null);

    const { userId } = useParams();

    // Переезд на редакс
    /* const { currentUser } = useAuth(); */
    const currentUserId = useSelector(getCurrentUserId());

    // Чтобы не было ошибок, использую часть кода впустую
    useEffect(() => {
        getComments();
        /* console.log(loading, error); */
    }, [userId]);

    useEffect(() => {
        if (error !== null) {
            toast(error);
            setError(null);
        }
    }, [error]);

    function errorCatcher(error) {
        const { message } = error.response.data;
        setError(message);
    }

    async function createComment(data) {
        /* console.log(data, 333); */ // у автора нет userId, Но у меня есть, странно, и я не пишу часть его кода
        const comment = {
            ...data,
            pageId: userId,
            created_at: Date.now(),
            userId: currentUserId,
            _id: nanoid()
        };
        console.log(comment, 333);
        try {
            const { content } = await commentService.createComment(comment);
            console.log(comments, 111);
            // Новое, для вывода коммента
            setComments((prevState) => [...prevState, content]); // У АВТОРА ВСЁ ВЕРНО, А Я НАКОСЯЧИЛ
        } catch (error) {
            errorCatcher(error);
        }
    }

    async function getComments() {
        try {
            const { content } = await commentService.getComments(userId);
            setComments(content);
        } catch (error) {
            errorCatcher(error);
        } finally {
            setLoading(false);
        }
    }

    async function deleteComment(id) {
        try {
            const { content } = await commentService.deleteComment(id);
            /* console.log(content, 345); */
            // Видимо тут что-то не так
            if (content === null) {
                setComments((prevState) => {
                    /* console.log(prevState, 555); */
                    return prevState.filter((comment) => comment._id !== id);
                });
            }
        } catch (error) {
            errorCatcher(error);
        }
    }

    return (
        <CommentsContext.Provider
            value={{
                comments,
                createComment,
                getComments,
                deleteComment,
                loading
            }}
        >
            {children}
        </CommentsContext.Provider>
    );
};

CommentsProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};
