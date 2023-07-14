import React from "react";
import { useHistory } from "react-router";

export const BackButton = () => {
    //
    const history = useHistory();

    return (
        <button
            type="button"
            onClick={history.goBack}
            className="btn btn-primary w-100 mx-auto"
        >
            Назад
        </button>
    );
};

export default BackButton;
