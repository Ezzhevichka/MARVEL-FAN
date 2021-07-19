const FAVORITE = 'FAVORITES';
const FAVORITE_DONE = 'FAVORITES_SUCCESS';
const FAVORITE_ERROR = 'FAVORITES_ERROR';

const defaulState = {
  favorite: null,
  error: null,
  loading: true,
};

function favoriteReducer(state = defaulState, action) {
  switch (action.type) {
    case FAVORITE:
      return state;
    case FAVORITE_DONE:
      return { ...state, loading: false, favorite: action.payload };
    case FAVORITE_ERROR:
      return { ...state, loading: false, error: true };
    default:
      return state;
  }
}

const getFavorite = () => ({ type: FAVORITE });
const checkFavoriteDone = (favorite) => ({
  type: FAVORITE_DONE,
  payload: favorite,
});
const checkFavoriteError = () => ({ type: FAVORITE_DONE });

export {
  favoriteReducer,
  getFavorite,
  checkFavoriteDone,
  checkFavoriteError,
};
