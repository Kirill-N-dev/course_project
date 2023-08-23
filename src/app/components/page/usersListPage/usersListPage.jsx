import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { paginate } from "../../../utils/paginate";
import Pagination from "../../common/pagination";
/* import api from "../../../api"; */
import GroupList from "../../common/groupList";
import SearchStatus from "../../ui/searchStatus";
import UsersTable from "../../ui/usersTable";
import _ from "lodash";
import { useUser } from "../../../hooks/useUsers";
/* import { useProf } from "../../../hooks/useProfession"; */
import { useAuth } from "../../../hooks/useAuth";
import {
    getProfessions,
    getProfessionsLoadingStatus
} from "../../../store/professions";
import { useSelector } from "react-redux";
/* import { useAuth } from "../../../hooks/useAuth"; */

const UsersListPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    /* const [professions, setProfession] = useState(); */

    // Домашка, комментирую. Профессии и лоадер теперь со стора
    /* const { loading: loadingProf, professions } = useProf(); */
    const professions = useSelector(getProfessions());
    const professionsLoading = useSelector(getProfessionsLoadingStatus());

    const [selectedProf, setSelectedProf] = useState();
    const initialSort = { iter: "name", order: "asc" };
    const [sortBy, setSortBy] = useState(initialSort);
    const pageSize = 4;
    /* console.log(api); */ // {users, professions}
    const [searchValue, setSearchValue] = useState();

    // Новый код вместо удалённого стейта
    const { users } = useUser();
    // Исправление сортировки, невывод авторизованного юзера
    const { currentUser } = useAuth();
    // Персонификация
    /*  const { currentUser } = useAuth(); */

    // Автор удалил весь эффект, но там не было профессий
    // Весь код удаляется в уроках ФБ, 2 неделя, 16,
    // профессии теперь идут с кастомного хука выше
    /* useEffect(() => { */
    /* api.users.fetchAll().then((data) => {
            setUsers(data);
        }); */

    /*         api.professions.fetchAll().then((data) => setProfession(data));
    }, []); */

    // Добавил возврат на 1ю страницу при сортировке
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf]);

    const handleDelete = (userId) => {
        /* setUsers(users.filter((user) => user._id !== userId)); */
        console.log(111);
    };

    // При сортировке букмарков и последующих кликах на сердечки они почему-то автоматически сортируются,
    // В итоге я отключил их сортировку.
    const handleToggleBookMark = (id) => {
        const newArray = users.map((user) => {
            if (user._id === id) {
                return { ...user, bookmark: !user.bookmark };
            }
            return user;
        });

        console.log(newArray);
    };

    const handleProfessionSelect = (item) => {
        setSelectedProf(item);
        setSearchValue("");
    };

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    const handleSort = (item) => {
        setSortBy(item);
    };

    if (users) {
        //
        function filteringUsers(data) {
            const filteredUsers = searchValue
                ? data.filter((user) =>
                      user.name
                          .toLowerCase()
                          .includes(searchValue.toLowerCase())
                  )
                : selectedProf
                ? data.filter(
                      (user) =>
                          JSON.stringify(user.profession) ===
                          JSON.stringify(selectedProf)
                  )
                : data;
            return filteredUsers.filter((u) => u._id !== currentUser._id);
        }

        const filteredUsers = filteringUsers(users);

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

        // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

        const handleSearchChange = ({ target }) => {
            clearFilter(); // это для того, чтобы сбросить фильтрацию по профессии при начале поиска
            setSearchValue(target.value);
        };

        // Переход на прошлую страницу, если юзеров на странице больше нет
        if (usersCrop.length < 1 && currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }

        return (
            <div className="d-flex">
                {professions && !professionsLoading && (
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
                            Очистить
                        </button>
                    </div>
                )}
                <div className="d-flex flex-column">
                    <SearchStatus length={count} />
                    <div className="d-flex">
                        <input
                            name="searchQuery"
                            type="text"
                            placeholder="Search..."
                            className="form-control flex-grow-1"
                            onChange={handleSearchChange}
                            value={searchValue}
                        ></input>
                    </div>
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

UsersListPage.propTypes = {
    users: PropTypes.array
};

export default UsersListPage;
