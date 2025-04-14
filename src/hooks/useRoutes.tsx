import { useState, useEffect } from "react";
import { api } from "../api/serviceapi";

type Rota = {
  idRota: number;
  nomeRota: string;
  horarioInicio: number;
  idUsuario: number;
};

export const useRoutes = () => {
  const [rota, setRota] = useState<Rota[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const response = await api.get("/rota/list"); 
        setRota(response.data);
      } catch (err) {
        setError("Erro ao carregar rotas");
      } finally {
        setLoading(false);
      }
    };

    fetchRoutes();
  }, []);

  return { rota, loading, error };
};
