import React from "react";
import './button.scss'

export const Button = ({ children, onClickFunc, type, style, disabled = false }) => {
  return (
    <button
      className={'button-component py-2 px-3 btn btn-' + style}
      type={type}
      onClick={onClickFunc}
      disabled={disabled}
    >
      {children}
    </button>
  );

};
