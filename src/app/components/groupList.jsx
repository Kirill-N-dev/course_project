import React from "react";
import PropTypes from "prop-types";

const GroupList = ({ items, onItemSelect, onClearFilter, selectedProf }) => {
    //
    return (
        <div className="list-group">
            {Object.keys(items).map((i) => {
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
            <button
                className="btn btn-secondary m-1"
                onClick={() => onClearFilter()}
            >
                Сброс
            </button>
        </div>
    );
};

GroupList.propTypes = {
    items: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    onItemSelect: PropTypes.func.isRequired,
    onClearFilter: PropTypes.func.isRequired,
    selectedProf: PropTypes.object
};

export default GroupList;
