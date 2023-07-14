import React, { useEffect, useState } from "react";
import SelectField from "../form/selectField";
import PropTypes from "prop-types";
import API from "../../../api";
import TextAreaField from "../form/textAreaField";
import { validator } from "../../../utils/validator";

const initialData = { userId: "", content: "" };

const AddCommentForm = ({ onSubmit }) => {
    //
    const [data, setData] = useState(initialData);
    const [users, setUsers] = useState({});
    const [errors, setErrors] = useState({});

    // ПРОБИТЬ - у автора пустой сетЮсерс
    useEffect(() => {
        API.users.fetchAll().then((us) => setUsers(us));
    }, []);

    // По фиксу попробовать поиграть с пропсом
    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const validatorConfig = {
        userIs: {
            isRequired: {
                message: "Выберите ваше имя"
            }
        },
        content: {
            isRequired: {
                message: "Напишите ваше сообщение"
            }
        }
    };

    const validate = () => {
        const errors = validator(data, validatorConfig);

        setErrors(errors);

        return Object.keys(errors).length === 0;
    };

    const clearForm = () => {
        setData(initialData);
        setErrors({});
    };

    const handleSubmit = (ev) => {
        ev.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        onSubmit(data);
        clearForm();
    };

    const arrayOfUsers =
        users &&
        Object.keys(users).map((userId) => ({
            label: users[userId].name,
            value: users[userId]._id
        }));
console.log(arrayOfUsers);
    return (
        <div>
            <h2>New comment</h2>
            <form onSubmit={handleSubmit}>
                <SelectField
                    onChange={handleChange}
                    options={arrayOfUsers}
                    name="userId"
                    value={data.userId}
                    defaultOption="Выберите пользователя"
                    error={errors.userId}
                />
                <TextAreaField
                    value={data.content}
                    onChange={handleChange}
                    name="content"
                    label="Сообщение"
                    error={errors.content}
                />
                <div className="d-flex justify-content-end">
                    <button className="btn btn-primary">Опубликовать</button>
                </div>
            </form>
        </div>
    );
};

AddCommentForm.propTypes = {
    onSubmit: PropTypes.func
};

export default AddCommentForm;
