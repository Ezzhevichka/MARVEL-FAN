const COMICS = 'COMICS';
const COMICS_DONE = 'COMICS_DONE';
const COMICS_ERROR = 'COMICS_ERROR';

const defaultState = {
  comics: null,
  error: null,
  loading: true,
};

function comicsReducer(state = defaultState, action) {
  switch (action.type) {
    case COMICS:
      return state;
    case COMICS_DONE:
      return {
        ...state,
        loading: false,
        comics: action.payload.comics,
        favorites: action.payload.favorites,
      };
    case COMICS_ERROR:
      return { ...state, loading: false, error: true };
    default:
      return state;
  }
}

const getComics = () => ({ type: COMICS });
const checkComicsDone = (comics) => ({ type: COMICS_DONE, payload: comics });
const checkComicsError = () => ({ type: COMICS_ERROR });

export {
  comicsReducer,
  getComics,
  checkComicsDone,
  checkComicsError,
};
