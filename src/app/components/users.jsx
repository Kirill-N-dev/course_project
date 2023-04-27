import React, { useState, useEffect } from "react";
import api from "../api";
import SearchStatus from "./searchStatus";
import User from "./user";
import Pagination from "./pagination";
import GroupList from "./groupList";

const Users = () => {
    const [users, setUsers] = useState(api.users.fetchAll());
    const [professions, setProfession] = useState();
    const [selectedProf, setSelectedProf] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const count = users.length;
    const pageSize = 4;

    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfession(data));
    });

    const handleProfessionSelect = (item) => {
        setSelectedProf(item);
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

    // ЗАБАГОВАННЫЙ КОД
    const paginate = (users, currentPage, pageSize) => {
        const startIndex = (currentPage - 1) * pageSize;
        return [...users].splice(startIndex, pageSize);
    };

    const filteredUsers = selectedProf
        ? users.filter((i) => {
              i.profession === selectedProf;
          })
        : users;
    // ЗАБАГОВАННЫЙ КОД
    const trimUsers = paginate(filteredUsers, currentPage, pageSize);

    return (
        <>
            <GroupList
                items={professions}
                onItemSelect={handleProfessionSelect}
                selectedProf={selectedProf}
            />
            <SearchStatus numb={count} />
            {count > 0 && (
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
            )}
            <Pagination
                itemsCount={count}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={handlePageChange}
                onPageBack={handlePageBack}
                onPageFwd={handlePageFwd}
            />
        </>
    );
};

export default Users;
