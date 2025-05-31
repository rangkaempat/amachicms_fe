import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5001/api", // Adjust to your backend base URL
});

export default api;
