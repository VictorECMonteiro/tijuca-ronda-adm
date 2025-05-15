import { useState, useEffect } from "react";
import { ManagePage } from "../components/ManagePage";
import Sidebar from "../components/Sidebar";
// import styles from "../styles/pages/Users.module.css";
import styles from "../styles/pages/Logs.module.css"
import UserCreateModal from "../components/modals/login/UserCreateModal";
import { api } from "../api/serviceapi";
import hamburguer from "../assets/img/list.svg"
import LoadingComponent from "../components/LoadingComponent";

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
  const [isSideOpen, setIsSideOpen] = useState(false)

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

  if (loading) return <LoadingComponent/>;
  if (error) return <p>{error}</p>;

  return (
    <div className={styles.container}>
        <div className={styles.hamburguer}>
              <a onClick={() => setIsSideOpen(!isSideOpen)} className={styles.sideButton}>
                <img src={hamburguer} alt="" />
              </a>
        </div>
      <div className={styles.divTeste}>
        <Sidebar isOpen={isSideOpen} closeSide={setIsSideOpen}/>
      </div>
      <div className={styles.table}>
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
