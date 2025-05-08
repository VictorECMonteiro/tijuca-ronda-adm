import React from 'react'
import { useLogData } from '../hooks/useLogData'


export default function LogDataTable({data, showDrop}) {

  if(data.length - 1 === 0){
    return <div><h1>Sem Dados</h1></div>
  }


  return (
    <div id='container'>
        <header id='header'>
            <div id='d1'>
                <img src="" alt="" />
                <h1>
                    Tijuca <br />
                    Ronda
                </h1>
            </div>
            <div id='d2'>
                <div>
                <span id='p'>
                    Relatório de Ronda
                </span>
                </div>
                <div>
                <span id='h1'>
                    {data[0]?.nomeRota}
                </span>
                </div>
                <div>
                <span id='p'>
                    {data[0]?.nomedeUsuario}
                </span>
                </div>
            </div>
        </header>
        <div id='main'>
            <div id='headContainer'>
                <span id='span'>Local</span>
                <span id='span'>Horario</span>
                <span id='span'>Data</span>
                <span id='span'>Observacao</span>
            </div>
                {data.map((item, index)=>(
                    <div key={index} id='contentContainer'>
                        
                                    <div id='contentItem'>{item.nomeLocal}</div>
                                    <div id='contentItem'>{item.hora}</div>
                                    <div id='contentItem'>{item.data}</div>                
                                    <div id='contentItem'>AAAA</div>
                    </div>
                ))}
        </div>        
    </div>
  )
}
