import { useState } from "react";
import { useFormattedCPF } from "./useFormattedCPF";

export const useUserCreate = () => {
  const { cpf, handleCPFChange, setCpf } = useFormattedCPF();
  const [nome, setNome] = useState("");
  const [senha, setSenha] = useState("");
  const [permissao, setPermissao] = useState("vigia");

  return {
    cpf,
    handleCPFChange,
    setCpf,
    nome,
    setNome,
    senha,
    setSenha,
    permissao,
    setPermissao,
  };
};
