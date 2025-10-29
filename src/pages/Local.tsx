import { ManagePage } from "../components/table/ManagePage";
import { useLocal } from "../hooks/useLocal";
import hamburguer from "../assets/img/list.svg"
import styles from "../styles/pages/Logs.module.css";
import userPrint from "../hooks/userPrint";
import Sidebar from "../components/Sidebar";
import { useState } from "react";
import PrintLocal from "../components/PrintLocal";
import { api } from "../api/serviceapi";
import LoadingComponent from "../components/LoadingComponent";
import ModalLocal from "../components/modals/ModalLocal";
import ConfirmDeleteModal from "../components/modals/ConfirmDeleteModal";

const printLocalStyle = require("../styles/components/PrintLocal.js");

const Local = () => { 
  const [reload, setReload] = useState(false)
  const [isSideOpen, setIsSideOpen] = useState(false)
  const { Local, loading, error } = useLocal(reload);
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedLocal, setSelectedLocal] = useState<any | null>(null);

  const print = async (localObject) => {
    const content = await userPrint(<PrintLocal idLocal={localObject.idLocal} nomeLocal={localObject.nomeLocal} />);
    const windows: any = window.open('', '', 'width=800,height=600');
    await windows.document.write(`
        <html>
            <head>
                <title>PRINT TEST</title>
                 <style>${printLocalStyle}</style>
            </head>
            `);
    await windows.document.write(`<body>${content}</body>`);
    await windows.document.write("</html>");  
    setTimeout(()=>{ windows.print() }, 500)
  };

  const handleDeleteClick = (item: any) => {
    setSelectedLocal(item);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedLocal) return;
    try {
      await api.post("/local/delete", { idLocal: selectedLocal.idLocal });
      setReload(!reload);
    } catch (e) {
      alert("Erro ao excluir Local.");
    } finally {
      setIsDeleteModalOpen(false);
    }
  };

  return (
    <div className={styles.coniner}>
      <div className={styles.hamburguer}>
        <a onClick={()=>{setIsSideOpen(!isSideOpen)}} className={styles.sideButton}>
          <img src={hamburguer} alt="" />
        </a>
      </div>
      <Sidebar isOpen={isSideOpen} closeSide={setIsSideOpen}/>

      <div className={styles.table}>
        {error && <p>{error}</p>}
        {!loading && !error && (
          <ManagePage
            title="Gerenciar Locais"
            description="Adicione novos locais para sua ronda"
            columns={[
              { label: "Nome", key: "nomeLocal" },
              { label: "IdLocal", key: "idLocal" },
            ]}
            data={Local}
            onAdd={() => setIsModalOpen(true)} 
            onDelete={handleDeleteClick}
            onPrint={print}
          />
        )}

        {isModalOpen && (
          <ModalLocal 
            reload={reload} 
            onClose={() => {
              setIsModalOpen(false);
              setReload(!reload);
            }} 
          />
        )}

        <ConfirmDeleteModal
          isOpen={isDeleteModalOpen}
          message={`Deseja realmente excluir o local "${selectedLocal?.nomeLocal}"?`}
          onConfirm={confirmDelete}
          onCancel={() => setIsDeleteModalOpen(false)}
        />
      </div>
    </div>
  );
};

export default Local;
