import axios from "axios";

const api = axios.create({
  baseURL: "https://amachicms-be.onrender.com/api", // Adjust to your backend base URL
});

export default api;
