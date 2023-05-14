import React from 'react';

import { Navigate } from "react-router-dom";

import Loading from '../Loading/Loading.js';


const LoggedProtectedRouteElement = ({ element: Component, ...props }) => {

  return (
    props.isLoading ? <Loading /> : props.loggedIn ? <Navigate to='/' replace /> : <Component {...props} />
  )
}

export default LoggedProtectedRouteElement;