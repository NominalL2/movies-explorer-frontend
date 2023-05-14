import React from 'react';

import { Navigate } from "react-router-dom";

import Loading from '../Loading/Loading.js';


const ProtectedRouteElement = ({ element: Component, ...props }) => {

    return (
      props.isLoading ? <Loading /> : props.loggedIn ? <Component {...props} /> : <Navigate to='/' replace />
    )
}

export default ProtectedRouteElement;