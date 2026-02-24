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


export default function Input(props: InputProps) {

  return (
    <div className="inputContainer">
      {props.label && <label className="inputLabel">{props.label} {props.obligatory && <span className="required">*</span>}</label>}
      <input
        type={props.type || "text"}
        placeholder={props.placeholder}
        value={props.value}
        onChange={(e) => props.onChange?.(e.target.value)}
        disabled={props.disabled}
        className={`inputField ${props.error ? 'errorActive' : ''}`}
      />

      {props.error && props.errorMessage && (
        <span className="errorMessage">{props.errorMessage}</span>
      )}
    </div>
  );
}