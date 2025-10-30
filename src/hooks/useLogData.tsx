import { useEffect, useState } from "react";
import { api } from "../api/serviceapi";

export function useLogData(idRonda: number) {
  const [resultTable, setResult] = useState<any[]>([]); 
  const [loadingTable, setLoading] = useState(true);

  useEffect(() => {
    if (!idRonda) {
      setResult([]);
      setLoading(false);
      return;
    }

    const fetchLogData = async () => {
      try {
        const response = await api.post("/geral/logData", { idRonda });
        const data = response.data ? [response.data] : []; // transforma em array

        // Parseia cada string JSON dentro de "data"
        const parsedData = data.map(item => ({
          ...item,
          data: Array.isArray(item.data)
            ? item.data.map((str: string) => JSON.parse(str))
            : []
        }));

        setResult(parsedData);
      } catch (error) {
        console.error(error);
        setResult([]);
      } finally {
        setLoading(false);
      }
    };

    fetchLogData();
  }, [idRonda]);

  return { resultTable, loadingTable };
}
