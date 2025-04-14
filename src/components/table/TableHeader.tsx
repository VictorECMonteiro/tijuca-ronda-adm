import styles from "../../styles/components/TableHeader.module.css";

type TableHeaderProps = {
  title: string;
  description: string;
};

export const TableHeader = ({ title, description }: TableHeaderProps) => {
  return (
    <div className={styles.heder}>
      <div>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
    </div>
  );
};
