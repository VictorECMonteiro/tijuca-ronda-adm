import styles from "../../styles/table/DataTable.module.css";
import dropStyle from "../../styles/components/dropLog.module.css";
import { TableActions } from "./TableActions";
import Button from "../Button";
import Journal from "../../assets/img/Journal.svg";
import Pointer from "../../assets/img/cursor.svg";
import React from "react";

type Column<T> = {
  label: string;
  key?: keyof T;
  render?: (item: T) => React.ReactNode;
};

type ColumnDrop = {
  key: string;
};

type DataTableProps<T> = {
  data: T[];
  columns: Column<T>[];
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
  onAdd?: () => void;
  onPrint?: (item: any) => void;
  onClick?: (item: any) => void;

  children?: (item: T) => React.ReactNode;

  dataDrop?: any[];
  columnsDrop?: ColumnDrop[];
  showDrop?: any;
};

export const DataTable = <T,>({
  data,
  columns,
  onEdit,
  onDelete,
  onAdd,
  onPrint,
  onClick,
  children,
  dataDrop,
  columnsDrop,
  showDrop,
}: DataTableProps<T>) => {
  return (
    <div className={styles.conter}>
      {/* Cabeçalho */}
      <div className={styles.liner}>
      <div className={styles.eader}>
      {columns.map((col, index) => (
      <span key={col.key?.toString() || index} className={styles.columnLabel}>
        {col.label}
      </span>
      ))}
      </div>

    {onAdd && (
    <div >
      <Button title="+" script={onAdd} tamanho="PP" className={styles.aButton} />
    </div>
    )}
    </div>



      {/* Lista */}
      <div className={styles.list}>
        {data.map((item, index) => {
          const itemId = (item as any).idRonda || (item as any).idRota || index;

          // Filtra os registros do dropdown que pertencem ao item atual
          const filteredDrop = dataDrop
            ? dataDrop.filter((dropItem) => dropItem.idRonda === (item as any).idRonda)
            : [];

          const isDropdownOpen =
            showDrop === (item as any).idRonda || showDrop === (item as any).idRota;

          return (
            <div key={itemId}>
              <button
                className={styles.card}
                onClick={() => onClick?.((item as any).idRonda || (item as any).idRota || item)}
                type="button"
              >
                <div className={styles.linear}>
                  <div className={styles.within}>
                    {columns.map((col, i) => (
                      <span key={i} className={styles.item}>
                        {col.render
                          ? col.render(item)
                          : col.key
                          ? (item[col.key] as React.ReactNode)
                          : null}
                      </span>
                    ))}
                  </div>
                  <div className={styles.contbut}>
                    <TableActions
                      onEdit={onEdit ? () => onEdit(item) : undefined}
                      onDelete={onDelete ? () => onDelete(item) : undefined}
                      onPrint={
                        dataDrop !== undefined
                          ? undefined
                          : onPrint
                          ? () => onPrint(item)
                          : undefined
                      }
                    />
                  </div>
                </div>
              </button>

              {/* Dropdown de Rotas */}
              {children && (item as any).expanded && (
                <div className={styles.dropdown}>{children(item)}</div>
              )}

              {/* Dropdown de Registro */}
              
{dataDrop && (
  <div
    className={
      showDrop === (item as any).idRonda && dataDrop
        ? dropStyle.container
        : dropStyle.close
    }
  >
    <div
      className={
        showDrop === (item as any).idRonda && dataDrop
          ? dropStyle.header
          : dropStyle.close
      }
    >
      {columnsDrop?.map((col) => (
        <span key={col.key} className={dropStyle.span}>
          {col.key}
        </span>
      ))}

      {onPrint && (
        <div className={dropStyle.span}>
          <a className={dropStyle.print}>
            <img
              src={Journal}
              alt="Imprimir"
              onClick={() => onPrint((item as any).idRonda)}
            />
          </a>
        </div>
      )}
    </div>

    {dataDrop.map((item2, idx) =>
      item2?.idRonda === (item as any).idRonda ? (
        <div
          key={`${item2.idLocal || ""}-${item2.idRonda || ""}-${idx}`}
          className={dropStyle.content}
        >
          <span className={dropStyle.span}>{item2?.nomeLocal}</span>
          <span className={dropStyle.span}>{item2?.hora}</span>
          {item2?.horario && (
            <span className={dropStyle.span}>{item2?.horario}</span>
          )}
          <span className={dropStyle.span}>{item2.nomedeUsuario}</span>
          <div className={dropStyle.span}>
            {item2?.latitude && (
              <a
                href={`https://maps.google.com/?q=${
                  dataDrop.find((i) => i.idRonda === (item as any).idRonda)
                    ?.latitude
                },${
                  dataDrop.find((i) => i.idRonda === (item as any).idRonda)
                    ?.longitude
                }`}
                target="blank"
                className={dropStyle.button}
              >
                <img src={Pointer} alt="Mapa" />
              </a>
            )}
          </div>
          <span className={dropStyle.span}>{item2.data}</span>
          <span className={dropStyle.span}></span>
        </div>
      ) : null
    )}
  </div>
)}

            </div>
          );
        })}
      </div>
    </div>
  );
};
