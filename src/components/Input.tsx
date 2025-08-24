import React from "react";

import styles from "../styles/components/Inputs.module.css";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Input: React.FC<InputProps> = ({ label, id, ...props }) => {
  return (
    <div className={styles.formGroup}>
      <label htmlFor={id} className="label">
        {label}
      </label>
      <input id={id} className={styles.input} {...props} />
    </div>
  );
};

export default Input;
