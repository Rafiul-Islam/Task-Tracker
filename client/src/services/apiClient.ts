import axios from "axios";
import {Cookies} from "react-cookie";
import logout from "./auth/logout.ts";

const cookies = new Cookies();

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000"
});

axiosInstance.interceptors.request.use((config) => {
  const token = cookies.get('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, (error) => {
  return Promise.reject(error);
})

// Add a response interceptor
axiosInstance.interceptors.response.use(
    response => response,
    error => {
      if (error.response && error.response.status === 401) {
        logout() // for logout
      }
      return Promise.reject(error);
    }
);

export default axiosInstance;
