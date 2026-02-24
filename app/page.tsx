import styles from "./page.module.scss";
import Button from "./components/Button/Button";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Button type="tertiary" href="/" label="Home" disabled />
      </main>
    </div>
  );
}
