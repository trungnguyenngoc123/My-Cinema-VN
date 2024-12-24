import React from 'react';
import { Link } from 'react-router-dom';
const Pagination = ({ totalPages, currentPage, baseUrl }) => {
    const pageNumbers = [];
    const maxPagesToShow = 5; //có thể là 10

    if (totalPages <= maxPagesToShow) {
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(i);
        }
    } else {
        if (currentPage <= 3) {
            pageNumbers.push(1, 2, 3, 4, '...', totalPages);
        } else if (currentPage >= totalPages - 2) {
            pageNumbers.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
        } else {
            pageNumbers.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
        }
    }

    return (
        <div className='pb-3 pt-3'>
            {totalPages === 1 ? (
                <div>
                    
                </div>
            ) : (
                <nav aria-label="Page navigation example">
                    <ul className="pagination justify-content-center">
                        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                            <Link className="page-link" to={`${baseUrl}?page=${currentPage - 1}`} aria-label="Previous">
                                <span aria-hidden="true">&laquo;</span>
                            </Link>
                        </li>
                        {pageNumbers.map((page, index) => (
                            <li key={index} className={`page-item ${currentPage === page ? 'active-page' : ''}`}>
                                {page === '...' ? (
                                    <span className="page-link bg-dark text-light">...</span>
                                ) : (
                                    <Link className="page-link" to={`${baseUrl}?page=${page}`}>
                                        {page}
                                    </Link>
                                )}
                            </li>
                        ))}
                        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                            <Link className="page-link" to={`${baseUrl}?page=${currentPage + 1}`} aria-label="Next">
                                <span aria-hidden="true">&raquo;</span>
                            </Link>
                        </li>
                    </ul>
                </nav>
            )}
        </div>
    );
};

export default Pagination;