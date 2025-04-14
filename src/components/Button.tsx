
import styles from "../styles/components/Button.module.css"

enum BotaoTamanho {
    P = "P",
    M = "M",
    G = "G",
    PP = "PP"
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

