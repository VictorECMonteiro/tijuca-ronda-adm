import { useEffect, useState } from "react";
import { api } from "../api/serviceapi";

export function useRotaData(idRota: number) {
    const [resultTable, setResultTable] = useState([])
    const [loadingTable, setLoading] = useState(true)





    useEffect(() => {
        async function getLocals(idRota) {
            try {
                if (idRota === 0) {
                    setResultTable([])
                    // console.log(idRota)
                }
                const result = await api.post("/rota/listLocals", {
                    idRota: idRota
                })
                if (result.status === 200) {
                    // console.log(result.status)
                    setResultTable(result.data)
                }
            }
            catch (e) {
                setResultTable([])
            }
            finally {
                setLoading(false)
            }
        }
        getLocals(idRota)
    }, [idRota])


    return { resultTable, loadingTable }





}