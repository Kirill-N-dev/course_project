import React from "react";
import PropTypes from "prop-types";
/* import { useQual } from "../../../hooks/useQualities"; */
/* import { useProf } from "../../../hooks/useProfession"; */

//
const Quality = ({ id, name, color }) => {
    /* const { getTheQualities } = useQual(); */
    /* const qual = getTheQualities(id); */
    /* console.log(name); */

    /* console.log(qual, 888); */ // теперь правльная БД, с качествами
    return <span className={"badge m-1 bg-" + color}>{name}</span>;
};
Quality.propTypes = {
    color: PropTypes.string,
    /*  name: PropTypes.string.isRequired, */
    id: PropTypes.string,
    name: PropTypes.string
};

export default Quality;
