import axios from "axios";

const request = axios.create({
  baseURL: "https://tech-courses-backend.onrender.com",
});

export default request;
