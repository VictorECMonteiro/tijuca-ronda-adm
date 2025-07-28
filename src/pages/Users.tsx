// import { useState, useEffect } from "react";
// import { ManagePage } from "../components/table/ManagePage";
// import Sidebar from "../components/Sidebar";
// import styles from "../styles/pages/Users.module.css";
// import UserCreateModal from "../components/modals/login/UserCreateModal";
// import { fetchUsers as fetchUsersFromService } from "../api/userService";
// import { api } from "../api/serviceapi";

// type User = {
//   idUsuario: number;
//   nomedeUsuario: string;
//   permissao: string;
//   cpf: string;
//   status: string;
// };

// const Users = () => {
//   const [users, setUsers] = useState<User[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const fetchAndSetUsers = async () => {
//     try {
//       setLoading(true);
//       const data = await fetchUsersFromService();
//       setUsers(data);
//     } catch (err) {
//       setError("Erro ao carregar usuários");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchAndSetUsers();
//   }, []);

//   const handleDeleteUser = async (user: User) => {
//     try {
//       await api.post(`/login/deactivate${user.idUsuario}`);
//       setUsers((prevUsers) =>
//         prevUsers.filter((u) => u.idUsuario !== user.idUsuario)
//       );
//     } catch (err) {
//       console.error("Erro ao deletar usuário:", err);
//       alert("Erro ao deletar usuário. Tente novamente.");
//     }
//   };

//   const columns: { label: string; key: keyof User }[] = [
//     { label: "Nome", key: "nomedeUsuario" },
//     { label: "Função", key: "permissao" },
//     { label: "CPF", key: "cpf" },
//     { label: "Status", key: "status" },
//   ];

//   if (loading) return <p>Carregando...</p>;
//   if (error) return <p>{error}</p>;

//   return (
//     <div className={styles.coniner}>
//       <Sidebar />
//       <div className={styles.content}>
//         <ManagePage<User>
//           title="Gerenciar Usuários"
//           description="Crie, edite e modifique usuários"
//           columns={columns}
//           data={users}
//           onAdd={() => setIsModalOpen(true)}
//           onEdit={() => console.log("Editar usuário")}
//           onDelete={handleDeleteUser}
//         />
//         {isModalOpen && (
//           <UserCreateModal
//             onClose={() => setIsModalOpen(false)}
//             onSuccess={fetchAndSetUsers}
//           />
//         )}
//       </div>
//     </div>
//   );
// };

// export default Users;
import { useState, useEffect } from "react";
import { ManagePage } from "../components/table/ManagePage";
import Sidebar from "../components/Sidebar";
import styles from "../styles/pages/Users.module.css";
import UserCreateModal from "../components/modals/login/UserCreateModal";
import { fetchUsers as fetchUsersFromService } from "../api/userService";
import { api } from "../api/serviceapi";
import StatusDot from "../components/StatusDot";

type User = {
  idUsuario: number;
  nomedeUsuario: string;
  permissao: string;
  cpf: string;
  status: number;
};

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchAndSetUsers = async () => {
    try {
      setLoading(true);
      const data = await fetchUsersFromService();
      setUsers(data);
    } catch (err) {
      setError("Erro ao carregar usuários");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAndSetUsers();
  }, []);

  const handleDeleteUser = async (user: User) => {
    try {
      await api.post(`/login/deactivate${user.idUsuario}`);
      setUsers((prevUsers) =>
        prevUsers.filter((u) => u.idUsuario !== user.idUsuario)
      );
    } catch (err) {
      console.error("Erro ao deletar usuário:", err);
      alert("Erro ao deletar usuário. Tente novamente.");
    }
  };

  const columns: { label: string; key: keyof User }[] = [
    { label: "Nome", key: "nomedeUsuario" },
    { label: "Função", key: "permissao" },
    { label: "CPF", key: "cpf" },
    { label: "Status", key: "status" },
  ];

  
  const formattedUsers = users.map((user) => ({
    ...user,
    status: <StatusDot status={user.status} />,
  }));

  
  const handleDeleteFormatted = (item: typeof formattedUsers[0]) => {
    const originalUser = users.find((u) => u.idUsuario === item.idUsuario);
    if (originalUser) handleDeleteUser(originalUser);
  };

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className={styles.coniner}>
      <Sidebar />
      <div className={styles.content}>
        <ManagePage<typeof formattedUsers[0]>
          title="Gerenciar Usuários"
          description="Crie, edite e modifique usuários"
          columns={columns}
          data={formattedUsers}
          onAdd={() => setIsModalOpen(true)}
          onEdit={() => console.log("Editar usuário")}
          onDelete={handleDeleteFormatted} 
        />
        {isModalOpen && (
          <UserCreateModal
            onClose={() => setIsModalOpen(false)}
            onSuccess={fetchAndSetUsers}
          />
        )}
      </div>
    </div>
  );
};

export default Users;
