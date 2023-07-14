import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import BookMark from "../common/bookmark";
import { Qualities } from "./qualities";
import Table, { TableBody, TableHeader } from "../common/table";
import Profession from "./profession";

/* import User from "./user"; */

// ОБЪЕКТ ДЛЯ ИТЕРАЦИИ COLUMNS, СБОРКА HEADER И BODY
// ИЗМЕНЯЛОСЬ ПОЛЕ ДЛЯ ПРОФЕССИЙ (И КАЧЕСТВ) В 14 НЕДЕЛЕ, 27 УРОКЕ И В ДОМАШКЕ

const UsersTable = ({
    users,
    onSort,
    selectedSort,
    onToggleBookMark,
    onDelete,
    ...rest
}) => {
    //
    // КАК columns ЭКСПОРТИРОВАТЬ В USER?
    //
    const columns = {
        name: {
            path: "name",
            name: "Имя",
            component: (user) => (
                <Link to={`/users/${user._id}`}> {user.name} </Link>
            )
        },
        qualities: {
            component: (user) => <Qualities qualities={user.qualities} />,
            name: "Качества"
        },
        professions: {
            component: (user) => <Profession id={user.profession} />,
            name: "Профессия"
        },
        completedMeetings: {
            path: "completedMeetings",
            name: "Встретился, раз"
        },
        rate: { path: "rate", name: "Оценка" },
        bookmark: {
            /* path: "bookmark", */
            // Макс, если делать сортировку не покидая currentPage, баг остаётся, потому я её отключил
            name: "Избранное",

            component: (user) => (
                <BookMark
                    status={user.bookmark}
                    onClick={() => onToggleBookMark(user._id)}
                />
            )
        },
        delete: {
            component: (user) => (
                <button
                    onClick={() => onDelete(user._id)}
                    className="btn btn-danger"
                >
                    delete
                </button>
            )
        }
    };

    //

    return (
        <Table>
            <TableHeader
                {...{
                    onSort,
                    selectedSort,
                    columns
                }}
            />
            <TableBody {...{ columns, usersCrop: users }} />
        </Table>
        /* <Table
            onSort={onSort}
            selectedSort={selectedSort}
            columns={columns}
            data={users}
        /> */
    );
};

UsersTable.propTypes = {
    users: PropTypes.array.isRequired,
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired,
    bookmark: PropTypes.bool,
    onToggleBookMark: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
};

export default UsersTable;
