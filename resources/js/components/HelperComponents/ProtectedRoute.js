import React from 'react'
import { Redirect } from 'react-router-dom'

export const ProtectedRoute = (props) => {
    const { Component, redirectLink = 'login', ...rest } = props;
    const isAuthenticated = localStorage.getItem('_token');

    return isAuthenticated ? (
      <Component {...rest}/>
    ) : (
      <Redirect to={{ pathname: `/${redirectLink}` }} />
    );
}
