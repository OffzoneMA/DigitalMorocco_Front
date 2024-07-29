import React, { useState } from 'react';
import { Text } from '../Components/Text';
import { useNavigate } from 'react-router-dom';
import { GiCheckMark } from "react-icons/gi";

export default function ChoosePlan() {
  const [isSubscribe , setIsSubscribe] = useState(false);
  const navigate=useNavigate()

  return (
    <div className="bg-white-A700 flex flex-col gap-8 h-full min-h-screen items-start justify-start pb-8 pt-8 rounded-tl-[40px]  w-full">
      <div className="flex flex-col items-start justify-start sm:px-5 px-8 w-full">
        <div className="border-b border-indigo-50 border-solid flex flex-col md:flex-row gap-5 items-start justify-start pb-6 w-full">
          <div className="flex flex-1 flex-col font-DmSans h-full items-start justify-start w-full">
            <Text
              className="text-3xl font-bold leading-11 text-gray-900 w-full"
              size="txtDmSansBold32"
            >
              Subscription & Billing
            </Text>
          </div>
        </div>

        <div className="flex flex-col items-start py-6 w-full h-full gap-3">
            <Text
                className="text-base font-bold leading-6 text-gray-900_01 w-full"
                >
              Accelerates your journey to success
            </Text>
            <Text
                className="text-[28px] font-bold leading-[42px] text-gray-900_01 w-full"
                >
              Choose the plan that suits for your startup 
            </Text>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-full py-5 '>
                <div className='flex flex-col border border-col1 rounded-[12px] px-6 py-8 bg-bg_plan '>
                    <div className='w-full flex flex-col items-center gap-1.5 h-auto'>
                        <Text
                            className="text-[22px]  font-medium leading-8 text-center text-gray-801 w-full"
                            >
                        Basic plan
                        </Text>
                        <Text
                            className="text-base font-medium leading-[26px] text-center text-gray500 w-full"
                            >
                        Ideal for Solo Entrepreneurs
                        </Text>
                        <Text
                            className=" text-center text-col1  font-bold pt-1 w-full"
                            >
                        <span className='text-[42px] leading-13 tracking-wide'>$9.99/</span><span className='text-[32px] leading-12'>month</span>
                        </Text>
                    </div>
                    <div className='flex flex-col flex-1 w-full py-6 gap-3 '>
                        <div className='flex flex-row w-full items-start gap-2'>
                            <div className="flex flex-col items-center bg-light_blue-100 rounded-full p-1">
                            <GiCheckMark   className='text-col1'
                                                size={14}
                            />
                            </div>
                            <Text
                                className="font-DmSans text-base font-normal leading-6 text-left w-full text-gray700"
                            >
                            Access essential features to kickstart your startup journey.
                            </Text>
                        </div>
                        <div className='flex flex-row w-full items-start gap-2'>
                            <div className="flex flex-col items-center bg-light_blue-100 rounded-full p-1">
                            <GiCheckMark   className='text-col1'
                                                size={14}
                            />
                            </div>
                            <Text
                                className="font-DmSans text-base font-normal leading-6 text-left w-full text-gray700"
                            >
                            Limited Event Participation
                            </Text>
                        </div>
                        <div className='flex flex-row w-full items-start gap-2'>
                            <div className="flex flex-col items-center bg-light_blue-100 rounded-full p-1">
                            <GiCheckMark   className='text-col1'
                                                size={14}
                            />
                            </div>
                            <Text
                                className="font-DmSans text-base font-normal leading-6 text-left w-full text-gray700"
                            >
                            Browse a curated list of investors and view their profiles
                            </Text>
                        </div>
                        <div className='flex flex-row w-full items-start gap-2'>
                            <div className="flex flex-col items-center bg-light_blue-100 rounded-full p-1">
                            <GiCheckMark   className='text-col1'
                                                size={14}
                            />
                            </div>
                            <Text
                                className="font-DmSans text-base font-normal leading-6 text-left w-full text-gray700"
                            >
                            Initiate contact with investors by sending them requests.
                            </Text>
                        </div>
                    </div>
                    <div className='w-full flex-end '>
                        <div className="bg-blue-A400 font-DmSans text-white-A700 flex flex-row md:h-auto items-center justify-center gap-3 mr-auto py-3  rounded-md w-full">
                            <button
                            type="button"
                            className="text-base leading-[24px] font-medium text-white-A700"
                            onClick={() => navigate('/subscribePlan')}
                            >
                            Get started
                            </button>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col border border-col1 rounded-[12px] px-6 py-8 bg-bg_plan '>
                    <div className='w-full flex flex-col items-center gap-1.5 h-auto'>
                        <Text
                            className="text-[22px]  font-medium leading-8 text-center text-gray-801 w-full"
                            >
                        Pro Plan
                        </Text>
                        <Text
                            className="text-base font-medium leading-[26px] text-center text-gray500 w-full"
                            >
                        Ideal For Growing Startups
                        </Text>
                        <Text
                            className=" text-center text-col1  font-bold pt-1 w-full"
                            >
                        <span className='text-[42px] leading-13 tracking-wide'>$29.99/</span><span className='text-[32px] leading-12'>month</span>
                        </Text>
                    </div>
                    <div className='flex flex-col flex-1 w-full py-6 gap-3 '>
                        <div className='flex flex-row w-full items-start gap-2'>
                            <div className="flex flex-col items-center bg-light_blue-100 rounded-full p-1">
                            <GiCheckMark   className='text-col1'
                                                size={14}
                            />
                            </div>
                            <Text
                                className="font-DmSans text-base font-normal leading-6 text-left w-full text-gray700"
                            >
                            Unlock advanced features for increased efficiency and growth.
                            </Text>
                        </div>
                        <div className='flex flex-row w-full items-start gap-2'>
                            <div className="flex flex-col items-center bg-light_blue-100 rounded-full p-1">
                            <GiCheckMark   className='text-col1'
                                                size={14}
                            />
                            </div>
                            <Text
                                className="font-DmSans text-base font-normal leading-6 text-left w-full text-gray700"
                            >
                            Priority Event Access
                            </Text>
                        </div>
                        <div className='flex flex-row w-full items-start gap-2'>
                            <div className="flex flex-col items-center bg-light_blue-100 rounded-full p-1">
                            <GiCheckMark   className='text-col1'
                                                size={14}
                            />
                            </div>
                            <Text
                                className="font-DmSans text-base font-normal leading-6 text-left w-full text-gray700"
                            >
                            Browse a curated list of investors and view their profiles
                            </Text>
                        </div>
                        <div className='flex flex-row w-full items-start gap-2'>
                            <div className="flex flex-col items-center bg-light_blue-100 rounded-full p-1">
                            <GiCheckMark   className='text-col1'
                                                size={14}
                            />
                            </div>
                            <Text
                                className="font-DmSans text-base font-normal leading-6 text-left w-full text-gray700"
                            >
                            Initiate contact with investors by sending them requests.
                            </Text>
                        </div>
                        <div className='flex flex-row w-full items-start gap-2'>
                            <div className="flex flex-col items-center bg-light_blue-100 rounded-full p-1">
                            <GiCheckMark   className='text-col1'
                                                size={14}
                            />
                            </div>
                            <Text
                                className="font-DmSans text-base font-normal leading-6 text-left w-full text-gray700"
                            >
                            Extended History Tracking
                            </Text>
                        </div>
                    </div>
                    <div className='w-full flex-end '>
                        <div className="bg-blue-A400 font-DmSans text-white-A700 flex flex-row md:h-auto items-center justify-center gap-3 mr-auto py-3  rounded-md w-full">
                            <button
                            type="button"
                            className="text-base leading-[24px] font-medium text-white-A700"
                            >
                            Get started
                            </button>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col border border-col1 rounded-[12px] px-6 py-8 bg-bg_plan '>
                    <div className='w-full flex flex-col items-center gap-1.5'>
                        <Text
                            className="text-[22px]  font-medium leading-8 text-center text-gray-801 w-full"
                            >
                        Enterprise plan
                        </Text>
                        <Text
                            className="text-base font-medium leading-[26px] text-center text-gray500 w-full"
                            >
                        Billed annually.
                        </Text>
                        <Text
                            className=" text-center text-col1  font-bold pt-1 w-full"
                            >
                        <span className='text-[42px] leading-13 tracking-wide'>$59.99/</span><span className='text-[32px] leading-12'>month</span>
                        </Text>
                    </div>
                    <div className='flex flex-col flex-1 w-full py-6 gap-3 '>
                        <div className='flex flex-row w-full items-start gap-2'>
                            <div className="flex flex-col items-center bg-light_blue-100 rounded-full p-1">
                            <GiCheckMark   className='text-col1'
                                                size={14}
                            />
                            </div>
                            <Text
                                className="font-DmSans text-base font-normal leading-6 text-left w-full text-gray700"
                            >
                            Comprehensive features for established startups seeking maximum impact
                            </Text>
                        </div>
                        <div className='flex flex-row w-full items-start gap-2'>
                            <div className="flex flex-col items-center bg-light_blue-100 rounded-full p-1">
                            <GiCheckMark   className='text-col1'
                                                size={14}
                            />
                            </div>
                            <Text
                                className="font-DmSans text-base font-normal leading-6 text-left w-full text-gray700"
                            >
                            VIP Event Access
                            </Text>
                        </div>
                        <div className='flex flex-row w-full items-start gap-2'>
                            <div className="flex flex-col items-center bg-light_blue-100 rounded-full p-1">
                            <GiCheckMark   className='text-col1'
                                                size={14}
                            />
                            </div>
                            <Text
                                className="font-DmSans text-base font-normal leading-6 text-left w-full text-gray700"
                            >
                            Dedicated Customer Support
                            </Text>
                        </div>
                        <div className='flex flex-row w-full items-start gap-2'>
                            <div className="flex flex-col items-center bg-light_blue-100 rounded-full p-1">
                            <GiCheckMark   className='text-col1'
                                                size={14}
                            />
                            </div>
                            <Text
                                className="font-DmSans text-base font-normal leading-6 text-left w-full text-gray700"
                            >
                            Access a premium list of investors with enhanced search and filtering
                            </Text>
                        </div>
                        <div className='flex flex-row w-full items-start gap-2'>
                            <div className="flex flex-col items-center bg-light_blue-100 rounded-full p-1">
                            <GiCheckMark   className='text-col1'
                                                size={14}
                            />
                            </div>
                            <Text
                                className="font-DmSans text-base font-normal leading-6 text-left w-full text-gray700"
                            >
                            Initiate contact with investors, attaching detailed project information
                            </Text>
                        </div>
                    </div>
                    <div className='w-full flex-end '>
                        <div className="bg-blue-A400 font-DmSans text-white-A700 flex flex-row md:h-auto items-center justify-center gap-3 mr-auto py-3  rounded-md w-full">
                            <button
                            type="button"
                            className="text-base leading-[24px] font-medium text-white-A700"
                            >
                            Get started
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
      </div>
    </div>
  )
}
