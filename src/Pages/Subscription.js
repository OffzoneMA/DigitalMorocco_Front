import React, { useEffect } from 'react';
import { useGetAllSubscriptonsQuery } from '../Services/Subscription.Service';
import { useBuySubMutation, useBuySubQuery } from '../Services/Member.Service';

import { Toaster, toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function Subscription() {
  const { data = [], isLoading, isFetching, isError } = useGetAllSubscriptonsQuery()
  const [buySub, response] = useBuySubMutation()
  const { userInfo, loading } = useSelector((state) => state.auth);
  const navigate=useNavigate()

  useEffect(() => {
    response.isError && toast.error(response.error)
    if(response.isSuccess) {
      
      toast.success("New Subscription purchased !")
    setTimeout(()=>{
      navigate(0)
    },3000)
    
    }
  }, [response.isLoading])
  


  return (
    <div className="flex flex-col items-center justify-center  md:space-y-8  px-10 ">
      <Toaster />
      <h1 className="text-5xl font-bold mb-8">Unlock More Features</h1>
      {
        (isLoading || response.isLoading )  && 'Loading'
      }
   
      <div className="grid gap-8 grid-cols-1 md:grid-cols-3">

          
          {
          data && data.length > 0 && !response.isLoading &&
            data?.map((el,i)=>(

              <div className={`bg-${el.name.toLowerCase()} rounded-lg p-8 shadow-xl  md:w-[330px]`}  key={i}>
                <h4 className="text-3xl font-semibold mb-4">Pack {el.name}</h4>
                <h2 className="text-xl font-semibold mb-4">
                  <span className="font-bold">${el.price}</span><span className="text-gray-500 italic">/{el.duration/30} months</span>
                </h2>
                <button
                  disabled={userInfo?.member?.subscriptionId === el._id || response?.isLoading}
                  onClick={() => { buySub(el._id) }}
                className="px-4 py-2 bg-green-600 text-white rounded-md shadow-md disabled:bg-opacity-10 disabled:cursor-not-allowed" >
                  {userInfo?.member?.subscriptionId === el._id ?   "Purchased" : "Buy Now"}
                </button>
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
