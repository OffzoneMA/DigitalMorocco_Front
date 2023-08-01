import React from 'react';
import { useGetAllSubscriptonsQuery } from '../Services/Subscription.Service';

export default function Subscription() {
  const { data = [], isLoading, isFetching, isError } = useGetAllSubscriptonsQuery()

  return (
    <div className="flex flex-col items-center justify-center  md:space-y-8  px-10 ">
      <h1 className="text-5xl font-bold mb-8">Unlock More Features</h1>
      {
        isLoading && 'Loading'
      }
   
      <div className="grid gap-8 grid-cols-1 md:grid-cols-3">

          
          {
            data && data.length > 0 && 
            data?.map((el,i)=>(

              <div className={`bg-${el.name.toLowerCase()} rounded-lg p-8 shadow-xl  md:w-[330px]`}  key={i}>
                <h4 className="text-3xl font-semibold mb-4">Pack {el.name}</h4>
                <h2 className="text-xl font-semibold mb-4">
                  <span className="font-bold">$100</span><span className="text-gray-500 italic">/{el.duration/30} months</span>
                </h2>
                <button
                
                className="px-4 py-2 bg-green-600 text-white rounded-md shadow-md">Buy Now</button>
                <ul className='list-disc text-sm p-8 text-gray-500 italic space-y-1'>
                  <li>You get {el.credits} credits per month</li>
                </ul>
              </div>
            ))
          }

      </div>
    </div>
  )
}
