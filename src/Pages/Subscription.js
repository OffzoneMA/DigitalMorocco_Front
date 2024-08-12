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
import PageHeader from "../Components/PageHeader";
import axios from 'axios';


export default function Subscription() {
  // const { data = [], isLoading, isFetching, isError } = useGetAllSubscriptonsQuery()
  // const [buySub, response] = useBuySubMutation()
  // const { userInfo, loading } = useSelector((state) => state.auth);
  const [isSubscribe , setIsSubscribe] = useState(false);
  const [selectedPlan , setSelectedPlan] = useState(false);
  const [anuualPlan , setAnnualPlan] = useState(false);
  const navigate=useNavigate()
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const token = sessionStorage.getItem("userToken");
  const userData = JSON.parse(sessionStorage.getItem("userData"));
  const userId = userData?._id;
  const [methodeDef ,  setMethodeDef] = useState(false);
  // useEffect(() => {
  //   response.isError && navigate("/Payement_Failed")
  //   if (response.isSuccess) {
  //     navigate("/Payement_Success")
  //   }
  // }, [response.isLoading])

  
  useEffect(() => {
    const checkSubscriptionStatus = async () => {
      try {
          
          const response = await axios.get(`${process.env.REACT_APP_baseURL}/members/check-subscription-status/${userId}`, {
              headers: { Authorization: `Bearer ${token}` },
          });
          setIsSubscribe(response.data.result);
      } catch (error) {
          console.error('Error checking subscription status:', error);
      }
  };
    checkSubscriptionStatus();
    
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

  const updateMethode = () => {
    setMethodeDef(true)
  }

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

  const getStatusClass = (status) => {
    switch (status) {
      case 'Upcoming':
        return 'bg-[#DBEDFF] text-[#1570EF]';
      case 'Paid':
        return 'bg-[#ECFDF3] text-[#027A48]';
      case 'To be paid':
        return 'bg-[#FEE8E6] text-[#F04438]';
      default:
        return '';
    }
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
        {!isSubscribe ? 
        (
          <div className="flex flex-col md:flex-row items-start py-6 w-full h-full md:min-h-[540px] gap-8">
          <div className="flex flex-col md:border-r border-indigo-50 pr-8 md:flex-1 gap-4">
            <Text className="font-DmSans text-lg font-medium leading-7 text-left w-full">
              Subscription Management 
            </Text>
            <div className="flex flex-col w-full rounded-[6px] border p-4 border-gray-301 gap-4">
              <TbAlertHexagon size={30} className="text-amber-601" />
              <Text className="font-DmSans text-base font-bold leading-6 text-left w-full text-[#101828]_01">
                You don’t have any subscription yet
              </Text>
              <Text className="font-DmSans text-base font-bold leading-6 text-left text-col1 w-full">
                Try Digital Morocco Pro free for 7 days
              </Text>
              <Text className="font-DmSans text-sm font-normal leading-[22.4px] text-gray-801 text-left w-full">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </Text>
              <button
                className="bg-blue-A400 text-base leading-[20.83px] font-medium font-DmSans text-white-A700 flex flex-row md:h-auto items-center gap-3 ml-auto py-3 px-6 rounded-md w-auto"
                type="button"
                onClick={() => navigate('/ChoosePlan')}
              >
                <TiFlashOutline size={23} />
                Start Your Free Trial
              </button>
            </div>
          </div>
          {methodeDef ? 
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
              onClick={openPaymentModal}
              type="button"
            >
              <IoWalletOutline size={22} />
              Change Payment Method
            </button>
          </div>
          :
          <div className="flex flex-col md:w-1/3 lg:w-1/4 gap-7">
            <Text className="font-DmSans text-lg font-medium leading-7 text-left w-full">
              Payment and Billing
            </Text>
            <button
              className="bg-blue-A400 text-base leading-[20.83px] font-medium font-DmSans text-white-A700 flex flex-row md:h-auto items-center gap-3 mr-auto py-3 justify-center rounded-md w-full"
              type="button"
              onClick={()=> openPaymentModal()}
            >
              <IoWalletOutline size={22} />
              Add Payment Method
            </button>
          </div>
          }   
        </div>
        ) : ( 
          <div className="flex flex-col md:flex-row items-start py-6 w-full h-full md:min-h-[540px] gap-8">
          <div className="flex flex-col md:border-r border-indigo-50 pr-8 md:flex-1 lg:flex-1 gap-4">
            <Text className="font-DmSans text-lg font-medium leading-7 text-left w-full">
              Subscription Management
            </Text>
            <div className="flex flex-col w-full rounded-[12px] border p-4 border-gray-301 gap-4">
              <div className="flex flex-col w-full border-b pb-4 border-gray-301 gap-4">
                <Text className="font-DmSans text-base font-bold leading-6 text-left w-full text-[#101828]_01">
                  Your active plan
                </Text>
                <div className="flex flex-col w-full rounded-[12px] border p-4 border-gray-301 gap-3">
                  <div className="flex flex-row w-full items-center pb-1">
                    <Text className="font-DmSans text-[22px] font-medium leading-8 text-left text-blue-501">
                      Basic plan
                    </Text>
                    <button
                      onClick={() => navigate('/ChoosePlan')}
                      className="bg-blue-A400 font-DmSans text-white-A700 flex flex-row md:h-auto items-center gap-3 ml-auto py-2 px-8 rounded-md w-auto"
                      type="button"
                    >
                      <TiFlashOutline size={25} />
                      <span className="text-base leading-[20.83px] font-medium">
                        Upgrade Plan
                      </span>
                    </button>
                  </div>
                  {['Access essential features to kickstart your startup journey.', 'Limited Event Participation', 'Browse a curated list of investors and view their profiles', 'Initiate contact with investors by sending them requests.'].map((feature, index) => (
                    <div key={index} className="flex flex-rox w-full items-start gap-2">
                      <div className="flex flex-col w-[24px] h-[24px] justify-center items-center bg-[#EDF7FF] rounded-full p-1">
                        <svg width="13" height="11" viewBox="0 0 13 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M11.098 0.390159L3.93797 7.30016L2.03797 5.27016C1.68797 4.94016 1.13797 4.92016 0.737968 5.20016C0.347968 5.49016 0.237968 6.00016 0.477968 6.41016L2.72797 10.0702C2.94797 10.4102 3.32797 10.6202 3.75797 10.6202C4.16797 10.6202 4.55797 10.4102 4.77797 10.0702C5.13797 9.60016 12.008 1.41016 12.008 1.41016C12.908 0.490159 11.818 -0.31984 11.098 0.38016V0.390159Z" fill="#00CDAE"/>
                        </svg>
                      </div>
                      <Text className="font-DmSans text-base font-normal leading-6 text-left w-full text-gray700">
                        {feature}
                      </Text>
                    </div>
                  ))}
                  <Text className="font-DmSans text-lg font-medium leading-8 pt-1 text-left w-full text-gray-801">
                    $9.99/month, ends on July 28, 2024
                  </Text>
                </div>
                <Text className="font-DmSans text-base font-bold leading-6 text-left w-full text-[#101828]_01">
                  Your subscription is expiring soon.
                </Text>
                <Text className="font-DmSans text-base font-bold leading-6 text-left text-col1 w-full">
                  We strongly encourage you to renew it to avoid losing access to paid features.
                </Text>
                <Text className="font-DmSans text-sm font-normal leading-[19.2px] text-gray-801 text-left w-full">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </Text>
              </div>
              <div className="flex space-x-3 md:space-x-5 items-end w-full  py-2 justify-end">
                <button
                  className="flex flex-row text-base leading-[20.83px] gap-3 w-auto ml-auto items-center rounded-md bg-gray-201 text-blue_gray-301 py-3 px-5 font-DmSans font-medium tracking-normal"
                  onClick={openCancelModal}
                  type="button"
                >
                  <FiTrash2 size={23} />
                  Cancel My Plan
                </button>
                <button
                  className="bg-blue-A400 text-base leading-[20.83px] font-medium font-DmSans text-white-A700 flex flex-row items-center tracking-normal gap-3 ml-auto py-3 px-5 rounded-md w-auto"
                  type="button"
                  onClick={() => navigate('/ChoosePlan')}
                >
                  <TiFlashOutline size={23} />
                  Renew my subscription
                </button>
              </div>
              {/* <div className='flex flex-col w-full gap-5'>
                <div className="w-auto text-[#101828] text-lg font-dm-sans-medium leading-7">Billing Information</div>
                <table class="w-full h-auto bg-white">
                  <thead>
                    <tr className='text-left text-[#344054] '>
                      <th class="h-11 px-[18px] py-3 bg-white  text-sm font-dm-sans-medium  leading-relaxed">Upload Date</th>
                      <th class="h-11 px-[18px] py-3 bg-white text-sm font-dm-sans-medium   leading-relaxed">Document Name</th>
                      <th class="h-11 px-4 py-3 bg-white  text-sm font-dm-sans-medium   leading-relaxed">Status</th>
                      <th class="h-11 px-4 py-3 bg-white  text-sm font-dm-sans-medium   leading-relaxed">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item, index) => (
                      <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                        <td className="h-16 px-[18px] py-4 text-[#667085] text-sm font-dm-sans-regular leading-relaxed">{item.uploadDate}</td>
                        <td className="h-16 px-[18px] flex gap-[10px] py-4 text-[#101828] text-sm font-dm-sans-regular leading-relaxed">
                          <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.33464 1.51294V4.26663C8.33464 4.64 8.33464 4.82669 8.4073 4.96929C8.47121 5.09473 8.5732 5.19672 8.69864 5.26064C8.84125 5.3333 9.02793 5.3333 9.4013 5.3333H12.155M8.33464 11.3333H4.33464M9.66797 8.66659H4.33464M12.3346 6.65874V11.4666C12.3346 12.5867 12.3346 13.1467 12.1166 13.5746C11.9249 13.9509 11.6189 14.2569 11.2426 14.4486C10.8148 14.6666 10.2547 14.6666 9.13463 14.6666H4.86797C3.74786 14.6666 3.18781 14.6666 2.75999 14.4486C2.38366 14.2569 2.0777 13.9509 1.88596 13.5746C1.66797 13.1467 1.66797 12.5867 1.66797 11.4666V4.53325C1.66797 3.41315 1.66797 2.85309 1.88596 2.42527C2.0777 2.04895 2.38366 1.74299 2.75999 1.55124C3.18781 1.33325 3.74786 1.33325 4.86797 1.33325H7.00915C7.49833 1.33325 7.74292 1.33325 7.9731 1.38851C8.17717 1.43751 8.37226 1.51831 8.5512 1.62797C8.75304 1.75166 8.92599 1.92461 9.27189 2.27051L11.3974 4.39599C11.7433 4.7419 11.9162 4.91485 12.0399 5.11668C12.1496 5.29563 12.2304 5.49072 12.2794 5.69479C12.3346 5.92496 12.3346 6.16955 12.3346 6.65874Z" stroke="#303030" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
                          </svg>
                          {item.documentName}
                        </td>
                        <td className="h-16 p-4 ">
                          {item.status && (
                            <div className={`px-2.5 py-0.5 inline-flex w-auto rounded-2xl text-center text-[13px] font-dm-sans-regular leading-normal ${getStatusClass(item.status)}`}>
                              {item.status}
                            </div>
                          )}
                        </td>
                        <td className="h-16 p-4">
                          <div className="flex gap-[18px]">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M14.75 10.25V11.15C14.75 12.4101 14.75 13.0402 14.5048 13.5215C14.289 13.9448 13.9448 14.289 13.5215 14.5048C13.0402 14.75 12.4101 14.75 11.15 14.75H4.85C3.58988 14.75 2.95982 14.75 2.47852 14.5048C2.05516 14.289 1.71095 13.9448 1.49524 13.5215C1.25 13.0402 1.25 12.4101 1.25 11.15V10.25M11.75 6.5L8 10.25M8 10.25L4.25 6.5M8 10.25V1.25" stroke="#98A2B3" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            <svg width="18" height="12" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M1.81509 6.53488C1.71295 6.37315 1.66188 6.29229 1.63329 6.16756C1.61182 6.07387 1.61182 5.92613 1.63329 5.83244C1.66188 5.70771 1.71295 5.62685 1.81509 5.46512C2.65915 4.12863 5.17155 0.75 9.0003 0.75C12.8291 0.75 15.3415 4.12863 16.1855 5.46512C16.2877 5.62685 16.3387 5.70771 16.3673 5.83244C16.3888 5.92613 16.3888 6.07387 16.3673 6.16756C16.3387 6.29229 16.2877 6.37315 16.1855 6.53488C15.3415 7.87137 12.8291 11.25 9.0003 11.25C5.17155 11.25 2.65915 7.87137 1.81509 6.53488Z" stroke="#98A2B3" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
                              <path d="M9.0003 8.25C10.2429 8.25 11.2503 7.24264 11.2503 6C11.2503 4.75736 10.2429 3.75 9.0003 3.75C7.75766 3.75 6.7503 4.75736 6.7503 6C6.7503 7.24264 7.75766 8.25 9.0003 8.25Z" stroke="#98A2B3" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div> */}
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
              onClick={openPaymentModal}
              type="button"
            >
              <IoWalletOutline size={22} />
              Change Payment Method
            </button>
          </div>
        </div>
        
        )}
      </div>
      <CancelPlanModal isOpen={isCancelModalOpen}  onRequestClose={closeCancelModal}/>
      <AddPaymentMethodModal isOpen={isPaymentModalOpen}  onRequestClose={closePaymentModal} updateMethode={updateMethode}/>
    </div>
  )
}
