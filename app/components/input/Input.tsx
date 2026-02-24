import './Input.module.scss';

interface InputProps{
    label?: string;
    placeholder?: string;
    value?: string;
    onChange?: (value: string) => void;
    disabled?: boolean;
    type?: string;
    error?: boolean;
    errorMessage?: string;
    obligatory?: boolean;
}


export default function Input({ 
  label, 
  placeholder, 
  value, 
  onChange, 
  disabled , 
  type, 
  error, 
  errorMessage,
  obligatory}: InputProps) {


  return (
    <div className="inputContainer">
      {label && <label className="inputLabel">{label} {obligatory && <span className="required">*</span>}</label>}
      <input
        type={type || "text"}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        disabled={disabled}
        className={`inputField ${error ? 'errorActive' : ''}`}
      />

      {error && errorMessage && (
        <span className="errorMessage">{errorMessage}</span>
      )}
    </div>
  );
}