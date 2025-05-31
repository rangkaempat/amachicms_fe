import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:10000/api", // Adjust to your backend base URL
});

export default api;
