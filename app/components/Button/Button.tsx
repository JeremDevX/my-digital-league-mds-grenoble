import styles from "./Button.module.scss";
import Link from "next/link";
import { ReactNode } from "react";

interface ButtonProps {
  type?: "primary" | "secondary" | "tertiary";
  href?: string;
  fullWidth?: boolean;
  onClick?: () => void;
  label: string;
  icon?: ReactNode;
  iconPosition?: "left" | "right" | "both";
  disabled?: boolean;
}

export default function Button(props: ButtonProps) {
  return (
    <button
      className={`${props.type ? `${styles.button} ${styles[props.type]}` : styles.button} ${props.fullWidth ? styles.fullWidth : ""}`}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.icon &&
      (props.iconPosition === "left" || props.iconPosition === "both")
        ? props.icon
        : null}
      {props.href ? <Link href={props.href}>{props.label}</Link> : props.label}
      {props.icon &&
      (props.iconPosition === "right" || props.iconPosition === "both")
        ? props.icon
        : null}
    </button>
  );
}
