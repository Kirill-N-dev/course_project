import React, { useState /* useEffect */ } from "react";
import TextField from "../common/form/textField";
import { validator } from "../../utils/validator";
/* import api from "../../api"; */
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import MultiSelectField from "./qualities/multiSelectField";
import CheckBoxField from "../common/form/checkBoxField";
/* import { useQual } from "../../hooks/useQualities"; */
/* import { useProf } from "../../hooks/useProfession"; */
/* import { useAuth } from "../../hooks/useAuth"; */
/* import { useHistory } from "react-router"; */
import { getQualities } from "../../store/qualities";
import { useDispatch, useSelector } from "react-redux";
import { getProfessions } from "../../store/professions";
import { signUp } from "../../store/users";

const RegisterForm = () => {
    const [data, setData] = useState({
        email: "",
        name: "",
        password: "",
        profession: "",
        sex: "male",
        qualities: [],
        license: false
    });

    // Код ниже заменяется кастомными хуками, и качества с профессиями теперь берутся с ФБ
    /*  const [qualities, setQualities] = useState([]);
    const [professions, setProfession] = useState({}); */

    // Первая строка с запила урока "метод Signup"
    // Переезд на редакс, уход от useAuth, функционал в users.js, комментирую
    /* const { signUp } = useAuth(); */

    // Закомментил для получения качеств  из стора, неделя внедрения редакса в ФК
    /* const { qualities } = useQual(); */
    const qualities = useSelector(getQualities());

    // Домашка, уход от стейта к редаксу, комментирую
    /* const { professions } = useProf(); */
    const professions = useSelector(getProfessions());

    const [errorsObj, setErrors] = useState({});

    // Переезд ФК на редакс, комментирую + добавляю диспатч
    /*     const history = useHistory(); */
    const dispatch = useDispatch();

    // ПОЗДНЕЙШАЯ ПРАВКА КВАЛИТИС ДЛЯ ПЕРЕДАЧИ В МУЛЬТИСЕЛЕКТФИЛД (ВЫВОД КАЧЕСТВ):
    const qualitiesList = qualities.map((q) => ({
        label: q.name,
        value: q._id
    }));

    // ПОЗДНЕЙШАЯ ПРАВКА ПРОФЕШНС ДЛЯ ПЕРЕДАЧИ В МУЛЬТИСЕЛЕКТФИЛД (ВЫВОД КАЧЕСТВ):
    const professionsList = professions.map((q) => ({
        label: q.name,
        value: q._id
    }));

    // Проверка прихода данных с ФБ (ошибка с ключами)
    /* useEffect(() => {
        console.log(professions, 4321);
    }, [professions]); */

    /* useEffect(() => {
        api.professions.fetchAll().then((data) => setProfession(data));
        api.qualities.fetchAll().then((data) => setQualities(data));
    }, []); */

    // Код ниже заменяется кастомными хуками, и качества с профессиями теперь берутся с ФБ
    /* useEffect(() => {
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
        name: {
            isRequired: {
                message: "Обязательно введите своё имя"
            },
            min: {
                message: `Имя должно содержать более 2 символов, китаец не пройдёт`,
                value: 3
            }
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
            // Кажись лишнее
            /* profession: {
                isRequired: { message: "Выбор профессии обязателен" }
            } */
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

    // Закомментил, так как в уроках по ФБ это не надо в консоль ниже
    /*  const getProfessionById = (id) => {
        for (const prof of professions) {
            if (prof.value === id) {
                return { _id: prof.value, name: prof.label };
            }
        }
    }; */

    // Закомментил, так как в уроках по ФБ это не надо в консоль ниже
    /* const getQualities = (elements) => {
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
    }; */

    // Передал ньюдату с урока по методу Сайнап
    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        /* const { profession, qualities } = data; */
        const newData = {
            ...data,
            qualities: data.qualities.map((q) => q.value)
        };

        dispatch(signUp(newData));
    };

    // Квалитис были поправлены выше в квалитисЛист, для правильного формата
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
                label="Имя"
                name="name"
                value={data.name}
                onChange={handleChange}
                error={errorsObj.name}
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
                options={professionsList}
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
                options={qualitiesList} // изменил с ...Лист (а потом обратно, на уроках по ФБ)
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
