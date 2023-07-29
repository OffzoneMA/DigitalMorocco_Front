import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Route, Navigate, Outlet  } from "react-router-dom";
import { useGetUserDetailsQuery } from '../Services/Auth';

const GuardedNewAccRoute = () => {
    const {
        data,
        isLoading,isUninitialized,status,error
      } = useGetUserDetailsQuery()

 if(isLoading){
    return <div>Loading</div>
 }
 else {
    return (
       ["notVerified", "verified", "pending"].includes(data?.status)  ? <Outlet /> : <Navigate to='/' />
    )
 }
   

}

export default GuardedNewAccRoute;