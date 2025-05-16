import { useState, useEffect } from "react";
import { api } from "../api/serviceapi";

type LocalType = {
  idLocal: number;
  nomeLocal: string;
};


export const useLocal = () => {
  const [Local, setLocal] = useState<LocalType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLocal = async () => {
    setLoading(true);
    try {
      const response = await api.get("/local/list"); // LISTAR locais
      setLocal(response.data);
    } catch (err) {
      setError("Erro ao carregar locais");
    } finally {
      setLoading(false);
    }
  };

  const createLocal = async (nomeLocal: string) => {
    try {
      const response = await api.post("/local/create", { nomeLocal }); // CRIAR novo local
      if (response.status === 200 || response.status === 201) {
        await fetchLocal(); // Atualiza lista após criar
      }
    } catch (err) {
      setError("Erro ao criar local");
    }
  };

  useEffect(() => {
    fetchLocal();
  }, [reload]);

  console.log("Retorno da API Local:", Local);

  return { Local, loading, error, fetchLocal, createLocal };
};
