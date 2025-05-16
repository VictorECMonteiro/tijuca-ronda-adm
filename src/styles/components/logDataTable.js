
const LogDataTable = `
    @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
    @media print {
    /* Remove margens da página */
    @page {
        size: A4;
        margin: 0;
    }

    body {
        margin: 0;
        padding: 0;
    }

    /* Certifique-se de que o conteúdo ocupe a página inteira */


    /* Evita espaços indesejados em torno do conteúdo */
    html, body {
        width: 100%;
        height: 100%;
    }
    #container{
        display:flex;
        flex-direction: column;
        height: 100%;
        align-items: center;
        
    }
    #header{
        width: 100%;
        height: 15%;
        display:flex;
        background-color: #d9d9d9;
        align-items: center;
        
        justify-content: space-around
    }
    #d1{
        font-family: Poppins;
        
    }
    #d2{
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        height: 50%;


    }
        #p{
        
            margin-top: 15%;    
            
        }


    #h1{
        font-size: 30px;    
        background-color: red;
        font-family: "Poppins";
        font-weight: 900;
    }




    #main{
        width: 80%;
        display:flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    #headContainer{
        display:flex;
        justify-content: center;
        width: 100%;
        height: 5vh;
        border-bottom: 3px solid #292929;
        align-items: center;
    }
    #span{
        width: 25%;
        padding: 2px;
    }
    #contentContainer{
        display: flex;
        justify-content: center;
        flex-direction: row;
        margin-top: 1vh;
        width: 100%;
    }
    #contentItem{
        width: 25%;
        height: 2vh;
        padding-left: 4px;
        border: 0.3px solid #292929;
    }
    

}



`


module.exports = LogDataTable