import React from 'react';
import {  Navigate, Outlet  } from "react-router-dom";
import { useGetUserDetailsQuery } from '../Services/Auth';

const GuardedMemberPage  = () => {
const {
    data, isFetching
  } = useGetUserDetailsQuery()

  if (isFetching ) {
    return <div>Loading</div>
  }
else
return ( 
  (data?.role === "member" && data?.member?.subStatus === "active") || data?.role === "parntner"  ? <Outlet/>: <Navigate to='/SignIn'/>
 )

}
export default GuardedMemberPage;