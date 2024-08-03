import axios from "axios";
import {Cookies} from "react-cookie";

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


export default axiosInstance;
