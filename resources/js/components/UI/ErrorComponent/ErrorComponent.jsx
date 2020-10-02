import React from "react";
import './errorComponent.scss';

export const ErrorComponent = ({children}) => (
  <div className="error-component w-100 text-center mt-4 py-4">
    <h3 className="mb-0">{children}</h3>
  </div>
);
