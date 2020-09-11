import React from "react";
import './button.scss'

const Button = ({ children, onClickFunc, type, style, disabled = false }) => {
  return (
    <button
      className={'button-component btn btn-' + style}
      type={type}
      onClick={onClickFunc}
      disabled={disabled}
    >
      {children}
    </button>
  );

};

export default Button;