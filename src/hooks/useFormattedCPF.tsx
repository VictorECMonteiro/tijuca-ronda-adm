
import { useState } from "react";
import { formatCPF } from "../utils/formatCPF";

export const useFormattedCPF = () => {
  const [cpf, setCpf] = useState<string>("");

  const handleCPFChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCPF(e.target.value);
    setCpf(formatted);
  };

  return {
    cpf,
    setCpf,
    handleCPFChange,
  };
};
