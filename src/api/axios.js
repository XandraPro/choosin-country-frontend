import axios from 'axios';

const api = axios.create({
  baseURL: "https://choosin-country-backend.onrender.com/api",
  });

export default api;