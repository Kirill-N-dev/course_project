import React from "react";
import PropTypes from "prop-types";
import {
    getProfessionById,
    /*  getProfessions, */
    getProfessionsLoadingStatus
} from "../../store/professions";
import { useSelector } from "react-redux";
/* import { useProf } from "../../hooks/useProfession"; */

const Profession = ({ id }) => {
    // Домашка, переезд на редакс
    /* const { loading, getProfession } = useProf(); */
    /* const professions = useSelector(getProfessions()); */
    const professionsLoading = useSelector(getProfessionsLoadingStatus());
    const profession = useSelector(getProfessionById(id)); // ПОЧЕМУ ПРИ ПРОСТОМ ИМПОРТЕ НЕ ПАШЕТ (БЕЗ ХУКА)?

    /*  console.log(prof(id)); */
    if (professionsLoading) {
        return "loading777";
    } else return <p>{profession.name}</p>;
};

Profession.propTypes = {
    id: PropTypes.string
};

export default Profession;
