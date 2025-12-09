import { useState, useEffect } from 'react';
import './Pagination.css';

function Pagination({ currentPage, totalPages, onPageChange }) {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile);
        
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    if (totalPages <= 1) return null;

    const getPageNumbers = () => {
        const pages = [];

        if (isMobile) {
            // Mobile: Show first 3, ellipsis, last page
            if (totalPages <= 5) {
                for (let i = 1; i <= totalPages; i++) {
                    pages.push(i);
                }
            } else {
                // Show 1, 2, 3, ..., last page
                pages.push(1, 2, 3);
                if (totalPages > 4) {
                    pages.push('...');
                }
                pages.push(totalPages);
            }
        } else {
            // Desktop: Original logic
            if (totalPages <= 5) {
                for (let i = 1; i <= totalPages; i++) {
                    pages.push(i);
                }
            } else {
                pages.push(1);

                let start = Math.max(2, currentPage - 1);
                let end = Math.min(totalPages - 1, currentPage + 1);

                if (currentPage <= 3) {
                    start = 2;
                    end = 4;
                }

                if (currentPage >= totalPages - 2) {
                    start = totalPages - 3;
                    end = totalPages - 1;
                }

                if (start > 2) {
                    pages.push('...');
                }

                for (let i = start; i <= end; i++) {
                    pages.push(i);
                }

                if (end < totalPages - 1) {
                    pages.push('...');
                }

                pages.push(totalPages);
            }
        }

        return pages;
    };

    const pageNumbers = getPageNumbers();

    return (
        <div className="pagination">
            {currentPage > 1 && (
                <button
                    className="pagination-btn"
                    onClick={() => onPageChange(currentPage - 1)}
                >
                    Previous
                </button>
            )}
            
            {pageNumbers.map((page, index) => {
                if (page === '...') {
                    return (
                        <span key={`ellipsis-${index}`} className="pagination-ellipsis">
                            ...
                        </span>
                    );
                }
                return (
                    <button
                        key={page}
                        className={`pagination-btn ${currentPage === page ? 'active' : ''}`}
                        onClick={() => onPageChange(page)}
                    >
                        {page}
                    </button>
                );
            })}

            {currentPage < totalPages && (
                <button
                    className="pagination-btn"
                    onClick={() => onPageChange(currentPage + 1)}
                >
                    Next »
                </button>
            )}
        </div>
    );
}

export default Pagination;
