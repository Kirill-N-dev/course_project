import React, { useEffect, useState } from "react";
import api from "../../api";
/* import { idGen } from "../../../utils/idGen"; */
import { useParams } from "react-router";
import { orderBy } from "lodash";
import CommentsList from "../common/comments/commentsList";
import AddCommentForm from "../common/comments/addCommentForm";

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
    const [comments, setComments] = useState([]);

    useEffect(() => {
        api.comments
            .fetchCommentsForUser(userId)
            .then((comment) => setComments(comment));
    }, []);

    // У автора передана только дата
    const handleSubmit = (data) => {
               api.comments
            .add({ ...data, pageId: userId })
            .then((data) => setComments([...comments, data]));
    };

    const handleDelete = (id) => {
        api.comments
            .remove(id)
            .then((id) => setComments(comments.filter((x) => x._id !== id)));
    };

    const sortedComments = orderBy(comments, ["created_at"], ["desc"]);

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
                        <CommentsList
                            sortedComments={sortedComments}
                            onDelete={handleDelete}
                        />
                    </div>
                </div>
            )}
        </>
    );
};

export default Comments;
