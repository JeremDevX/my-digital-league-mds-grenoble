import Link from "next/link";
import { DiscordIcon, EnvelopIcon, InstagramIcon } from "../Icons/Icons";
import styles from "./Footer.module.scss";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.brand}>
        <img
          className={styles.logo}
          src="/logo.svg"
          alt="Logo"
          width={150}
          height={40}
        />
        <p className={styles.brandText}>
          La plateforme gaming de MyDigitalSchool Grenoble
        </p>
        <div className={styles.socials}>
          <Link
            href="https://discord.gg/your-discord-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            <DiscordIcon width={24} height={24} color="white" />
          </Link>
          <Link
            href="https://instagram.com/your-instagram-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            <InstagramIcon width={24} height={24} color="white" />
          </Link>
          <Link
            href="mailto:contact@mydigitalleague.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <EnvelopIcon width={24} height={24} color="white" />
          </Link>
        </div>
      </div>
      <div className={styles.linksContainer}>
        <div className={styles.linksTop}>
          <div className={styles.links}>
            <p className={styles.categoryLink}>Jeux</p>
            <ul>
              <li>
                <Link href="/jeu">Balatro</Link>
              </li>
              <li>
                <Link href="/jeu">Tetris</Link>
              </li>
            </ul>
          </div>
          <div className={styles.links}>
            <p className={styles.categoryLink}>Tournois</p>
            <ul>
              <li>
                <Link href="/jeu">No lo se</Link>
              </li>
              <li>
                <Link href="/jeu">No lo se</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.linksBottom}>
          <div className={styles.links}>
            <p className={styles.categoryLink}>Communauté</p>
            <ul>
              <li>
                <Link href="/jeu">Discord</Link>
              </li>
              <li>
                <Link href="/jeu">Équipe</Link>
              </li>
              <li>
                <Link href="/jeu">Classement</Link>
              </li>
            </ul>
          </div>
          <div className={styles.links}>
            <p className={styles.categoryLink}>Support</p>
            <ul>
              <li>
                <Link href="/jeu">FAQ</Link>
              </li>
              <li>
                <Link href="/jeu">Règlements</Link>
              </li>
              <li>
                <Link href="/jeu">Contact</Link>
              </li>
              <li>
                <Link href="/jeu">Mentions légales</Link>
              </li>
              <li>
                <Link href="/jeu">Confidentialité</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
