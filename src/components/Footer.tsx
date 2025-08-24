import React from "react";

import styles from "../styles/components/Footer.module.css";

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <p>
        &copy; {new Date().getFullYear()} Seu Nome. Todos os direitos
        reservados.
      </p>
    </footer>
  );
};

export default Footer;
