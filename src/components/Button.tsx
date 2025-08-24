import React from "react";
import LoadingSpinner from "../assets/LoadingSpinner";

import styles from  "../styles/components/Buttons.module.css";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({ children, loading, ...props }) => {
  return (
    <button className={styles.btn} disabled={loading} {...props}>
      {loading ? <LoadingSpinner size="24px" /> : children}
    </button>
  );
};

export default Button;
