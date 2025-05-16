import styles from "../../styles/components/DataTable.module.css";
import dropStyle from "../../styles/components/dropLog.module.css"
import { TableActions } from "./TableActions";
import Button from "../Button";
import Journal from "../../assets/img/Journal.svg"
import Pointer from "../../assets/img/cursor.svg"
import buscaIndex from "../../utils/buscaIndex";
import { useState } from "react";
// import { MouseEventHandler } from "react";

type Column<T> = {
  label: string;
  key: keyof T;
};

type DataTableProps<T> = {
  data: any[];
  dataDrop?: any[] | undefined;
  columns: Column<T>[];
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
  onAdd?: () => void;
  onPrint?: (item: any) => void;
  onClick?: (item: any) => void;
  showDrop?: any | undefined
};


export const DataTable = <T,>({ data, columns, onEdit, onDelete, onAdd, onPrint, dataDrop, onClick, showDrop }: DataTableProps<T>) => {





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
            <Button title="+" script={onAdd} tamanho="PP" className={styles.aButton} />
          )}
        </div>
      </div>

      <div className={styles.list}>
        {data.map((item, index) => (
          <div>
            <button key={index} className={styles.card} onClick={() => { onClick?.(item.idRonda) }} >
              {columns.map((col) => (
                <span key={col.key.toString()} className={styles.item}>
                  {item[col.key] as string}
                </span>
              ))}
              <div>
                <TableActions
                  onEdit={onEdit ? () => onEdit(item) : undefined}
                  onDelete={onDelete ? () => onDelete(item) : undefined}

                  onPrint={dataDrop !== undefined?undefined: onPrint ? () => onPrint(item) : undefined}
                />
              </div>
            </button>
            
              {dataDrop&&(
                <div className={`${showDrop === item.idRonda && dataDrop?dropStyle.container: dropStyle.close}`}>
                  <div className={`${showDrop === item.idRonda && dataDrop?dropStyle.header:dropStyle.close}`}>
                    <span className={dropStyle.span}>Nome do Local</span>
                    <span className={dropStyle.span}>Horario Marcado</span>
                    <span className={dropStyle.span}>Usuario</span>
                    <span className={dropStyle.span}>Localizacao</span>
                    <span className={dropStyle.span}>Data</span>
                    <div className={dropStyle.span}>
                      <a className={dropStyle.print}><img src={Journal} alt="" onClick={() => onPrint(item.idRonda)} /></a>
                    </div>
                  </div>
                  {
                    dataDrop.map((item2) => (
                      item2.idRonda === item.idRonda ?
                        <div className={dropStyle.content}>
                          <span className={dropStyle.span}>
                            {
                              item2.nomeLocal
                            }
                          </span>
                          <span className={dropStyle.span}>
                            {item2.hora}
                          </span>
                          <span className={dropStyle.span}>
                            {
                              item2.nomedeUsuario
                            }
                          </span>
                          <div className={dropStyle.span}>
                            {
                              <a href={`https://maps.google.com/?q=${dataDrop.find((item2) => item2.idRonda === item.idRonda)?.latitude},${dataDrop.find((item2) => item2.idRonda === item.idRonda)?.longitude}`} target="blank" className={dropStyle.button}>
                                <img src={Pointer} alt="" />
                              </a>
                            }

                          </div>
                          <span className={dropStyle.span}>
                            {
                              item2.data
                            }
                          </span>
                          <span className={dropStyle.span}></span>
                        </div> :
                        ""
                    ))
                  }
                </div>
              )}
              
            

          </div>

        ))}
      </div>
    </div>
  );
};

