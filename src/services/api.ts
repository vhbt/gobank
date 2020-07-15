import axios from 'axios';

const api = axios.create({
  baseURL: 'https://localhost:3333',
  timeout: 30000,
});

export default api;
