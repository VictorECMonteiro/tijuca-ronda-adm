import { ManagePage } from "../components/ManagePage";
import { useRoutes } from "../hooks/useRoutes";
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import styles from "../styles/pages/Users.module.css"
import LoginModal from "../components/modals/login/LoginModal";
import LoadingComponent from "../components/LoadingComponent";


  export default function Rota() {
    const [modalAberto, setModalAberto] = useState(false);
    const { rota, loading, error } = useRoutes();

    const alternarModal = () => {
      setModalAberto(!modalAberto);
    };
  
    if (loading) return <LoadingComponent />;
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
      onAdd= {alternarModal}
      onDelete={(route) => console.log("Excluir:", rota)}
    />
    </div>
    {modalAberto ? <LoginModal fecharModal={alternarModal} /> : null}
    </div>
  );
};


