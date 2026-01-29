"use client";

import styles from "./Header.module.scss"; 
import { useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header>
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

      <nav data-open={isMenuOpen}>
        <ul>
          <li><a href="#">Accueil</a></li>
          <li><a href="#">À propos</a></li>
          <li><a href="#">Contact</a></li>
        </ul>

        <div>
          // TODO: Button component
          // TODO: Button component
        </div>
      </nav>
    </header>
  );
}
