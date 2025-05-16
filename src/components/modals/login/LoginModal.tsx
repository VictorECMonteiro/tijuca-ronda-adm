import React from "react";
import Button from "../../Button";
import styles from "../../../styles/modals/LoginModal.module.css";
import { useLoginModal } from "../../../hooks/useLginModal";

interface LoginModalProps {
  fecharModal: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ fecharModal }) => {
  const { cpf, senha, handleCPFChange, handleSenhaChange, handleLogin } = useLoginModal();

  return (
    <div className={styles.modalBackground} onClick={fecharModal}>
      <div className={styles.contner} onClick={(e) => e.stopPropagation()}>
        <header className={styles.tituloheader}>
          <p>Insira seus dados para</p>
          <h1>Iniciar Sessão</h1>
        </header>

        <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
          <label htmlFor="cpf">Insira seu CPF</label>
          <input
            id="cpf"
            type="text"
            placeholder="Digite seu CPF"
            value={cpf !== null ? cpf.toString() : ""}
            onChange={handleCPFChange}
            autoComplete="off"
            maxLength={14}
          />

          <label htmlFor="senha">Insira sua senha</label>
          <input
            id="senha"
            type="password"
            placeholder="Digite sua senha"
            value={senha}
            onChange={handleSenhaChange}
          />

          <div className={styles.saveinfo}>
            <input type="checkbox" id="manterConectado" />
            <label htmlFor="manterConectado">Manter-me conectado?</label>
          </div>

          <Button title="Entrar" script={handleLogin} tamanho="M" className={styles.Botao} />
        </form>
        <div className={styles.svgdiv}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 400">
            <path fill="#F5A802" fillOpacity="1" d="M0,192L1440,96L1440,320L0,320Z" className={styles.svg1}></path>
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path fill="#123465" fillOpacity="1" d="M0,192L1440,96L1440,320L0,320Z" className={styles.svg2}></path>
            <line x1="0" y1="190" x2="1600" y2="70" stroke="#FFF" strokeWidth="30"/>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
