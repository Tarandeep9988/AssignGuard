import axios from 'axios';

// Create an Axios instance
// Base URL is pointing to Next.js itself because we have a proxy setup in next.config.ts
const api = axios.create({
  baseURL: '/api',
  withCredentials: true, // Important: This allows cookies to be sent with cross-origin requests, although proxy makes it same-origin
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
