import React from "react";
import PropTypes from "prop-types";

const GroupList = ({ items, onItemSelect, selectedProf }) => {
    return (
        <div className="list-group">
            {items &&
                Object.keys(items).map((i) => {
                    return (
                        <button
                            key={items[i]._id}
                            className={
                                "list-group-item list-group-item-action" +
                                (selectedProf === items[i] ? " active" : "")
                            }
                            onClick={() => onItemSelect(items[i])}
                        >
                            {items[i].name}
                        </button>
                    );
                })}
        </div>
    );
};

GroupList.propTypes = {
    items: PropTypes.object,
    onItemSelect: PropTypes.func.isRequired,
    selectedProf: PropTypes.object
};

export default GroupList;
