import React from 'react';
import styles from './Toggle.module.scss';

interface ToggleProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  size?: 'small' | 'medium' | 'large';
  helperText?: string;
  id?: string;
}

const Toggle: React.FC<ToggleProps> = ({
  label,
  checked,
  onChange,
  disabled = false,
  size = 'medium',
  helperText,
  id
}) => {
  // Pour avoir un ID unique pour l'input et le label
  const toggleId = id || `toggle-${label.replace(/\s+/g, '-').toLowerCase()}`;

  return (
    <div className={`${styles.toggleContainer} ${styles[size]} ${disabled ? styles.disabled : ''}`}>
      <div className={styles.toggleWrapper}>
        <input
          type="checkbox"
          id={toggleId}
          className={styles.input}
          checked={checked}
          onChange={(e) => !disabled && onChange(e.target.checked)}
          disabled={disabled}
        />
        <label htmlFor={toggleId} className={styles.slider} />
        <label htmlFor={toggleId} className={styles.label}>
          {label}
        </label>
      </div>
      {helperText && <p className={styles.helperText}>{helperText}</p>}
    </div>
  );
};

export default Toggle;