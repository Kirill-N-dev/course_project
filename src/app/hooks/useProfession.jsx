import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import professionService from "../services/professionService";

const ProfessionContext = React.createContext();

export const useProf = () => {
    return useContext(ProfessionContext);
};

export const ProfessionProvider = ({ children }) => {
    //
    const [loading, setLoading] = useState(true);
    const [professions, setProfessions] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        getProfessionsList();
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

    function getProfession(id) {
        return professions.find((p) => p._id === id);
    }

    async function getProfessionsList() {
        try {
            const { content } = await professionService.get();
            setProfessions(content);
            setLoading(false);
        } catch (error) {
            errorCatcher(error);
        }
    }

    // Ниже сделал сам. Kод автора ныне выдаёт ошикби в браузере.
    // Макс, вопрос, как парвильно это писать? Видимо из-за нескольких роутов возникают ошибки в браузере.
    return (
        <ProfessionContext.Provider
            value={{ loading, professions, getProfession }}
        >
            {children}
        </ProfessionContext.Provider>
    );
};

ProfessionProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};
