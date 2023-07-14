import React from "react";
import PropTypes from "prop-types";

const TextAreaField = ({ label, onChange, value, name, error }) => {
    //
    const handleChange = ({ target }) => {
        onChange({ name: target.name, value: target.value });
    };

    const getInputClasses = () => {
        return "form-control" + (error ? "is-invalid" : "");
    };

    // Автор забыл поставить минимальное количество строк
    return (
        <div className="mb-4">
            <label htmlFor={name}>{label}</label>
            <div className="input-group has-validation">
                <textarea
                    name={name}
                    id={name}
                    value={value}
                    onChange={handleChange}
                    className={getInputClasses()}
                    rows="3"
                />
                {error && <div className="invalid-fedback">{error}</div>}
            </div>
        </div>
    );
};

TextAreaField.defaultProps = {
    type: "text"
};

TextAreaField.propTypes = {
    label: PropTypes.string,
    type: PropTypes.string,
    name: PropTypes.string,
    error: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func
};

export default TextAreaField;
