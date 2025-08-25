import React from "react";

import LoadingSpinner from "../../assets/LoadingSpinner";

import styles from "../../styles/components/Buttons.module.css";

type ButtonVariant = "primary" | "secondary" | "danger";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  variant?: ButtonVariant;
}

const Button: React.FC<ButtonProps> = ({
  children,
  loading,
  variant = "primary",
  ...props
}) => {
  return (
    <button
      className={styles.btn}
      data-variant={variant}
      disabled={loading}
      {...props}
    >
      {loading ? <LoadingSpinner size="24px" /> : children}
    </button>
  );
};

export default Button;
