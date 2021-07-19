import getAPI from '../API/API';
import { getComics, checkComicsDone, checkComicsError } from '../ReduxStore/comicsReducer';
import { getFavorites } from '../API/server';

function getData(data) {
  const comics = data.map(({ id, title, thumbnail }) => (
    {
      id,
      title,
      src: `${thumbnail.path}.${thumbnail.extension}`,
    }
  ));

  return comics;
}

function getCharacterByComics(id) {
  return getAPI(`characters/${id}/comics`)
    .then((response) => getData(response.data.data.results));
}

function getCharacterComics() {
  return (dispatch) => {
    dispatch(getComics());
    Promise.all([getCharacterByComics(1009268), getCharacterByComics(1009368)])
      .then(([deadpool, ironman]) => ({ deadpool, ironman }))
      .then((comics) => {
        getFavorites('comics')
          .then((response) => dispatch(checkComicsDone({
            comics,
            favorites: response.data,
          })))
          .catch(() => dispatch(checkComicsError()));
      })
      .catch(() => dispatch(checkComicsError()));
  };
}

export { getCharacterByComics };
export default getCharacterComics;
