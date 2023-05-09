import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { paginate } from "../utils/paginate";
import Pagination from "./pagination";
import api from "../api";
import GroupList from "./groupList";
import SearchStatus from "./searchStatus";
import UsersTable from "./usersTable";
import _ from "lodash";

const Users = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfession] = useState();
    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({ iter: "name", order: "asc" });
    const pageSize = 4;

    // Ниже кусок из App
    const [users, setUsers] = useState();
    useEffect(() => {
        api.users.fetchAll().then((data) => setUsers(data));
    }, []);
    const handleDelete = (userId) => {
        setUsers(users.filter((user) => user._id !== userId));
    };

    // НИЖЕ ВЕРОЯТНО ОШИБОЧНАЯ ФУНКЦИЯ. ПО КЛИКЕ НЕ ДОЛЖЕН ОБНОВЛЯТЬСЯ СТЕЙТ.
    // ИЗ РЕШЕНИЙ, ИЛИ ПИСАЛ САМ - НЕ ПОМНЮ. МАКС СКАЖИ, КАК ПРАВИЛЬНО? МОГУ ЕЁ ПЕРЕПИСАТЬ.
    const handleToggleBookMark = (id) => {
        setUsers(
            users.map((user) => {
                if (user._id === id) {
                    return { ...user, bookmark: !user.bookmark };
                }
                return user;
            })
        );
    };
    // Выше кусок из App

    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfession(data));
    }, []);
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf]);

    const handleProfessionSelect = (item) => {
        setSelectedProf(item);
    };

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    const handleSort = (item) => {
        setSortBy(item);
    };

    let filteredUsers; // добавил, см. коммент ниже
    useEffect(() => {
        if (
            filteredUsers && // добавил, см. коммент ниже
            currentPage > Math.ceil(filteredUsers.length / pageSize) &&
            currentPage > 1
        ) {
            setCurrentPage(currentPage - 1);
        }
    }, [users]);

    if (users) {
        // этого нет пробить.
        // Макс, куда это девать? Я написал решение, но оно со стейтом и юзэфектом,
        // там был баг, что пагинация и статус появлялись, пока юзеры и профессии ещё не пришли. Много кода.
        // А обернуть код ниже в users выдаёт ошибку увеличеняи рендеров - как парвильно? Верно ли я решил?

        /*  useEffect(() => {
            if (
                currentPage > Math.ceil(filteredUsers.length / pageSize) &&
                currentPage > 1
            ) {
                setCurrentPage(currentPage - 1);
            }
        }, [users]); */

        filteredUsers = selectedProf // убрал const
            ? users.filter(
                  (user) =>
                      JSON.stringify(user.profession) ===
                      JSON.stringify(selectedProf)
              )
            : users;

        const count = filteredUsers.length;
        const sortedUsers = _.orderBy(
            filteredUsers,
            [sortBy.path],
            [sortBy.order]
        );

        const usersCrop = paginate(sortedUsers, currentPage, pageSize);
        const clearFilter = () => {
            setSelectedProf();
        };

        return (
            <div className="d-flex">
                {professions && (
                    <div className="d-flex flex-column flex-shrink-0 p-3">
                        <GroupList
                            selectedItem={selectedProf}
                            items={professions}
                            onItemSelect={handleProfessionSelect}
                        />
                        <button
                            className="btn btn-secondary mt-2"
                            onClick={clearFilter}
                        >
                            {" "}
                            Очистить
                        </button>
                    </div>
                )}
                <div className="d-flex flex-column">
                    <SearchStatus length={count} />
                    {count > 0 && (
                        <UsersTable
                            users={usersCrop}
                            onSort={handleSort}
                            selectedSort={sortBy}
                            onToggleBookMark={handleToggleBookMark}
                            onDelete={handleDelete}
                        />
                    )}
                    <div className="d-flex justify-content-center">
                        <Pagination
                            itemsCount={count}
                            pageSize={pageSize}
                            currentPage={currentPage}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </div>
            </div>
        );
    } else return "loading...";
};

Users.propTypes = {
    users: PropTypes.array
};

export default Users;
