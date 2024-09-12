import React, { useState } from 'react';
import { Text } from '../Components/Text';
import { useNavigate } from 'react-router-dom';
import { useGetAllSubscriptionPlansQuery } from '../Services/SubscriptionPlan.service';
import Loader from '../Components/Loader';

export default function ChoosePlan() {
  const { data: plans, error, isLoading } = useGetAllSubscriptionPlansQuery();
  const memberPlans = plans?.filter(plan => plan.forUser === 'Member');
  const [isSubscribe , setIsSubscribe] = useState(false);
  const navigate=useNavigate()

  return (
    <div className="bg-white-A700 flex flex-col gap-8 h-full min-h-screen items-start justify-start pb-8 pt-8 rounded-tl-[40px]  w-full">
      <div className="flex flex-col items-start justify-start sm:px-5 px-8 w-full">
        <div className="border-b border-gray-201 border-solid flex flex-col md:flex-row gap-5 items-start justify-start pb-6 w-full">
          <div className="flex flex-1 flex-col h-full items-start justify-start w-full">
            <Text
              className="text-3xl font-dm-sans-bold leading-11 text-[#101828] w-full"
              size="txtDmSansBold32"
            >
              Subscription & Billing
            </Text>
          </div>
        </div>
        <div className="flex flex-col items-start py-6 w-full h-full gap-3">
            <Text
                className="text-base font-dm-sans-bold leading-6 text-gray-900_01 w-full"
                >
              Accelerates your journey to success
            </Text>
            <Text
                className="text-[28px] font-dm-sans-bold leading-[42px] text-gray-900_01 w-full"
                >
              Choose the plan that suits for your startup 
            </Text>
            {isLoading ? 
                <div className='flex justify-center w-full'>
                    <Loader/>
                </div>
                :
            <div className='flex justify-center flex-wrap gap-5 w-full py-5 '>
            {memberPlans?.map(plan =>
                (
                <div key={plan?._id} className='flex flex-col border border-col1 basis-[300px] grow max-w-[420px] rounded-[12px] px-6 py-8 bg-bg_plan '>
                  <div className='w-full flex flex-col items-center gap-1.5 h-auto'>
                      <Text
                          className="text-[22px]  font-dm-sans-medium leading-8 text-center text-[#1D2939] w-full"
                          >
                      {plan?.name}
                      </Text>
                      <Text
                          className="text-base font-dm-sans-medium leading-[26px] text-center text-[#667085] w-full"
                          >
                      {plan?.description}
                      </Text>
                      <Text
                          className=" text-center text-col1  font-dm-sans-bold pt-1 w-full"
                          >
                      <span className='text-[2.5rem] leading-13 tracking-wide'>${plan?.price}/</span><span className='text-[1.9rem] leading-12'>month</span>
                      </Text>
                  </div>
                  <div className='flex flex-col flex-1 w-full py-6 gap-[16px] '>
                  {plan?.featureDescriptions?.map((feature, index) => 
                  (
                    <div key={index} className='flex flex-row w-full items-start gap-[12px]'>
                      <div className="flex flex-col items-center justify-center w-[24px] h-[22px] bg-light_blue-100 rounded-full p-1">
                      <svg width="13" height="11" viewBox="0 0 13 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" clipRule="evenodd" d="M11.098 0.390159L3.93797 7.30016L2.03797 5.27016C1.68797 4.94016 1.13797 4.92016 0.737968 5.20016C0.347968 5.49016 0.237968 6.00016 0.477968 6.41016L2.72797 10.0702C2.94797 10.4102 3.32797 10.6202 3.75797 10.6202C4.16797 10.6202 4.55797 10.4102 4.77797 10.0702C5.13797 9.60016 12.008 1.41016 12.008 1.41016C12.908 0.490159 11.818 -0.31984 11.098 0.38016V0.390159Z" fill="#00CDAE"/>
                      </svg>
                      </div>
                      <Text
                        className="font-dm-sans-regular text-base leading-6 text-left w-full text-gray700"
                      >
                      {feature}
                      </Text>
                    </div>
                  ))}
                  </div>
                  <div className='w-full flex-end ' onClick={() => navigate('/subscribePlan' , {state: { choosedPlan: plan }})}>
                    <button
                      type="button"
                      className="bg-blue-A400 text-white-A700 flex flex-row h-[44px] items-center justify-center rounded-md w-full hover:bg-[#235DBD] active:bg-[#224a94] text-base leading-[24px] cursorpointer-green font-dm-sans-medium"
                      >
                      Get started
                    </button>
                  </div>
                </div>
                )
            )}
            </div>
            }
        </div>
        
      </div>
    </div>
  )
}
