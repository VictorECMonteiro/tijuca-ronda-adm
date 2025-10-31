import GenericModal from "../GenericModal";
import styles from "../../../styles/modals/UserCreateModal.module.css";
import { useUserCreate } from "../../../hooks/useUserCreate";
import { useState, useEffect } from "react";
import { api } from "../../../api/serviceapi";
import Button from "../../Button";
import { removeFormatCPF } from "../../../utils/formatCPF";

type User = {
  idUsuario: number;
  cpf: string;
  nomedeUsuario: string;
  permissao: string;
};

type Props = {
  onClose: () => void;
  onSuccess: () => void;
  user?: User | null; // se tiver → edição
};

const UserCreateModal = ({ onClose, onSuccess, user }: Props) => {
  const { cpf, handleCPFChange, setCpf } = useUserCreate();
  const [nome, setNome] = useState("");
  const [senha, setSenha] = useState(""); // senha opcional na edição
  const [permissao, setPermissao] = useState("vigia");
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) {
      setCpf(user.cpf);
      setNome(user.nomedeUsuario);
      setPermissao(user.permissao);
      setSenha(""); 
    }
  }, [user, setCpf]);

  const handleSubmit = async () => {
    if (!cpf || !nome || !permissao || (!user && !senha)) {
      setError("Preencha todos os campos obrigatórios.");
      return;
    }

    try {
      if (user) {
        
        const payload: any = {
          idUsuario: user.idUsuario,
          cpf,
          nomedeUsuario: nome,
          permissao,
        };
        if (senha) payload.senhadeUsuario = senha;

        const response = await api.post("/login/userDataModify", payload);

        if (response.status === 200) {
          onSuccess();
          onClose();
        }
      } else {
        let cpfNoFormat = removeFormatCPF(cpf);
        console.log(cpfNoFormat)
        const response = await api.post("/login/create", {
          cpf: cpfNoFormat,
          nomedeUsuario: nome,
          senhadeUsuario: senha,
          permissao,
        });

        if (response.status === 200 || response.status === 201) {
          setCpf("");
          setNome("");
          setSenha("");
          setPermissao("vigia");
          setError("");
          onSuccess();
          onClose();
          alert("Usuario Criado com Sucesso")
        }
      }
    } catch {
      alert("Usuario Criado sem Sucesso")
      setError("Erro ao salvar usuário. Verifique os dados e tente novamente.");
    }
  };

  return (
    <GenericModal
      titlee={user ? "Editar usuário" : "Criar novo usuário"}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonTam="PPP"
      buttonText={user ? "Salvar alterações" : "Criar usuário"}
    >
      {error && <p className={styles.error}>{error}</p>}

      <div className={styles.input}>
        <div className={styles.inputGroup}>
          <label>CPF do usuário</label>
          <input
            className={styles.input1}
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
            className={styles.input1}
            type="text"
            placeholder="Digite o nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </div>

        <div className={styles.inputGroup}>
          <label>Senha do usuário {user ? "(preencha para alterar)" : ""}</label>
          <input
            className={styles.input1}
            type="password"
            placeholder="Digite a senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
        </div>

        <div className={styles.selectcont2}>
          <label className={styles.label1}>Função</label>
          <select
            className={styles.select2}
            value={permissao}
            onChange={(e) => setPermissao(e.target.value)}
          >
            <option value="admin">Administrador</option>
            <option value="vigia">Vigia</option>
          </select>
        </div>
        <Button tamanho="PP" script={handleSubmit} title={"Adicionar Usuário"}/>

        
      </div>
    </GenericModal>
  );
};

export default UserCreateModal;
