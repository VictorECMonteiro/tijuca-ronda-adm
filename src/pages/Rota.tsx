import { ManagePage } from "../components/ManagePage";
import { useRoutes } from "../hooks/useRoutes";
import Sidebar from "../components/Sidebar";
import styles from "../styles/pages/Users.module.css"

const Rota = () => {
  const { rota, loading, error } = useRoutes();
  
    if (loading) return <p>Carregando...</p>;
    if (error) return <p>{error}</p>;

  return (
    <div className={styles.coniner}>
      <Sidebar />
      <div className={styles.content}>
    <ManagePage
      title="Gerenciar Rotas"
      description="Gerencie os locais que devem ser ligados com suas rondas"
      columns={[
        { label: "Nome", key: "nomeRota" },
        { label: "Nº Ronda", key: "idRota" },
        { label: "Horário Extra", key: "horarioInicio" },
      ]}
      data={rota}
      onAdd={() => console.log("Adicionar rota")}
      onDelete={(route) => console.log("Excluir:", rota)}
    />
    </div>
    </div>
  );
};

export default Rota;

