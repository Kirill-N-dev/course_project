import React from "react";
import PropTypes from "prop-types";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";
import BookMark from "./bookmark";
import QualitiesList from "./qualitiesList";
import Table from "./table";

const UsersTable = ({
    users,
    onSort,
    selectedSort,
    onToggleBookMark,
    onDelete,
    ...rest
}) => {
    //
    const columns = {
        name: { path: "name", name: "Имя", active: false },
        qualities: {
            name: "Качества",
            component: (user) => <QualitiesList qualities={user.qualities} />
        },
        professions: {
            path: "profession.name",
            name: "Профессия",
            active: false
        },
        completedMeetings: {
            path: "completedMeetings",
            name: "Встретился, раз",
            active: false
        },
        rate: { path: "rate", name: "Оценка", active: false },
        bookmark: {
            path: "bookmark",
            name: "Избранное",
            active: false,
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
            <TableBody {...{ columns, data: users }} />
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
