import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { useLogsFetch } from '../hooks/useLogsFetch';
import { ManagePage } from '../components/table/ManagePage';
import styles from "../styles/pages/Logs.module.css";
import { useLogSearch } from '../hooks/useLogSearch';
import LogDataTable from '../components/table/LogDataTable';
import print from '../utils/Print';
import { useLogData } from '../hooks/useLogData';
import hamburguer from "../assets/img/list.svg";
const LogDataTableStyle = require("../styles/components/logDataTable.js");

export default function Logs() {
  const { Logs, loading, error } = useLogsFetch();

  const { result } = useLogSearch(Logs);
  const [showDrop, setShowDrop] = useState(0);
  const { resultTable, loadingTable } = useLogData(showDrop);
  const [isSideOpen, setIsSideOpen] = useState(false);

  // Atualizado para usar a versão correta do estado e logs
  const clickDrop = (idRonda) => {
    console.log("idRonda recebido:", idRonda);
    setShowDrop((prevShowDrop) => {
      const newShowDrop = prevShowDrop === idRonda ? 0 : idRonda;
      console.log("showDrop atualizado para:", newShowDrop);
      return newShowDrop;
    });
  };

  // Ajustado para receber idRonda corretamente e usar no print
  const startPrint = async (idRonda) => {
    setShowDrop(idRonda);
    print({}, <LogDataTable data={resultTable} showDrop={idRonda} />, LogDataTableStyle);
  };

  return (
    <div className={styles.coniner}>
      <div className={styles.hamburguer}>
        <a onClick={() => setIsSideOpen(!isSideOpen)} className={styles.sideButton}>
          <img src={hamburguer} alt="menu" />
        </a>
      </div>
      <Sidebar isOpen={isSideOpen} closeSide={setIsSideOpen} />

      <div className={styles.table}>
        <ManagePage
          title="Registros"
          data={Logs}
          columns={[
            { label: "Nome da Rota", key: "nomeRota" },
            { label: "id da Ronda", key: "idRonda" },
          ]}
          columnsDrop={[
            { label: "Nome do Local", key: "Nome do Local" },
            { label: "Horario Registrado", key: "Horario Registrado" },
            { label: "Usuario", key: "Usuario" },
            { label: "Localização", key: "Localização" },
            { label: "Data", key: "Data" },
          ]}
          description="Clique para gerar e imprimir relatórios"
          dataDrop={result}
          onClick={clickDrop}
          showDrop={showDrop}
          onPrint={startPrint} 
        />
      </div>
    </div>
  );
}
