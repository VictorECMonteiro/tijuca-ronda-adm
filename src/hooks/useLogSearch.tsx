import { useEffect, useState } from 'react'
import { api } from '../api/serviceapi'


interface LogItem {
  idRonda: number
}

interface LogSearchResult {
  [key: string]: any
}

export function useLogSearch(list: LogItem[]) {
  const [result, setResult] = useState<LogSearchResult[]>([])
  const [idRondaList, setIdRondaList] = useState<number[]>([])

  // Atualiza a lista de IDs quando 'list' muda
  useEffect(() => {
    if (list.length === 0) {
      setIdRondaList([])
      return
    }

    const newIds = list.map(item => item.idRonda)
    setIdRondaList(newIds)
  }, [list])

  // Busca os dados com base na lista de IDs
  useEffect(() => {
    const fetchSearch = async () => {
      try {
        const fresult = await api.post("/geral/searchLog", {
          idRonda: idRondaList
        })
        setResult(fresult.data)
      } catch (e) {
        console.error("Erro ao buscar logs:", e)
      }
    }

    if (idRondaList.length > 0) {
      fetchSearch()
    }
  }, [idRondaList])

  return { result }
}
