import React from "react";
import { Link } from "react-router-dom";
import { MenuIcon } from "./icons/MenuIcon";
import Logo from "./icons/Logo";

import styles from "../styles/components/Header.module.css";

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  return (
    <header className={styles.header}>
      <div className={styles.content}>
        <Link to="/app/dashboard" className={styles.logoLink}>
          <Logo />
        </Link>
        <button
          className={styles.menuButton}
          onClick={onMenuClick}
          aria-label="Abrir menu"
        >
          <MenuIcon />
        </button>
      </div>
    </header>
  );
};

export default Header;
