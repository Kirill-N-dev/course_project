import React, { useState } from 'react';
import API from '../api';

const Users = () => {
  const [users, setUsers] = useState(API.fetchAll());
  const handleDelete = (userId) => {
    let newArr = users.filter((i) => i._id !== userId);
    setUsers(newArr);
  };
  const renderPhrase = (number) => {
    let lastCount = +String(number)[String(number).length - 1];
    let penCount = +String(number)[String(number).length - 2];
    let tusa;
    if (lastCount === 1 && penCount !== 1) tusa = ' тусанёт';
    else tusa = ' тусанут';
    let man;
    if (
      (lastCount === 2 || lastCount === 3 || lastCount === 4) &&
      penCount !== 1
    )
      man = ' человека';
    else man = ' человек';
    return number !== 0 ? (
      <>
        <div className="p-2 m-1 fs-6 badge bg-primary">
          {number} {man} {tusa} с тобой сегодня
        </div>
      </>
    ) : (
      <>
        <div className="p-2 m-1 fs-6 badge bg-danger">
          Никто с тобой не тусанёт
        </div>
      </>
    );
  };
  return (
    <>
      {renderPhrase(users.length)}
      <table className="table table-group-divider">
        <thead>
          <tr>
            <th scope="col">Имя</th>
            <th scope="col">Качества</th>
            <th scope="col">Профессия</th>
            <th scope="col">Встретился, раз</th>
            <th scope="col">Оценка</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {users.map((i) => {
            return (
              <tr key={i._id}>
                <td>{i.name}</td>
                <td>
                  {i.qualities.map((i) => {
                    const name = `m-1 badge bg-${i.color}`;
                    return (
                      <span className={name} key={i._id}>
                        {i.name}
                      </span>
                    );
                  })}
                </td>
                <td>{i.profession.name}</td>
                <td>{i.completedMeetings}</td>
                <td>{i.rate} /5</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(i._id)}
                  >
                    delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};
export default Users;
