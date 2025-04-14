import { useState } from "react";
import styles from "../styles/components/Illustration.module.css";
import Circulo from "./Circulo";
import POLICIAL from '../assets/img/POLICIAL.png';
import Button from "../components/Button";
import LoginModal from "./modals/login/LoginModal";

export default function Illustration() {
  const [modalAberto, setModalAberto] = useState(false);

  const alternarModal = () => {
    setModalAberto(!modalAberto);
  };

  return (
    <div>
      <div className={styles.heppy}>
        <h1 className={styles.H1}>Bem-Vindo</h1>
        <h2 className={styles.H2}>Tijuca Ronda</h2>
      </div>

      <div className={styles.Botaos}>
        <Button title="Iniciar Sessão" script={alternarModal} tamanho="P" className={styles.Botao} />
        <Button title="Outro Botão" script={() => alert("Outro botão")} tamanho="P" className={styles.Botao1} />
      </div>

      <div className={styles.container}>
        <div className={styles.conner}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className={styles.Amarelo}>
          <path fill="#F5A802" fillOpacity="1" d="M0,215L1440,68L1440,320L0,320Z"></path>
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className={styles.branco}>
          <path fill="#fff" fillOpacity="1" d="M0,240L1440,90L1440,320L0,320Z"></path>
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className={styles.azul}>
          <path fill="#123465" fillOpacity="1" d="M0,250L1440,100L1440,320L0,320Z"></path>
        </svg>
        </div>
        <Circulo />
        <div className={styles.imagem}>
          <img src={POLICIAL} alt="Imagem de um policial" />
        </div>
      </div>

      {modalAberto ? <LoginModal fecharModal={alternarModal} /> : null}
    </div>
  );
}