import styles from "./Radio.module.scss";
import React from "react";

interface RadioProps {
    label: string;
    name: string;
    value: string;
    checked?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    disabled?: boolean;
    helperText?: string;
}

export default function Radio(props: RadioProps) {
    return (
        <label
            className={`${styles.radio} ${props.disabled ? styles.disabled : ""}`}
        >
            <input
                type="radio"
                className={styles.input}
                name={props.name}
                value={props.value}
                checked={props.checked}
                onChange={props.onChange}
                disabled={props.disabled}
            />
            <span
                className={`${styles.circle} ${
                    props.checked ? styles.checked : ""
                }`}
            />
            {props.label}
        </label>
    );
}