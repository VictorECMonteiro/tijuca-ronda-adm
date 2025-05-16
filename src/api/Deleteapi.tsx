
import { api } from './serviceapi';

export const deleteRota = async (idRota: number) => {
  try {
    const response = await api.delete(`/rota/delete/${idRota}`);
  return response.data;
  } catch (error) {
    console.error('Erro ao deletar:', error);
    return [];
  }
};

export const deleteLocal = async (idLocal: number) => {
  try {
    const response = await api.delete(`/local/delete/${idLocal}`);
  return response.data;
  } catch (error) {
    console.error('Erro ao deletar Local:', error);
    return [];
  }
};
