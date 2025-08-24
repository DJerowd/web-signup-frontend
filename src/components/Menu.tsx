import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

import styles from "../styles/components/Menu.module.css";

interface MenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const Menu: React.FC<MenuProps> = ({ isOpen, onClose }) => {
  const { logout } = useAuth();

  const handleLogout = () => {
    onClose();
    logout();
  };

  return (
    <>
      <div
        className={`${styles.overlay} ${isOpen ? styles.overlayOpen : ""}`}
        onClick={onClose}
      />
      <nav className={`${styles.menu} ${isOpen ? styles.menuOpen : ""}`}>
        <ul className={styles.navList}>
          <li>
            <NavLink
              to="/app/profile"
              className={({ isActive }) =>
                isActive ? styles.activeLink : styles.link
              }
              onClick={onClose}
            >
              Perfil
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/app/dashboard"
              className={({ isActive }) =>
                isActive ? styles.activeLink : styles.link
              }
              onClick={onClose}
            >
              Dashboard
            </NavLink>
          </li>
        </ul>
        <button className={styles.logoutButton} onClick={handleLogout}>
          Sair
        </button>
      </nav>
    </>
  );
};

export default Menu;
