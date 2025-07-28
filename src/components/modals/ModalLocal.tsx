import GenericModal from "./GenericModal";
import styles from "../../styles/modals/modalLocal.module.css";
import { useState } from "react";
import { useLocal } from "../../hooks/useLocal";

const ModalLocal = ({ onClose }) => {
  const [local, setLocal] = useState("");
  const [error, setError] = useState("");
  const { createLocal } = useLocal(); 

  const handleSubmit = async () => {
    if (!local.trim()) {
      setError("O nome do local é obrigatório.");
      return;
    }

    try {
      await createLocal(local);
      setLocal("");
      setError("");
      onClose();  
    } catch (error) {
      setError("Erro ao criar Local. Tente novamente.");
    }
  };

  return (
    <GenericModal
      titlee="Criar Local"
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonTam="PPP"
      buttonText="Criar local"
    >
      {error && <p className={styles.error}>{error}</p>}

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
