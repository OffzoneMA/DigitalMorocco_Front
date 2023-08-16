import React, { useEffect, useState } from 'react'
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline'
import { useNavigate } from 'react-router-dom'

export default function PayFailed() {
    const [loading, setloading] = useState(true)
    const nav = useNavigate()
    useEffect(() => {
        setTimeout(() => {
            setloading(false)
        }, 1000)
        setTimeout(() => {
            nav("/Dashboard_member#Subscription")
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
                            <XCircleIcon className='w-36 h-36 text-red-900' />
                            <span className='text-4xl text-red-900'>
                               Oops Transaction Failed !
                            </span>
                            <span className=' text-xl text-gray-500 pt-5'>
                                Something went Wrong!
                            </span>
                        </>
                }

            </div>
        </div>
    )
}
