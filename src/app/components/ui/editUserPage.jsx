import React, { useState, useEffect } from "react";
import TextField from "../common/form/textField";
import { validator } from "../../utils/validator";
/* import api from "../../api"; */
import SelectField from "../common/form/selectField";
import { MultiSelectField } from "./qualities";
import PropTypes from "prop-types";

import { useHistory } from "react-router-dom";
import BackButton from "../common/backButton";
import { useUser } from "../../hooks/useUsers";
import { useProf } from "../../hooks/useProfession";
import { useQual } from "../../hooks/useQualities";
import { useAuth } from "../../hooks/useAuth";

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
    const [loading, setLoading] = useState(true);

    /*     const [data, setData] = useState({}); */
    /* const [qualities, setQualities] = useState([]); */
    const [errorsObj, setErrors] = useState({});
    /* const [professions, setProfession] = useState([]); */

    // Домашка, импорт из провайдеров и ФБ
    const { getUserById } = useUser();
    const { professions } = useProf();
    const { qualities } = useQual();
    const { currentUser, updateUser } = useAuth();

    // Домашка, комментирую
    // Верхний запрос - юзера
    /* useEffect(() => {
        api.users.getById(userId).then((data) => {
            setData((prevState) => ({
                ...prevState,
                ...data,
                profession: data.profession._id,
                qualities: transformData(data.qualities)
            }));
        });

        // Получение профессий для выбора на странице юзера
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
    }, []); */

    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

    // СТАРЫЙ КОД, НО ОТНОСИТСЯ К ДОМАШКЕ
    // Был баг, ниже качества, приходившие с ФБ, мутировались не туда, и приложение ломалось
    // Надо менять функцию qetQualities, чтобфы выдавала массив айдишников
    useEffect(() => {
        // ДОМАШКА, попытка сгенерировать правильную data
        // МАКС, ВОПРОС, ПРЕВСТЕЙТ И ДАТА ЭТО ЖЕ ОДНО И ТО ЖЕ В ДАННОМ СЛУЧАЕ? ЗАЧЕМ ДУБЛИРОВАТЬ?
        // profession: professions.filter(
        /* (p) => p._id === getUserById(userId).profession
            ).name, */
        // почему undefined???

        setData((prevState) => ({
            ...prevState,
            ...currentUser,

            profession: getProfessionById(userId),
            qualities: getQualities(currentUser.qualities)
        }));
        /* console.log(currentUser, 555); */
        //
        if (qualities.length && professions.length && data._id) {
            setLoading(false);
            /* console.log(data, professions, qualities, 1000); */ // ДОМАШКА: С ДАТОЙ ПРОБЛЕМЫ, ПУСТОЙ ОБЪЕКТ

            /* console.log(data, 888); */ // ДОМАШКА: теперь с датой ок
        }
        /* console.log(qualities, 999); */
        /* console.log(getUserById(userId), qualities); */
    }, [qualities, professions, currentUser]);

    // ДОМАШКА
    // Функция для форматирования качеств, чтобы работали дочерние компоненты
    const transformData = (data) => {
        return data.map((i) => ({
            value: i._id,
            label: i.name,
            color: i.color
        }));
    };

    // Скрыто для валидации только по сабмиту
    /*  useEffect(() => {
        validate(); // первое применение метода validate() - изменение стейта полей ввода
    }, [data]); */

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
        /* console.log(target.name, target.value); */ // email bob007@tw.co
        /* console.log(data, 555); */ // [], негодный к отправке на ФБ, но качества и прфоессии есть
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

    // ДОМАШКА, переделал, но на выходе объект. Вроде так и надо, посмотрю на выхлоп
    const getProfessionById = (id) => {
        for (const prof of professions) {
            if (prof._id === getUserById(id).profession) {
                return prof;
            }
        }
    };

    // ДОМАШКА, удачно изменил функцию
    // Добавил color, чтобы опшыны были цветными, но пока не реализовал
    // (НЕ СТОИЛО, ЛОМАЕТСЯ ВСЁ ПРИЛОЖЕНИЕ!!!) сейчас попытаюсь исправить саму updateUser
    const getQualities = (elements) => {
        const qualitiesArray = [];
        for (const elem of elements) {
            /* console.log(elem, 333); */ // ид типа стринг
            for (const quality of qualities) {
                /* console.log(qualities, 444); */ // [{_id,color,name},{},...]
                if (elem === quality._id) {
                    qualitiesArray.push({
                        value: quality._id,
                        label: quality.name,
                        color: quality.color
                    });
                }
            }
        }
        return qualitiesArray;
    };

    /* console.log(getQualities(currentUser.qualities), 555); */

    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

    // !!! ДОМАШКА, Я ТУТ !!! НЕ РЕШЕНО
    /*  console.log(data); */ // currentUser перед отправкой на БД (qualities profession should be only id's)
    const handleSubmit = async (ev) => {
        ev.preventDefault();

        /* console.log(data, 111); */ // ДОМАШКА: дата меняется, но не сабмитится, в сети пусто
        // Видимо проблема в формате отправки. А где его посмотреть - хрен знает.

        // Тут исковеркал, чтобы доделать домаху, надо будет допилить
        /*  const isValid = validate();
        if (!isValid) return; */
        let isValid;
        if (isValid === 1) validate();

        /* const { profession, qualities } = data;

         await api.users.update(userId, {
            ...data,
            profession: getProfessionById(profession),
            qualities: getQualities(qualities)
        }); */

        await updateUser(data); // сюда доходит, но там ошибка и поэтому код встаёт
        history.goBack();
    };

    // SelectField - options это {0:{value,label,color},1:{},...}

    return (
        <div className="container mt-5">
            <div className="row">
                {!loading && (
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
                                options={transformData(professions)}
                                defaultOption="Выберите..."
                                label="Choose your profession"
                                error={errorsObj.profession}
                                value={data.profession.name}
                                name="profession"
                            />
                            <MultiSelectField
                                options={transformData(qualities)}
                                onChange={handleChange}
                                name="qualities"
                                label="Select your qualities"
                                defaultValue={data.qualities}
                            />
                            <button
                                /* disabled={!isValid} */
                                className="btn btn-primary w-100 mx-auto mb-2"
                            >
                                Обновить
                            </button>
                            <BackButton />
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
