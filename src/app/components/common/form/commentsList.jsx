import React, { useEffect, useState } from "react";
import Comment from "../../ui/comment";
import PropTypes from "prop-types";
import api from "../../../api";
import { idGen } from "../../../utils/idGen";

const CommentsList = ({ userId, tranceUser }) => {
    //

    /*
    Стейт и эффект для ассинхронного запроса юзеров не пишу, т.к по логике они уже в хранилище
    (момент нажатия на конкретного юзера происходит с юзерпаги со всеми подгруженными юзерами).

    Не создаю переиспользуемые селект и текстариа, чтобы проще - пишу вручную. И так чуть не свихнулся.

    Вся валидация реализована динамическим атрибутом дисаблед (и required у textarea)

    Я не использовал некоторые новые функции, потому что не понимаю, зачем они, так как сам пишу функционал

    Также аватарки обновляются при каждом рендере, даже когда заполняю формы. Пока забил на это, и так
    потратил ровно неделю на решение сего задания. Которое весьма сложно для новичка и сложно
    даже по меркам его автора (с его слов). Фил фри то рижект, если что, исправлю.

    Макс, вопрос - отправка форм клавишами это разве программируемые события? Я думал дефолт.
    Если программируемые, то кода ниже хватит, чтобы нельзя было отправить так пустой та или селект

    Вопрос 2 - в Комменте еслинт вынес мне мозг сообщением
    `"` can be escaped with `&quot;`, `&ldquo;`, `&#34;`, `&rdquo;`
    .
    Как эта хрень называется и где почитать? Я не нагуглил. Хочу увидеть таблицу с кратким описанием.
    В итоге поставил {" "}.
    */

    // Стейт и хэндлчейндж для дисабледа у кнопки и для валидации селект и текстариа
    const [textArea, setTextArea] = useState("");
    const [select, setSelect] = useState("");

    // Получение комментов текущего юзера ([{},{}...]) и его самого

    const [comments, setComments] = useState(false);

    useEffect(() => {
        api.comments
            .fetchCommentsForUser(userId)
            .then((comment) => setComments(comment));
    }, []);

    const handleChange = ({ target }) => {
        if (target.name === "textArea") {
            setTextArea(target.value);
        } else if (target.name === "select") {
            setSelect(target.value);
        }
        /* console.log(optionsArray); */
    };

    // Получаю объект юзеров с локалсториджа
    const options = JSON.parse(localStorage.getItem("users"));

    // Получение массива из options
    const optionsArray =
        !Array.isArray(options) && typeof options === "object"
            ? Object.values(options)
            : options;

    // Только обновление комментов в локалсторидже
    const handleSubmit = (ev) => {
        ev.preventDefault();
        const data = {
            _id: idGen(),
            pageId: userId,
            userId: optionsArray.filter((obj) => obj.name === select)[0]._id,
            content: textArea
        };
        api.comments.add(data).then(() => location.reload());
    };

    // Только удаление с последующим ререндером (тоже не знаю, верно ли?)
    const handleClick = (id) => {
        api.comments.remove(id).then(() => location.reload());
    };

    // Функция для сортировки массива объектов
    function compareNumeric(a, b) {
        if (+a.created_at > +b.created_at) return -1;
        if (+a.created_at === +b.created_at) return 0;
        if (+a.created_at < +b.created_at) return 1;
    }

    // Ниже убрал статические value, иначе выбор невозможен
    // ЧУТЬ НЕ СЛОМАЛ МОЗГ ПРИ ПОЛУЧЕНИИ ИМЕНИ, запрос получился синхронным, ассинхронным не удалось
    return (
        <>
            <div className="card mb-2">
                <div className="card-body ">
                    <h2>New comment</h2>
                    <div className="my-4">
                        <form onSubmit={handleSubmit}>
                            <select
                                className="form-select mb-4"
                                id="select"
                                name="select"
                                onChange={handleChange}
                                value={select}
                            >
                                <option value="" disabled>
                                    Выберите пользователя
                                </option>
                                {optionsArray.length > 0 &&
                                    optionsArray.map((option) => (
                                        <option
                                            value={option.name}
                                            key={option.name}
                                        >
                                            {option.name}
                                        </option>
                                    ))}
                            </select>

                            <div className="mb-3">
                                <label
                                    htmlFor="validationTextarea"
                                    className="form-label"
                                >
                                    Сообщение
                                </label>
                                <textarea
                                    className="form-control"
                                    id="validationTextarea"
                                    name="textArea"
                                    required
                                    rows="3"
                                    maxLength="500"
                                    value={textArea}
                                    onChange={handleChange}
                                ></textarea>
                            </div>

                            <div className="mb-3 text-center">
                                <button
                                    className="btn btn-primary"
                                    type="submit"
                                    name="submit"
                                    disabled={!textArea.trim() || !select}
                                >
                                    Опубликовать
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            {comments.length > 0 && optionsArray.length > 0 && tranceUser ? (
                <div className="card mb-3">
                    <div className="card-body ">
                        <h2>Comments</h2>
                        <hr />
                        {comments.sort(compareNumeric).map((comment) => {
                            return (
                                <Comment
                                    key={comment._id}
                                    name={
                                        JSON.parse(
                                            localStorage.getItem("users")
                                        ).filter(
                                            (obj) => obj._id === comment.userId
                                        )[0].name
                                    }
                                    date={comment.created_at}
                                    message={comment.content}
                                    onClick={() => handleClick(comment._id)}
                                ></Comment>
                            );
                        })}
                    </div>
                </div>
            ) : (
                false
            )}
        </>
    );
};

CommentsList.propTypes = {
    userId: PropTypes.string.isRequired,
    tranceUser: PropTypes.object.isRequired
};

export default CommentsList;
