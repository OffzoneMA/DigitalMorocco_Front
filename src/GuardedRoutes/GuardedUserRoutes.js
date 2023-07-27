import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Route, Navigate, Outlet  } from "react-router-dom";
import { useGetUserDetailsQuery } from '../Services/Auth';

const GuardedUserRoutes = () => {
const {
    data,
    isLoading,isUninitialized,status,error
  } = useGetUserDetailsQuery()
  const { userInfo } = useSelector((state) => state.auth)

if(isLoading){
return <div>Loading</div>
}
else
return ( 
  userInfo?.roles? <Outlet/>: <Navigate to='/SignIn'/>
 )

}
export default GuardedUserRoutes;