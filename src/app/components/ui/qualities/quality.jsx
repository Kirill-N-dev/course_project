import React from "react";
import PropTypes from "prop-types";
import { useQual } from "../../../hooks/useQualities";
/* import { useProf } from "../../../hooks/useProfession"; */

// Нижепопытка вставить контекст и получить... не
const Quality = ({ id }) => {
    const { getTheQualities } = useQual();

    const qual = getTheQualities(id);
    /* console.log(qual, 888); */ // теперь правльная БД, с качествами
    return <span className={"badge m-1 bg-" + qual.color}>{qual.name}</span>;
};
Quality.propTypes = {
    color: PropTypes.string.isRequired,
    /*  name: PropTypes.string.isRequired, */
    id: PropTypes.string
};

export default Quality;
