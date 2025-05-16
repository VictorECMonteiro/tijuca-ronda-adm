import { useEffect, useState } from "react";
import { api } from "../api/serviceapi";

export const useLocal = () => {
  const [Local, setLocal] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchLocal = async () => {
    try {
      const response = await api.get("/local/create");
      setLocal(response.data);
      setLoading(false);
    } catch (error) {
      setError("Erro ao carregar locais");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLocal();
  }, []);

  return { Local, loading, error, fetchLocal };
};
