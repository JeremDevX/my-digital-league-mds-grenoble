import styles from "./Button.module.scss";
import Link from "next/link";

interface ButtonProps {
  type?: "primary" | "secondary" | "tertiary";
  href?: string;
  fullWidth?: boolean;
  onClick?: () => void;
  label: string;
  icon?: "left" | "right" | "both";
  disabled?: boolean;
}

export default function Button(props: ButtonProps) {
  return (
    <button
      className={`${props.type ? `${styles.button} ${styles[props.type]}` : styles.button} ${props.fullWidth ? styles.fullWidth : ""}`}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.icon === "left" || props.icon === "both" ? <Icon /> : null}
      {props.href ? <Link href={props.href}>{props.label}</Link> : props.label}
      {props.icon === "right" || props.icon === "both" ? <Icon /> : null}
    </button>
  );
}

function Icon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_2851_781)">
        <path
          d="M14.5 8C14.5 9.72391 13.8152 11.3772 12.5962 12.5962C11.3772 13.8152 9.72391 14.5 8 14.5C6.27609 14.5 4.62279 13.8152 3.40381 12.5962C2.18482 11.3772 1.5 9.72391 1.5 8C1.5 6.27609 2.18482 4.62279 3.40381 3.40381C4.62279 2.18482 6.27609 1.5 8 1.5C9.72391 1.5 11.3772 2.18482 12.5962 3.40381C13.8152 4.62279 14.5 6.27609 14.5 8ZM0 8C0 10.1217 0.842855 12.1566 2.34315 13.6569C3.84344 15.1571 5.87827 16 8 16C10.1217 16 12.1566 15.1571 13.6569 13.6569C15.1571 12.1566 16 10.1217 16 8C16 5.87827 15.1571 3.84344 13.6569 2.34315C12.1566 0.842855 10.1217 0 8 0C5.87827 0 3.84344 0.842855 2.34315 2.34315C0.842855 3.84344 0 5.87827 0 8ZM12.1031 8.35312C12.2969 8.15937 12.2969 7.84062 12.1031 7.64687L8.85312 4.39687C8.70937 4.25312 8.49375 4.2125 8.30937 4.2875C8.125 4.3625 8 4.54688 8 4.75V7H4.75C4.33437 7 4 7.33437 4 7.75V8.25C4 8.66562 4.33437 9 4.75 9H8V11.25C8 11.4531 8.12187 11.6344 8.30937 11.7125C8.49687 11.7906 8.7125 11.7469 8.85312 11.6031L12.1031 8.35312Z"
          fill="white"
        />
      </g>
      <defs>
        <clipPath id="clip0_2851_781">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
