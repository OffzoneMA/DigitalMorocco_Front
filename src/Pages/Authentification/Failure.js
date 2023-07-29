import React, { useEffect, useState } from 'react';
import { ExclamationCircleIcon } from '@heroicons/react/24/solid'
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function Failure() {
  const [searchParams] = useSearchParams();
  const [error, seterror] = useState(searchParams.get('error') ? searchParams.get('error')  :null)
  const navigate = useNavigate()
  useEffect(() => {
    setTimeout(()=>{
      navigate('/')
    },4000)
     
  }, [])
    return (

      <div className="flex flex-col items-center justify-start md:h-screen ">
        <ExclamationCircleIcon className='h-36 w-36 text-red-500' />
        <h1 className="text-xl md:text-4xl font-bold text-red-600 mb-4">
          { error ? error :'Oops, something went wrong!' }</h1>
          </div>
      )
    }
 
  

