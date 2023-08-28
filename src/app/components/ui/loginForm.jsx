import React, { useState } from "react";
import TextField from "../common/form/textField";
import { validator } from "../../utils/validator";
import CheckBoxField from "../common/form/checkBoxField";
/* import { useAuth } from "../../hooks/useAuth"; */
/* import { useHistory } from "react-router"; */
import { useDispatch } from "react-redux";
import { logIn } from "../../store/users";
import history from "../../utils/history";
/* import * as yup from "yup"; */

const LoginForm = () => {
    //
    const [data, setData] = useState({
        email: "",
        password: "",
        stayOn: false
    });
    //
    const [errorsObj, setErrors] = useState({});
    //

    // Скрыл, чтобы валидация была лишь на сабмите
    /*   useEffect(() => {
        validate(); // первое применение метода validate() - изменение стейта полей ввода
    }, [data]); */

    // ДЛЯ ДОМАШККИ, ПРОВЕДЕНИЕ ПРОПСА ЧЕРЕЗ КАСТОМНЫЙ ХУК
    // комментирую, переезд на редакс + СТРАННО, ЧТО ИСТОРИЮ ОПЯТЬ БЕРЁТ ИЗ ХУКА, КОГДА ОНА ЕСТЬ В НОВОМ РОУТЕ.
    /* const { logIn } = useAuth(); */
    /* const history = useHistory(); */
    /* console.log(history); */

    const dispatch = useDispatch();

    // Из урока ФБ 12 Переадресация после входа:
    /* console.log(history.location.state.from, 999888777); */
    const handleChange = (target) => {
        setData((prevState) => ({ ...prevState, [target.name]: target.value }));
    };

    const validatorConfig = {
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            },
            isEmail: { message: "Введите корректный email" }
        },
        password: {
            isRequired: {
                message: "Пароль обязателен для заполнения"
            },
            isCapitalSymbol: {
                message: "Пароль должен содержать хотя бы одну заглавную букву"
            },
            isContainDigit: {
                message: "Пароль должен содержать хотя бы одну цифру"
            },
            min: {
                message: `Пароль должен содержать от 8 символов`,
                value: 8
            }
        }
    };

    //

    /* const validateScheme = yup.object().shape({
        password: yup
            .string()
            .required("Пароль обязателен")
            .matches(/(?=.*[A-Z])/, "Пароль должен иметь заглавную букву")
            .matches(/(?=.*[0-9])/, "Пасс должет иметь число")
            .matches(/(?=.*[!@#$%^&*])/, "Пасс должен иметь один спецсимвол")
            .matches(/(?=.{8,})/, "Пароль имеет от 8 символов"),
        email: yup
            .string()
            .required("Надо ввести эмэил")
            .email("почта введена неверно")
    }); */

    //

    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        /* validateScheme
            .validate(data)
            .then(() => {
                setErrors({});
            })
            .catch((err) => setErrors({ [err.path]: err.message })); */
        return Object.keys(errors).length === 0; // bool errors
    };

    // Надо для смены класса disabled у кнопки в самом низу, но ввиду отключения юсстейта это пока не работает
    /* const isValid = Object.keys(errorsObj).length === 0; */

    // Переезд на редакс, убираем async await и try catch
    const handleSubmit = (ev) => {
        ev.preventDefault();
        const isValid = validate(); // второе применение метода validate() - перед отправкой формы
        if (!isValid) return false; // если есть ошибки, отправки формы не будет

        let redirect;
        if (history.location.state) {
            redirect = history.location.state.from;
        } else {
            redirect = "/";
        }

        dispatch(logIn({ payload: data, redirect }));
    };

    return (
        <form className="" onSubmit={handleSubmit}>
            <TextField
                label="Почта"
                id="email"
                name="email"
                value={data.email}
                onChange={handleChange}
                error={errorsObj.email}
            ></TextField>
            <TextField
                label="Пароль"
                type="password"
                id="password"
                name="password"
                value={data.password}
                onChange={handleChange}
                error={errorsObj.password}
            ></TextField>
            <CheckBoxField
                name="stayOn"
                value={data.stayOn}
                onChange={handleChange}
            >
                Оставаться в системе
            </CheckBoxField>
            <button
                /*   disabled={!isValid} */
                className="btn btn-primary w-100 mx-auto"
            >
                Отправить
            </button>
        </form>
    );
};

LoginForm.propTypes = {};

export default LoginForm;
