import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPage, setNameStartsWith, toggleOrderBy } from '../../ReduxStore/charactersReducer';
import getPage from '../../reduxAsync/characters';
import styles from './Search.module.css';

function SortByName() {
  const [orderByCaption, setorderBy] = useState('A-Z');
  const dispatch = useDispatch();

  return (
    <div className={styles.sort}>
      <span>Sort By</span>
      <button
        onClick={() => {
          setorderBy(orderByCaption.split('').reverse().join(''));
          dispatch(toggleOrderBy());
        }}
        type="button"
      >
        {orderByCaption}
      </button>
    </div>
  );
}

function Search() {
  const [value, setValue] = useState('');
  const dispatch = useDispatch();
  const data = useSelector((state) => state.characters);

  function search(name) {
    const nameStartsWith = name === '' ? null : name;
    dispatch(setNameStartsWith(nameStartsWith));
    dispatch(setCurrentPage(1));
    dispatch(getPage(data.currentPage, data.cardsPerPage, nameStartsWith, data.orderBy));
  }

  useEffect(() => {
    search(value);
  }, [data.orderBy]);

  return (
    <div className={styles.search}>
      <input
        placeholder="Character"
        className={styles.inputSearch}
        onChange={(event) => setValue(event.target.value)}
        onKeyDown={(event) => {
          if (event.code === 'Enter') {
            search(value);
          }
        }}
      />
      <button
        className={styles.searchButton}
        type="button"
        aria-label="search"
        onClick={() => {
          search(value);
        }}
      />
      <SortByName />
    </div>
  );
}

export default Search;
