import axios from 'axios';
import config from './config';

const { API_URL, API_KEY } = config;

function getAPI(url, params) {
  return axios.get(`${API_URL}${url}`, { params: { apikey: API_KEY, ...params } });
}

export default getAPI;
