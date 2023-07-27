import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Route, Navigate, Outlet  } from "react-router-dom";
import { useGetUserDetailsQuery } from '../Services/Auth';

const GuardedAdminRoute = () => {
    const {
        data,
        isLoading,isUninitialized,status,error
      } = useGetUserDetailsQuery()

 if(isLoading){
    return <div>Loading</div>
 }
 else {
    return (
       data?.role == "Admin" ? <Outlet /> : <Navigate to='/SignIn' />
    )
 }
   

}

export default GuardedAdminRoute;