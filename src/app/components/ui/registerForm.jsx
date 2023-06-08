import React, { useState, useEffect } from "react";
import TextField from "../common/form/textField";
import { validator } from "../../utils/validator";
import api from "../../api";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import MultiSelectField from "./qualities/multiSelectField";
import CheckBoxField from "../common/form/checkBoxField";

const RegisterForm = () => {
    const [data, setData] = useState({
        email: "",
        password: "",
        profession: "",
        sex: "male",
        qualities: [],
        license: false
    });
    const [qualities, setQualities] = useState([]);
    const [errorsObj, setErrors] = useState({});
    const [professions, setProfession] = useState({}); // {} пофиксил сам
    /* useEffect(() => {
        api.professions.fetchAll().then((data) => setProfession(data));
        api.qualities.fetchAll().then((data) => setQualities(data));
    }, []); */
    useEffect(() => {
        api.professions.fetchAll().then((data) => {
            const professionsList = Object.keys(data).map((professionName) => ({
                label: data[professionName].name,
                value: data[professionName]._id
            }));
            setProfession(professionsList);
        });
        api.qualities.fetchAll().then((data) => {
            const qualitiesList = Object.keys(data).map((optionName) => ({
                label: data[optionName].name,
                value: data[optionName]._id,
                color: data[optionName].color
            }));
            setQualities(qualitiesList);
        });
    }, []);

    // Скрыто для валидации только по сабмиту
    /*  useEffect(() => {
        validate(); // первое применение метода validate() - изменение стейта полей ввода
    }, [data]); */

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
            },
            profession: {
                isRequired: { message: "Выбор профессии обязателен" }
            }
        },
        license: {
            isRequired: {
                message:
                    "Вы не можете использовать сервис без принятия лицензионного соглашения"
            }
        },
        profession: {
            isRequired: {
                message: "Обязательно выберите профессию"
            }
        }
    };

    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0; // bool errors
    };

    // Надо для смены класса disabled у кнопки в самом низу, но ввиду отключения юсстейта это пока не работает
    /*     const isValid = Object.keys(errorsObj).length === 0; */

    /*  const handleSubmit = (ev) => {
        ev.preventDefault();
        const isValid = validate(); // второе применение метода validate() - перед отправкой формы
        if (!isValid) return false; // если есть ошибки, отправки формы не будет
        console.log("отправлено");
    }; */

    const getProfessionById = (id) => {
        for (const prof of professions) {
            if (prof.value === id) {
                return { _id: prof.value, name: prof.label };
            }
        }
    };
    const getQualities = (elements) => {
        const qualitiesArray = [];
        for (const elem of elements) {
            for (const quality in qualities) {
                if (elem.value === qualities[quality].value) {
                    qualitiesArray.push({
                        _id: qualities[quality].value,
                        name: qualities[quality].label,
                        color: qualities[quality].color
                    });
                }
            }
        }
        return qualitiesArray;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        const { profession, qualities } = data;
        console.log({
            ...data,
            profession: getProfessionById(profession),
            qualities: getQualities(qualities)
        });
    };

    return (
        <form onSubmit={handleSubmit}>
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
            <SelectField
                onChange={handleChange}
                options={professions}
                defaultOption="Выберите..."
                label="Choosee your profession"
                error={errorsObj.profession}
                value={data.profession}
                name="profession"
            />
            <RadioField
                options={[
                    { name: "Male", value: "male" },
                    { name: "Female", value: "female" },
                    { name: "Undefined", value: "undefined" },
                    { name: "Null", value: "null" }
                ]}
                name="sex"
                onChange={handleChange}
                value={data.sex}
                label="Select your sex"
            />
            <MultiSelectField
                options={qualities} // изменил с ...Лист
                onChange={handleChange}
                name="qualities"
                label="Select your qualities"
                defaultValue={data.qualities}
            />
            <CheckBoxField
                name="license"
                value={data.license}
                onChange={handleChange}
                error={errorsObj.license}
            >
                Подтвердить лицензионное соглашение
            </CheckBoxField>
            <button
                /*  disabled={!isValid} */
                className="btn btn-primary w-100 mx-auto"
            >
                Отправить
            </button>
        </form>
    );
};
// говорит  или текст пишут в теге энкор <a>лицсогл</a>

export default RegisterForm;
