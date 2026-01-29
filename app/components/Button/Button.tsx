import styles from "./Button.module.scss";
import Link from "next/link";

interface ButtonProps {
  bgFull?: boolean;
  href?: string;
  onClick?: () => void;
  label: string;
}

export default function Button(props: ButtonProps) {
  return (
    <button
      className={
        props.bgFull ? `${styles.button} ${styles.bgFull}` : styles.button
      }
      onClick={props.onClick}
    >
      {props.href ? <Link href={props.href}>{props.label}</Link> : props.label}
    </button>
  );
}
