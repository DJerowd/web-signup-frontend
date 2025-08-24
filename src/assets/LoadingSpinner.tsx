import React from "react";

import "../styles/assets/loading.css";

interface LoadingSpinnerProps {
  size?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = "24px" }) => {
  return (
    <div className="loader-bg">
      <div className="loader" style={{ width: size, height: size }}></div>
    </div>
  );
};

export default LoadingSpinner;
