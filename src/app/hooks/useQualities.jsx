import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import qualitiesService from "../services/qualitiesService";

const QualitiesContext = React.createContext();

export const useQual = () => {
    return useContext(QualitiesContext);
};

// Кастомный хук, если верно
export const QualitiesProvider = ({ children }) => {
    //
    const [loading, setLoading] = useState(true);
    const [qualities, setQualities] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        getQualitiesList();
    }, []);

    useEffect(() => {
        if (error !== null) {
            toast(error);
            setError(null);
        }
    }, [error]);

    function errorCatcher(error) {
        const { message } = error.response.data;
        setError(message);
    }

    //
    function getTheQualities(id) {
        /* console.log(qualities, id, 444); */
        return qualities.find((p) => p._id === id);
    }

    // В этой ф-ии был неправильный импорт, в результате чего труднообнаруживаемый баг
    async function getQualitiesList() {
        //
        console.log(333333); // ДО СЮДА ДАЖЕ НЕ ДОХОДИТ, ПОЧЕМУ ЭТО НЕ ВЫЗЫВАЕТСЯ ЭФФЕКТОМ ВЫШЕ??????????????????????????????????
        try {
            const { content } = await qualitiesService.get();
            setQualities(content);
            console.log(content, 777); // домашка, качества приходят, но в editUserPage и Quality qualitiesCard проблемы
            // qualities будут [{_id, name, color},{},...}]
            setLoading(false);

            /* console.log(content, 888); */
            //
        } catch (error) {
            errorCatcher(error);
        }
    }
    // НИЖЕ КОСТЫЛЬ, ПОТОМ УДАЛИТЬ, НЕ ПОМОГЛО, ВИДНО ТУТ КАЧЕСТВА НЕ СТАВЯТСЯ
    if (qualities) {
        return (
            <QualitiesContext.Provider
                value={{ loading, qualities, getTheQualities }}
            >
                {children}
            </QualitiesContext.Provider>
        );
    }
};

QualitiesProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};
