import React from "react";
import userPrint from "../hooks/userPrint";
const printTeste = require("../styles/components/PrintLocal.js")

const print = async (localObject, Component, componentStyle) => {
    //Variavel que recebe o retorno do Hook passando o componente junto com ID para geração do QRCode
    const content = await userPrint(Component);
    console.log(content)
    //Cria a janela de impressâo
    const windows: any = window.open('', '', '');
    //Cria no documento estrutura basica de funcionamento HTML para impressao
    await windows.document.write(`
        <html>
            <head>
                <title>PRINT TEST</title>
                 <style>${componentStyle}</style>
            </head>
            `);
    //Define o corpo do arquivo
    await windows.document.write(`<body>${content}</body>`);
    //Define o fechamento da estrutura HTML para impressao
    await windows.document.write("</html>");  
    //Chama a ação de print da pagina
    setTimeout(()=>{
      windows.print()
    }, 500)
  };

export default print