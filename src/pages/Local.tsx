import { ManagePage } from "../components/ManagePage";
import { useLocal } from "../hooks/useLocal";
import styles from "../styles/pages/Users.module.css";
import Sidebar from "../components/Sidebar";

const Local = () => {
  const { Local, loading, error } = useLocal();

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className={styles.coniner}>
    <Sidebar />
    <div className={styles.content}>
    <ManagePage
      title="Gerenciar Locais"
      description="Adicione novos locais para sua ronda"
      columns={[
        { label: "Nome", key: "nomeLocal" },
        { label: "IdLocal", key: "idLocal" },
      ]}
      data={Local}
      onAdd={() => console.log("Adicionar local")}
      onEdit={(Local) => console.log("Editar:", Local)}
      onDelete={(Local) => console.log("Excluir:", Local)}
    />

   </div>
</div>
  );
};

export default Local;
