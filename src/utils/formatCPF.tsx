// export const formtCPF = (formtCPF: string) => {
//     return formtCPF
//       .replace(/\D/g, "")
//       .replace(/^(\d{3})(\d)/, "$1.$2")
//       .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
//       .replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3-$4");
//   };
    
  export const formatCPF = (cpf: string) => {
    return cpf
      .replace(/\D/g, "") // Remove tudo que não for número
      .replace(/^(\d{3})(\d)/, "$1.$2")
      .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
      .replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3-$4");
  };
  
  export const removeFormatCPF = (cpf: string) => {
    return cpf.replace(/\D/g, ""); // Remove tudo que não for número
  };