import styles from "../../styles/components/DataTable.module.css";
import { TableActions } from "./TableActions";
import Button from "../Button";

type Column<T> = {
  label: string;
  key: keyof T;
};

type DataTableProps<T> = {
  data: T[];
  columns: Column<T>[];
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
  onAdd?: () => void;
};


export const DataTable = <T,>({ data, columns, onEdit, onDelete, onAdd }: DataTableProps<T>) => {
  return (
    <div className={styles.conter}>
      <div className={styles.eader}>
        {columns.map((col) => (
          <span key={col.key.toString()} className={styles.columnLabel}>
            {col.label}
          </span>
        ))}
        <div className={styles.contbut}>
          {onAdd && (
            <Button title="+" script={onAdd} tamanho="PP" className={styles.aButton}/>
          )}
        </div>
      </div>

      <div className={styles.list}>
        {data.map((item, index) => (
          <div key={index} className={styles.card}>
            {columns.map((col) => (
              <span key={col.key.toString()} className={styles.item}>
                {item[col.key] as string}
              </span>
            ))}
            <TableActions
              onEdit={onEdit ? () => onEdit(item) : undefined}
              onDelete={onDelete ? () => onDelete(item) : undefined}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

