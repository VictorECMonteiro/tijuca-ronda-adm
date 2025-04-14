import { useState, useEffect } from "react";
import { api } from "../api/serviceapi";

type User = {
  id: number;
  nomedeUsuario: string;
  permissao: string;
  cpf: string;
  status: string;
};

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get("/login/listUsers"); 
        setUsers(response.data);
      } catch (err) {
        setError("Erro ao carregar usuários");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return { users, loading, error };
};

  