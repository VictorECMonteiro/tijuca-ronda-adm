import { useState, useEffect } from "react";
import { api } from "../api/serviceapi";

type Local = {
  idLocal: number;
  nomeLocal: string;
};

export const useLocal = (reload:any) => {
  const [Local, setLocal] = useState<Local[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  console.log("Retorno da API Local:", Local)

  useEffect(() => {
    const fetchLocal = async () => {
      try {
        const response = await api.get("/local/list"); 
        setLocal(response.data);
      } catch (err) {
        setError("Erro ao carregar locais");
      } finally {
        setLoading(false);
      }
    };

    fetchLocal();
  }, [reload]);

  return { Local, loading, error };
};
