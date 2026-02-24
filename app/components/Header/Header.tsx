"use client";

import styles from "./Header.module.scss"; 
import { useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={styles.header}>
      <div className={styles.containerLogo}>
        <img className={styles.logo} src="/logo.svg" alt="Logo" width={150} height={40} />
      </div>

      <button
        className={styles.burgerButton}
        type="button"
        aria-label="Menu"
        aria-expanded={isMenuOpen}
        onClick={toggleMenu}
      >
        <span className={isMenuOpen ? styles.buttonOpen : styles.buttonOpen}></span>
        <span className={isMenuOpen ? styles.buttonOpen : styles.buttonOpen}></span>
        <span className={isMenuOpen ? styles.buttonOpen : styles.buttonOpen}></span>
      </button>

      <nav className={styles.containerNav} data-open={isMenuOpen}>
        <ul className={styles.nav}>
          <li><a className={styles.navLink} href="#">Jeu</a></li>
          <li><a className={styles.navLink} href="#">Tournois</a></li>
          <li><a className={styles.navLink} href="#">Communauté</a></li>
          <li><a className={styles.navLink} href="#">Support</a></li>
        </ul>

        <div className={styles.actions}>
          <button className={styles.btnConnexion}>Connexion</button>
          <button className={styles.btnInscription}>Inscription</button>
        </div>
      </nav>
    </header>
  );
}
