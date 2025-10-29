import React, { useEffect, useState } from "react";
import dropStyle from "../../styles/components/dropLog.module.css";
import Journal from "../../assets/img/Journal.svg";

type ObservationDropProps = {
  idGeral?: number | null;        
  observacao?: string;
};

const ObservationDrop: React.FC<ObservationDropProps> = ({ idGeral, observacao }) => {
  const [open, setOpen] = useState(false);
  const [imagens, setImagens] = useState<string[]>([]);

  useEffect(() => {
    if (open && idGeral) { 
      fetch(`http://192.168.9.249:5050/listFiles.php?idGeral=${idGeral}`)
        .then((res) => res.json())
        .then((data) => {
          setImagens(data || []);
        })
        .catch((err) => console.error("Erro ao carregar imagens:", err));
    }
  }, [open, idGeral]);
 
    return (
      <div className={dropStyle.observationDrop}>
        <p>{observacao || "Sem observações"}</p>
        <div style={{ display: "flex", gap: "5px", flexWrap: "wrap" }}>
          {imagens?.length > 0
            ? imagens.map((img: string, i: number) => (
                <img
                  key={i}
                  src={`http://192.168.9.249:5050/files/${img}`}
                  alt={img}
                  className={dropStyle.imgPreview}
                />
              ))
            : <span>Nenhuma imagem</span>
          }
        </div>
      </div>
    );
  };
  
  export default ObservationDrop;
  