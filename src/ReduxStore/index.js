import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { comicsReducer } from './comicsReducer';
import { charactersReducer } from './charactersReducer';
import { favoriteReducer } from './favoriteReducer';

const rootReducer = combineReducers({
  characters: charactersReducer,
  comics: comicsReducer,
  favorite: favoriteReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
