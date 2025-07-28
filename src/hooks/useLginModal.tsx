import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/Loginapi";
import { removeFormatCPF } from "../utils/formatCPF";
import { useFormattedCPF } from "../hooks/useFormattedCPF";

export const useLoginModal = () => {
  const { cpf, handleCPFChange } = useFormattedCPF();
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  const handleSenhaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSenha(e.target.value);
  };

  const handleLogin = async () => {
    const cpfSemFormatacao = removeFormatCPF(cpf);

    if (isNaN(Number(cpfSemFormatacao))) {
      alert("CPF inválido.");
      return;
    }

    const isAuthenticated = await login(Number(cpfSemFormatacao), senha);

    if (isAuthenticated) {
      navigate("/home");
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
