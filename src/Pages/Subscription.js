import React, { useEffect , useState } from 'react';
import { useGetAllSubscriptonsQuery , useCancelSubscriptionMutation , useRenewSubscriptionMutation } from '../Services/Subscription.Service';
import { Text } from '../Components/Text';
import {  toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { TiFlashOutline } from "react-icons/ti";
import { FiTrash2 } from "react-icons/fi";
import CancelPlanModal from '../Components/CancelPlanModal';
import PageHeader from "../Components/PageHeader";
import axios from 'axios';
import Loader from '../Components/Loader';
import { useAddPaymentMethodMutation , useGetPaymentMethodsQuery , useGetLastPaymentMethodsQuery , useUpdatePaymentMethodMutation } from '../Services/PaymentMethod.Service';
import { paymentMethodsData } from '../data/tablesData';
import PaymentMethode from '../Components/PaymentMethode';

export default function Subscription() {
  // const { data = [], isLoading, isFetching, isError } = useGetAllSubscriptonsQuery()
  // const [buySub, response] = useBuySubMutation()
  // const { userInfo, loading } = useSelector((state) => state.auth);
  const [userLastPaymentMethod, setUserLastPaymentMethod] = useState(null);
  const [userSubscriptionData , setUserSusbcriptionData] = useState(null);
  const [loadingLastPayment, setLoadingLastPayment] = useState(true);  
  const [addPaymentMethod , response] = useAddPaymentMethodMutation();
  const [updatePaymentMethod , responseUpdate] = useUpdatePaymentMethodMutation();
  const [isSubscribeLoading , setIsSubscribeLoading] = useState(true);
  const [isSubscribe , setIsSubscribe] = useState(false);
  const [selectedPlan , setSelectedPlan] = useState(false);
  const [anuualPlan , setAnnualPlan] = useState(false);
  const navigate=useNavigate()
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isEditPaymentModalOpen, setIsEditPaymentModalOpen] = useState(false);
  const token = sessionStorage.getItem("userToken");
  const userData = JSON.parse(sessionStorage.getItem("userData"));
  const userId = userData?._id;
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const [cancelSubscription, { isLoading: cancelLoading, isError: cancelError, isSuccess: cancelSuccess }] = useCancelSubscriptionMutation();
  const [renewSubscription, { isLoading: renewLoading, isSuccess: renewSuccess, isError: renewError }] = useRenewSubscriptionMutation();

  const fetchLastPaymentMethod = async () => {
    setLoadingLastPayment(true);
    try {
        const token = sessionStorage.getItem("userToken");
        const response = await axios.get(`${process.env.REACT_APP_baseURL}/payment-methods/last`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        console.log(response.data)
        setUserLastPaymentMethod(response.data);
    } catch (error) {
        console.error('Error fetching last payment method:', error);
    } finally {
        setLoadingLastPayment(false);
    }
};

useEffect(() => {
  fetchLastPaymentMethod();
}, []);

  // useEffect(() => {
  //   response.isError && navigate("/Payement_Failed")
  //   if (response.isSuccess) {
  //     navigate("/Payement_Success")
  //   }
  // }, [response.isLoading])
  useEffect(() => {
    if (userLastPaymentMethod) {
      const method = paymentMethodsData.find(method => method.name === userLastPaymentMethod.paymentMethod);
      setSelectedMethod(method);    }
  }, [userLastPaymentMethod]);

  const getUserSusbcription = async () => {
    setIsSubscribeLoading(true);
    try {
        const response = await axios.get(`${process.env.REACT_APP_baseURL}/subscriptions/forUser`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        setIsSubscribe(response.data !== null);
        setUserSusbcriptionData(response.data);
        setIsSubscribeLoading(false);
    } catch (error) {
        setIsSubscribeLoading(false);
        console.error('Error checking subscription status:', error);
    }
  };
  
  useEffect(() => {
    getUserSusbcription();
  }, []);

  const checkSubscriptionExpiration = (expirationDate) => {
    const currentDate = new Date();
    const expiration = new Date(expirationDate);
    
    // Calculer la date de notification (7 jours avant l'expiration)
    const notificationDate = new Date(expiration);
    notificationDate.setDate(expiration.getDate() - 10);
    
    // Vérifier si la date actuelle est égale ou après la date de notification
    return currentDate >= notificationDate && currentDate < expiration;
  };

  const handleRenewSubscription = async () => {
    try {
      await renewSubscription(userSubscriptionData?._id).unwrap(); 
      getUserSusbcription();
    } catch (err) {
      console.log(err); 
    }
  };

  useEffect(() => {
    if (checkSubscriptionExpiration(userSubscriptionData?.dateExpired)) {
      setShowNotification(true);
    } else {
      setShowNotification(false);
    }
  }, [userSubscriptionData?.dateExpired]);

  const monthlyDuration = 1; 
  const annualDuration = monthlyDuration * 12;
  const annualPrice = userSubscriptionData?.plan?.annualPrice || (userSubscriptionData?.plan?.price * 12).toFixed(2);
  const monthlyPrice = userSubscriptionData?.plan.price.toFixed(2);
  const endDate = new Date();
  endDate.setFullYear(endDate.getFullYear() + 1);

  const getEndDate = (durationInMonths) => {
    const startDate = new Date(userSubscriptionData?.dateExpired);
    // startDate.setMonth(startDate.getMonth() + durationInMonths);
    return startDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const openCancelModal = (rowData) => {
    setIsCancelModalOpen(true);
  };

  const closeCancelModal = () => {
    setIsCancelModalOpen(false);
  };

  const handleCancelSubscription = async () => {
    try {
      await cancelSubscription(userSubscriptionData?._id).unwrap(); 
      getUserSusbcription();
      closeCancelModal();
    } catch (err) {
      console.log(err) 
    }
  };

  const openPaymentModal = () => {
    setIsPaymentModalOpen(true);
  };

  const closePaymentModal = () => {
    setIsPaymentModalOpen(false);
  };

  const openEditPaymentModal = () => {
    setIsEditPaymentModalOpen(true);
  };

  const closeEditPaymentModal = () => {
    setIsEditPaymentModalOpen(false);
  };

  const addMethode = async (data) => {
    try {
      const res = await addPaymentMethod(data);
        if (res.data) {
          toast.success("Payment method added successfully");
          await fetchLastPaymentMethod();
          closePaymentModal();
        } else {
          toast.error("Error adding payment method");
        }
      } catch (error) {
        console.error('Error adding payment method:', error);
      }
  };

  const updateMethode = async (data) => {
    try {
      const res = await updatePaymentMethod(data);
      if (res.data) {
        toast.success("Payment method updated successfully");
        await fetchLastPaymentMethod();        
        closeEditPaymentModal();
      } else {
        toast.error("Error updating payment method");
      }
    } catch (error) {
      console.error('Error updating payment method:', error);
      toast.error("An unexpected error occurred");
    }
  };

  const data = [
    {
      uploadDate: "May 6, 2024 02:37:22 PM",
      documentName: "Bill_n°1.pdf",
      status: "Upcoming",
      statusClass: "[#DBEDFF]",
      statusTextClass: "blue-600"
    },
    {
      uploadDate: "May 16, 2024 02:37:22 PM",
      documentName: "Bill_n°2.pdf",
      status: "Paid",
      statusClass: "emerald-50",
      statusTextClass: "emerald-700"
    },
    {
      uploadDate: "May 4, 2024 11:20:56 AM",
      documentName: "Subscription Bill_n°3.pdf",
      status: "To be paid",
      statusClass: "rose-100",
      statusTextClass: "red-500"
    },
    {
      uploadDate: "May 28, 2024 04:01:11 PM",
      documentName: "Bill_n°3.pdf",
      status: "Upcoming",
      statusClass: "[#DBEDFF]",
      statusTextClass: "blue-600"
    },
    {
      uploadDate: "May 14, 2024 11:20:56 AM",
      documentName: "Credits Bill_n°15.pdf",
      status: "Paid",
      statusClass: "emerald-50",
      statusTextClass: "emerald-700"
    },
    {
      uploadDate: "May 30, 2024 11:20:56 PM",
      documentName: "Bill_n°4.pdf",
      status: "To be paid",
      statusClass: "rose-100",
      statusTextClass: "red-500"
    },
    {
      uploadDate: "May 22, 2024 12:45:15 PM",
      documentName: "Bill_n°5.pdf",
      status: "Paid",
      statusClass: "emerald-50",
      statusTextClass: "emerald-700"
    }
  ];

  return (
    <div className="bg-white-A700 flex flex-col gap-8 h-full min-h-screen items-start justify-start pb-8 pt-8 rounded-tl-[40px]  w-full">
      <div className="flex flex-col items-start justify-start sm:px-5 px-8 w-full">
        <div className="border-b border-gray-201 border-solid flex flex-col md:flex-row gap-5 items-start justify-start pb-6 w-full">
          <div className="flex flex-1 flex-col font-DmSans h-full items-start justify-start w-full">
            <PageHeader
              >
              Subscription & Billing
            </PageHeader>
          </div>
        </div>
        {(isSubscribeLoading ||  loadingLastPayment)? 
        <div className='flex w-full items-center justify-center py-40'>
          <Loader/>
        </div> 
        :
        <div className="flex flex-col lg:flex-row lg:flex-wrap items-start py-6 w-full h-full md:min-h-[540px] gap-8">
          {(!isSubscribe && !isSubscribeLoading) ? 
          (
            <div className="flex flex-col md:border-r border-gray-201 pr-8 md:flex-1 gap-4">
              <Text className="font-dm-sans-medium text-lg leading-7 text-[#101828] text-left w-full">
                Subscription Management 
              </Text>
              <div className="flex flex-col w-full rounded-[6px] border p-5 border-gray-301 gap-5">
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 12V18M18 24H18.015M4.5 11.9122V24.0878C4.5 24.6018 4.5 24.8588 4.57573 25.088C4.64272 25.2907 4.75224 25.4769 4.89695 25.6339C5.06053 25.8114 5.28517 25.9362 5.73446 26.1858L16.8345 32.3525C17.2599 32.5888 17.4726 32.707 17.6978 32.7533C17.8972 32.7943 18.1028 32.7943 18.3022 32.7533C18.5274 32.707 18.7401 32.5888 19.1655 32.3525L30.2655 26.1858C30.7148 25.9362 30.9395 25.8114 31.1031 25.6339C31.2478 25.4769 31.3573 25.2907 31.4243 25.088C31.5 24.8588 31.5 24.6018 31.5 24.0878V11.9122C31.5 11.3982 31.5 11.1412 31.4243 10.912C31.3573 10.7093 31.2478 10.5231 31.1031 10.3661C30.9395 10.1886 30.7148 10.0638 30.2655 9.81419L19.1655 3.64753C18.7401 3.41119 18.5274 3.29302 18.3022 3.24669C18.1028 3.20569 17.8972 3.20569 17.6978 3.24669C17.4726 3.29302 17.2599 3.41119 16.8345 3.64753L5.73446 9.81419C5.28517 10.0638 5.06053 10.1886 4.89695 10.3661C4.75224 10.5231 4.64272 10.7093 4.57573 10.912C4.5 11.1412 4.5 11.3982 4.5 11.9122Z" stroke="#DB7712" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <Text className="font-dm-sans-bold text-base leading-6 text-left w-full text-[#101828]">
                  You don’t have any subscription yet
                </Text>
                <Text className="font-dm-sans-bold text-base leading-6 text-left text-col1 w-full">
                  Try Digital Morocco Pro free for 7 days
                </Text>
                <Text className="font-dm-sans-regular text-sm leading-[22.4px] text-[#1D2939] text-left w-full">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </Text>
                <button
                  className="bg-blue-A400 hover:bg-[#235DBD] active:bg-[#224a94] text-base leading-[20.83px] font-dm-sans-medium text-white-A700 flex flex-row h-[44px] items-center gap-3 ml-auto py-3 px-6 rounded-md w-auto cursorpointer-green"
                  type="button"
                  onClick={() => navigate('/ChoosePlan')}
                >
                  <TiFlashOutline size={23} />
                  Start Your Free Trial
                </button>
              </div>
            </div>
          ) : ( 
          <div className="flex flex-col lg:border-r lg:border-gray-201 pr-8 md:flex-1 lg:flex-1 gap-4">
            <Text className="font-dm-sans-medium text-lg leading-7 text-[#101828] text-left w-full">
              Subscription Management
            </Text>
            <div className="flex flex-col w-full rounded-[12px] border p-5 border-gray-301 gap-4">
              <div className="flex flex-col w-full border-b pb-4 border-gray-301 gap-[18px] ">
                <Text className="font-dm-sans-bold text-base leading-6 text-left w-full text-[#101828]">
                  Your active plan
                </Text>
                <div className="flex flex-col w-full rounded-[12px] border p-[24px] border-gray-301 gap-[24px]">
                  <div className="flex flex-row w-full items-center pb-1">
                    <Text className="font-dm-sans-medium text-[22px] leading-8 text-left text-blue-501">
                      {userSubscriptionData?.plan?.name || 'Basic'}
                    </Text>
                    <button
                      onClick={() => navigate('/ChoosePlan')}
                      className="bg-blue-A400 hover:bg-[#235DBD] active:bg-[#224a94] font-DmSans text-white-A700 flex flex-row h-[44px] items-center gap-3 ml-auto py-2 px-8 rounded-md w-auto"
                      type="button"
                    >
                      <TiFlashOutline size={25} />
                      <span className="text-base leading-[20.83px] font-medium">
                        Upgrade Plan
                      </span>
                    </button>
                  </div>
                  <div className="flex flex-col w-full gap-[16px]">
                    {userSubscriptionData?.plan?.featureDescriptions?.map((feature, index) => (
                      <div key={index} className="flex flex-rox w-full items-start gap-[12px]">
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
                  {userSubscriptionData?.billing === "year" ? (
                  <div className="flex flex-row items-center w-full pt-1">
                      <Text className="font-dm-sans-medium text-lg leading-8 text-left text-gray-500 line-through">
                          ${annualPrice}
                      </Text>
                      <Text className="font-dm-sans-medium text-lg leading-8 text-left text-[#1D2939] ml-2">
                          ${(annualPrice*(100 - (userSubscriptionData?.plan?.annualDiscountRate || 20))/100).toFixed(2)}, ends on  {getEndDate(annualDuration)}
                      </Text>
                      <div className="inline-flex h-[24px] p-[2px_10px] justify-center items-center inline-flex rounded-[6px] bg-[#E1FFED] ml-6">
                          <span className="text-[#00CDAE] text-center font-dm-sans text-[10px] font-bold leading-[24px]">
                              {userSubscriptionData?.plan?.annualDiscountRate || 20}% Off
                          </span>
                      </div>
                  </div>
                ) : (
                  <Text className="font-dm-sans-medium text-lg leading-8 pt-1 text-left w-full text-[#1D2939]">
                    ${monthlyPrice}/month, ends on  {getEndDate(monthlyDuration)}
                  </Text>
                )}
                </div>
                {showNotification  && <>
                  <Text className="font-dm-sans-bold text-base leading-6 text-left w-full text-[#101828]">
                    Your subscription is expiring soon.
                  </Text>
                  <Text className="font-dm-sans-bold text-base leading-6 text-left text-col1 w-full">
                    We strongly encourage you to renew it to avoid losing access to paid features.
                  </Text>
                  <Text className="font-dm-sans-regular text-sm leading-[19.2px] text-[#1D2939] text-left w-full">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </Text>
                </>}
              </div>
              <div className="flex space-x-3 md:space-x-5 items-end w-full  py-2 justify-end">
                <button
                  className="flex flex-row text-base leading-[20.83px] gap-3 w-auto ml-auto items-center justify-center min-w-[210px] rounded-md bg-[#E4E7EC] hover:bg-[#D0D5DD] active:bg-light_blue-100 text-[#98A2B3] py-3 h-[44px] px-5 font-dm-sans-medium tracking-normal cursorpointer-green"
                  onClick={openCancelModal}
                  type="button"
                >
                  <FiTrash2 size={23} />
                  Cancel My Plan
                </button>
                <button
                  className="bg-blue-A400 hover:bg-[#235DBD] active:bg-[#224a94] text-base leading-[20.83px] font-dm-sans-medium text-white-A700 flex flex-row items-center min-w-[271px] justify-center tracking-normal gap-3 ml-auto py-3 h-[44px] px-5 rounded-md w-auto cursorpointer-green"
                  type="button"
                  onClick={() => handleRenewSubscription()}
                >
                  <TiFlashOutline size={23} />
                  Renew my subscription
                </button>
              </div>
              <div className='flex flex-col w-full gap-5'>
                <div className="w-auto text-[#101828] text-lg font-dm-sans-medium leading-7">Billing Information</div>
                <table class="w-full h-auto bg-white">
                  <thead>
                    <tr className='text-left text-[#344054] font-DmSans font-medium h-[44px]'>
                      <th class="h-[44px] px-[18px] py-2 bg-white text-sm font-DmSans font-medium leading-relaxed">Upload Date</th>
                      <th class="h-[44px] px-[18px] py-2 bg-white text-sm font-DmSans font-medium leading-relaxed">Document Name</th>
                      <th class="h-[44px] px-[18px] py-2 bg-white text-sm font-DmSans font-medium leading-relaxed">Status</th>
                      <th class="h-[44px] px-[18px] py-2 bg-white text-sm font-DmSans font-medium leading-relaxed">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item, index) => (
                      <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                        <td className="h-16 px-[18px] py-4 text-[#667085] text-sm font-dm-sans-regular leading-relaxed">{item.uploadDate}</td>
                        <td className="h-16 px-[18px] flex items-center gap-[10px] py-4 text-[#101828] text-sm font-dm-sans-regular leading-relaxed">
                          <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.33464 1.51294V4.26663C8.33464 4.64 8.33464 4.82669 8.4073 4.96929C8.47121 5.09473 8.5732 5.19672 8.69864 5.26064C8.84125 5.3333 9.02793 5.3333 9.4013 5.3333H12.155M8.33464 11.3333H4.33464M9.66797 8.66659H4.33464M12.3346 6.65874V11.4666C12.3346 12.5867 12.3346 13.1467 12.1166 13.5746C11.9249 13.9509 11.6189 14.2569 11.2426 14.4486C10.8148 14.6666 10.2547 14.6666 9.13463 14.6666H4.86797C3.74786 14.6666 3.18781 14.6666 2.75999 14.4486C2.38366 14.2569 2.0777 13.9509 1.88596 13.5746C1.66797 13.1467 1.66797 12.5867 1.66797 11.4666V4.53325C1.66797 3.41315 1.66797 2.85309 1.88596 2.42527C2.0777 2.04895 2.38366 1.74299 2.75999 1.55124C3.18781 1.33325 3.74786 1.33325 4.86797 1.33325H7.00915C7.49833 1.33325 7.74292 1.33325 7.9731 1.38851C8.17717 1.43751 8.37226 1.51831 8.5512 1.62797C8.75304 1.75166 8.92599 1.92461 9.27189 2.27051L11.3974 4.39599C11.7433 4.7419 11.9162 4.91485 12.0399 5.11668C12.1496 5.29563 12.2304 5.49072 12.2794 5.69479C12.3346 5.92496 12.3346 6.16955 12.3346 6.65874Z" stroke="#303030" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
                          </svg>
                          {item.documentName}
                        </td>
                        <td className="h-16 px-[18px] py-4">
                          <div className='flex w-full items-center'>
                          {item.status && (
                            <div className={`px-[10px] h-[28px] py-[2px] flex items-center justify-center w-auto rounded-[16px] text-center text-[13px] font-dm-sans-regular leading-normal ${item?.status?.toLowerCase() === 'upcoming' ? 'bg-[#DBEEFF] text-[#1570EF]' : item?.status?.toLowerCase() === 'paid' ? 'bg-[#ECFDF3] text-[#027A48]' :'bg-[#FEE8E6] text-[#F04438]' }`}>
                              {item.status}
                            </div>
                          )}
                          </div>
                        </td>
                        <td className="h-16 px-[18px] py-4">
                          <div className="flex items-center gap-[18px]">
                            <div className="relative group">
                              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M14.75 10.25V11.15C14.75 12.4101 14.75 13.0402 14.5048 13.5215C14.289 13.9448 13.9448 14.289 13.5215 14.5048C13.0402 14.75 12.4101 14.75 11.15 14.75H4.85C3.58988 14.75 2.95982 14.75 2.47852 14.5048C2.05516 14.289 1.71095 13.9448 1.49524 13.5215C1.25 13.0402 1.25 12.4101 1.25 11.15V10.25M11.75 6.5L8 10.25M8 10.25L4.25 6.5M8 10.25V1.25" stroke="#98A2B3" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
                              </svg>
                              <div className="absolute top-[100%] right-0 transform hidden group-hover:flex flex-col items-end z-10">
                                <div className="mb-px mr-[3px]">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="13" height="7" viewBox="0 0 13 7" fill="none">
                                    <path d="M0.8547 5.26895L5.81768 0.63683C6.20189 0.278237 6.79811 0.278237 7.18232 0.636829L12.1453 5.26894C12.8088 5.88823 12.3706 7 11.463 7H1.53702C0.629399 7 0.191179 5.88823 0.8547 5.26895Z" fill="#2C3563"/>
                                  </svg>
                                </div>
                                <div className="bg-[#334081] w-[92px] h-[30px] rounded-[6px] px-[18px] py-[3px] flex items-center">
                                  <div className="grow shrink basis-0 text-center text-white-A700 text-sm font-dm-sans-regular leading-relaxed">Download</div>
                                </div>
                              </div>
                            </div>
                            <div className="relative group">
                              <svg width="18" height="12" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.81509 6.53488C1.71295 6.37315 1.66188 6.29229 1.63329 6.16756C1.61182 6.07387 1.61182 5.92613 1.63329 5.83244C1.66188 5.70771 1.71295 5.62685 1.81509 5.46512C2.65915 4.12863 5.17155 0.75 9.0003 0.75C12.8291 0.75 15.3415 4.12863 16.1855 5.46512C16.2877 5.62685 16.3387 5.70771 16.3673 5.83244C16.3888 5.92613 16.3888 6.07387 16.3673 6.16756C16.3387 6.29229 16.2877 6.37315 16.1855 6.53488C15.3415 7.87137 12.8291 11.25 9.0003 11.25C5.17155 11.25 2.65915 7.87137 1.81509 6.53488Z" stroke="#98A2B3" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M9.0003 8.25C10.2429 8.25 11.2503 7.24264 11.2503 6C11.2503 4.75736 10.2429 3.75 9.0003 3.75C7.75766 3.75 6.7503 4.75736 6.7503 6C6.7503 7.24264 7.75766 8.25 9.0003 8.25Z" stroke="#98A2B3" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
                              </svg>
                              <div className="absolute top-[100%] right-0 transform hidden group-hover:flex flex-col items-end z-10">
                                <div className="mb-px mr-[3px]">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="13" height="7" viewBox="0 0 13 7" fill="none">
                                    <path d="M0.8547 5.26895L5.81768 0.63683C6.20189 0.278237 6.79811 0.278237 7.18232 0.636829L12.1453 5.26894C12.8088 5.88823 12.3706 7 11.463 7H1.53702C0.629399 7 0.191179 5.88823 0.8547 5.26895Z" fill="#2C3563"/>
                                  </svg>
                                </div>
                                <div className="bg-[#334081] w-[92px] h-[30px] rounded-[6px] px-[18px] py-[3px] flex items-center">
                                  <div className="grow shrink basis-0 text-center text-white-A700 text-sm font-dm-sans-regular leading-relaxed">View</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          )}
          <div className='flex min-w-[250px] w-full md:w-1/3 lg:w-1/4'>
            <PaymentMethode />
          </div>
        </div>
        }
      </div>
      <CancelPlanModal isOpen={isCancelModalOpen}  onRequestClose={closeCancelModal} method={handleCancelSubscription}/>
    </div>
  )
}
