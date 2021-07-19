import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CharacterCard from '../CharacterCard/CharacterCard';
import Pagination from '../Pagination/Pagination';
import Search from '../Search/Search';
import getPage from '../../reduxAsync/characters';
import styles from './Characters.module.css';

function Characters() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.characters);

  useEffect(() => {
    dispatch(getPage(data.currentPage, data.cardsPerPage, data.nameStartsWith, data.orderBy));
  }, [data.currentPage]);

  if (data.loading) {
    return <h3>Just wait, page is loading</h3>;
  }

  if (data.error) {
    return <h3>Oops. something went wrong. Try to refresh page.</h3>;
  }

  return (
    <div>
      <Search />
      <div className={styles.characters}>
        {data.characters.map((character) => {
          const {
            id,
            name,
            src,
          } = character;
          return (
            <CharacterCard
              id={id}
              key={id}
              src={src}
              name={name}
              isFavorite={data.favorites.includes(id)}
            />
          );
        })}
      </div>
      <Pagination
        currentPage={data.currentPage}
        totalPagesNumber={data.pagesNumber}
        visiblePagesNumber={data.visiblePagesNumber}
      />
    </div>
  );
}

export default Characters;
