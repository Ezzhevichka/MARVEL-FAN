import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { addFavorite, removeFavorite } from '../../API/server';
import styles from './CardPattern.module.css';

function CardPattern({
  id,
  name,
  src,
  url,
  isFavorite,
}) {
  const [favorite, setFavotite] = useState(isFavorite);
  return (
    <div className={styles.card}>
      <button
        type="button"
        className={styles.button}
        onClick={() => {
          if (favorite) {
            removeFavorite(url, id);
          } else {
            addFavorite(url, id);
          }
          setFavotite(!favorite);
        }}
      >
        <img src={favorite ? 'img/liked.png' : '/img/like.png'} alt="Add to favorites" />
      </button>
      <div className={styles.image}>
        <img src={src} alt={name} />
      </div>
      <div className={styles.span}>
        <span>{name.length > 25 ? `${name.substring(0, 25)}...` : name }</span>
      </div>
    </div>
  );
}

CardPattern.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  src: PropTypes.string,
  url: PropTypes.string,
  isFavorite: PropTypes.bool,
};

CardPattern.defaultProps = {
  id: PropTypes.number,
  name: PropTypes.string,
  src: PropTypes.string,
  url: PropTypes.string,
  isFavorite: false,
};

export default CardPattern;
