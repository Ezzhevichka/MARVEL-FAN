import axios from 'axios';
import config from './config';

const { SERVER_URL } = config;

function getFavorites(url) {
  return axios.get(`${SERVER_URL}${url}`);
}

function addFavorite(url, id) {
  return axios.post(`${SERVER_URL}${url}`, { id });
}

function removeFavorite(url, id) {
  return axios.post(`${SERVER_URL}${url}`, { id, remove: true });
}

export { getFavorites, addFavorite, removeFavorite };
