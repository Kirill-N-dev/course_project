import React from "react";
import PropTypes from "prop-types";
import Quality from "./quality";
import { useQual } from "../../../hooks/useQualities";

const QualitiesCard = ({ qualities }) => {
    //

    const { loading } = useQual();

    //
    console.log(qualities, 555); // качества есть - ЭТО [АЙДИШНИКИ]

    return (
        <>
            {loading
                ? "Loading888"
                : qualities.map((id) => <Quality key={id} id={id} />)}
        </>
    );
};

QualitiesCard.propTypes = {
    qualities: PropTypes.array.isRequired
};

export default QualitiesCard;
