import React  from 'react';
import { Navigate, Outlet  } from "react-router-dom";
import { useGetUserDetailsQuery } from '../Services/Auth';

const GuardedNewAccRoute = () => {
    const {
        data, isFetching
      } = useGetUserDetailsQuery()

   if (isFetching){
    return <div>Loading</div>
 }
 else {
    return (
       ["notVerified", "verified", "pending","rejected"].includes(data?.status)  ? <Outlet /> : <Navigate to='/' />
    )
 }
   

}

export default GuardedNewAccRoute;