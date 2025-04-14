import axios from "axios";

const API_LIST = "http://192.168.9.249:9010";

export const fetchUsers = async () => {
  try {
    const response = await axios.get(`${API_LIST}/login/listUsers`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    return [];
  }
};