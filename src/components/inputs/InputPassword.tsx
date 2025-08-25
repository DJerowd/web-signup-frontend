import React, { useState } from "react";
import { EyeIcon } from "../icons/EyeIcon";

import styles from "../../styles/components/Inputs.module.css";

interface InputPasswordProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const InputPassword: React.FC<InputPasswordProps> = ({
  label,
  id,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={styles.formGroup}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <div className={styles.inputGroup}>
        <input
          id={id}
          className={styles.input}
          type={showPassword ? "text" : "password"}
          {...props}
        />
        <button
          type="button"
          className={styles.passwordToggle}
          onClick={togglePasswordVisibility}
          aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
        >
          <EyeIcon isOpen={showPassword} />
        </button>
      </div>
    </div>
  );
};

export default InputPassword;
