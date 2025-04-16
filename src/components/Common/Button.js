import React from "react";

function Button({ children, className, ...props }) {
  return (
    <button className={`btn ${className || "btn-primary"}`} {...props}>
      {children}
    </button>
  );
}

export default Button;
