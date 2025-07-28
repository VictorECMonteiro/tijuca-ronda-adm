import { api } from './serviceapi';

// Função para listar todas as rotas
export const fetchRotas = async () => {
  try {
    const response = await api.get('/rota/list');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar rotas:', error);
    return [];
  }
};

// Função para criar uma nova rota
export const createRoute = async (payload: any) => {
  try {
    const { data } = await api.post('/rota/create', payload);
    return data;
  } catch (error) {
    console.error('Erro ao criar rota:', error);
    throw error;
  }
};

// Função para buscar locais de uma rota específica
export const fetchLocaisByRota = async (idRota: number) => {
  try {
    const response = await api.get('/rota/listLocals', {
      params: { idRota },
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar locais da rota:', error);
    return [];
  }
};

// Função para atualizar a ordem ou dados dos locais da rota (mesma rota, GET com parâmetros)
export const updateLocaisDaRota = async (idLocal: number, id: any[]) => {
  try {
    await api.get('/rota/listLocals', {
      params: { idLocal, id },
    });
    return true;
  } catch (error) {
    console.error('Erro ao atualizar locais da rota:', error);
    return false;
  }
};

// Função para definir o vigia (usuário) de uma rota
export const assignUserToRoute = async (idRota: number, idUsuario: number) => {
  try {
    await api.post('/rota/defUser', { idRota, idUsuario });
    return true;
  } catch (error) {
    console.error('Erro ao definir vigia:', error);
    return false;
  }
};
