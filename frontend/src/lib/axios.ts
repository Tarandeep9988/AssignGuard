import axios from 'axios';

// Create an Axios instance
const api = axios.create({
  baseURL: '/api',
  withCredentials: true, 
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
