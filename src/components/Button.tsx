
import styles from "../styles/components/Button.module.css"

enum BotaoTamanho {
    P = "P",
    PP = "PP",
    PPP = "PPP",
    PPPP = "PPPP",
    Pa = "Pa",
    PA = "PA",
    PAA = "PAA",
    M = "M",
    MM = "MM",
    G = "G",

}

interface ButtonProps {
    title: string;
    script: () => void;
    tamanho: keyof typeof BotaoTamanho;
    className?: string; 
    disabled?: boolean; 
}

export const Button: React.FC<ButtonProps> = ({ title, script, tamanho, className, disabled }) => {
    const buttonClass = `${styles.Button} ${styles[tamanho] || ""} ${className || ""}`.trim();

    return (
        <button onClick={script} className={buttonClass} disabled={disabled}>
            <h1>{title}</h1>
        </button>
    );
}

export default Button;

