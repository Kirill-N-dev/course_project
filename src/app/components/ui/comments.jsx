import React, { useEffect } from "react";
/* import api from "../../api"; */
/* import { idGen } from "../../../utils/idGen"; */
/* import { useParams } from "react-router"; */
import { orderBy } from "lodash";
import CommentsList from "../common/comments/commentsList";
import AddCommentForm from "../common/comments/addCommentForm";
/* import { useComments } from "../../hooks/useComments"; */
import { useDispatch, useSelector } from "react-redux";
import {
    createComment,
    deleteComment,
    getComments,
    getCommentsLoadingStatus,
    loadCommentsList
} from "../../store/comments";
import { useParams } from "react-router";
/* import { getCurrentUserId } from "../../store/users"; */

const Comments = () => {
    /*
    Всё переписал. Так проще. Нет времени самому, но эти вещи я понимаю.

    Макс, вопрос - отправка форм клавишами это разве программируемые события? Я думал дефолт.
    Если программируемые, то кода ниже хватит, чтобы нельзя было отправить так пустой та или селект

    Вопрос 2 - в Комменте еслинт вынес мне мозг сообщением
    `"` can be escaped with `&quot;`, `&ldquo;`, `&#34;`, `&rdquo;`
    .
    Как эта хрень называется и где почитать? Я не нагуглил. Хочу увидеть таблицу с кратким описанием.
    В итоге поставил {" "}.
    */

    // id берётся из текущего адреса (путя)
    const { userId } = useParams();

    // Получение комментов текущего юзера ([{},{}...])
    /* const [comments, setComments] = useState([]); */
    // Как понял, userId это айди юзера, на страницу которог осмотрим, а не каррентЮзера
    /* const { userId } = useParams(); */
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadCommentsList(userId));
    }, [userId]);

    const isLoading = useSelector(getCommentsLoadingStatus());
    // Автор удалил getComments
    // Домаха, теперь эти методы с изменениями переехали в comments.js
    /* const { createComment, deleteComment } = useComments(); */
    /*  const { deleteComment } = useComments(); */

    const comments = useSelector(getComments());

    /*     useEffect(() => {
        api.comments
            .fetchCommentsForUser(userId)
            .then((comment) => setComments(comment));
    }, []); */

    // У автора передана только дата
    const handleSubmit = (data) => {
        /* api.comments
            .add({ ...data, pageId: userId })
            .then((data) => setComments([...comments, data])); */

        /* console.log(data, 999); */
        // data = Object { content: "ддд", pageId: "KlQ8DFBRG2dEbaEJI1e1bT488bZ2", userId: "RTi6CN9bpUejT8w3uiVAFoSABvu1" }

        dispatch(createComment(data));
        /* getComments(); */ // !!!
    };

    const handleDelete = (id) => {
        /* api.comments
            .remove(id)
            .then((id) => setComments(comments.filter((x) => x._id !== id))); */
        /* console.log(id); */
        // выводится id коммента
        dispatch(deleteComment(id));
    };

    const sortedComments = orderBy(comments, ["created_at"], ["desc"]);

    /* console.log(sortedComments, 12345); */
    /* ЭТО МАССИВ ОБЪЕКТОВ ТИПА
    {_id: "4Fyg7AriqkVr0YcKm7FlT";
    content: "ддд";
    created_at: 1693418837701;
    pageId: "KlQ8DFBRG2dEbaEJI1e1bT488bZ2";
    userId: "RTi6CN9bpUejT8w3uiVAFoSABvu1";} */
    if (!sortedComments) return null;
    return (
        <>
            <div className="card mb-2">
                <div className="card-body ">
                    <AddCommentForm onSubmit={handleSubmit} />
                </div>
            </div>
            {sortedComments.length > 0 && (
                <div className="card mb-3">
                    <div className="card-body ">
                        <h2>Comments</h2>
                        <hr />
                        {!isLoading ? (
                            <CommentsList
                                sortedComments={sortedComments}
                                onDelete={handleDelete}
                            />
                        ) : (
                            "Loading from comments.jsx"
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default Comments;
