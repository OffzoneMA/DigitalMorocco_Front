import React, { useEffect , useState } from 'react';
import { useGetAllSubscriptonsQuery } from '../Services/Subscription.Service';
import { useBuySubMutation } from '../Services/Member.Service';
import { Text } from '../Components/Text';
import {  toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { TbAlertHexagon } from "react-icons/tb";
import { TiFlashOutline } from "react-icons/ti";
import { IoWalletOutline } from "react-icons/io5";
import { GiCheckMark } from "react-icons/gi";
import { FiTrash2 } from "react-icons/fi";
import CancelPlanModal from '../Components/CancelPlanModal';
import AddPaymentMethodModal from '../Components/AddPaymentMethodModal';

export default function Subscription() {
  // const { data = [], isLoading, isFetching, isError } = useGetAllSubscriptonsQuery()
  // const [buySub, response] = useBuySubMutation()
  // const { userInfo, loading } = useSelector((state) => state.auth);
  const [isSubscribe , setIsSubscribe] = useState(false);
  const navigate=useNavigate()
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  // useEffect(() => {
  //   response.isError && navigate("/Payement_Failed")
  //   if (response.isSuccess) {
  //     navigate("/Payement_Success")
  //   }
  // }, [response.isLoading])

  const openCancelModal = (rowData) => {
    setIsCancelModalOpen(true);
  };

  const closeCancelModal = () => {
    setIsCancelModalOpen(false);
  };

  const openPaymentModal = () => {
    setIsPaymentModalOpen(true);
  };

  const closePaymentModal = () => {
    setIsPaymentModalOpen(false);
  };

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
        {!isSubscribe? (
          <div className="flex flex-col md:flex-row items-start py-6 w-full h-full md:min-h-[540px] gap-8">
          <div className='flex flex-col md:border-r border-indigo-50 pr-8 md:flex-1 lg:flex-1 gap-4'>
            <Text
                className="font-DmSans text-lg font-medium leading-7 text-left w-full"
              >
              Subscription Management
            </Text>
            <div className='flex flex-col  w-full rounded-[12px] border p-4 border-gray-301 gap-4 '>
              <div className='flex flex-col w-full border-b pb-4 border-gray-301 gap-4'>
                <Text
                    className="font-DmSans text-base font-bold leading-6 text-left w-full text-gray-900_01"
                  >
                  Your active plan
                </Text>
                <div className='flex flex-col w-full rounded-[12px] border p-4 border-gray-301 gap-3 '>
                  <div className='flex flex-row w-full items-center pb-1'>
                    <Text
                      className="font-DmSans text-[22px] font-medium leading-8 text-left  text-blue-501"
                    >
                    Basic plan
                  </Text>
                  <div className="bg-blue-A400 font-DmSans text-white-A700 flex flex-row md:h-auto items-center gap-3 ml-auto py-2 px-8 rounded-md w-auto">
                    <TiFlashOutline size={25}/>
                      <button
                      // style={{whiteSpace:"nowrap"}}
                        type="button"
                        className="text-base leading-[20.83px] font-medium text-white-A700"
                      >
                        Upgrade Plan
                      </button>
                    </div>
                  </div>
                  <div className='flex flex-rox w-full items-start gap-2'>
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
                  <div className='flex flex-rox w-full items-start gap-2'>
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
                  <div className='flex flex-rox w-full items-start gap-2'>
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
                  <div className='flex flex-rox w-full items-start gap-2'>
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
                  <Text
                        className="font-DmSans text-lg font-medium leading-8 pt-1 text-left w-full text-gray-801"
                      >
                      $9.99/month, ends on March 7, 2024
                  </Text>
                </div>
                <Text
                  className="font-DmSans text-base font-bold leading-6 text-left w-full text-gray-900_01"
                >
                Your subscription is expiring soon. 
                </Text>
                <Text
                  className="font-DmSans text-base font-bold leading-6 text-left text-col1 w-full"
                >
                We strongly encourage you to renew it to avoid losing access to paid features.
                </Text>
                <Text
                  className="font-DmSans text-sm font-normal leading-[19.2px] text-gray-801 text-left w-full"
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.               </Text>
              </div>
              <div className="flex items-end w-full py-2 justify-end">
                <div className="flex space-x-3 md:space-x-5 w-auto">
                  <div className="flex flex-row gap-3 w-auto ml-auto items-center rounded-md bg-gray-201 text-blue_gray-301 py-2 md:py-3 px-2 md:px-5 font-DmSans text-base font-medium leading-5 tracking-normal" 
                  onClick={openCancelModal}>
                  <FiTrash2  size={23}/>
                    <button
                    style={{whiteSpace: 'nowrap'}}
                      type="button"
                      className="text-base leading-[20.83px] font-medium text-blue_gray-301"
                    >
                      Cancel My Plan
                    </button>
                  </div>
                  <div className="bg-blue-A400 font-DmSans text-white-A700 flex flex-row md:h-auto items-center leading-5 tracking-normal gap-3 ml-auto py-2 px-6 rounded-md w-auto">
                  <TiFlashOutline size={25}/>
                    <button
                      type="button"
                      className="text-base leading-[20.83px] font-medium text-white-A700"
                    >
                      Renew my subscription
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="flex flex-col w-full h-px bg-indigo-50 md:w-px md:min-h-[650px]  md:h-auto ">{``} </div> */}
          <div className='flex flex-col w-full md:w-1/3 lg:w-1/4 gap-6'>
            <Text
                  className="font-DmSans text-lg font-medium leading-7 text-left w-full"
                >
              Payment and Billing
            </Text>
            <div className='flex flex-row w-full rounded-[12px] border py-4 px-4 border-gray-301 gap-4'>
              <div className='flex rounded-md px-3 py-3.5 bg-gray-201 items-center'>
                <img src='images/img_visa.svg'/>
              </div>
              <div className='flex flex-col gap-3'>
                <Text
                    className="font-DmSans text-sm font-medium leading-[18px] text-left text-gray-900_01 w-full"
                  >
                  •••• •••• •••• 1234
                </Text>
                <Text
                      className="font-DmSans text-xs font-normal leading-[15.62px] text-gray500 text-left w-full"
                    >
                  expired 08/26
                </Text>
              </div>
            </div>
            <div className="bg-blue-A400 font-DmSans text-white-A700 flex flex-row md:h-auto items-center justify-center gap-3 mr-auto py-3  rounded-md w-full" 
            onClick={openPaymentModal}>
              <IoWalletOutline  size={22}/>
                <button
                  type="button"
                  className="text-base leading-[20.83px] font-medium text-white-A700"
                >
                  Change Payment Method
                </button>
              </div>
          </div>
        </div>
        ):
        (
          <div className="flex flex-col md:flex-row items-start py-6 w-full h-full md:min-h-[540px] gap-8">
          <div className='flex flex-col md:border-r border-indigo-50 pr-8 md:flex-1 gap-4'>
            <Text
                className="font-DmSans text-lg font-medium leading-7 text-left w-full"
              >
              Subscription Management
            </Text>
            <div className='flex flex-col w-full rounded-[6px] border p-4 border-gray-301 gap-4 '>
            <TbAlertHexagon size={30} className='text-amber-601'/>
            <Text
                className="font-DmSans text-base font-bold leading-6 text-left w-full text-gray-900_01"
              >
              You don’t have any subscription yet
            </Text>
            <Text
                className="font-DmSans text-base font-bold leading-6 text-left text-col1 w-full"
              >
              Try Digital Morocco Pro free for 7 days
            </Text>
            <Text
                className="font-DmSans text-sm font-normal leading-[22.4px] text-gray-801 text-left w-full"
              >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
            </Text>
            <div className="bg-blue-A400 font-DmSans text-white-A700 flex flex-row md:h-auto items-center gap-3 ml-auto py-3 px-6 rounded-md w-auto">
              <TiFlashOutline size={25}/>
                <button
                  type="button"
                  className="text-base leading-[20.83px] font-medium text-white-A700"
                >
                  Start Your Free Trial
                </button>
              </div>
            </div>
          </div>
          {/* <div className="flex flex-col w-full h-px bg-indigo-50 md:w-px md:min-h-[320px] md:max-h-[540px] md:h-auto ">{``} </div> */}
          <div className='flex flex-col md:w-1/3 lg:w-1/4 gap-7'>
            <Text
                  className="font-DmSans text-lg font-medium leading-7 text-left w-full"
                >
              Payment and Billing
            </Text>
            <div className="bg-blue-A400 font-DmSans text-white-A700 flex flex-row md:h-auto items-center gap-3 mr-auto py-3 justify-center  rounded-md w-full">
              <IoWalletOutline  size={22}/>
                <button
                  type="button"
                  className="text-base leading-[20.83px] font-medium text-white-A700"
                >
                  Add Payment Method
                </button>
              </div>
          </div>
        </div>
        )}
        
      </div>
      <CancelPlanModal isOpen={isCancelModalOpen}  onRequestClose={closeCancelModal}/>
      <AddPaymentMethodModal isOpen={isPaymentModalOpen}  onRequestClose={closePaymentModal}/>
    </div>
  )
}
