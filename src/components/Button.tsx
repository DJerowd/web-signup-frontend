import React from "react";
import "../styles/components/Buttons.css";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({ children, loading, ...props }) => {
  return (
    <button className="btn" disabled={loading} {...props}>
      {loading ? "Carregando..." : children}
    </button>
  );
};

export default Button;
