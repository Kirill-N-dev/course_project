import React, { useState, useEffect } from "react";
import TextField from "../common/form/textField";
import { validator } from "../../utils/validator";
import api from "../../api";
import SelectField from "../common/form/selectField";
import { MultiSelectField } from "./qualities";
import PropTypes from "prop-types";

import { useHistory } from "react-router-dom";

// qualities - все доступные качества юзеров, приходят асинхронно {{alc:{name:...}},{}...} obj values
// data - {} выбранного юзера (data.qualities - [{...name:...},{}...])

const UserEdit = ({ userId }) => {
    //
    const [data, setData] = useState({
        email: "",
        profession: "",
        name: ""
    });

    const history = useHistory();
    const [isLoading, setIsLoading] = useState(true);

    /*     const [data, setData] = useState({}); */
    const [qualities, setQualities] = useState([]);
    const [errorsObj, setErrors] = useState({});
    const [professions, setProfession] = useState([]);

    // Верхний запрос - юзера
    useEffect(() => {
        api.users.getById(userId).then((data) => {
            setData((prevState) => ({
                ...prevState,
                ...data,
                profession: data.profession._id,
                qualities: transformData(data.qualities)
            }));
        });
        api.professions.fetchAll().then((data) => {
            const professionsList = Object.keys(data).map((professionName) => ({
                label: data[professionName].name,
                value: data[professionName]._id
            }));
            setProfession(professionsList);
        });
        api.qualities.fetchAll().then((data) => {
            /*  console.log(data); */
            const qualitiesList = Object.keys(data).map((optionName) => ({
                label: data[optionName].name,
                value: data[optionName]._id,
                color: data[optionName].color
            }));
            setQualities(qualitiesList);
        });
    }, []);

    useEffect(() => {
        if (qualities.length && professions.length && data._id) {
            setIsLoading(false);
            /*  console.log(data); */
        } // это чтобы data не был undefined
    }, [qualities, professions, data]);

    // Непонятно зачем это?
    const transformData = (data) => {
        return data.map((i) => ({ value: i._id, label: i.name }));
    };

    // Скрыто для валидации только по сабмиту
    /*  useEffect(() => {
        validate(); // первое применение метода validate() - изменение стейта полей ввода
    }, [data]); */

    const handleChange = (target) => {
        setData((prevState) => ({ ...prevState, [target.name]: target.value }));
        /* console.log(target.name, target.value); */ // email bob007@tw.co
    };

    // Изменён, родной в формах
    const validatorConfig = {
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            },
            isEmail: { message: "Введите корректный email" }
        },
        name: {
            isRequired: {
                message: "Имя обязательно для заполения"
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
        return Object.keys(errors).length === 0;
    };

    // Надо для смены класса disabled у кнопки в самом низу, но ввиду отключения юсстейта это пока не работает
    /* const isValid = Object.keys(errorsObj).length === 0; */

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

    const handleSubmit = async (ev) => {
        ev.preventDefault();
        const isValid = validate();
        if (!isValid) return;

        const { profession, qualities } = data;

        await api.users.updateUsers(userId, {
            ...data,
            profession: getProfessionById(profession),
            qualities: getQualities(qualities)
        });
        history.goBack();
    };

    return (
        <div className="container mt-5">
            <div className="row">
                {!isLoading && (
                    <div className="col-md-6 offset-md-3 shadow p-4">
                        <h3>Изменение данных</h3>

                        <form onSubmit={handleSubmit}>
                            <TextField
                                label="Имя"
                                id="name"
                                name="name"
                                value={data.name}
                                onChange={handleChange}
                                error={errorsObj.name}
                            ></TextField>
                            <TextField
                                label="Почта"
                                id="email"
                                name="email"
                                value={data.email}
                                onChange={handleChange}
                                error={errorsObj.email}
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
                            <MultiSelectField
                                options={qualities}
                                onChange={handleChange}
                                name="qualities"
                                label="Select your qualities"
                                defaultValue={data.qualities}
                            />
                            <button
                                /* disabled={!isValid} */
                                className="btn btn-primary w-100 mx-auto"
                            >
                                Обновить
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};
// говорит  или текст пишут в теге энкор <a>лицсогл</a>

UserEdit.propTypes = {
    userId: PropTypes.string.isRequired
};

export default UserEdit;
