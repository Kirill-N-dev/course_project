import React from "react";
import { Link } from "react-router-dom";
/* import { useAuth } from "../../hooks/useAuth"; */
import NavProfile from "./navProfile";
import { useSelector } from "react-redux";
import { getIsLoggedIn } from "../../store/users";
/* import { getCurrentUserData } from "../../store/users"; */

const NavBar = () => {
    // Переезд на редакс
    // Кастомный хук
    /* const { currentUser } = useAuth(); */
    /* const currentUser = useSelector(getCurrentUserData()); */
    const loggedIn = useSelector(getIsLoggedIn());
    // mb-3 ниже ничего не изменяет, видимо автор ошибся?
    return (
        <>
            <nav className="navbar bg-light mb-3">
                <div className="container-fluid">
                    <ul className="nav">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">
                                Main
                            </Link>
                        </li>

                        {loggedIn && (
                            <li className="nav-item">
                                <Link className="nav-link" to="/users">
                                    Users
                                </Link>
                            </li>
                        )}
                    </ul>
                    <div className="d-flex">
                        {loggedIn ? (
                            <NavProfile />
                        ) : (
                            <Link className="nav-link" to="/login">
                                Login
                            </Link>
                        )}
                    </div>
                </div>
            </nav>
        </>
    );
};

export default NavBar;
