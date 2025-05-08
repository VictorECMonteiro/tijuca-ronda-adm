import { useEffect, useState } from "react";
import { api } from "../api/serviceapi";





export function useLogData(idRonda:any){
    const [resultTable, setResult] = useState([])
    const [loadingTable, setLoading] = useState(true)
    console.log("ESTOU SENDO EXECUTADO")
    useEffect(()=>{
        async function post(){
            try{
            const fresult:any = await api.post("/geral/logData", {
                idRonda: idRonda
            })
            console.log(fresult)
            setResult(fresult.data)
            
        }
        catch(E){
            setResult([])
      
        }
        finally{
            setLoading(false)
        }
        }
        post()

    },[idRonda])


    return {resultTable, loadingTable};

}