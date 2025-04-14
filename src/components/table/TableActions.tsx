import styles from "../../styles/components/TableActions.module.css";
import deleteIcon from "../../assets/img/delete.png";
import editIcon from "../../assets/img/edit.png";

type TableActionsProps = {
  onEdit?: () => void;
  onDelete?: () => void;
};

export const TableActions = ({ onEdit, onDelete }: TableActionsProps) => {
  return (
    <div className={styles.actions}>
      {onEdit && <img src={editIcon} alt="Editar" onClick={onEdit} className={styles.icon} />}
      {onDelete && <img src={deleteIcon} alt="Excluir" onClick={onDelete} className={styles.icon} />}
    </div>
  );
};
