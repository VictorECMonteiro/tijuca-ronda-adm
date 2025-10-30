import { useState, useEffect } from "react";
import { ManagePage } from "../components/table/ManagePage";
import Sidebar from "../components/Sidebar";
import styles from "../styles/pages/Logs.module.css";
import UserCreateModal from "../components/modals/login/UserCreateModal";
import { fetchUsers as fetchUsersFromService } from "../api/userService";
import { api } from "../api/serviceapi";
import StatusDot from "../components/StatusDot";
import hamburguer from "../assets/img/list.svg";
import LoadingComponent from "../components/LoadingComponent";
import ConfirmDeleteModal from "../components/modals/ConfirmDeleteModal";

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
  const [loadingAction, setLoadingAction] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSideOpen, setIsSideOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const [reload, setReload] = useState(false);

  const fetchAndSetUsers = async () => {
    try {
      setLoading(true);
      const data = await fetchUsersFromService();
      setUsers(data);
    } catch {
      setError("Erro ao carregar usuários");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAndSetUsers();
  }, [reload]);

  const handleDeleteUser = async () => {
    if (!selectedUser) return;
    setLoadingAction(true); 
    try {
      const response = await api.post("/login/deactivate", { idUsuario: selectedUser.idUsuario });
      if (response.status === 200) {
        setReload(!reload);
      } else {
        alert("Erro ao desativar usuário.");
      }
    } catch {
      alert("Erro ao desativar usuário.");
    } finally {
      setLoadingAction(false);
      setIsDeleteModalOpen(false);
      setSelectedUser(null);
    }
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (user: User) => {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  };

  const columns: { label: string; key: keyof User }[] = [
    { label: "Nome", key: "nomedeUsuario" },
    { label: "Função", key: "permissao" },
    { label: "CPF", key: "cpf" },
    { label: "Status", key: "status" },
  ];

  const formattedUsers = users.map(user => ({
    ...user,
    status: <StatusDot status={user.status} />,
  }));

  const handleDeleteFormatted = (item: typeof formattedUsers[0]) => {
    const originalUser = users.find(u => u.idUsuario === item.idUsuario);
    if (originalUser) handleDeleteClick(originalUser);
  };

  if (loading) return <LoadingComponent />;

  return (
    <div className={styles.coniner}>
      <div className={styles.hamburguer}>
        <a onClick={() => setIsSideOpen(!isSideOpen)} className={styles.sideButton}>
          <img src={hamburguer} alt="menu" />
        </a>
      </div>

      <Sidebar isOpen={isSideOpen} closeSide={setIsSideOpen} />

      <div className={styles.table}>
        <ManagePage<typeof formattedUsers[0]>
          title="Gerenciar Usuários"
          description="Crie, edite e modifique usuários"
          columns={columns}
          data={formattedUsers}
          onAdd={() => {
            setEditingUser(null); 
            setIsModalOpen(true);
          }}
          onEdit={(item) => {
            const originalUser = users.find(u => u.idUsuario === item.idUsuario);
            if (originalUser) handleEditUser(originalUser);
          }}
          onDelete={handleDeleteFormatted}
        />

        {isModalOpen && (
          <UserCreateModal
            user={editingUser}
            onClose={() => setIsModalOpen(false)}
            onSuccess={() => setReload(!reload)}
          />
        )}

        <ConfirmDeleteModal
          isOpen={isDeleteModalOpen}
          message={`Deseja realmente excluir o usuário "${selectedUser?.nomedeUsuario}"?`}
          onConfirm={handleDeleteUser}
          onCancel={() => {
            setIsDeleteModalOpen(false);
            setSelectedUser(null);
          }}
        />
      </div>
    </div>
  );
};

export default Users;
