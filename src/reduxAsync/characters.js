import getAPI from '../API/API';
import { getCharacters, checkCharactersDone, checkCharactersError } from '../ReduxStore/charactersReducer';
import { getFavorites } from '../API/server';

function getData(data) {
  const characters = data.results.map(({ id, name, thumbnail }) => (
    {
      id,
      name,
      src: `${thumbnail.path}/standard_xlarge.${thumbnail.extension}`,
    }
  ));

  return { characters, total: data.total };
}

function generatePageParams(currentPage, cardsPerPage, nameStartsWith, orderBy) {
  return {
    limit: cardsPerPage,
    offset: cardsPerPage * (currentPage - 1),
    nameStartsWith,
    orderBy,
  };
}

function getPage(currentPage, cardsPerPage, nameStartsWith, orderBy) {
  return (dispatch) => {
    dispatch(getCharacters());
    getAPI('characters', generatePageParams(currentPage, cardsPerPage, nameStartsWith, orderBy))
      .then((response) => getData(response.data.data))
      .then((data) => {
        getFavorites('characters')
          .then((response) => dispatch(checkCharactersDone({
            characters: data.characters,
            total: data.total,
            favorite: response.data,
          })))
          .catch(() => dispatch(checkCharactersError()));
      })
      .catch(() => dispatch(checkCharactersError()));
  };
}

export default getPage;
