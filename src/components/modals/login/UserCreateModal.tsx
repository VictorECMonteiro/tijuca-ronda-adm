import { useUserCreate } from "../../../hooks/useUserCreate";
import GenericModal from "../GenericModal";
import styles from "../../../styles/modals/GenericModal.module.css";
import { useState } from "react";
import { api } from "../../../api/serviceapi";

const UserCreateModal = ({ onClose, onSuccess }) => {
  const { cpf, handleCPFChange, setCpf } = useUserCreate();
  const [nome, setNome] = useState("");
  const [senha, setSenha] = useState("");
  const [permissao, setPermissao] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await api.post("/login/create", {
        cpf,
        nomedeUsuario: nome,
        senhadeUsuario: senha,
        permissao,
      });

      if (response.status === 200 || response.status === 201) {
        onSuccess(); 
        onClose();  
        setCpf(""); 
        setNome("");
        setSenha("");
        setPermissao("vigia");
      }
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
    }
  };
  return (
    <GenericModal
      titlee="Criar novo usuário"
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText="Cadastrar usuário"
    >
      <div className={styles.input}>
        <div className={styles.inputGroup}>
          <label>CPF do usuário</label>
          <input
            type="text"
            placeholder="Digite o CPF"
            value={cpf}
            onChange={handleCPFChange}
            autoComplete="off"
            maxLength={14}
          />
        </div>

        <div className={styles.inputGroup}>
          <label>Nome do usuário</label>
          <input
            type="text"
            placeholder="Digite o nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </div>

        <div className={styles.inputGroup}>
          <label>Senha do usuário</label>
          <input
            type="password"
            placeholder="Digite a senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
        </div>

        <div className={styles.selectcont}>
          <label>Função</label>
          <select
            className={styles.select}
            value={permissao}
            onChange={(e) => setPermissao(e.target.value)}
          >
            <option value="admin">Administrador</option>
            <option value="vigia">Vigia</option>
          </select>
        </div>
      </div>
    </GenericModal>
  );
};

export default UserCreateModal;
