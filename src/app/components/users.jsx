import React, { useState } from 'react';
import API from '../api';
import SearchStatus from './searchStatus';
import User from './user';

/* ЧУТЬ ГОЛОВУ НЕ СЛОМАЛ
У МЕНЯ ТУТ ВОПРОС - А ЭТО ГРЕХ ВЫЗЫВАТЬ В РЕАКТЕ КОД ИЗ НЭТИВ ДОМА ТИПА ИВЕНТ ТАРГЕТОВ, ЕСЛИ МОЖНО ОБОЙТИСЬ БЕЗ,
КАК В ДАННОМ СЛУЧАЕ, В СЛУЧАЕ БУКМАРКОВ?  */

const Users = () => {
  const [users, setUsers] = useState(API.fetchAll());

  const handleDelete = (userId) => {
    const newArr = users.filter((i) => i._id !== userId);
    /* console.log(123); */
    setUsers(newArr);
  };

  const handleColorizer = (id) => {
    const newArr_2 = users.map((i) => ({
      ...i,
      bookmark: i._id === id ? !i.bookmark : i.bookmark,
    }));

    setUsers(newArr_2);
  };

  return (
    <>
      <SearchStatus number={users.length} />
      {users.length > 0 && (
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
            {users.map((i) => (
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
    </>
  );
};

export default Users;
