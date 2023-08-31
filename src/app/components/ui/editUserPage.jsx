import React, { useState, useEffect } from "react";
import TextField from "../common/form/textField";
import { validator } from "../../utils/validator";
/* import api from "../../api"; */
import SelectField from "../common/form/selectField";
import { MultiSelectField } from "./qualities";
import PropTypes from "prop-types";

import { useHistory } from "react-router-dom";
import BackButton from "../common/backButton";
/* import { useUser } from "../../hooks/useUsers"; */
/* import { useProf } from "../../hooks/useProfession"; */
/* import { useQual } from "../../hooks/useQualities"; */
/* import { useAuth } from "../../hooks/useAuth"; */
import { useDispatch, useSelector } from "react-redux";
import { getQualities, getQualitiesLoadingStatus } from "../../store/qualities";
import {
    getProfessions,
    getProfessionsLoadingStatus
} from "../../store/professions";
import { getCurrentUserData, updateUser } from "../../store/users";

// qualities - все доступные качества юзеров, приходят асинхронно {{alc:{name:...}},{}...} obj values
// data - {} выбранного юзера (data.qualities - [{...name:...},{}...])

const UserEdit = ({ userId }) => {
    // СТЕЙТ КАРРЕНТ ЮЗЕРА ДЛЯ ЕГО ТРАНСФОРМАЦИИ ПОСЛЕ ПОЛУЧЕНИЯ С ФБ ДЛЯ ОТОБРАЖЕНИЯ КОНТЕНТА
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
    /* const { getUserById } = useUser(); */

    // Домашка, закомментил импорт из провайдера и перешёл на редакс
    // По идее лоадер профессий тут не нужен, так как при авторизации они уже есть
    /* const { professions } = useProf(); */
    const professions = useSelector(getProfessions());

    // Домашка, допил качеств: они изначально приходят в правильном формате:  [{_id, name, color},{},...}]

    // Закомментил в уроках по редаксу, качества теперь получаю запросом к стору, а это делается через хук
    /* const { qualities } = useQual(); */
    const qualities = useSelector(getQualities());
    /* console.log(qualities, 111); */

    // Лоадер из стора
    const qualitiesLoading = useSelector(getQualitiesLoadingStatus());
    const professionsLoading = useSelector(getProfessionsLoadingStatus());
    /* console.log(qualitiesLoading); */

    // Переезд на редакс, получение карентЮзера селектором\геттером + ДОМАШКА И АПДЕЙТЮЗЕР С ЮЗЕРС.ЖС
    /* const { currentUser, updateUser } = useAuth(); */
    /*   const { updateUser } = useAuth(); */
    const dispatch = useDispatch();
    const currentUser = useSelector(getCurrentUserData());
    /*     useEffect(() => console.log(data, currentUser, 12345), [data, currentUser]); */ // id

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

    // У автора в домашке код ниже немного отличается, в частности он импортировал все лоадинги и ставил их в зависимости ниже + data
    // Таки я переписал у автора, а точнее у Макса, потому что так более рационально, иначе было неправильно - не та зависимость от
    // каррентЮзера, или же, иначе, бесконечный ререндер, хоть и всё работало

    useEffect(() => {
        // ДОМАШКА, попытка сгенерировать правильную data
        // МАКС, ВОПРОС, ПРЕВСТЕЙТ И ДАТА ЭТО ЖЕ ОДНО И ТО ЖЕ В ДАННОМ СЛУЧАЕ? ЗАЧЕМ ДУБЛИРОВАТЬ?
        // profession: professions.filter(
        /* (p) => p._id === getUserById(userId).profession
            ).name, */
        // почему undefined???

        // ДАННЫЙ ЭФФЕКТ УСТАНАВЛИВАЕТ ДАННЫЕ КАРРЕНТЮЗЕРА В DATA, А ПОСЛЕДНЯЯ ИДЁТ В ЧЕЙНДЖ И САБМИТ
        setData((prevState) => ({
            ...prevState,
            ...currentUser

            // profession: getProfessionById(userId)
            /* qualities: getQualities(currentUser.qualities) */ // ВРОДЕ ВСЁ ОК, НО ДАТА-КВАЛИТИС КУДА-ТО ПРОПАДАЮТ
        }));
        /* console.log(currentUser.qualities); */ // доступны сразу, качества currentUser это ["id","id",...]
        // Тут все качества немного меняют структуру, теперь [{value,label,color},{},...]
        /* setTimeout(() => console.log(transformData(qualities), 333), 1000); */

        /* console.log(qualities, 999); */ // ОШИБКА ТУТ, КАЧЕСТВА АСИНХРОННЫ
        /* console.log(getUserById(userId), qualities); */
    }, []);

    useEffect(() => {
        // У меня было (qualities.length && professions.length && currentUser && data._id)
        if (!qualitiesLoading && !professionsLoading && currentUser && data) {
            setLoading(false);
        }
        /* console.log(data, professions, qualities, 1000); */ // ДОМАШКА: С ДАТОЙ ПРОБЛЕМЫ, ПУСТОЙ ОБЪЕКТ

        /* console.log(data, 888); */ // ДОМАШКА: теперь с датой ок, НО В QUALITIES ПУСТОЙ []
        // => НАДО УСТАНОВИТЬ КАЧЕСТВА В ФОРМАТЕ LABEL: "...", А ЭТО TRANSFORMDATA
    }, [qualitiesLoading, professionsLoading, data]);

    // Тест. Качества действительно появляются асинхронно, с лагом.
    /*   useEffect(() => {
        getTheQualities(userId);
    }, [qualities]); */

    // ДОМАШКА
    // Функция для форматирования качеств (для передачи в options SelectField-Select)
    const transformData = (data) => {
        /* console.log(data, 11); */ // data - [{ _id: "67rdca3eeb7f6fgeed471829", name: "Повар" }, {},...]
        // У автора по другому
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
    /* const getProfessionById = (id) => {
        for (const prof of professions) {
            if (prof._id === getUserById(id).profession) {
                return prof;
            }
        }
    }; */

    // ДОМАШКА, функция для получения правильного формата data
    // для передачи её самой в defaultValue
    // ПЕРЕИМЕНОВАЛ, ЧТОБЫ НЕ БЫЛО КОНФЛИКТА С РЕДАКСОВСКИМ ОДНОИМЁННЫМ СЕЛЕКТОРОМ
    const transformQualities = (elements = []) => {
        const qualitiesArray = [];
        /* console.log(qualities, 444222); */ // elements===qualities, пустые на первом рендере. Потом [id,id,...]
        for (const elem of elements) {
            for (const quality of qualities) {
                // console.log(qualities, 444); // [{_id,color,name},{},...] - ДОСТУПНЫ СРАЗУ
                if (elem === quality._id) {
                    qualitiesArray.push({
                        value: quality._id,
                        label: quality.name,
                        color: quality.color
                    });
                }
            }
        }
        // console.log(elements, qualitiesArray, 999);
        return qualitiesArray;
    };

    const handleChange = (target) => {
        /* console.log(data, 777); */ // разный формат даты на чендже и сабмите, имхо косяк, пока оставлю
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
        /* setTimeout(() => console.log(data, 555), 5000); */ // при выборе качеств информация никуда не сохраняется

        /* console.log(target.name, target.value); */ // email bob007@tw.co
        /* console.log(data, 555); */ // [], негодный к отправке на ФБ, но качества и прфоессии есть
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
    const handleSubmit = (ev) => {
        ev.preventDefault();

        /* console.log(data, 111); */ // ДОМАШКА: дата меняется, но не сабмитится, в сети пусто
        // Видимо проблема в формате отправки. А где его посмотреть - хрен знает.

        // Тут исковеркал, чтобы доделать домаху, надо будет допилить
        /* const isValid = validate();
        if (!isValid) return; */
        let isValid;
        if (isValid === 1) validate();

        /* const { profession, qualities } = data;

         await api.users.update(userId, {
            ...data,
            profession: getProfessionById(profession),
            qualities: getQualities(qualities)
        }); */

        // Вставил код из hChange, не знаю, верно ли?
        /* setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        })); */

        // Домашка, импорт апдейта из слайса, переезд на редакс и избавление от useAuth
        dispatch(updateUser(data));
        /* console.log("DATA AFTER SUBMIT goes to updateUser()", data); */ // разный формат даты на чендже и сабмите, имхо косяк, пока оставлю
        /* data === 5 && history.goBack(); */ // костыль для тестов
        history.goBack();
    };

    // SelectField - options это {0:{value,label,color},1:{},...}
    /* data === 5 && console.log(getQualities(data.qualities)); */
    /* console.log(data.qualities, 222); */ // data (currentUser) - qualities проблема, пустой [] (они асинхронны)
    /* console.log(currentUser.qualities, 333); */ // currentUser доступен сразу, вместе с его качествами [id,id,...]
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
                                value={data.profession}
                                name="profession"
                            />
                            <MultiSelectField
                                options={transformData(qualities)}
                                onChange={handleChange}
                                name="qualities"
                                label="Select your qualities"
                                defaultValue={transformQualities(
                                    data.qualities
                                )}
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
