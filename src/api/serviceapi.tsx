import axios from "axios";

export const api = axios.create({
  baseURL: "http://192.168.9.249:9010",
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Erro na API:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);
