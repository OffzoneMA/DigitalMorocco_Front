import React, { useEffect, useState } from 'react'
import { CheckCircleIcon} from '@heroicons/react/24/solid'
import { authApi } from '../../../Services/Auth';

export default function EmailVerify({UserStatus,UserId}) {
    const [showVerificationMessage, setShowVerificationMessage] = useState(false);
    const handleSendVerification = () => {
        setShowVerificationMessage(true);
    };
    const [trigger, { data, isFetching, status }] = authApi.endpoints.sendEmailVerification.useLazyQuery()
  return (
      <div
          className={`relative bg-white md:w-3/6 py-16  md:py-7 px-10 rounded-lg border-0   
          ${UserStatus === "notVerified" ? 'shadow-blue-500' : 'shadow-green-500'}
          shadow-2xl`}
      >
          {UserStatus == "notVerified" ? <>
           <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              {/*    <img className="mx-auto h-10 w-auto" src="/img/offzoneLogo.jpg" alt="" /> */}
              <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                  Step 1
              </h2>
          </div>
          <div className="flex-col items-center mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              {/*  code for Step 1 */}
              <div className="text-center">
                  <h3 className="text-lg font-semibold text-gray-900">Verify your email address</h3>
                { isFetching ? 'Loading '
                 : <button
                 disabled={data}
                              className={`mt-6 px-6 py-2 text-sm font-semibold text-white ${data ? 'bg-green-600 cursor-not-allowed' :'bg-blue-600 hover:bg-blue-500'}  rounded-lg shadow-md  focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50`}
                      onClick={()=>{ trigger(UserId)}}
                  >
                      {data ? "Verification SenT" : "Send Verification"}

                  </button>}
                      {data && !isFetching &&
                       <a onClick={() => { trigger(UserId) }} className=' p-5 cursor-pointer'>Resend ? </a>}
                      {data && (
                      <p className="mt-2 text-sm text-gray-600 italic">
                          Check your email for a verification link.
                      </p>
                  )}
              </div>
          </div></>:
              <div className='absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center  text-green-600 text-xl'>
              <CheckCircleIcon className='w-10 h-10 '  />
                   Account is Verified !
          </div>}
      </div>
  )
}
