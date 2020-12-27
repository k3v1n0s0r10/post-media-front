interface ButtonProps {
  label: string;
  submit?: boolean;
  onClick?: any;
  textColor: string;
  bgColor: string;
}

const Button: React.FC<ButtonProps> = ({
  submit,
  label,
  onClick,
  textColor,
  bgColor,
}) => {
  return (
    <button
      style={{ color: textColor, backgroundColor: bgColor }}
      type={submit ? "submit" : "button"}
      onClick={onClick && onClick}
    >
      {label}
    </button>
  );
};

export default Button;
