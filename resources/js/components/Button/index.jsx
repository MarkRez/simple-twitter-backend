import React from "react";
import './button.scss'

const Button = ({ children, onClickFunc, type, style}) => {
  return (
    <button
      className={'button-component btn btn-' + style}
      type={type}
      onClick={onClickFunc}
    >
      {children}
    </button>
  );

};

export default Button;