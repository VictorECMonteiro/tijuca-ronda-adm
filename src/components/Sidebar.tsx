import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import styles from "../styles/Sidebar.module.css";
import logo from "../assets/img/logo.png";
import colapseIcon from "../assets/img/arrows-collapse-vertical.svg";

import {
  FiUser,
  FiLogOut,
  FiHome,
  FiMapPin,
  FiMap,
  FiFileText,
} from "react-icons/fi";

import getCookie from "../utils/getCookie";
import writeCookie from "../utils/writeCookie";

interface SidebarProps {
  isOpen?: boolean;
  closeSide?: (open: boolean) => void;
}

const UserIcon = FiUser as React.FC<React.SVGProps<SVGSVGElement>>;
const LogOutIcon = FiLogOut as React.FC<React.SVGProps<SVGSVGElement>>;
const HomeIcon = FiHome as React.FC<React.SVGProps<SVGSVGElement>>;
const MapPinIcon = FiMapPin as React.FC<React.SVGProps<SVGSVGElement>>;
const MapIcon = FiMap as React.FC<React.SVGProps<SVGSVGElement>>;
const FileTextIcon = FiFileText as React.FC<React.SVGProps<SVGSVGElement>>;

const Sidebar: React.FC<SidebarProps> = ({
  isOpen = false,
  closeSide = () => {},
}) => {
  const [cookies, setCookies] = useState<{ nomedeUsuario: string; permissao: string }>({
    nomedeUsuario: "",
    permissao: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const cookieValue = getCookie("User");
    if (!cookieValue) {
    } else {
      try {
        setCookies(JSON.parse(cookieValue));
      } catch {
        writeCookie("User", "", 1);
      }
    }
  }, [navigate]);

  const cleanCookies = () => {
    writeCookie("User", "", 1);
  };


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
          <img src="/user-avatar.png" className={styles.avatar} alt="Avatar" />
          <div className={styles.texto}>
            <p className={styles.username}>{cookies.nomedeUsuario || "Usuário"}</p>
            <p className={styles.userId}>{cookies.permissao || "Permissão"}</p>
          </div>
        </div>
      </div>

      <nav className={styles.menu}>
        <NavLink
          to="/home"
          className={({ isActive }) =>
            isActive ? `${styles.menuItem} ${styles.active}` : styles.menuItem
          }
        >
          <HomeIcon className={styles.icons} />
          <div className={styles.menutext}>Página Inicial</div>
        </NavLink>

        <NavLink
          to="/Users"
          className={({ isActive }) =>
            isActive ? `${styles.menuItem} ${styles.active}` : styles.menuItem
          }
        >
          <UserIcon className={styles.icons} />
          <div className={styles.menutext}>Gerenciar Usuários</div>
        </NavLink>

        <NavLink
          to="/Local"
          className={({ isActive }) =>
            isActive ? `${styles.menuItem} ${styles.active}` : styles.menuItem
          }
        >
          <MapPinIcon className={styles.icons} />
          <div className={styles.menutext}>Gerenciar Locais</div>
        </NavLink>

        <NavLink
          to="/Rota"
          className={({ isActive }) =>
            isActive ? `${styles.menuItem} ${styles.active}` : styles.menuItem
          }
        >
          <MapIcon className={styles.icons} />
          <div className={styles.menutext}>Gerenciar Rotas</div>
        </NavLink>

        <NavLink
          to="/Logs"
          className={({ isActive }) =>
            isActive ? `${styles.menuItem} ${styles.active}` : styles.menuItem
          }
        >
          <FileTextIcon className={styles.icons} />
          <div className={styles.menutext}>Consultar Registros</div>
        </NavLink>

        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? `${styles.menuItem1} ${styles.active}` : styles.menuItem1
          }
        >
          <LogOutIcon className={styles.icone} />
          <div className={styles.menutext1}>Encerrar Sessão</div>
        </NavLink>
      </nav>
      

    </div>
  );
};

export default Sidebar;
