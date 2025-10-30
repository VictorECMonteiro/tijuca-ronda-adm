import React, { useState } from "react";
import styles from "../../styles/table/DataTable.module.css";
import dropStyle from "../../styles/components/dropLog.module.css";
import { TableActions } from "./TableActions";
import Button from "../Button";
import Journal from "../../assets/img/Journal.svg";
import Pointer from "../../assets/img/cursor.svg";
import ObservationDrop from "../modals/ObservacãoDrop";

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
  columnsDrop?: any[];
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

function getStatus(local: any, registros: any[]) {
  const feito = registros.some((r) => r.idLocal === local.idLocal);
  return feito ? "Feito" : "Não feito";
}

export function DataTable<T>({
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
}: DataTableProps<T>) {
  const [openObs, setOpenObs] = useState<number | null>(null);

  return (
    <div className={styles.conter}>
      {/* Cabeçalho */}
      <div className={styles.liner}>
        <div className={styles.eader}>
          {columns.map((col, index) => (
            <span
              key={col.key?.toString() || index}
              className={styles.columnLabel}
            >
              {col.label}
            </span>
          ))}
        </div>

        {onAdd && (
          <div>
            <Button
              title="+"
              script={onAdd}
              tamanho="PP"
              className={styles.aButton}
            />
          </div>
        )}
      </div>

      {/* Lista */}
      <div className={styles.list}>
        {data.map((item, index) => {
          const itemId = (item as any).idRonda || (item as any).idRota || index;

          const filteredDrop = Array.isArray(dataDrop)
            ? dataDrop.filter(
                (dropItem) => dropItem.idRonda === (item as any).idRonda
              )
            : [];

          return (
            <div key={itemId}>
              <button
                className={styles.card}
                onClick={() =>
                  onClick?.(
                    (item as any).idRonda || (item as any).idRota || item
                  )
                }
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

{onPrint && filteredDrop.length > 0 && (
  <div className={dropStyle.span}>
    <img
      className={dropStyle.img1}
      src={Journal}
      alt="Imprimir"
      onClick={() => onPrint(filteredDrop[0].idRonda)}
    />
  </div>
)}

                  </div>

                  {filteredDrop.map((dropItem, idx) =>
                    dropItem.locais.map((local: any, lIdx: number) => {
                      const registro = dropItem.data.find(
                        (r: any) => r.idLocal === local.idLocal
                      );

                      return (
                        <div
                          key={`${dropItem.idRonda}-${local.idLocal}-${lIdx}`}
                          className={dropStyle.content}
                        >
                          {/* Nome do Local */}
                          <span className={dropStyle.span}>{local.nomeLocal}</span>
                          <span className={dropStyle.span}>-</span>
                          <span className={dropStyle.span}>-</span>
                          <span className={dropStyle.span}>-</span>
                          <span className={dropStyle.span}>-</span>

                          {/* Status: Feito ou Não feito */}
                          <span className={dropStyle.span}>
                            {getStatus(local, dropItem.data)}
                          </span>

                          
                          <span 
                           onClick={() => setOpenObs(openObs === local.idLocal ? null : local.idLocal)}
                           style={{ cursor: 'pointer', display: 'inline-block' }}
                          >
                          <img src={Journal} alt="Observações" className={dropStyle.img1} />
                          </span>

                          {openObs === local.idLocal && (
                          <ObservationDrop
                          idGeral={registro?.idGeral} 
                          observacao={registro?.observacao}
                           />
                          )}




                        </div>
                      );
                    })
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
