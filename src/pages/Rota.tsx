import { ManagePage } from "../components/ManagePage";
import { useRoutes } from "../hooks/useRoutes";
import { useState } from "react";
import Sidebar from "../components/Sidebar";

import styles from "../styles/pages/Users.module.css"
import LoadingComponent from "../components/LoadingComponent";
import CreateRouteModal from "../components/modals/CreateRouteModal";


export default function Rota() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rotas, setRotas] = useState<any[]>([]); // Adicionando o estado para rotas
  const { rota, loading, error } = useRoutes();

  const handleSuccess = () => {
    window.location.reload();
  };

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
            { label: "Id Ronda", key: "idRota" },
            { label: "Horário de Inicio", key: "horarioInicio" },
          ]}
          data={rota}
          onAdd={() => setIsModalOpen(true)}
          onDelete={(route) => console.log("Excluir:", rota)}
        />
      </div>
      {isModalOpen && (
        <CreateRouteModal
          onClose={() => setIsModalOpen(false)}
          onRouteCreated={(novaRota) => {
            setRotas((prev) => [...prev, novaRota]); // Agora setRotas está definido
          }}
        />
      )}
    </div>
  );
}
