
import { useUsers } from "../hooks/userUsers";
import { ManagePage } from "../components/ManagePage";
import Sidebar from "../components/Sidebar";
import styles from "../styles/pages/Users.module.css";

type User = {
  id: number;
  nomedeUsuario: string;
  permissao: string;
  cpf: string;
  status: string;
};

const Users = () => {
  const { users, loading, error } = useUsers();

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;

  const columns: { label: string; key: keyof User }[] = [
    { label: "Nome", key: "nomedeUsuario" },
    { label: "Função", key: "permissao" },
    { label: "CPF", key: "cpf" },
    { label: "Status", key: "status" },
  ];

  return (
    <div className={styles.coniner}>
      <Sidebar />
      <div className={styles.content}>
      <ManagePage<User>
  title="Gerenciar Usuários"
  description="Crie, edite e modifique usuários"
  columns={columns}
  data={users}
  onAdd={() => console.log("Adicionar usuário")}
  onEdit={() => console.log("Editar usuário")}
  onDelete={() => console.log("Deletar")}
/>


      </div>
    </div>
  );
};

export default Users;


