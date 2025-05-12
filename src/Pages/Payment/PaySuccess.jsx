import React, { useEffect, useState } from 'react'
import { CheckCircleIcon } from '@heroicons/react/24/outline'
import { useNavigate } from 'react-router-dom'

export default function PaySuccess() {
  const [loading, setloading] = useState(true)
  const nav=useNavigate()
  useEffect(() => {
      setTimeout(()=>{
        setloading(false)
      },1000)
    setTimeout(() => {
      nav("/Dashboard_member#Subscription Billing")
      nav(0)
    }, 3000)
    
  }, [])
  
  return (
    <div className='pt-16 md:pt-48 w-screen h-[100vh] '>
      <div className='flex flex-col items-center justify-center text-center '> 
      {
        loading ?
        "Loading"
        :
          <>
              <CheckCircleIcon className='w-36 h-36 text-green-900' />
              <span className='text-4xl text-green-900'>
                Transaction Completed Successfuly
              </span>
              <span className=' text-xl text-gray-500 pt-5'>
                Thank you for your billing.
              </span>
              </>
      }

      </div>
    </div>
  )
}
