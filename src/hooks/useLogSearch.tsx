import { useEffect, useState } from "react";
import { api } from "../api/serviceapi";

export function useLogSearch(list: any[]) {
  const [result, setResult] = useState<any[]>([]);

  useEffect(() => {
    const idRondaList = list.map(item => item.idRonda).filter(Boolean);
    if (!idRondaList.length) {
      setResult([]);
      return;
    }

    const fetchSearch = async () => {
      try {
        const response = await api.post("/geral/searchLog", { idRonda: idRondaList });
        setResult(response.data || []);
      } catch (error) {
        console.error("Erro ao buscar logs:");
        setResult([]);
      }
    };

    fetchSearch();
  }, [list]);

  return { result };
}
