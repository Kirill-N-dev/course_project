import React from "react";
import PropTypes from "prop-types";
import { useProf } from "../../hooks/useProfession";

const Profession = ({ id }) => {
    //
    const { loading, getProfession } = useProf();
    const prof = getProfession(id);
    if (loading) {
        return "loading";
    } else return <p>{prof.name}</p>;
};

Profession.propTypes = {
    id: PropTypes.string
};

export default Profession;
