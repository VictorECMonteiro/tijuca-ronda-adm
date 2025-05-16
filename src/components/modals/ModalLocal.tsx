import GenericModal from "./GenericModal";
// import styles from "../../styles/modals/GenericModal.module.css";
import styles from "../../styles/modals/modalLocal.module.css"
import { useState } from "react";
import { useLocal } from "../../hooks/useLocal";


const ModalLocal = ({ onClose }) => {
  const [local, setLocal] = useState("");
  const { createLocal } = useLocal(); 

  const handleSubmit = async () => {
    if (!local.trim()) return; 
    try {
      await createLocal(local);
      onClose();  
      setLocal(""); 
    } catch (error) {
      console.error("Erro ao criar Local:", error);
    }
  };

  return (
    <GenericModal
    titlee="Criar Local"
    onClose={onClose}
    onSubmit={handleSubmit}
    buttonTam="Pa" 
    buttonText="Criar local"
  >
  
      <div className={styles.input}>
        <div className={styles.inputGroup}>
          <label>Nome do Local</label> 
          <input 
           className={styles.input1}
            type="text"
            placeholder="Nome do Local"
            value={local}
            onChange={(e) => setLocal(e.target.value)}
          />
        </div>
      </div>
    </GenericModal>
  );
};

export default ModalLocal;
