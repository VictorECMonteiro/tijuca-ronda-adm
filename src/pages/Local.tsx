import { ManagePage } from "../components/ManagePage";
import { useLocal } from "../hooks/useLocal";
// import printLocalStyle from "../styles/components/PrintLocal.module.css"
import hamburguer from "../assets/img/list.svg"
import styles from "../styles/pages/Logs.module.css";
import userPrint from "../hooks/userPrint";
import Sidebar from "../components/Sidebar";
import { useEffect, useState } from "react";
import PrintLocal from "../components/PrintLocal";
import { api } from "../api/serviceapi";
import LoadingComponent from "../components/LoadingComponent";
const printLocalStyle = require("../styles/components/PrintLocal.js")

const Local = () => { 
  const [reload, setReload] = useState(false)
  const [isSideOpen, setIsSideOpen] = useState(false)
  const { Local, loading, error } = useLocal(reload);

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


  const deleteLocal = (item: any)=>{
    try{
    const fresult = api.post("/local/delete", {
      idLocal: item.idLocal
    })
      setReload(!reload)
    }
    catch(e){
      return <h1>Erro ao excluir Local</h1>
      console.log(e)
    }

  }



  if (loading) return <LoadingComponent/>;
  if (error) return <p>{error}</p>;


  
  return (
    <div className={styles.container}>
      <div className={styles.hamburguer}>
        <a onClick={()=>{setIsSideOpen(!isSideOpen)}} className={styles.sideButton}>
          <img src={hamburguer} alt="" />
        </a>
      </div>
      <Sidebar isOpen={isSideOpen} closeSide={setIsSideOpen}/>
      
    <div className={styles.table}>
    <ManagePage
      title="Gerenciar Locais"
      description="Adicione novos locais para sua ronda"
      columns={[
        { label: "Nome", key: "nomeLocal" },
        { label: "IdLocal", key: "idLocal" },
      ]}
      data={Local}
      onAdd={() => console.log("Adicionar local")}
      // onEdit={(Local) => console.log("Editar:", Local)}
      onDelete={deleteLocal}
      onPrint={print}
      // dataDrop={[]}
    />
   </div>
</div>
  );
};

export default Local;

