import React, { useEffect, useState } from "react";
import styles from "../styles/components/SelectVigia.module.css"; // sem espaço no caminho
import { fetchUsers } from "../api/userService";
import { assignUserToRoute } from "../api/rotaApi";

interface Vigia {
  idUsuario: number;
  nomedeUsuario: string;
  permissao: string;
  status: number;
}

interface SelectVigiaProps {
  idRota: number;
  onChange?: (idUsuario: number) => void;
}

export default function SelectVigia({ idRota, onChange }: SelectVigiaProps) {
  const [vigias, setVigias] = useState<Vigia[]>([]);
  const [selectedVigiaId, setSelectedVigiaId] = useState<number | "">("");

  useEffect(() => {
    const loadVigias = async () => {
      const allUsers = await fetchUsers();
      const ativos = allUsers.filter(
        (user: Vigia) => user.permissao === "vigia" && user.status === 1
      );
      setVigias(ativos);
    };

    loadVigias();
  }, []);

  const handleSelect = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const idUsuario = parseInt(e.target.value);
    setSelectedVigiaId(idUsuario);

    const success = await assignUserToRoute(idRota, idUsuario);
    if (success) {
      alert("Vigia atribuído com sucesso!");
      if (onChange) onChange(idUsuario);
    } else {
      alert("Erro ao atribuir vigia.");
    }
  };

  return (
    <div className={styles.selectContainer}>
      <select
        className={styles.customSelect}
        value={selectedVigiaId}
        onChange={handleSelect}
      >
        <option value="" disabled>
          Selecione um vigia
        </option>
        {vigias.map((vigia) => (
          <option key={vigia.idUsuario} value={vigia.idUsuario}>
            {vigia.nomedeUsuario}
          </option>
        ))}
      </select>
    </div>
  );
}

