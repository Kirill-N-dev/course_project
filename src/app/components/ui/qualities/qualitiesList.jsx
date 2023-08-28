import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Quality from "./quality";
/* import { useQual } from "../../../hooks/useQualities"; */
import {
    getQualitiesByIds,
    getQualitiesLoadingStatus,
    loadQualitiesList
} from "../../../store/qualities";
import { useDispatch, useSelector } from "react-redux";

const QualitiesCard = ({ qualities }) => {
    // qualities - string id
    /* console.log("qualitiesList.jsx, qualities: ", qualities); */ // Н Е  Д О Х О Д И Т, UNDEFINED
    // Неделя внедрения редакса, получаю лоадер качеств из стора
    /* const { loading } = useQual(); */
    const qualitiesLoading = useSelector(getQualitiesLoadingStatus());
    if (qualitiesLoading) return "Loading";
    const qualitiesList = useSelector(getQualitiesByIds(qualities));

    // Актуализация данных:
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadQualitiesList());
    }, []);

    /* console.log(qualities, 555); */ // качества есть - ЭТО [АЙДИШНИКИ]
    // ОБНАРУЖИЛ ПРОБЛЕМУ, ЕСЛИ БРАТЬ НОВЫЙ ЛОДЕР, ТО КАЧЕСТВА НЕ УСПЕВАЮТ ЗАГРУЗИТЬСЯ, И ОШИБКА РЕНДЕРА
    // ТУТ БАГ, ПОЧЕМУ-ТО ТАКОЙ ФИЛЬТР НЕ РАБОТАЕТ (ПОСЛЕ НЕОПРЕДЕЛЁННЫХ ИЗМЕНЕНИЙ КОДА)
    if (qualities && qualitiesList) {
        return (
            <>
                {qualitiesList.map((qual) => (
                    <Quality key={qual._id} {...qual} />
                ))}
            </>
        );
    }
};

// Качества получаются асинхронно, потому убрал required
QualitiesCard.propTypes = {
    qualities: PropTypes.array
};

export default QualitiesCard;
