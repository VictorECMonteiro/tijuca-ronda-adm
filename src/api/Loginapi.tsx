import axios from "axios";

const API_LOGIN = "http://192.168.2.211:9010";

export const login = async (cpf, senha) => {
  try {
    const response = await axios.post(`${API_LOGIN}/login/LoginHandle`, {
      cpf,
      senhadeUsuario: senha,
    });
    
    return response.data;
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    return false;
  }
};