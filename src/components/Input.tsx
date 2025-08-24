import React from "react";

import "../styles/components/Inputs.css";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Input: React.FC<InputProps> = ({ label, id, ...props }) => {
  return (
    <div className="form-group">
      <label htmlFor={id} className="label">
        {label}
      </label>
      <input id={id} className="input" {...props} />
    </div>
  );
};

export default Input;
