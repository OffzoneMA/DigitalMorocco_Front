import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Route, Navigate, Outlet  } from "react-router-dom";
import { useGetUserDetailsQuery } from '../Services/Auth';

const GuardedUserInvestorRoutes  = () => {
  const {
    data, isFetching
  } = useGetUserDetailsQuery()
  const { userInfo, loading } = useSelector((state) => state.auth);

  if (isFetching || loading) {
    return <div>Loading</div>
  }
  else
return ( 
  (userInfo?.role == "investor" && userInfo?.status == "accepted") || (data?.role == "investor" && data?.status == "accepted") ? <Outlet/>: <Navigate to='/SignIn'/>
 )

}
export default GuardedUserInvestorRoutes;