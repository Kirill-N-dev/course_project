import React from "react";
import PropTypes from "prop-types";

const Qualities = (props) => {
    //
    return props.qualities.map((qual) => (
        <span className={"badge bg-" + qual.color + " m-1"} key={qual._id}>
            {qual.name}
        </span>
    ));
};

Qualities.propTypes = {
    qualities: PropTypes.array.isRequired
};

export default Qualities;
