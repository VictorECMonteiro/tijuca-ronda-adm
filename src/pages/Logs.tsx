import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import { useLogsFetch } from '../hooks/useLogsFetch';
import { ManagePage } from '../components/table/ManagePage';
import styles from "../styles/pages/Logs.module.css"
import { useLogSearch } from '../hooks/useLogSearch';

export default function Logs() {
    const {Logs, loading, error} = useLogsFetch();
    const [idRonda, setIdRonda] = useState(0)
    const { result } = useLogSearch(Logs)
    useEffect(()=>{
      console.log(idRonda)
      console.log(Logs)
      console.log(result)
    },[idRonda, result])


  return (
    <div className={styles.container}> 
        <div className={styles.sidebar}>
          <Sidebar></Sidebar>
        </div>
        <div className={styles.table}>
            <ManagePage
                title='Registros'
                data={Logs}
                columns={[
                  {label: "Nome da Rota", key:"nomeRota"},
                  {label: "id da Ronda", key: "idRonda"}
                  
                ]}
                description="Clique para gerar e imprimir relatórios"
                dataDrop= {result}
                // onPrint={()=>{console.log("TESTE")}}
                onClick={setIdRonda}
            />
        </div>
      
    </div>
  )
}
