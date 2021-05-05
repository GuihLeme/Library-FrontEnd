import axios from 'axios';

const api = axios.create({
  baseURL: 'https://library-api.guihleme.xyz/',
});

export default api;
