import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { setCurrentPage, setPreviousPage, setNextPage } from '../../ReduxStore/charactersReducer';
import styles from './Pagination.module.css';

function getPagesData(start, totalPagesNumber, visiblePagesNumber) {
  return [...Array(visiblePagesNumber > totalPagesNumber - start
    ? totalPagesNumber - start + 1 : visiblePagesNumber)
    .keys()].map((item) => start + item);
}

function Pagination({ currentPage, totalPagesNumber, visiblePagesNumber }) {
  const dispatch = useDispatch();

  return (
    <div className={styles.wrapper}>
      <button
        className={styles.currentPage}
        onClick={() => {
          if (currentPage !== 1) {
            dispatch(setPreviousPage());
          }
        }}
        type="button"
      >
        &lt;
      </button>
      {getPagesData(currentPage, totalPagesNumber, visiblePagesNumber).map((item) => (
        <button
          className={item === currentPage ? styles.currentPage : styles.page}
          key={item}
          onClick={() => dispatch(setCurrentPage(item))}
          type="button"
        >
          {item}
        </button>
      ))}
      <button
        className={styles.currentPage}
        onClick={() => {
          if (currentPage !== totalPagesNumber) {
            dispatch(setNextPage());
          }
        }}
        type="button"
      >
        &gt;
      </button>
    </div>
  );
}

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  visiblePagesNumber: PropTypes.number.isRequired,
  totalPagesNumber: PropTypes.number.isRequired,
};

export default Pagination;
