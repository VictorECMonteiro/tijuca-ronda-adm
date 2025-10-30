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


export const assignUserToRoute = async (idRota: number, idUsuario: number) => {
  try {
    const { data } = await api.post('/rota/defUser', { idRota, idUsuario });
    return data.success === true;
  } catch (error) {
    console.error('Erro ao definir vigia:', error);
    return false;
  }
};

export const changeLocalOrder = async (payload: {
  idRota: number;
  listaAnterior: number[];
  listaAtual: number[];
}): Promise<boolean> => {
  try {
    const response = await api.post("/rota/changeLocalOrder", payload);
    // return response.data?.success === true;
    return response.data
  } catch (error: any) {
    console.error("Erro ao atualizar ordem das rotas:", error.response?.data || error.message || error);
    return false; 
  }
};




export const deleteRota = async (idRota: number): Promise<boolean> => {
  try {
    const response = await api.post(`/rota/delete`, { idRota });
    if (response.data?.success) {
      return true;
    } else {
      console.error("Erro ao excluir rota no servidor:", response.data?.msg);
      return false;
    }
  } catch (error: any) {
    console.error("Erro na API:", error.response?.data || error.message || error);
    return false;
  }
}