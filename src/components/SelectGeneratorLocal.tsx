
import React, { useState, ChangeEvent } from 'react';
import styles from '../styles/modals/CreatRouteModal.module.css';
import Button from "./Button";

export interface LocalItem {
  idLocal: number;
  nomeLocal: string;
}

interface SelectGeneratorProps {
  list: LocalItem[];
  selectedArray: number[];
  setAtualLocal: (locals: number[]) => void;
}

const SelectGeneratorLocal: React.FC<SelectGeneratorProps> = ({ list, selectedArray, setAtualLocal }) => {
  const [local, setLocal] = useState<number | undefined>(undefined);

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const id = Number(event.target.value);
    setLocal(id);
    console.log('Local selecionado:', id);
  };

  const onClickAdd = () => {
    if (local !== undefined) {
      setAtualLocal([...selectedArray, local]);
    }
  };

  return (
    <div className={styles.createRouteRow2}>
      <div className={styles.div2}>
        <label className={styles.label}> Selecione o Local </label>
      <select className={styles.createRouteSelect} onChange={handleChange} defaultValue="">
        <option value="" disabled>
          Selecione os locais
        </option>
        {list.map((item) => (
          <option key={item.idLocal} value={item.idLocal}>
            {item.nomeLocal}
          </option>
        ))}
      </select>
      </div>
      <Button title="Entrar" script={onClickAdd} tamanho="P" className={styles.createRouteAddButton} />
     
    </div>
  );
};

export default SelectGeneratorLocal;