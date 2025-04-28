import React from "react";
// import "../styles/localPage.css"
import QRCode from "react-qr-code";
import QRArt from "../assets/img/Novo Projeto.png";

const PrintLocal = ({ idLocal, nomeLocal }) => {
  console.log(idLocal, nomeLocal)
  //Remove os acentos das palavras
  const jsonQR = JSON.stringify({idLocal:idLocal, nomeLocal:nomeLocal.normalize("NFD").replace(/[\u0300-\u036f]/g, "")})
  return (
    <div id="container" className="container">
      <div id="image-container">
        <img src={QRArt} id="image"/>
      </div>
      <div id="qrcode" className="qrcode">
        <QRCode size={256} 
          value={jsonQR} 

        viewBox={`0 0 256 256`} />
      </div>
    </div>
  );
};

export default PrintLocal;
