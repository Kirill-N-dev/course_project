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
    return (
        <>
            {qualitiesList.map((qual) => (
                <Quality key={qual._id} {...qual} />
            ))}
        </>
    );
};

QualitiesCard.propTypes = {
    qualities: PropTypes.array.isRequired
};

export default QualitiesCard;
