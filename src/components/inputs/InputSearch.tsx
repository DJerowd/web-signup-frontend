import React from "react";
import { SearchIcon } from "../icons/SearchIcon";

import styles from "../../styles/components/Inputs.module.css";

interface InputSearchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const InputSearch: React.FC<InputSearchProps> = ({ label, id, ...props }) => {
  return (
    <div className={styles.formGroup}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <div className={styles.inputGroup}>
        <span className={styles.searchIcon}>
          <SearchIcon />
        </span>
        <input
          id={id}
          className={`${styles.input} ${styles.searchInput}`}
          {...props}
        />
      </div>
    </div>
  );
};

export default InputSearch;
