import React from 'react'
import Sidebar from '../components/Sidebar'
import { useLogsFetch } from '../hooks/useLogsFetch';
import { ManagePage } from '../components/ManagePage';

export default function Logs() {
    const {Logs, loading, error} = useLogsFetch();


    console.log(Logs)

  return (
    <div className='container'> 
        <Sidebar></Sidebar>
        <div>
            <ManagePage
                title='Registros'
                data={Logs}
                columns={[
                  {label: "Nome da Rota", key:"nomeRota"},
                  {label: "id da Ronda", key: "idRonda"}
                  
                ]}
                description="Gerencie os locais que devem ser ligados com suas rondas"
                onAdd={() => console.log(Logs)}
                onDelete={() => console.log(Logs)}
                onEdit={()=>{console.log(Logs)}}
                key={1}


            >

            </ManagePage>
        </div>
      
    </div>
  )
}
