const CHARACTERS = 'CHARACTERS';
const CHARACTERS_DONE = 'CHARACTERS_DONE';
const CHARACTERS_ERROR = 'CHARACTERS_ERROR';

const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const PREVIOUS_PAGE = 'PREVIOUS_PAGE';
const NEXT_PAGE = 'NEXT_PAGE';
const SET_NAME_STARTS_WITH = 'SET_NAME_STARTS_WITH';
const TOGGLE_ORDER_BY = 'TOGGLE_ORDER_BY';

const defaultState = {
  characters: null,
  error: null,
  loading: true,
  cardsPerPage: 20,
  currentPage: 1,
  pagesNumber: 1,
  visiblePagesNumber: 10,
  nameStartsWith: null,
  orderBy: 'name',
};

function charactersReducer(state = defaultState, action) {
  switch (action.type) {
    case CHARACTERS:
      return state;
    case CHARACTERS_DONE:
      return {
        ...state,
        loading: false,
        characters: action.payload.characters,
        pagesNumber: Math.ceil(action.payload.total / state.cardsPerPage),
        favorites: action.payload.favorite,
      };
    case CHARACTERS_ERROR:
      return { ...state, loading: false, error: true };
    case SET_NAME_STARTS_WITH:
      return { ...state, nameStartsWith: action.payload };
    case SET_CURRENT_PAGE:
      return { ...state, currentPage: action.payload };
    case PREVIOUS_PAGE:
      return { ...state, currentPage: state.currentPage - 1 };
    case NEXT_PAGE:
      return { ...state, currentPage: state.currentPage + 1 };
    case TOGGLE_ORDER_BY:
      return { ...state, orderBy: state.orderBy === 'name' ? '-name' : 'name' };
    default:
      return state;
  }
}

const getCharacters = () => ({ type: CHARACTERS });
const checkCharactersDone = ({ characters, total, favorite }) => ({
  type: CHARACTERS_DONE,
  payload: { characters, total, favorite },
});
const checkCharactersError = () => ({ type: CHARACTERS_ERROR });

const setNameStartsWith = (name) => ({ type: SET_NAME_STARTS_WITH, payload: name });

const setCurrentPage = (page) => ({ type: SET_CURRENT_PAGE, payload: page });
const setPreviousPage = () => ({ type: PREVIOUS_PAGE });
const setNextPage = () => ({ type: NEXT_PAGE });

const toggleOrderBy = () => ({ type: TOGGLE_ORDER_BY });

export {
  charactersReducer,
  getCharacters,
  checkCharactersDone,
  checkCharactersError,
  setNameStartsWith,
  setCurrentPage,
  setPreviousPage,
  setNextPage,
  toggleOrderBy,
};
