import React, { useState } from 'react';
import { Text } from '../Components/Text';
import { TiFlashOutline } from "react-icons/ti";
import { IoWalletOutline } from "react-icons/io5";
import { FiTrash2 } from "react-icons/fi";
import CancelPlanModal from '../Components/CancelPlanModal';
import AddPaymentMethodModal from '../Components/AddPaymentMethodModal';
import PageHeader from "../Components/PageHeader";
import { useNavigate } from 'react-router-dom';

export default function SubscribePlan() {
    const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState('Monthly');
    const navigate = useNavigate()

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
            <PageHeader
              >
              Subscription & Billing
            </PageHeader>
          </div>
        </div>
        
          <div className="flex flex-col md:flex-row items-start py-6 w-full h-full md:min-h-[540px] gap-8">
          <div className="flex flex-col md:border-r border-indigo-50 pr-8 md:flex-1 lg:flex-1 gap-4">
            <Text className="font-DmSans text-lg font-medium leading-7 text-left w-full">
              Subscription Management
            </Text>
            <div className="flex flex-col w-full rounded-[12px]  border p-4 border-gray-301 gap-4">
              <div className="flex flex-col w-full border-b pb-4 border-gray-301 gap-4">
                <Text className="font-DmSans text-base font-bold leading-6 text-left w-full text-[#101828]_01">
                Your selected plan
                </Text>
                <div className="flex flex-col w-full rounded-[12px]  p-4 ">
  <div className="flex flex-row w-full items-center pb-1">
    <Text className="font-DmSans text-[22px] font-medium leading-8 text-left text-blue-501">
      Basic plan
    </Text>
    <div className="flex flex-row ml-auto">
      <button
        className={`font-DmSans flex justify-center items-center gap-3 w-[150px] h-[44px] p-[18px_30px] rounded-md ${
          selectedPlan === 'Monthly' ? 'bg-blue-A400 text-white-A700' : 'border border-blue-A400 text-blue-A400'
        }`}
        onClick={() => setSelectedPlan('Monthly')}
        type="button"
      >
        <span className="text-base leading-[20.83px] font-medium">Monthly</span>
      </button>
      <button
        className={`font-DmSans flex justify-center items-center gap-3 ml-[10px] w-[150px] h-[44px] p-[18px_30px] rounded-md ${
          selectedPlan === 'Annual' ? 'bg-blue-A400 text-white-A700' : 'border border-blue-A400 text-blue-A400'
        }`}
        onClick={() => setSelectedPlan('Annual')}
        type="button"
      >
        <span className="text-base leading-[20.83px] font-medium">Annual</span>
      </button>
    </div>
  </div>
  
  <div className="inline-flex h-[24px] p-[2px_10px] justify-center items-end rounded-[6px] bg-[#E1FFED] ml-auto">
    <span className="text-[#00CDAE] text-center font-dm-sans text-[10px] font-bold leading-[24px]">
      Save up to 40%
    </span>
  </div>
  
  
    {['Access essential features to kickstart your startup journey.', 'Limited Event Participation', 'Browse a curated list of investors and view their profiles', 'Initiate contact with investors by sending them requests.'].map((feature, index) => (
      <div key={index} className={`flex flex-row w-full items-start gap-2 ${index < 3 ? 'mb-4' : 'mb-6'}`}>
        <div className="flex flex-col w-[24px] h-[24px] justify-center items-center bg-[#EDF7FF] rounded-full p-1">
          <svg width="13" height="11" viewBox="0 0 13 11" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M11.098 0.390159L3.93797 7.30016L2.03797 5.27016C1.68797 4.94016 1.13797 4.92016 0.737968 5.20016C0.347968 5.49016 0.237968 6.00016 0.477968 6.41016L2.72797 10.0702C2.94797 10.4102 3.32797 10.6202 3.75797 10.6202C4.16797 10.6202 4.55797 10.4102 4.77797 10.0702C5.13797 9.60016 12.008 1.41016 12.008 1.41016C12.908 0.490159 11.818 -0.31984 11.098 0.38016V0.390159Z" fill="#00CDAE"/>
          </svg>
        </div>
        <Text className="font-DmSans text-base font-normal leading-6 text-left w-full text-gray-700">
          {feature}
        </Text>
      </div>
    ))}
  

  {selectedPlan === "Annual" ? (
    <div className="flex flex-row items-center w-full pt-1">
        <Text className="font-DmSans text-lg font-medium leading-8 text-left text-gray-500 line-through">
            $99.99
        </Text>
        <Text className="font-DmSans text-lg font-medium leading-8 text-left text-gray-801 ml-2">
            $89.99, ends on July 28, 2025
        </Text>
        <div className="inline-flex h-[24px] p-[2px_10px] justify-center items-center inline-flex rounded-[6px] bg-[#E1FFED] ml-6">
            <span className="text-[#00CDAE] text-center font-dm-sans text-[10px] font-bold leading-[24px]">
                20% Off
            </span>
        </div>
    </div>
  ) : (
    <Text className="font-DmSans text-lg font-medium leading-8 pt-1 text-left w-full text-gray-801">
      $9.99/month, ends on July 28, 2024
    </Text>
  )}

</div>


                <Text className="font-DmSans text-base font-bold leading-6 text-left w-full text-[#101828]_01">
                    Your subscription is about to be finalized.
                </Text>
                <Text className="font-DmSans text-base font-bold leading-6 text-left text-col1 w-full">
                    Start the adventure now and explore more features to scale up your project.                
                </Text>
              </div>
              <div className="flex space-x-3 md:space-x-5 items-end  w-full py-2 justify-end">
                <button
                  className="flex flex-row text-base leading-[20.83px] gap-3 w-[147px] h-11 px-[30px] py-[18px] ml-auto items-center rounded-md bg-gray-201 text-blue_gray-301 py-3 px-5 font-DmSans font-medium tracking-normal"
                  
                  type="button"
                >
                  <FiTrash2 size={22} />
                  Cancel 
                </button>
                <button
                  className="bg-blue-A400 text-base leading-[20.83px] w-[282px] h-11 px-[30px] py-[18px] bfont-medium font-DmSans text-white-A700 flex flex-row items-center tracking-normal gap-3 ml-auto py-3 px-5 rounded-md w-auto"
                  type="button"
                  onClick={()=> openPaymentModal()}
                >
                  <TiFlashOutline size={23} />
                  Confirm my subscription
                </button>
              </div>
              
            </div>
          </div>
          <div className="flex flex-col w-full md:w-1/3 lg:w-1/4 gap-6">
            <Text className="font-DmSans text-lg font-medium leading-7 text-left w-full">
              Payment and Billing
            </Text>
            <div className="flex flex-row w-full rounded-[12px] border py-4 px-4 border-gray-301 gap-4">
              <div className="flex rounded-md px-3 py-3.5 bg-gray-201 items-center">
                <img src="images/img_visa.svg" />
              </div>
              <div className="flex flex-col gap-3">
                <Text className="font-DmSans text-sm font-medium leading-[18px] text-left text-[#101828]_01 w-full">
                  •••• •••• •••• 1234
                </Text>
                <Text className="font-DmSans text-xs font-normal leading-[15.62px] text-gray500 text-left w-full">
                  expired 08/26
                </Text>
              </div>
            </div>
            <button
              className="bg-blue-A400 text-base leading-[20.83px] font-medium font-DmSans text-white-A700 flex flex-row items-center justify-center gap-3 mr-auto py-3 rounded-md w-full"
             
              type="button"
            >
              <IoWalletOutline size={22} />
              Change Payment Method
            </button>
          </div>
        </div>
       
      </div>
      <CancelPlanModal isOpen={isCancelModalOpen}  onRequestClose={closeCancelModal}/>
      <AddPaymentMethodModal isOpen={isPaymentModalOpen}  onRequestClose={closePaymentModal}/>
    </div>
  );
}
