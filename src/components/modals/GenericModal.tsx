import React from "react";
import styles from "../../styles/modals/GenericModal.module.css";
import Button from "../Button";

interface GenericModalProps {
  titlee: string;
  children: React.ReactNode;
  onClose: () => void;
  onSubmit: () => void;
  buttonText: string;
}

const GenericModal: React.FC<GenericModalProps> = ({
  titlee,
  children,
  onClose,
  onSubmit,
  buttonText,
}) => {
  return (
    <div className={styles.modalBackground} onClick={onClose}>
      <div className={styles.contner} onClick={(e) => e.stopPropagation()}>

        <header className={styles.tituloheader}>
          <h1 className={styles.Hum}>{titlee}</h1>
        </header>

        <form className={styles.form} onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
          {children}

          
        </form>
        <Button title={buttonText} script={onSubmit} tamanho="MM" className={styles.Botao} />

         <div className={styles.svgdiv}>
         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                  <path fill="#F5A802" fill-opacity="1" d="M0,1L1860,160L1440,33040L0,320Z"  className={styles.svg2}></path>
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                  <path fill="#123465" fill-opacity="1" d="M0,50L1540,170L1440,320L0,320Z"  className={styles.svg2}></path> 
                  <line x1="0" y1="42" x2="1600" y2="180" stroke="#FFF123" strokeWidth="20"/></svg>
                </div>
              </div>
            </div>
  );
};

export default GenericModal;
