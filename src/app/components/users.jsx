import React, { useState, useEffect } from "react";
import api from "../api";
import SearchStatus from "./searchStatus";
import User from "./user";
import Pagination from "./pagination";
import GroupList from "./groupList";

const Users = () => {
    const [users, setUsers] = useState();
    const [professions, setProfession] = useState();
    const [selectedProf, setSelectedProf] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 6;

    useEffect(() => {
        api.users.fetchAll().then((users) => setUsers(users));
        api.professions
            .fetchAll()
            .then((firstProfessions) => setProfession(firstProfessions));
    }, []);

    /* useEffect(() => {     // (***1 ВОПРОС) МАКС, КАК ПРАВИЛЬНО, ТАК?
        setCurrentPage(1);
    }, [selectedProf]); */

    const handleProfessionSelect = (item) => {
        setSelectedProf(item);
        setCurrentPage(1); // ИЛИ ТАК? И ПОЧЕМУ? КАКАЯ РАЗНИЦА? ВРОДЕ ВСЁ ОДНО - ПО КЛИКУ НА ПРОФЕССИЮ.
    };

    const handleDelete = (userId) => {
        const newArr = users.filter((i) => i._id !== userId);
        setUsers(newArr);
    };

    const handleColorizer = (id) => {
        const newArr2 = users.map((i) => ({
            ...i,
            bookmark: i._id === id ? !i.bookmark : i.bookmark
        }));

        setUsers(newArr2);
    };

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    const handlePageBack = (currPg) => {
        const checking = currPg >= 1 ? currPg : 1;
        setCurrentPage(checking);
    };

    const handlePageFwd = (currPg, lastPg) => {
        const checking = currPg <= lastPg ? currPg : lastPg;
        setCurrentPage(checking);
    };

    const paginate = (users, currentPage, pageSize) => {
        const startIndex = (currentPage - 1) * pageSize;
        return users ? [...users].splice(startIndex, pageSize) : false;
    };

    const filteredUsers = selectedProf
        ? Object.values(users).filter(
              (i) => i.profession._id === selectedProf._id
          ) // тут претиер почему-то отступает кратно 2 (а не 4, как настроено) - странно
        : users;

    const trimUsers = paginate(filteredUsers, currentPage, pageSize);

    const clearFilter = () => {
        setSelectedProf();
    };

    const count = filteredUsers?.length; // Перенёс ниже для верного рендера + добавил проверку

    if (users && professions) {
        // (***2 ВОПРОС)
        // ВЕРНО ЛИ ТАКОЕ УСЛОВИЕ?
        return (
            <>
                <SearchStatus numb={count} />
                <div className="d-flex align-items-start">
                    <div>
                        <>
                            <GroupList
                                items={professions}
                                onItemSelect={handleProfessionSelect}
                                onClearFilter={clearFilter}
                                selectedProf={selectedProf}
                            />
                        </>
                    </div>

                    {
                        <table className="table table-group-divider">
                            <thead>
                                <tr>
                                    <th scope="col">Имя</th>
                                    <th scope="col">Качества</th>
                                    <th scope="col">Профессия</th>
                                    <th scope="col">Встретился, раз</th>
                                    <th scope="col">Оценка</th>
                                    <th scope="col">Избранное</th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {trimUsers.map((i) => (
                                    <User
                                        {...i}
                                        handleDelete={handleDelete}
                                        handleColorizer={handleColorizer}
                                        key={i._id}
                                    />
                                ))}
                            </tbody>
                        </table>
                    }
                </div>
                {
                    <Pagination
                        itemsCount={count}
                        pageSize={pageSize}
                        currentPage={currentPage}
                        onPageChange={handlePageChange}
                        onPageBack={handlePageBack}
                        onPageFwd={handlePageFwd}
                    />
                }
            </>
        );
    }
};

export default Users;
