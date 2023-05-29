import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const Search = ({ api, setUsers, clearFilter }) => {
    /* const [inputed, setInput] = useState(""); */ // useState ассинхронный хук, inputed отстаёт
    const [users2, setUsers2] = useState();
    useEffect(() => {
        api.users.fetchAll().then((data) => setUsers2(data));
    }, []);

    const handleChange = (ev) => {
        clearFilter();
        /* setInput(ev.target.value); */ // отстаёт
        const findedUsers = users2.filter((i) => {
            return i.name.toLowerCase().includes(ev.target.value.toLowerCase());
        });
        console.log(findedUsers); // а так работает синхронно
        setUsers(findedUsers); // запил поиска; теперь надо очистить value при клике по фильтрам
        // вроде всё сделал, всё работает, в любом случае я потом перепишу у автора, а косяки если и есть,
        // то мелкие. Ну и может у автора другие методы по реализации поиска. Я ж делаю впервые.
    };

    return (
        <div className="d-flex">
            <input
                type="text"
                placeholder="Search..."
                className="flex-grow-1"
                onChange={handleChange}
            ></input>
        </div>
    );
};

Search.propTypes = {
    api: PropTypes.object,
    setUsers: PropTypes.func,
    clearFilter: PropTypes.func
};

export default Search;
