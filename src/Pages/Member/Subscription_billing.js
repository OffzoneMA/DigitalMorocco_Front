import React, { useEffect, useState } from 'react'
import { ArrowDownTrayIcon } from '@heroicons/react/24/solid'
import { subscriptionLogApi } from '../../Services/SubscriptionLog.Service';

export default function Subscription_billing() {
    const [start, setStart] = useState(0);
    const [qt, setQt] = useState(8);
    const [SubLogs, setSubLogs] = useState([]);
    const [trigger, { data, isFetching, status }, lastPromiseInfo] = subscriptionLogApi.endpoints.getAllSubLogsByMember.useLazyQuery()



    useEffect(() => {
        setSubLogs([])
        trigger({
            start: 0,
            qt,
        })
    }, [])

    useEffect(() => {
        if (data?.length > 0) {
            setSubLogs((prevSubLogs) => [...prevSubLogs, ...data]);
            setStart(data?.length + SubLogs?.length)
        }
    }, [data])




  return (
    <div>
          <div className='flex flex-col gap-6 p-10 h-[75vh]  overflow-scroll'>

          {
              SubLogs.length > 0 &&
              SubLogs.map((el,i)=>(
                  <div className='w-full border shadow-xl flex  px-8 py-10 rounded-lg ' key={i}>
                      <div className='flex-1 space-y-3'>
                          <div className='grid grid-cols-3 items-center justify-center gap-8'>
                              <div>   <span className='italic text-gray-600 font-semibold '>Pack : </span>
                                  <span className={`italic text-${el?.subscriptionId.name.toLowerCase()}`} >{el?.subscriptionId.name}</span>
                              </div>
                              <div><span className='italic text-gray-600 font-semibold '>Subscription Date : </span>
                              
                                  <span className='text-xs '>{new Date(el?.subscriptionDate).toLocaleDateString('en-US', {
                                      weekday: 'short',
                                      year: 'numeric',
                                      month: 'short',
                                      day: 'numeric',
                                      hour: '2-digit'
                                  })}</span>  </div>
                              <div> <span className='italic text-gray-600 font-semibold '>Credits : </span>+{el?.credits}</div>
                          </div>
                          <div className='grid grid-cols-3 items-center justify-center gap-6'>
                              <div> <span className='italic text-gray-600 font-semibold '>Total Credits : </span>{el?.totalCredits} <span className='text-xs italic'>(+{el?.credits})</span></div>
                              <div>   <span className='italic text-gray-600 font-semibold '>Expiration Date : </span> 
                                  <span className='text-xs '>{new Date(el?.subscriptionExpireDate).toLocaleDateString('en-US', {
                                  weekday: 'short',
                                  year: 'numeric',
                                  month: 'short',
                                  day: 'numeric',
                                  hour: '2-digit'
                              })}</span> </div>
                              <div> <span className='italic text-gray-600 font-semibold '>Type :</span> {el?.type ? el?.type :"Initial Purchase"}  </div>
                          </div>
                          <div className=' '>
                              <div>     <span className='italic text-gray-600 font-semibold '>Total Price :</span>    {el?.subscriptionId?.price}$</div>
                          </div>
                      </div>
                      <button className='h-fit  px-4 py-1 rounded-xl border flex items-center justify-center gap-2 text-black bg-white transition-all duration-300 ease-in-out hover:opacity-50 hover:scale-105'>
                          <ArrowDownTrayIcon className='h-6 w-6' />
                          Download
                      </button>
                  </div>
              ))


          }

      
        
    </div>

          {isFetching && <div className="text-center text-xl p-8">Loading...</div>}
          {SubLogs && SubLogs.length == 0 && <div className="text-center text-xl p-8">No Subscription History Found</div>}
          <div className="flex justify-center  p-8">
              <button
                  disabled={isFetching || data?.length == 0 || SubLogs.length < qt}
                  onClick={() => {
                      trigger({
                          start,
                          qt,
                      })
                  }}
                  className="bg-green-800 px-4 py-2 rounded-3xl text-white disabled:cursor-not-allowed disabled:bg-green-800/10">
                  {isFetching ? 'Loading ...' : "Get More"}
              </button>
      </div>
      </div>
  )
}
