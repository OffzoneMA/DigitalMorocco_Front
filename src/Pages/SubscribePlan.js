import React, { useState , useEffect } from 'react';
import { Text } from '../Components/Text';
import { TiFlashOutline } from "react-icons/ti";
import { IoWalletOutline } from "react-icons/io5";
import { FiTrash2 } from "react-icons/fi";
import CancelPlanModal from '../Components/CancelPlanModal';
import AddPaymentMethodModal from '../Components/AddPaymentMethodModal';
import PageHeader from "../Components/PageHeader";
import { useNavigate , useLocation} from 'react-router-dom';
import { useCreateSubscriptionForUserMutation  , useUpgradeSubscriptionMutation} from '../Services/Subscription.Service';
import PaymentMethode from '../Components/PaymentMethode';
import axios from 'axios';

export default function SubscribePlan() {
    const token = sessionStorage.getItem("userToken");
    const [createSubscriptionForUser] = useCreateSubscriptionForUserMutation();
    const [upgradeSubscription, { isLoading: upgradeLoading, isSuccess:upgradeSuccess, isError, error }] = useUpgradeSubscriptionMutation();
    const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState('Monthly');
    const navigate = useNavigate()
    const location = useLocation();
    const [choosedPlan, setChoosedPlan] = useState(location.state?.choosedPlan || null);
    const [userSubscriptionData , setUserSusbcriptionData] = useState(null);

    const getUserSusbcription = async () => {
      try {
          const response = await axios.get(`${process.env.REACT_APP_baseURL}/subscriptions/forUser`, {
              headers: { Authorization: `Bearer ${token}` },
          });
          setUserSusbcriptionData(response.data);
      } catch (error) {
          console.error('Error checking subscription status:', error);
      }
    };
    
    useEffect(() => {
      getUserSusbcription();
    }, []);

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

    const getEndDate = (durationInMonths) => {
      const startDate = new Date();
      startDate.setMonth(startDate.getMonth() + durationInMonths);
      return startDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    };

    const monthlyDuration = 1; 
    const annualDuration = monthlyDuration * 12;

  const annualPrice = choosedPlan?.annualPrice || (choosedPlan?.price * 12).toFixed(2);
  const monthlyPrice = choosedPlan.price.toFixed(2);
  const endDate = new Date();
  endDate.setFullYear(endDate.getFullYear() + 1);

  const confirmSubscription = async () => {
    try {
        const data = {
            billing: selectedPlan === 'Monthly' ? 'month' : 'year'
        };

        const hasActiveSubscription = userSubscriptionData?._id; 

        let result;

        if (hasActiveSubscription) {
          if (userSubscriptionData?.plan?._id === choosedPlan?._id) {
            console.log('You are already subscribed to this plan');
            return; 
          }
            result = await upgradeSubscription({
                subscriptionId: userSubscriptionData?._id, 
                newPlanId: choosedPlan?._id,
                newBilling: data.billing,
            });
        } else {
            result = await createSubscriptionForUser({
                planId: choosedPlan?._id, 
                data 
            });
        }

        console.log(result)

        if (result.isSuccess || result?.data?._id) {
            navigate('/Subscription');
        } else {
            console.log('Subscription failed:', result.error);
        }
    } catch (error) {
        console.error('Error confirming subscription:', error);
    }
};


  return (
    <div className="bg-white-A700 flex flex-col gap-8 h-full min-h-screen overflow-auto items-start justify-start pb-14 pt-8 rounded-tl-[40px] w-full">
      <div className="flex flex-col items-start justify-start sm:px-5 px-8 w-full">
        <div className="border-b border-gray-201 border-solid flex flex-col md:flex-row gap-5 items-start justify-start pb-6 w-full">
          <div className="flex flex-1 flex-col font-DmSans h-full items-start justify-start w-full">
            <PageHeader
              >
              Subscription & Billing
            </PageHeader>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-start py-6 w-full h-full md:min-h-[540px] gap-8">
          <div className="flex flex-col md:border-r border-gray-201 pr-8 md:flex-1 lg:flex-1 gap-4">
            <Text className="font-dm-sans-medium text-lg leading-7 text-[#101828] text-left w-full">
              Subscription Management
            </Text>
            <div className="flex flex-col w-full rounded-[12px]  border p-4 border-gray-301 gap-4">
              <div className="flex flex-col w-full border-b pb-4 border-gray-301 gap-4">
                <Text className="font-dm-sans-bold text-base leading-6 text-left w-full text-[#101828]">
                Your selected plan
                </Text>
                <div className="flex flex-col w-full rounded-[12px] border border-[#E4E7EC] gap-[24px] p-4 ">
                  <div className='flex flex-col gap-1 w-full'>
                    <div className="flex flex-row w-full items-center">
                      <Text className="font-dm-sans-medium text-[22px] leading-8 text-left text-blue-501">
                      {choosedPlan?.name}
                      </Text>
                      <div className="flex flex-row ml-auto">
                        <button
                          className={`flex justify-center items-center gap-3 w-[150px] h-[44px] p-[18px_30px] rounded-md hover:bg-[#235DBD] active:bg-[#224a94] cursorpointer-green ${
                            selectedPlan === 'Monthly' ? 'bg-blue-A400 text-white-A700' : 'border border-blue-A400 text-blue-A400 hover:text-[#EDF7FF]'
                          }`}
                          onClick={() => setSelectedPlan('Monthly')}
                          type="button"
                        >
                          <span className="text-base leading-[20.83px] font-dm-sans-medium">Monthly</span>
                        </button>
                        <button
                          className={`flex justify-center items-center gap-3 ml-[10px] w-[150px] h-[44px] p-[18px_30px] rounded-md hover:bg-[#235DBD] active:bg-[#224a94] cursorpointer-green ${
                            selectedPlan === 'Annual' ? 'bg-blue-A400 text-white-A700' : 'border border-blue-A400 text-blue-A400 hover:text-[#EDF7FF]'
                          }`}
                          onClick={() => setSelectedPlan('Annual')}
                          type="button"
                        >
                          <span className="text-base leading-[20.83px] font-medium">Annual</span>
                        </button>
                      </div>
                    </div>
                    <div className="inline-flex h-[24px] py-[2px] px-[10px] justify-center items-center rounded-[6px] bg-[#E1FFED] ml-auto">
                      <span className="text-[#00CDAE] text-center font-dm-sans text-[10px] font-bold leading-[24px]">
                        Save up to 40%
                      </span>
                    </div>
                  </div>
                  <div className='flex flex-col gap-[16px]'>
                  {choosedPlan?.featureDescriptions?.map((feature, index) => (
                    <div key={index} className={`flex flex-row w-full items-start gap-[12px]`}>
                      <div className="flex flex-col w-[24px] h-[24px] justify-center items-center bg-[#EDF7FF] rounded-full p-1">
                        <svg width="13" height="11" viewBox="0 0 13 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" clipRule="evenodd" d="M11.098 0.390159L3.93797 7.30016L2.03797 5.27016C1.68797 4.94016 1.13797 4.92016 0.737968 5.20016C0.347968 5.49016 0.237968 6.00016 0.477968 6.41016L2.72797 10.0702C2.94797 10.4102 3.32797 10.6202 3.75797 10.6202C4.16797 10.6202 4.55797 10.4102 4.77797 10.0702C5.13797 9.60016 12.008 1.41016 12.008 1.41016C12.908 0.490159 11.818 -0.31984 11.098 0.38016V0.390159Z" fill="#00CDAE"/>
                        </svg>
                      </div>
                      <Text className="font-dm-sans-regular text-base leading-6 text-left w-full text-gray700">
                        {feature}
                      </Text>
                    </div>
                  ))}
                  </div>
                  {selectedPlan === "Annual" ? (
                    <div className="flex flex-row items-center w-full pt-1">
                        <Text className="font-dm-sans-medium text-lg leading-8 text-left text-gray-500 line-through">
                            ${annualPrice}
                        </Text>
                        <Text className="font-dm-sans-medium text-lg leading-8 text-left text-gray-801 ml-2">
                            ${(annualPrice*(100 - (choosedPlan?.annualDiscountRate || 20))/100).toFixed(2)}, ends on  {getEndDate(annualDuration)}
                        </Text>
                        <div className="inline-flex h-[24px] p-[2px_10px] justify-center items-center inline-flex rounded-[6px] bg-[#E1FFED] ml-6">
                            <span className="text-[#00CDAE] text-center font-dm-sans text-[10px] font-bold leading-[24px]">
                                {choosedPlan?.annualDiscountRate || 20}% Off
                            </span>
                        </div>
                    </div>
                  ) : (
                    <Text className="font-dm-sans-medium text-lg leading-8 pt-1 text-left w-full text-gray-801">
                      ${monthlyPrice}/month, ends on  {getEndDate(monthlyDuration)}
                    </Text>
                  )}
                </div>
                <Text className="font-dm-sans-bold text-base leading-6 text-left w-full text-[#101828]">
                    Your subscription is about to be finalized.
                </Text>
                <Text className="font-dm-sans-bold text-base leading-6 text-left text-col1 w-full">
                    Start the adventure now and explore more features to scale up your project.                
                </Text>
              </div>
              <div className="flex space-x-3 md:space-x-5 items-end  w-full py-2 justify-end">
                <button
                  onClick={() =>navigate('/ChoosePlan')}
                  className="flex flex-row text-base leading-[20.83px] gap-3 w-[147px] h-11 px-[30px] py-[18px] ml-auto items-center justify-center min-w-[93px] rounded-md bg-gray-201 text-blue_gray-301 hover:bg-[#D0D5DD] active:bg-light_blue-100 py-3 px-5 font-dm-sans-medium tracking-normal cursorpointer-green"
                  type="button"
                >
                  <FiTrash2 size={22} />
                  Cancel 
                </button>
                <button
                  className="bg-blue-A400 hover:bg-[#235DBD] active:bg-[#224a94] text-base leading-[20.83px] w-[282px] h-11 px-[30px] py-[18px] font-dm-sans-medium text-white-A700 flex flex-row items-center justify-center tracking-normal gap-3 ml-auto py-3 px-5 rounded-md w-auto cursorpointer-green"
                  type="button"
                  onClick={()=> confirmSubscription()}
                >
                  <TiFlashOutline size={23} />
                  Confirm my subscription
                </button>
              </div>
              
            </div>
          </div>
          <div className='flex w-full md:w-1/3 lg:w-1/4'>
            <PaymentMethode />
          </div>
        </div>
      </div>
      <CancelPlanModal isOpen={isCancelModalOpen}  onRequestClose={closeCancelModal}/>
      <AddPaymentMethodModal isOpen={isPaymentModalOpen}  onRequestClose={closePaymentModal}/>
    </div>
  );
}

