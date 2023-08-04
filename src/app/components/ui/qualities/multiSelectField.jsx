import React from "react";
import Select from "react-select";
import PropTypes from "prop-types";

const MultiSelectField = ({ options, onChange, name, label, defaultValue }) => {
    //
    /*  console.log(options, 222); */ // [{value,label,color},{},...]
    //
    /* const optionsArray =
        !Array.isArray(options) && typeof options === "object"
            ? Object.keys(options).map((opt) => ({
                  label: options[opt].name,
                  value: options[opt]._id
              }))
            : options; */
    //
    /* console.log(optionsArray); */
    //

    const optionsArray =
        !Array.isArray(options) && typeof options === "object"
            ? Object.values(options)
            : options; // для переиспользуемости, чтобы не привязываться к конкретным полям

    const handleChange = (value) => {
        onChange({ name, value });
    };
    /* console.log(optionsArray, 777); */ // [{value,label,color},{},...]
    // НИЖЕ ТАК И НЕ ПОНЯЛ, КАК ПОМЕНЯТЬ ЦВЕТ ВЫБРАННОГО
    return (
        <div className="mb-4">
            <label className="form-label">{label}</label>
            <Select
                options={optionsArray}
                onChange={handleChange} // сменил
                name={name}
                defaultValue={defaultValue}
                className="basic-multi-select"
                classNamePrefix="react-select"
                isMulti
                theme={(theme) => ({
                    ...theme,
                    borderRadius: 5,
                    colors: {
                        ...theme.colors,
                        text: "red",
                        primary25: "hotpink",
                        primary: "blue",
                        backgroundColor: "hotpink"
                    }
                })}
                option={(provided, state) => ({
                    ...provided,
                    backgroundColor: state.isSelected ? "red" : "green"
                })}
            />
        </div>
    );
};

MultiSelectField.propTypes = {
    options: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    onChange: PropTypes.func,
    name: PropTypes.string,
    label: PropTypes.string,
    defaultValue: PropTypes.array
};

export default MultiSelectField;
