import React from "react";
import styles from "../styles/Sidebar.module.css";
import logo from '../assets/img/logo.png';
import { NavLink } from "react-router-dom";


import { FiUser, FiLogOut, FiHome, FiMapPin, FiMap, FiFileText } from "react-icons/fi";

const UserIcon = FiUser as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
const LogOutIcon = FiLogOut as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
const HomeIcon = FiHome as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
const MapPinIcon = FiMapPin as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
const MapIcon = FiMap as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
const FileTextIcon = FiFileText as unknown as React.FC<React.SVGProps<SVGSVGElement>>;

const Sidebar = ({isOpen}: {isOpen?: any}) => {
  return (
    
    <div className={isOpen || document.body.clientWidth > 470 ? styles.sidebar : styles.close}>
    <div className={styles.top}>
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
          <NavLink to="/home" className={({ isActive }) =>
            isActive ? `${styles.menuItem} ${styles.active}` : styles.menuItem}>
            <HomeIcon className={styles.icons} />
            <div className={styles.menutext}>Página Inicial</div>
          </NavLink>

          <NavLink to="/Users" className={({ isActive }) =>
            isActive ? `${styles.menuItem} ${styles.active}` : styles.menuItem}>
            <UserIcon className={styles.icons} />
            <div className={styles.menutext}>Gerenciar Usuários</div>
          </NavLink>

          <NavLink to="/Local" className={({ isActive }) =>
            isActive ? `${styles.menuItem} ${styles.active}` : styles.menuItem}>
            <MapPinIcon className={styles.icons} />
            <div className={styles.menutext}>Gerenciar Locais</div>
          </NavLink>

          <NavLink to="/Rota" className={({ isActive }) =>
            isActive ? `${styles.menuItem} ${styles.active}` : styles.menuItem}>
            <MapIcon className={styles.icons} />
            <div className={styles.menutext}>Gerenciar Rotas</div>
          </NavLink>

          <NavLink to="/Logs" className={({ isActive }) =>
            isActive ? `${styles.menuItem} ${styles.active}` : styles.menuItem}>
            <FileTextIcon className={styles.icons} />
            <div className={styles.menutext}>Consultar Registros</div>
          </NavLink>
        </div>
      </div>

      <NavLink to="/" className={styles.menuItem1}>
        <LogOutIcon className={styles.icone} />
        <div className={styles.menutext1}>Encerrar Sessão</div>
      </NavLink>
      </div>
  );
};

export default Sidebar;
