import axios from 'axios';

const api = axios.create({
  baseURL: 'http://172.27.128.1:3330',
});

export default api;
