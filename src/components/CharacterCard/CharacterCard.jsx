import React from 'react';
import PropTypes from 'prop-types';
import CardPattern from '../CardPattern/CardPattern';

function CharacterCard({
  id, name, src, isFavorite,
}) {
  return (
    <CardPattern
      id={id}
      name={name}
      src={src}
      isFavorite={isFavorite}
      url="characters"
    />
  );
}

CharacterCard.propTypes = {
  src: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  isFavorite: PropTypes.bool.isRequired,
};

export default CharacterCard;
