import React, { useEffect, useState } from "react";
import styles from "../styles/components/SelectVigia.module.css";
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
  initialVigiaId?: number;
  vigias?: Vigia[];
  onChange?: (vigiaId: number) => void;
}

export default function SelectVigia({
  idRota,
  initialVigiaId,
  vigias: propVigias,
  onChange,
}: SelectVigiaProps) {
  const [vigias, setVigias] = useState<Vigia[]>(propVigias || []);
  const [selectedVigiaId, setSelectedVigiaId] = useState<number | "">(
    initialVigiaId ?? ""
  );
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (propVigias && propVigias.length > 0) {
      setVigias(propVigias);
      return;
    }
  
    const loadVigias = async () => {
      try {
        const allUsers = await fetchUsers();
        const ativos = allUsers.filter(
          (user: Vigia) => user.permissao === "vigia" && user.status === 1
        );
        setVigias(ativos);
      } catch (error) {
        console.error("Erro ao carregar vigias:", error);
      }
    };
    loadVigias();
  }, [propVigias]);
  

  useEffect(() => {
    setSelectedVigiaId(initialVigiaId ?? "");
  }, [initialVigiaId]);
  

  const handleSelect = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const idUsuario = parseInt(e.target.value);
    setSelectedVigiaId(idUsuario);

    try {
      const success = await assignUserToRoute(idRota, idUsuario);
      if (success) {
        alert("Vigia atribuído com sucesso!");
        onChange?.(idUsuario);
      } else {
        alert("Erro ao atribuir vigia.");
      }
    } catch (error) {
      console.error("Erro ao atribuir vigia:", error);
      alert("Erro ao atribuir vigia.");
    }
  };

  return (
    <div className={`${styles.selectContainer} ${isOpen ? styles.open : ""}`}>
  <select
    className={styles.customSelect}
    value={selectedVigiaId}
    onChange={handleSelect}
    onFocus={() => setIsOpen(true)}   // abre o dropdown
    onBlur={() => setIsOpen(false)}   // fecha o dropdown
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
