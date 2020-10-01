import React from 'react';
import {ErrorComponent} from "../../components/UI";

const NotFound = () => {
  return (
    <div className="not-found-page">
      <ErrorComponent>Error 404! Page not found.</ErrorComponent>
    </div>
  )
}

export default NotFound;
