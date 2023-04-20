import _ from "lodash";
import React from "react";
import PropTypes from "prop-types";

const Pagination = ({
    itemsCount,
    pageSize,
    currentPage,
    onPageChange,
    onPageBack,
    onPageFwd
}) => {
    //
    /*   const { itemsCount, pageSize } = props; */
    const pageCount = Math.ceil(itemsCount / pageSize);
    const pages = _.range(1, pageCount + 1);

    if (pageCount === 1) return false;
    return (
        <nav>
            <ul className="pagination">
                <li className="page-item">
                    <a
                        className="page-link"
                        onClick={() => onPageBack(currentPage - 1)}
                    >
                        Previous
                    </a>
                </li>
                {pages.map((i) => (
                    <li
                        className={
                            "page-item" + (i === currentPage ? " active" : "")
                        }
                        key={i}
                    >
                        <a
                            className="page-link"
                            onClick={() => onPageChange(i)}
                        >
                            {i}
                        </a>
                    </li>
                ))}
                <li className="page-item">
                    <a
                        className="page-link"
                        onClick={() =>
                            onPageFwd(currentPage + 1, pages[pages.length - 1])
                        }
                    >
                        Next
                    </a>
                </li>
            </ul>
        </nav>
    );
};

Pagination.propTypes = {
    itemsCount: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    onPageBack: PropTypes.func.isRequired,
    onPageFwd: PropTypes.func.isRequired
};

export default Pagination;
