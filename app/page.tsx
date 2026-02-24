import styles from "./page.module.scss";
import Button from "./components/Button/Button";
import { MessageSquareIcon } from "./components/Icons/Icons";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Button
          type="tertiary"
          href="/"
          label="Home"
          icon={<MessageSquareIcon />}
          iconPosition="left"
        />
      </main>
    </div>
  );
}
