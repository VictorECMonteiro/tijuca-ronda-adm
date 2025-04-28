import { useEffect, useState } from "react";
import { api } from "../api/serviceapi";

type Local = {
    id: number;
    horario: string;
    idRota: number;
    idLocal: number;
  };
 type Rota = {
  idRota: number;
  nomeRota: string;
  horarioInicio: string;
  idUsuario: number;
}
  
type RondaTipoData = {
    idRonda: number;
    nomeRota: string;
    horaInicio?: string | null;
    horaFim?: string | null;
    data?: string;
    observacao?: string | null;
    status?: number;
    idRota?: number;
    idUsuario?: number;
    retrievingLocals?: Local[];
    retrievingRoute?: Rota[];
  };
  










export const useLogsFetch = ()=>{
  const [Logs, setLocal] = useState<RondaTipoData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

//   console.log("Retorno da API Local:", Local)

  useEffect(() => {
    const fetchLocal = async () => {
      try {
        const response = await api.get("/ronda/createAndReturn"); 
        setLocal(response.data);
      } catch (err) {
        setError("Erro ao carregar locais");
      } finally {
        setLoading(false);
      }
    };

    fetchLocal();
  }, []);

  return { Logs, loading, error };
}
 