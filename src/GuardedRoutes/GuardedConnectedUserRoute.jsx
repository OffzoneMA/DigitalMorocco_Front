import React  from 'react';
import { Navigate, Outlet  } from "react-router-dom";

const GuardedConnectedUserRoute  = () => {

  const userData = sessionStorage.getItem('userData');
  const userToken = sessionStorage.getItem('userToken')

return ( 
  (userData || userToken)  ? <Outlet/>: <Navigate to='/SignIn'/>
  )

}
export default GuardedConnectedUserRoute;
