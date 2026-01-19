import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://swapi.py4e.com/api",
  timeout: 5000,
});

export default axiosInstance;
