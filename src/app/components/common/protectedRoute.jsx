import React from "react";
/* import { useAuth } from "../../hooks/useAuth"; */
import { Redirect, Route } from "react-router";
import PropTypes from "prop-types";
import { getIsLoggedIn } from "../../store/users";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ component: Component, children, ...rest }) => {
    // Авторизованный юзер
    const currentUser = useSelector(getIsLoggedIn()); // ПОЧЕМУ БЕЗ СЕЛЕКТОРА ПРОСТЫМ ИМПОРТОМ НЕ ПАШЕТ???
    // МОЖЕТ ЧТО НЕТ ДОСТУПА К СТЕЙТУ?
    return (
        <Route
            render={(props) => {
                if (!currentUser) {
                    return (
                        <Redirect
                            to={{
                                pathname: "/login",
                                state: { from: props.location.pathname }
                            }}
                        />
                    );
                }
                return Component ? <Component {...props} /> : children;
            }}
            {...rest}
        />
    );
};

ProtectedRoute.propTypes = {
    component: PropTypes.func,
    location: PropTypes.object,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default ProtectedRoute;
