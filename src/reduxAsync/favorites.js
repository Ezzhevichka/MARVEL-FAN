import getAPI from '../API/API';
import { getFavorites } from '../API/server';
import { getFavorite, checkFavoriteDone, checkFavoriteError } from '../ReduxStore/favoriteReducer';

function getCharacters(characters) {
  return characters
    .map((character) => character.data.data.results[0])
    .map((character) => {
      const { id, name, thumbnail } = character;
      return {
        id,
        name,
        src: `${thumbnail.path}.${thumbnail.extension}`,
        isFavorite: true,
      };
    });
}

function getComics(comics) {
  return comics
    .map((comic) => comic.data.data.results[0])
    .map((comic) => {
      const { id, title, thumbnail } = comic;
      return {
        id,
        title,
        src: `${thumbnail.path}.${thumbnail.extension}`,
        isFavorite: true,
      };
    });
}

function getFavoriteCharacters() {
  return getFavorites('characters')
    .then((response) => response.data)
    .then((characters) => Promise.all(characters.map((id) => getAPI(`characters/${id}`))))
    .then((characters) => getCharacters(characters));
}

function getFavoriteComics() {
  return getFavorites('comics')
    .then((response) => response.data)
    .then((comics) => Promise.all(comics.map((id) => getAPI(`comics/${id}`))))
    .then((comics) => getComics(comics));
}

function getFavoriteData() {
  return (dispatch) => {
    dispatch(getFavorite());
    Promise.all([getFavoriteCharacters(), getFavoriteComics()])
      .then(([characters, comics]) => dispatch(checkFavoriteDone({ characters, comics })))
      .catch(() => dispatch(checkFavoriteError()));
  };
}

export default getFavoriteData;
