import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Menu from "./Menu";

import styles from "../styles/components/Layout.module.css";

const Layout: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className={styles.layout}>
      <Header onMenuClick={toggleMenu} />
      <Menu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      <main className={styles.content}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
