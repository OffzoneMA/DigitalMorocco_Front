import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Route, Navigate, Outlet  } from "react-router-dom";
import { useGetUserDetailsQuery } from '../Services/Auth';
import Loader from '../Components/Loader';

const GuardedAdminRoute = () => {
    const {
        data,
        isFetching
      } = useGetUserDetailsQuery()
   const { userInfo,loading } = useSelector((state) => state.auth);

   if (isFetching || loading ){
    return (
    <div className="bg-white-A700 flex flex-col gap-8 h-full min-h-screen items-center justify-center pb-8 pt-8 rounded-tl-[40px]  w-full">
      <Loader/>
    </div>
    )
 }
 else {
    return (
       data?.role == "Admin"  ? <Outlet /> : <Navigate to='/SignIn' />
    )
 }
   

}

export default GuardedAdminRoute;