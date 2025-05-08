



import React, { useEffect, useState } from 'react'
import { api } from '../api/serviceapi'

export function useLogSearch(list:any[]) {
    const [result, setResult] = useState([])
    // const [idRondaList, setIdRondaList] = useState<any[]>([])
    let idRondaList:number[] = []

    for(let i=0; i<=list.length - 1; i++){
        idRondaList.push(list[i].idRonda)
    }

    


    useEffect(()=>{
        const fetchSearch = async () =>{

            try{
            const fresult = await api.post("/geral/searchLog", {
                idRonda: idRondaList
            })
            setResult(fresult.data)
        }       
        catch(e){
         console.log(e)   
        }   
        }
        fetchSearch()
    },[list])
  






 

  return {result}
}
