import axios from 'axios';

const instance = axios.create({
  baseURL: "https://choosin-country-backend.onrender.com/api"
  });

export default instance;