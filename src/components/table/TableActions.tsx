import styles from "../../styles/table/TableActions.module.css";
import deleteIcon from "../../assets/img/delete.png";
import editIcon from "../../assets/img/edit.png";
import printIcon from "../../assets/img/printer.png"

type TableActionsProps = {
  onEdit?: () => void;
  onDelete?: () => void;
  onPrint?: ()=> void
};

export const TableActions = ({ onEdit, onDelete, onPrint }: TableActionsProps) => {
  return (
    <div className={styles.actions}>
      {onEdit && <img src={editIcon} alt="Editar" onClick={onEdit} className={styles.icon} />}
      {onDelete && <img src={deleteIcon} alt="Excluir" onClick={onDelete} className={styles.icon} />}
      {onPrint && <img src={printIcon} alt="Imprimir" onClick={onPrint} className={styles.icon}/>}
    </div>
  );
};
