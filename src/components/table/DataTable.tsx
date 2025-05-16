import styles from "../../styles/components/DataTable.module.css";
import { TableActions } from "./TableActions";
import Button from "../Button";
// import { MouseEventHandler } from "react";

type Column<T> = {
  label: string;
  key: keyof T;
};

type DataTableProps<T> = {
  data: any[];
  dataDrop: any;
  columns: Column<T>[];
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
  onAdd?: () => void;
  onPrint?: (item:any) => void;
  onClick?: (item:any)=> void
};


export const DataTable = <T,>({ data, columns, onEdit, onDelete, onAdd, onPrint, dataDrop, onClick }: DataTableProps<T>) => {
  console.log(dataDrop)
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
  <div key={item.id || index}>
    <button className={styles.card} onClick={() => onClick?.(true)}>
      {columns.map((col) => (
        <span key={col.key.toString()} className={styles.item}>
          {item[col.key] as string}
        </span>
      ))}
      <div>
        <TableActions
          onEdit={onEdit ? () => onEdit(item) : undefined}
          onDelete={onDelete ? () => onDelete(item) : undefined}
          onPrint={onPrint ? () => onPrint(item) : undefined}
        />
      </div>
    </button>

    <div>
      {dataDrop &&
        dataDrop.map((item2, idx) =>
          item.idRonda === item2.idRonda ? (
            <h1 key={idx}>{item2.nomeLocal}</h1>
          ) : null
        )}
    </div>
  </div>
))}

        
      </div>
    </div>
  );
};

