import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/Loginapi";
import { formatCPF, removeFormatCPF } from "../utils/formatCPF";

export const useLoginModal = () => {
  const [cpf, setCpf] = useState<number | null>(null);
  const [senha, setSenha] = useState<string>("");
  const navigate = useNavigate();

  const handleCPFChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const formattedCPF = formatCPF(event.target.value);
    const numericCPF = Number(removeFormatCPF(formattedCPF)); 
    setCpf(isNaN(numericCPF) ? null : numericCPF);
  };

  const handleSenhaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSenha(event.target.value);
  };

  const handleLogin = async () => {
    if (cpf === null) {
      alert("CPF inválido.");
      return;
    }

    const isAuthenticated = await login(cpf, senha);

    if (isAuthenticated) {
      navigate("/Home");
    } else {
      alert("Falha no login. Verifique seu CPF e senha.");
    }
  };

  return {
    cpf,
    senha,
    handleCPFChange,
    handleSenhaChange,
    handleLogin,
  };
};
