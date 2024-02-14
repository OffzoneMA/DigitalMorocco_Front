import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Route, Navigate, Outlet  } from "react-router-dom";
import { useGetUserDetailsQuery } from '../Services/Auth';

const GuardedUserMemberRoutes  = () => {
const {
    data,isFetching
  } = useGetUserDetailsQuery()
  const { userInfo, loading } = useSelector((state) => state.auth);

  if (isFetching || loading) {
    return <div>Loading</div>
  }
else
return ( 
  data?.role == "Member"  || userInfo?.role == "Member" ? <Outlet /> : <Navigate to='/SignIn' />
  )

}
export default GuardedUserMemberRoutes;