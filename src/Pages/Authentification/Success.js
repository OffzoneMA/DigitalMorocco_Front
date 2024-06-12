import React, { useEffect } from 'react';
import { CheckCircleIcon } from '@heroicons/react/24/solid'
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout, setCredentials } from "../../Redux/auth/authSlice";

export default function Success() {
  const [searchParams] = useSearchParams();
  const dispatch=useDispatch()
  const navigate = useNavigate()

  useEffect(()=>{
    if (searchParams.get('auth')) {
      dispatch(logout())
      sessionStorage.setItem('userToken', searchParams.get('auth'))
      navigate('/')
      navigate(0);
    }
    else{navigate('/')}
  },[])
    return (
        <div className="flex flex-col items-center justify-start md:h-screen ">
        <CheckCircleIcon className='h-40 w-40 text-blue-500'  />
        </div>
      )
  
    }
 
  

