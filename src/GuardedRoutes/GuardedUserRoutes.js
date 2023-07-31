import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Route, Navigate, Outlet  } from "react-router-dom";
import { useGetUserDetailsQuery } from '../Services/Auth';

const GuardedUserRoutes = () => {
const {
    data,
    isLoading,isUninitialized,status,error
  } = useGetUserDetailsQuery()
  const { userInfo, loading } = useSelector((state) => state.auth);

  if (isLoading || loading) {
    return <div>Loading</div>
  }
else
return ( 
   userInfo?.status == "accepted" || data?.status == "accepted"? <Outlet/>: <Navigate to='/SignIn'/>
 // (userInfo?.role == "member" && userInfo?.status == "accepted") || (data?.role == "member" && data?.status == "accepted") ? <Outlet/>: <Navigate to='/SignIn'/>
 )

}
export default GuardedUserRoutes;