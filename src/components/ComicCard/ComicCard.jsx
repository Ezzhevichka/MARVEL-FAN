import React from 'react';
import PropTypes from 'prop-types';
import CardPattern from '../CardPattern/CardPattern';

function ComicCard({
  id, name, src, isFavorite,
}) {
  return (
    <CardPattern
      src={src}
      name={name}
      id={id}
      isFavorite={isFavorite}
      url="comics"
    />
  );
}

ComicCard.propTypes = {
  src: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  isFavorite: PropTypes.bool.isRequired,
};

export default ComicCard;
