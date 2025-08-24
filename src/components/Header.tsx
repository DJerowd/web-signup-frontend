import React from "react";
import { MenuIcon } from "./icons/MenuIcon";

import styles from "../styles/components/Header.module.css";

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  return (
    <header className={styles.header}>
      <div className={styles.content}>
        <h1 className={styles.title}>Minha Aplicação</h1>
        <button className={styles.menuButton} onClick={onMenuClick}>
          <MenuIcon />
        </button>
      </div>
    </header>
  );
};

export default Header;
