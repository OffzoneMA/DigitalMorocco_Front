import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet  } from "react-router-dom";
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
  (userInfo?.role === "member" && userInfo?.status === "accepted") || (data?.role === "member" && data?.status === "accepted") ? <Outlet/>: <Navigate to='/SignIn'/>
  )

}
export default GuardedUserMemberRoutes;