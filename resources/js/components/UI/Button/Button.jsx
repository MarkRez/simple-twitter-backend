import React from "react";
import './button.scss'

export const Button = ({ children, handleClick, type, style, disabled = false }) => {
  return (
    <button
      className={'button-component py-2 px-3 btn btn-' + style}
      type={type}
      onClick={handleClick}
      disabled={disabled}
    >
      {children}
    </button>
  );

};
