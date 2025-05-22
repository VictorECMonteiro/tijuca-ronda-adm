import { ManagePage } from "../components/ManagePage";
import { useRoutes } from "../hooks/useRoutes";
import { useState } from "react";
import Sidebar from "../components/Sidebar";

import styles from "../styles/pages/Users.module.css"
import LoadingComponent from "../components/LoadingComponent";
import CreateRouteModal from "../components/modals/CreateRouteModal";
import { api } from "../api/serviceapi";
import { useRotaData } from "../hooks/useRotaData";


export default function Rota() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showDrop, setShowDrop] = useState(0)
  const [reload, setReload] = useState(false)
  const [rotas, setRotas] = useState<any[]>([]); // Adicionando o estado para rotas
  const { rota, loading, error } = useRoutes(reload);
  const {resultTable} = useRotaData(showDrop)

  const handleSuccess = () => {
    window.location.reload();
  };

  const clickDrop = (idRota) => {
    showDrop === idRota ? setShowDrop(0) : setShowDrop(idRota)

    // console.log(showDrop)s

  }



  const handleDelete = async (idRota)=>{
    try{
      const res = await api.post("/rota/delete", {
        idRota: idRota

      })
      setReload(!reload)

    }
    catch(e){
      alert("Erro ao excluir o usuário")

    }
  }



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
            { label: "Id da Rota", key: "idRota" },
            { label: "Horário de Inicio", key: "horarioInicio" },
          ]}
          // columnsDrop={[
          //   {label: "Nome Do Local", key: "nomeLocal"},
          //   {label: "Horario do Local", key: "horario"}
          // ]}
          dataDrop={resultTable}
          data={rota}
          onAdd={() => setIsModalOpen(true)}
          onDelete={(route) => handleDelete(route.idRota)}
          onClick={clickDrop}
          showDrop={showDrop}
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
