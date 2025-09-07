import React from "react";
import EmailIcon from "./icons/EmailIcon";
import GitHubIcon from "./icons/GitHubIcon";
import LinkedInIcon from "./icons/LinkedInIcon";
import YouTubeIcon from "./icons/YouTubeIcon";

import styles from "../styles/components/Footer.module.css";

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>

        <div className={styles.info}>
          <p>&copy; {new Date().getFullYear()} DJerowd.</p>
          <p>Todos os direitos reservados.</p>
        </div>

        <div className={styles.contacts}>
          <h3 className={styles.contactsTitle}>Contatos</h3>
          <ul className={styles.socialList}>
            <li>
              <a
                href="https://www.linkedin.com/in/djerowd-moreschi"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn de Djerowd"
              >
                <LinkedInIcon />
                <span>LinkedIn</span>
              </a>
            </li>

            <li>
              <a
                href="https://github.com/DJerowd"
                target="_blank"
                rel="noopener noreferrer"
              >
                <GitHubIcon />
                <span>GitHub</span>
              </a>
            </li>

            <li>
              <a
                href="https://www.youtube.com/@DJ_Moreschi"
                target="_blank"
                rel="noopener noreferrer"
              >
                <YouTubeIcon />
                <span>YouTube</span>
              </a>
            </li>

            <li>
              <a
                href="mailto:djerowdalexsanderbr@gmail.com"
                aria-label="Enviar email para Djerowd"
              >
                <EmailIcon />
                <span>Gmail</span>
              </a>
            </li>
          </ul>
        </div>
        
      </div>
    </footer>
  );
};

export default Footer;
