const buscaIndex = (array: number[], item: number)=>{
    
    let contador:number = 0;
    let tamanhoCompleto:number = array.length - 1;
    let index:number
    
    while(tamanhoCompleto >= contador){
        let meio: number = Math.round((tamanhoCompleto + contador)/ 2)
        if(item < array[meio]){
            tamanhoCompleto = meio - 1
        }
        else if(item == array[meio]){
            index = meio
            
            return index
        }
        else{
            contador = meio + 1
        }
    }
    return false
}


export default buscaIndex