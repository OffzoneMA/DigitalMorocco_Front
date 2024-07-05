import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ConnectedUserRoute = () => {
  const userData = JSON.parse(sessionStorage.getItem('userData'));

  if (userData) {
    if (userData?.status === 'verified' || userData?.status === 'accepted') {
      if (userData?.role) {
        return <Navigate to="/Dashboard" />;
      } else {
        return <Navigate to="/ChooseRole" />;
      }
    } else if(userData?.status === 'pending') {
      return <Navigate to="/RedirectFromChooseRole" />;
    }
  } else {
    return <Outlet />;
  }
};

export default ConnectedUserRoute;
