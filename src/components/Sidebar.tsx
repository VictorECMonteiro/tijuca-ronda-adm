import React from "react";
import styles from "../styles/Sidebar.module.css";
import logo from '../assets/img/logo.png';

import { FiUser, FiLogOut, FiHome, FiMapPin, FiMap, FiFileText } from "react-icons/fi";

const UserIcon = FiUser as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
const LogOutIcon = FiLogOut as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
const HomeIcon = FiHome as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
const MapPinIcon = FiMapPin as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
const MapIcon = FiMap as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
const FileTextIcon = FiFileText as unknown as React.FC<React.SVGProps<SVGSVGElement>>;

const Sidebar = ({isOpen}: {isOpen?: any}) => {
  return (
    <div className={isOpen || document.body.clientWidth > 470?styles.sidebar:styles.close}>
      <div className={styles.user}>
        <img src={logo} alt="logo" className={styles.logo} />
        <div className={styles.user2}>
          <img src="/user-avatar.png" alt="Avatar" className={styles.avatar} />
          <div className={styles.texto}>
            <p className={styles.username}>KETELY</p>
            <p className={styles.userId}>62182737376</p>
          </div>
        </div>
      </div>

      <div className={styles.menu}>

        <a href="/" className={styles.menuItem1}>
        <LogOutIcon className={styles.icone} />
          <div className={styles.menutext1}>
            Encerrar Sessão
          </div>
        </a>
        
          <a href="/home" className={styles.menuItem}>
          <HomeIcon className={styles.icons} />
           <div className={styles.menutext}>Página Inicial</div>
          </a>
        
          <a href="/Users" className={styles.menuItem}>
          <UserIcon className={styles.icons} />
           <div className={styles.menutext}>Gerenciar Usuários</div>
          </a>

        <a href="/Local"  className={styles.menuItem}>
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
        

          <a href="#" className={styles.menuItem}>
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
