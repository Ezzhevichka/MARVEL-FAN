import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CharacterCard from '../CharacterCard/CharacterCard';
import ComicCard from '../ComicCard/ComicCard';
import getFavoriteData from '../../reduxAsync/favorites';
import styles from './Favorites.module.css';

function Favorites() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.favorite);

  useEffect(() => {
    dispatch(getFavoriteData());
  }, []);

  if (data.loading) {
    return <h3>Just wait, page is loading</h3>;
  }

  if (data.error) {
    return <h3>Oops. something went wrong. Try to refresh page.</h3>;
  }

  return (
    <div className={styles.favorites}>
      <h2>Characters</h2>
      <div className={styles.characters}>
        {data.favorite.characters.length === 0
          ? <span>No any characters in favorites, add someone</span>
          : data.favorite.characters.map((character) => {
            const {
              id,
              name,
              src,
              isFavorite,
            } = character;
            return (
              <CharacterCard key={id} id={id} name={name} src={src} isFavorite={isFavorite} />
            );
          })}
      </div>
      <h2>Comics</h2>
      <div className={styles.comics}>
        {data.favorite.comics.length === 0
          ? <span>No any comics in favorites, add something</span>
          : data.favorite.comics.map((character) => {
            const {
              id,
              title,
              src,
              isFavorite,
            } = character;
            return (
              <ComicCard key={id} id={id} name={title} src={src} isFavorite={isFavorite} />
            );
          })}
      </div>
    </div>
  );
}

export default Favorites;
