import styles from "../styles/Illustration.module.css";
const Illustration = () => {
  return (
    <div className={styles.container}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className={styles.wave}>
        <path fill="#0099ff" fillOpacity="1" d="M0,224L1440,96L1440,320L0,320Z"></path>
      </svg>
    </div>
  );
};

export default Illustration;