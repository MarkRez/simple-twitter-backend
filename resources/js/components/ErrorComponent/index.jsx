import React from "react";
import './errorComponent.scss';

const ErrorComponent = ({children}) => (
  <div className="error-component w-100 text-center">
    <h3>{children}</h3>
  </div>
)

export default ErrorComponent;


