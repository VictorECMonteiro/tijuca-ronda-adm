import styles from "../../styles/table/DataTable.module.css";
import { TableActions } from "./TableActions";
import Button from "../Button";

type Column<T> = {
  label: string;
  key?: keyof T;
  render?: (item: T) => React.ReactNode;
};

type DataTableProps<T> = {
  data: T[];
  dataDrop?: any[];
  columns: Column<T>[];
  columnsDrop?: any[];
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
  onAdd?: () => void;
  onPrint?: (item: T) => void;
  onClick?: (item: T) => void;
  children?: (item: T) => React.ReactNode;
};

export const DataTable = <T,>({
  data,
  columns,
  onEdit,
  onDelete,
  onAdd,
  onPrint,
  dataDrop,
  onClick,
  children,
}: DataTableProps<T>) => {
  return (
    <div className={styles.conter}>
      <div className={styles.liner}>
        <div className={styles.eader}>
          {columns.map((col, index) => (
            <span key={index} className={styles.columnLabel}>
              {col.label}
            </span>
          ))}
        </div>
        <div className={styles.contbut}>
          {onAdd && (
            <Button
              title="+"
              script={onAdd}
              tamanho="PP"
              className={styles.aButton}
            />
          )}
        </div>
      </div>

      <div className={styles.list}>
        {data.map((item, index) => (
          <div key={(item as any).id || index}>
            <button className={styles.card} onClick={() => onClick?.(item)}>
              <div className={styles.linear}>
                <div className={styles.within}>
                  {columns.map((col, index) => (
                    <span key={index} className={styles.item}>
                      {col.render ? col.render(item) : (item[col.key!] as React.ReactNode)}
                    </span>
                  ))}
                </div>
                <div className={styles.contbut}>
                  <TableActions
                    onEdit={onEdit ? () => onEdit(item) : undefined}
                    onDelete={onDelete ? () => onDelete(item) : undefined}
                    onPrint={onPrint ? () => onPrint(item) : undefined}
                  />
                </div>
              </div>
            </button>

            {/* Renderiza children somente se estiver expandido */}
            {children && (item as any).expanded && (
              <div className={styles.dropdown}>{children(item)}</div>
            )}

            {/* Renderiza dados adicionais relacionados, como locais de uma rota */}
            <div>
              {dataDrop &&
                dataDrop.map((item2, idx) =>
                  (item as any).idRonda === item2.idRonda ? (
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
