import styles from './Pagination.module.scss';
import original_arrow_left from '/images/original/icons/original_arrow_left.svg';
import original_arrow_right from '/images/original/icons/original_arrow_right.svg';
import dark_arrow_left from '/images/dark/icons/dark_arrow_left.svg';
import dark_arrow_right from '/images/dark/icons/dark_arrow_right.svg';

import React, { useContext } from 'react';
import cn from 'classnames';
import { ThemeMethodsContext } from '@/context/ThemeContext';

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const { isDarkTheme } = useContext(ThemeMethodsContext);

  const getDisplayedPages = () => {
    const pages = [];
    const maxPagesToShow = 4;
    let startPage = currentPage - Math.floor(maxPagesToShow / 2);
    if (startPage < 1) startPage = 1;
    let endPage = startPage + maxPagesToShow - 1;
    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  const displayedPages = getDisplayedPages();

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    onPageChange(page);
  };

  return (
    <div
      className={cn(styles.pagination, { [styles.dark_theme]: isDarkTheme })}
    >
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={styles.arrow}
      >
        <img
          src={isDarkTheme ? dark_arrow_left : original_arrow_left}
          alt="Previous"
        />
      </button>

      {displayedPages.map(page => (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={cn({ [styles.activePage]: currentPage === page })}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={styles.arrow}
      >
        <img
          src={isDarkTheme ? dark_arrow_right : original_arrow_right}
          alt="Next"
        />
      </button>
    </div>
  );
};

export default Pagination;
