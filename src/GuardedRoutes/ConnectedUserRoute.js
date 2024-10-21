import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ConnectedUserRoute = () => {
  const userData = JSON.parse(sessionStorage.getItem('userData'));

  if (userData) {
    if (userData?.status === 'verified' || userData?.status === 'accepted') {
      if (userData?.role) {
        if(userData?.role.toLowerCase() === "admin") {
          return <Navigate to="/Dashboard_Admin" />;
        }
        else if(userData?.role.toLowerCase() === "investor") {
          return <Navigate to="/Dashboard_Investor" />;
        }
        else if(userData?.role.toLowerCase() === "member" || userData?.role?.toLowerCase() === "partner") {
          return <Navigate to="/Dashboard" />;
        }
        else {
          return <Navigate to="/RedirectFromSignIn" />;
        }
      } else {
        return <Navigate to="/ChooseRole" />;
      }
    } else if(userData?.status === 'pending') {
      return <Navigate to="/RedirectFromSignIn" />;
    }
  } else {
    return <Outlet />;
  }
};

export default ConnectedUserRoute;
