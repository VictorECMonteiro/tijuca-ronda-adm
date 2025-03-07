import styles from "../styles/Circulo.module.css";
import POLICIAL from '../assets/img/POLICIAL.png';


const Circles = () => {
  return (
    <div className={styles.cont}>
      <div className={styles.outerCircle}>
        <div className={styles.innerCircle}>
        </div>
      </div>
    </div>
  );
};

export default Circles;
