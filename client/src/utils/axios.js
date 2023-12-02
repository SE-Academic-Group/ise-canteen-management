import axios from "axios";

const axiosClient = axios.create({
  withCredentials: true,
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

export default axiosClient;
