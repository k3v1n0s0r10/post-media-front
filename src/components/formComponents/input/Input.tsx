import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import "./Input.scss";

type FormType = "text" | "password" | "email" | "tel";

interface InputProps {
  type: FormType;
  value: string;
  name: string;
  required?: boolean;
  label: string;
  onChange: any;
  error?: string;
  maxLength?: number;
  autocomplete?: "on" | "off";
}

const Input: React.FC<InputProps> = ({
  label,
  name,
  type,
  value,
  onChange,
  error,
  maxLength,
  autocomplete = "on",
  ...rest
}) => {
  const inputRef = useRef(null);

  useEffect(() => {}, []);

  return (
    <label className="custom-input" htmlFor={name}>
      <span>{label}</span>
      <motion.input
        whileFocus={{ scale: 1.05 }}
        ref={inputRef}
        name={name}
        id={name}
        onChange={onChange}
        type={type}
        value={value}
        autoComplete={autocomplete}
        maxLength={maxLength}
        {...rest}
      />
      {error && <p>{error}</p>}
    </label>
  );
};

export default Input;
