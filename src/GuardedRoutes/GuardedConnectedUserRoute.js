import React  from 'react';
import { Navigate, Outlet  } from "react-router-dom";

const GuardedConnectedUserRoute  = () => {

  const userData = sessionStorage.getItem('userData');

return ( 
  (userData)  ? <Outlet/>: <Navigate to='/SignIn'/>
  )

}
export default GuardedConnectedUserRoute;
