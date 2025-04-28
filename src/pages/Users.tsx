import { useState, useEffect } from "react";
import { ManagePage } from "../components/ManagePage";
import Sidebar from "../components/Sidebar";
import styles from "../styles/pages/Users.module.css";
import UserCreateModal from "../components/modals/login/UserCreateModal";
import { api } from "../api/serviceapi";

type User = {
  id: number;
  nomedeUsuario: string;
  permissao: string;
  cpf: string;
  status: string;
};

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false); 

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await api.get("/login/listUsers");
      setUsers(response.data);
    } catch (err) {
      setError("Erro ao carregar usuários");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const columns: { label: string; key: keyof User }[] = [
    { label: "Nome", key: "nomedeUsuario" },
    { label: "Função", key: "permissao" },
    { label: "CPF", key: "cpf" },
    { label: "Status", key: "status" },
  ];

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className={styles.coniner}>
      <Sidebar />
      <div className={styles.content}>
        <ManagePage<User>
          title="Gerenciar Usuários"
          description="Crie, edite e modifique usuários"
          columns={columns}
          data={users}
          onAdd={() => setIsModalOpen(true)} 
          onEdit={() => console.log("Editar usuário")}
          onDelete={() => console.log("Deletar")}
        />

        {isModalOpen && (
          <UserCreateModal
            onClose={() => setIsModalOpen(false)}
            onSuccess={fetchUsers} 
          />
        )}
      </div>
    </div>
  );
};

export default Users;
