import React from 'react'
import Button from '../../components/Button'
import '../../styles/modals/LoginModal.css'

export default function LoginModal() {
    const scriptBotao =()=> {
        alert("ketely")
    }



  return (
    <div className='container'>
      <div className='titulo-header'>
        <p>Insira seus dados para</p>
        <h1>Iniciar Sessão</h1>
      </div>
      <div className='form'>
        <label htmlFor="">Insira seu CPF</label>
      <input type="text" placeholder='Insira seu CPF'/>
      <label htmlFor="">Insira sua senha</label>
      <input type="password" placeholder='Insira sua senha'/>
      <div className='saveinfo'>
      <input type="checkbox" />
      <label htmlFor="">Manter me conectado?</label>
      </div>
      <Button
      title="Iniciar Sessão"
      script={()=>{
        scriptBotao()
      }}
      tamanho='P'
      />
      </div>
      <div className='svgdiv'>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 400"><path fill="#F5A802" fill-opacity="1" d="M0,192L1440,96L1440,320L0,320Z" className='svg1'></path></svg>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#123465" fill-opacity="1" d="M0,192L1440,96L1440,320L0,320Z" className='svg2'></path>
        <line x1="0" y1="190" x2="1600" y2="70" stroke="#FFF" strokeWidth="30"/> 
        </svg>
      </div>

      
    </div>
  )
}
