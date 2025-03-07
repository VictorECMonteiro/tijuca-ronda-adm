import styles from "../styles/Illustration.module.css";
import Circulo from "./Circulo"
import POLICIAL from '../assets/img/POLICIAL.png';

const Illustration = () => {
  return (
    <div>
      <div className={styles.heppy}>
        <h1>Bem-Vindo</h1>
        <h2>Tijuca Ronda</h2>
      </div>
    <div className={styles.container}>
      
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className={styles.Amarelo}>
        <path fill="#F5A802" fillOpacity="1" d="M0,215L1440,68L1440,320L0,320Z"></path>
      </svg>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className={styles.branco}>
        <path fill="#fff" fillOpacity="1" d="M0,240L1440,90L1440,320L0,320Z"></path>
      </svg>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className={styles.azul}>
        <path fill="#123465" fillOpacity="1" d="M0,250L1440,100L1440,320L0,320Z"></path>
      </svg>
      <Circulo/> 
      <div className={styles.imagem}>
      <img src={POLICIAL} />
      </div>
    </div>
   
    </div>
  );
};

export default Illustration;

