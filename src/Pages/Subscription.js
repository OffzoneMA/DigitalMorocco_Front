import React, { useEffect } from 'react';
import { useGetAllSubscriptonsQuery } from '../Services/Subscription.Service';
import { useBuySubMutation } from '../Services/Member.Service';

import { Toaster, toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function Subscription() {
  const { data = [], isLoading, isFetching, isError } = useGetAllSubscriptonsQuery()
  const [buySub, response] = useBuySubMutation()
  const { userInfo, loading } = useSelector((state) => state.auth);
  const navigate=useNavigate()

  useEffect(() => {
    response.isError && toast.error(response?.error?.data?.message)
    if(response.isSuccess) {
      toast.success("New Subscription purchased !")
    setTimeout(()=>{
      navigate(0)
    },3000)
    
    }
  }, [response.isLoading])
  


  return (
    <div className="flex flex-col items-center justify-center  md:space-y-8  px-10 pt-10 ">
      <Toaster />
      <h1 className="text-xl md:text-4xl xl:text-5xl font-bold mb-8 text-center">Unlock More Features</h1>
      {
        (isLoading || response.isLoading )  && 'Loading'
      }
   
      <div className="flex gap-8 items-center justify-center flex-wrap xl:flex-nowrap ">

          
          {
          data && data.length > 0 && !response.isLoading &&
            data?.map((el,i)=>(

              <div className={`bg-${el.name.toLowerCase()} rounded-lg p-8 shadow-xl  md:w-[290px] xl:w-[330px]`}  key={i}>
                <h4 className="text-3xl font-semibold mb-4">Pack {el.name}</h4>
                <h2 className="text-xl font-semibold mb-4">
                  <span className="font-bold">${el.price}</span><span className="text-gray-500 italic">/{el.duration/30} month(s)</span>
                </h2>
                <button
                  disabled={response?.isLoading}
                  onClick={() => { buySub(el._id) }}
                  className={`${userInfo?.member?.subscriptionId ? 'bg-yellow-400' : 'bg-green-600'}  px-4 py-2  text-white rounded-md shadow-md disabled:bg-opacity-10 disabled:cursor-not-allowed`}>
                  {userInfo?.member?.subscriptionId  ?   "Renew" : "Buy Now"}
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
