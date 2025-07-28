import styles from "../styles/StatusDot.module.css";

type StatusDotProps = {
  status: number;
};

const StatusDot = ({ status }: StatusDotProps) => {
  const isActive = status === 1; 

  return (
    <span
      className={`${styles.statusDot} ${
        isActive ? styles.statusActive : styles.statusInactive
      }`}
      title={isActive ? "Ativo" : "Inativo"}
    />
  );
};

export default StatusDot;

