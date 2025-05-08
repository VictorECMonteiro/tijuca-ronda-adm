import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import { useLogsFetch } from '../hooks/useLogsFetch';
import { ManagePage } from '../components/ManagePage';
import styles from "../styles/pages/Logs.module.css"
import { useLogSearch } from '../hooks/useLogSearch';
import LogDataTable from '../components/LogDataTable';
import print from '../utils/print';
import { useLogData } from '../hooks/useLogData';
import hamburguer from "../assets/img/list.svg"
const LogDataTableStyle = require("../styles/components/logDataTable.js")

export default function Logs() {
  const { Logs, loading, error } = useLogsFetch();

  const [idRonda, setIdRonda] = useState(0)
  const { result } = useLogSearch(Logs)
  const [showDrop, setShowDrop] = useState(0)
  const { resultTable, loadingTable } = useLogData(showDrop)
  const [isSideOpen, setIsSideOpen] = useState(false)
  // const [tableData, setTableData] = useState([])



  const clickDrop = (idRonda) => {
    showDrop === idRonda ? setShowDrop(0) : setShowDrop(idRonda)

    console.log(showDrop)

  }
  // 
  const startPrint = async (item) => {
    setShowDrop(item.idRonda)
    print({}, <LogDataTable data={resultTable} showDrop={showDrop} />, LogDataTableStyle)
  }


  return (
    <div className={styles.container}>
      <div className={styles.hamburguer}>
        <a onClick={() => setIsSideOpen(!isSideOpen)} className={styles.sideButton}>
          <img src={hamburguer} alt="" />
        </a>
      </div>
      <Sidebar isOpen={isSideOpen} closeSide={setIsSideOpen} />

      <div className={styles.table}>

        <ManagePage
          title='Registros'
          data={Logs}
          columns={[
            { label: "Nome da Rota", key: "nomeRota" },
            { label: "id da Ronda", key: "idRonda" }
          ]}
          description="Clique para gerar e imprimir relatórios"
          dataDrop={result}
          // onPrint={()=>{console.log("TESTE")}}
          onClick={clickDrop}
          showDrop={showDrop}
          onPrint={(item) => { startPrint(item) }}
        />
      </div>

    </div>
  )
}
