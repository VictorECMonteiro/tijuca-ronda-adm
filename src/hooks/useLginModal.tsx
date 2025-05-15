import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/Loginapi";
import { removeFormatCPF } from "../utils/formatCPF";
import { useFormattedCPF } from "../hooks/useFormattedCPF";
import writeCookie from "../utils/writeCookie";


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
    console.log(isAuthenticated)
    if (isAuthenticated.success === true && isAuthenticated.status != 0 && isAuthenticated.permissao === "admin") {
      writeCookie("User", JSON.stringify(isAuthenticated), 2000)
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
