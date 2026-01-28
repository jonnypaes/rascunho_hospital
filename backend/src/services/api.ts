import axios from 'axios';

const api = axios.create({
  // Se estiver rodando localmente sem Docker para o front, use http://localhost:3000
  baseURL: 'http://localhost:3000', 
});

export default api;