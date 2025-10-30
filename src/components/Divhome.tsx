import React, { useEffect, useState } from "react";
import styles from "../styles/components/Divhome.module.css";
import getCookie from "../utils/getCookie";

const Divhome: React.FC = () => {
    const [cookies, setCookies] = useState({nomedeUsuario: ""})
    useEffect(()=>{
        let cookies = getCookie("User")
        setCookies(JSON.parse(cookies))

    },[])
    return (
        <div className={styles.containerr}>
            <h1>Olá</h1>
            <span className={styles.name}>{cookies.nomedeUsuario}</span>

            <div className={styles.cards}>
                <div className={styles.card}>
                    <h2>Rondas atuais:</h2>
                    <p>Clique para consultar os registros</p>
                </div>

                <div className={styles.card}>
                    <h2>Últimos locais visitados:</h2>
                    <p>Clique para visualizar os locais visitados</p>
                </div>
            </div>
        </div>
    );
};

export default Divhome;