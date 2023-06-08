import { React } from "react";
import PropTypes from "prop-types";

function CheckBoxField({ name, value, onChange, children, error }) {
    //
    const handleChange = () => {
        onChange({ name: name, value: !value });
    };

    const getInputClasses = () =>
        `form-check-input ${error ? "is-invalid" : "is-valid"}`;

    return (
        <div className="form-check mb-4">
            <input
                className={getInputClasses()}
                type="checkbox"
                value=""
                id={name}
                onChange={handleChange}
                checked={value}
            />
            <label className="form-check-label" htmlFor={name}>
                {children}
            </label>
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    );
}

CheckBoxField.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]),

    onChange: PropTypes.func,
    name: PropTypes.string,
    value: PropTypes.bool,
    error: PropTypes.string
};

export default CheckBoxField;
