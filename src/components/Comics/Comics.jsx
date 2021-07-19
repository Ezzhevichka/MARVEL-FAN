import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Carousel from '../Carousel/Carousel';
import ComicCard from '../ComicCard/ComicCard';
import getCharacterComics from '../../reduxAsync/comics';
import style from './Comics.module.css';

function Comics() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.comics);

  useEffect(() => {
    dispatch(getCharacterComics());
  }, []);

  if (data.loading) {
    return <h3>Just wait, page is loading</h3>;
  }

  if (data.error) {
    return <h3>Oops. something went wrong. Try to refresh page.</h3>;
  }

  return (
    <div className={style.comics}>
      <h2>Deadpool Comics</h2>
      <Carousel visibleCardsNumber={4} cardWidth={224}>
        {data.comics.deadpool.map(({ id, title, src }) => (
          <ComicCard
            id={id}
            key={id}
            name={title}
            src={src}
            isFavorite={data.favorites.includes(id)}
          />
        ))}
      </Carousel>
      <h2>IronMan comics</h2>
      <Carousel visibleCardsNumber={4} cardWidth={224}>
        {data.comics.ironman.map(({ id, title, src }) => (
          <ComicCard
            id={id}
            key={id}
            name={title}
            src={src}
            isFavorite={data.favorites.includes(id)}
          />
        ))}
      </Carousel>
    </div>
  );
}

export default Comics;
