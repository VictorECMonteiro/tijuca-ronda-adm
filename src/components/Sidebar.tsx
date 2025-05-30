import React, { useEffect, useState } from "react";
import styles from "../styles/Sidebar.module.css";
import logo from '../assets/img/logo.png';
import colapseIcon from "../assets/img/arrows-collapse-vertical.svg"

import { FiUser, FiLogOut, FiHome, FiMapPin, FiMap, FiFileText } from "react-icons/fi";
import getCookie from "../utils/getCookie";
import writeCookie from "../utils/writeCookie";

const UserIcon = FiUser as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
const LogOutIcon = FiLogOut as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
const HomeIcon = FiHome as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
const MapPinIcon = FiMapPin as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
const MapIcon = FiMap as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
const FileTextIcon = FiFileText as unknown as React.FC<React.SVGProps<SVGSVGElement>>;

const Sidebar = ({ isOpen, closeSide }: { isOpen?: any, closeSide?: (item:any)=>any }) => {
  const [cookies, setCookies] = useState({nomedeUsuario: "", permissao: ""})
  useEffect(()=>{
      let cookies = getCookie("User")
      if(!cookies){
        window.location.href = "/"
      }
      setCookies(JSON.parse(cookies))

  },[])
  const cleanCookies = ()=>{
    writeCookie("User", "", 10000)

  }

  return (
    <div className={isOpen || document.body.clientWidth > 470 ? styles.sidebar : styles.close}>
      
      <div className={styles.user}>
        <div className={styles.logoColapse}>
        <img src={logo} alt="logo" className={styles.logo} />
        <div>
        <button onClick={()=>{closeSide(!isOpen)}}><img src={colapseIcon} alt="" /></button>
        </div>
      </div>
        <div className={styles.user2}>
          <img src="/user-avatar.png" className={styles.avatar} />
          <div className={styles.texto}>
            <p className={styles.username}>{cookies.nomedeUsuario}</p>
            <p className={styles.userId}>{cookies.permissao}</p>
          </div>
        </div>
      </div>

      <div className={styles.menu}>
        <a href="/" className={styles.menuItem1} onClick={()=>{cleanCookies()}}>
          <LogOutIcon className={styles.icone} />
          <h1 className={styles.menutext1}>
            Encerrar Sessão
          </h1>
        </a>

        <a href="/home" className={styles.menuItem}>
          <HomeIcon className={styles.icons} />
          <div className={styles.menutext}>Página Inicial</div>
        </a>

        <a href="/Users" className={styles.menuItem}>
          <UserIcon className={styles.icons} />
          <div className={styles.menutext}>Gerenciar Usuários</div>
        </a>

        <a href="/Local" className={styles.menuItem}>
          <MapPinIcon className={styles.icons} />
          <div className={styles.menutext}>
            Gerenciar Locais
          </div>
        </a>

        <a href="/Rota" className={styles.menuItem}>
          <MapIcon className={styles.icons} />
          <div className={styles.menutext}>
            Gerenciar Rotas
          </div>
        </a>


        <a href="/Logs" className={styles.menuItem}>
          <FileTextIcon className={styles.icons} />
          <div className={styles.menutext}>
            Consultar Registros
          </div>
        </a>


      </div>

      <footer className={styles.footer}>
        <p>Tijuca Alimentos</p>
        <p>2025</p>
      </footer>
    </div>
  );
};

export default Sidebar;
