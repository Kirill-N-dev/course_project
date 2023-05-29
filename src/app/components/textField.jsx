import React, { useState } from "react";
import PropTypes from "prop-types";

const TextField = ({ label, type, name, value, onChange, error }) => {
    //
    const [showPassword, setShowPassword] = useState(false);

    const getInputClasses = () =>
        `form-control ${error ? "is-invalid" : "is-valid"}`;

    // тест
    const getInputStyle = () => (error ? "" : "borderRadius: '0 !important'");
    console.log(getInputStyle());
    // тест

    // МАКС, тут баг, в случае верного пароля у поля появляется радиус. Даже без is-valid.
    // Bootstrap 5.2.3. Перепроверь мои классы пожалуйста.

    // И почему в строке 26 не появляется атрибут?

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };
    return (
        <div className="mb-4 has-validation">
            <label htmlFor={name}>{label}</label>
            <div className="input-group has-validation">
                <input
                    className={getInputClasses()}
                    style={{ borderRadius: "0 !important" }}
                    type={showPassword ? "text" : type}
                    id={name}
                    name={name}
                    value={value}
                    onChange={onChange}
                />
                {type === "password" && (
                    <button
                        className="btn btn-outline-secondary"
                        type="button"
                        onClick={toggleShowPassword}
                    >
                        <i
                            className={
                                "bi bi-eye" + (showPassword ? "" : "-slash")
                            }
                        ></i>
                    </button>
                )}
                {error && <p className="invalid-feedback">{error}</p>}
            </div>
        </div>
    );
};
TextField.defaultProps = {
    type: "text"
};
TextField.propTypes = {
    label: PropTypes.string,
    type: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    error: PropTypes.string
};

export default TextField;
