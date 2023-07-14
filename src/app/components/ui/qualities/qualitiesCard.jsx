import React from "react";
import PropTypes from "prop-types";
import Quality from "./quality";
/* import { useQual } from "../../../hooks/useQualities"; */

const QualitiesCard = ({ qualities }) => {
    //
    console.log(qualities, 555); // качества есть - ЭТО [АЙДИШНИКИ]

    return (
        <>
            {qualities.map((id) => (
                <Quality key={id} id={id} />
            ))}
        </>
    );
};

QualitiesCard.propTypes = {
    qualities: PropTypes.array.isRequired
};

export default QualitiesCard;
