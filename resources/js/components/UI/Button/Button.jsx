import React from "react";
import './button.scss'

export const Button = ({ children, btnClassName, ...rest }) => {
  return (
    <button
      className={'button-component py-2 px-3 btn btn-' + btnClassName}
      {...rest}
    >
      {children}
    </button>
  );

};
