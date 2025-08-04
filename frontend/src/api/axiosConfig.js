import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: https://employee-checkin-system.onrender.com/api,  // Change backend URL for production
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;