import { ManagePage } from "../components/ManagePage";
import { useLocal } from "../hooks/useLocal";
// import printLocalStyle from "../styles/components/PrintLocal.module.css"

import styles from "../styles/pages/Users.module.css";
import userPrint from "../hooks/userPrint";
import Sidebar from "../components/Sidebar";
import { useEffect, useState } from "react";
import PrintLocal from "../components/PrintLocal";
import ModalLocal from "../components/modals/ModalLocal";
// import { useModalLocal } from "../hooks/useModalLocal"
const printLocalStyle = require("../styles/components/PrintLocal.js")

const Local = () => { 
  const { Local, loading, error } = useLocal();
  const [isSideOpen, setIsSideOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false); 

  const print = async (localObject) => {
    //Variavel que recebe o retorno do Hook passando o componente junto com ID para geração do QRCode
    const content = await userPrint(<PrintLocal idLocal={localObject.idLocal} nomeLocal={localObject.nomeLocal} />);
    //Cria a janela de impressâo
    const windows: any = window.open('', '', 'width=800,height=600');


    //Cria no documento estrutura basica de funcionamento HTML para impressao
    await windows.document.write(`
        <html>
            <head>
                <title>PRINT TEST</title>
                 <style>${printLocalStyle}</style>
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


  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;


  

  return (
    <div className={styles.coniner}>
      <div className={styles.hamburguer}>
        <button onClick={()=>{setIsSideOpen(!isSideOpen)}}>ABRIR SIDEBAR TEMP</button>
      </div>
      <Sidebar isOpen={isSideOpen}/>
      
    <div className={styles.content}>
    <ManagePage
      title="Gerenciar Locais"
      description="Adicione novos locais para sua ronda"
      columns={[
        { label: "Nome", key: "nomeLocal" },
        { label: "IdLocal", key: "idLocal" },
      ]}
      data={Local}
      onAdd={() => setIsModalOpen(true)} 
      // onEdit={(Local) => console.log("Editar:", Local)}
      onDelete={(Local) => console.log("Excluir:", Local)}
      onPrint={print}
    />

{isModalOpen && (
  <ModalLocal
    onClose={() => setIsModalOpen(false)}
  />
)}


   </div>
</div>
  );
};

export default Local;

