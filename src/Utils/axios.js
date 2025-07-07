// src/utils/axios.js
import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true, // only if you're using cookies/authentication
});

export default instance;
