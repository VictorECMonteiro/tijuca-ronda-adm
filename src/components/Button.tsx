import styles from "../styles/components/Button.module.css"

enum botaoTamanho{
    "P"="P",
    "M"="M",
    "G"="G"
}

export const Button = ({title, script, tamanho}: {title:string, script, tamanho:keyof typeof botaoTamanho}) => {
    return(
        <button onClick={()=>script()} className={`${styles.Button} ${styles[botaoTamanho[tamanho]]}`}>                                                                                                                                                             <h1>{title}</h1>
        </                                                                                                                                                  button>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
    )
}

export default Button;