import React from "react";
import PropTypes from "prop-types";

function SelectField({
    label,
    value,
    onChange,
    defaultOption,
    options,
    error,
    name
}) {
    //
    const getInputClasses = () =>
        /* `form-select ${error ? "is-invalid" : "is-valid"}`; */
        error ? "form-select is-invalid" : "form-select is-valid";
    //
    const handleChange = (ev) => {
        onChange({ name: ev.target.name, value: ev.target.value });
    };

    /* const optionsArray =
        !Array.isArray(options) && typeof options === "object"
            ? Object.keys(options).map((optionName) => ({
                  name: options[optionName].name,
                  value: options[optionName]._id
              }))
            : options; */

    const optionsArray =
        !Array.isArray(options) && typeof options === "object"
            ? Object.values(options)
            : options; // для переиспользуемости, чтобы не привязываться к конкретным полям

    return (
        <div className="mb-4">
            <label htmlFor={name} className="form-label">
                {label}
            </label>
            <select
                className={getInputClasses()}
                id={name}
                name={name}
                value={value}
                onChange={handleChange} // сменил
            >
                <option disabled value="" /* selected={value === ""} */>
                    {defaultOption}
                </option>
                {/* {optionsArray &&
                    optionsArray.map((option) => (
                        <option value={option.value} key={option.value}>
                            {option.name}
                        </option>
                    ))} */}
                {optionsArray.length > 0 &&
                    optionsArray.map((option) => (
                        <option value={option.value} key={option.value}>
                            {option.label}
                        </option>
                    ))}
            </select>
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    );
}

SelectField.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    error: PropTypes.string,
    defaultOption: PropTypes.string,
    options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    name: PropTypes.string
};

export default SelectField;
