
import { api } from './serviceapi';

export const fetchUsers = async () => {
  try {
    const response = await api.get('/login/listUsers');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    return [];
  }
};

export const fetchLocais = async () => {
  try {
    const response = await api.get('/local/list');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar locais:', error);
    return [];
  }
};

export const createRoute = async (payload: any) => {
  const { data } = await api.post('/rota/create', payload);
  return data;
};
