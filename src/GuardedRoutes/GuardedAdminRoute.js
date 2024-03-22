import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Route, Navigate, Outlet  } from "react-router-dom";
import { useGetUserDetailsQuery } from '../Services/Auth';

const GuardedAdminRoute = () => {
    const {
        data,
        isFetching
      } = useGetUserDetailsQuery()
   const { userInfo,loading } = useSelector((state) => state.auth);

   if (isFetching || loading ){
    return <div>Loading</div>
 }
 else {
    return (
       data?.role == "Admin"  || userInfo?.role == "Admin" ? <Outlet /> : <Navigate to='/SignIn' />
    )
 }
   

}

export default GuardedAdminRoute;