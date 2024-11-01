import React , {useState , useEffect} from "react";
import { default as ModalProvider } from "react-modal";
import { Text } from "./Text";
import { IoCloseOutline } from "react-icons/io5";
import { GiCheckMark } from "react-icons/gi";
import axios from 'axios';
import { useTranslation } from "react-i18next";

const CancelPlanModal = (props) => {
    const { t } = useTranslation();
    const [userSubscriptionData , setUserSusbcriptionData] = useState(null);
    const [isSubscribeLoading , setIsSubscribeLoading] = useState(true);
    const token = sessionStorage.getItem("userToken");
    const [sendingOk , setSendingOk] = useState(false);

    const currentLanguage = localStorage.getItem('language') || 'en'; 

    useEffect(() => {
        const getUserSusbcription = async () => {
          setIsSubscribeLoading(true);
          try {
              const response = await axios.get(`${process.env.REACT_APP_baseURL}/subscriptions/forUser`, {
                  headers: { Authorization: `Bearer ${token}` },
              });
              setUserSusbcriptionData(response.data);
              setIsSubscribeLoading(false);
          } catch (error) {
              setIsSubscribeLoading(false);
              console.error('Error checking subscription status:', error);
          }
      };
        getUserSusbcription();
        
    }, []);

    useEffect(() => {
        if (!props.isOpen) {
          setSendingOk(false);
        }
      }, [props.isOpen]);

    const submit = () => {
        setSendingOk(true);
        props?.method();
    }

    return (
        <ModalProvider
          appElement={document.getElementById("root")}
          className="m-auto w-[95%] max-w-[640px] outline-none"
          overlayClassName="bg-blue_gray-900_c1 fixed flex h-full inset-y-[0] w-full"
          {...props}
        >
          <div className="max-h-[97vh] w-full md:w-full">
            <div className="bg-white-A700 border border-gray-500_33 max-h-[97vh] overflow-y-auto border-solid flex flex-col p-6 gap-4 items-center justify-start max-w-screen-sm  rounded-[10px] w-full">
                <div className="w-full flex flex-row items-start">
                </div>
                <div className="flex flex-col w-full gap-5">
                  <Text
                    className="font-dm-sans-bold text-xl leading-[26px] text-[#1F2545] w-full"
                    >
                    {t('settings.cancelSubscription.title')}            
                  </Text>
                    <Text
                        className="font-dm-sans-regular text-base leading-6 text-[#1D1C21] text-left w-full"
                        >
                        {t('settings.cancelSubscription.warningMessage' , { planName:  t(`subscriptionPlans.${userSubscriptionData?.plan?.name.toLowerCase()}.name`) })}
                    </Text>
                    <div className='flex flex-col w-full rounded-[12px] border p-5 border-gray-301 gap-4 '>
                        <Text
                        className="font-dm-sans-medium text-[22px] leading-8 text-left  text-[#2575F0]"
                        >
                        {t(`subscriptionPlans.${userSubscriptionData?.plan?.name.toLowerCase()}.name`)}
                        </Text>
                        <div className="flex flex-col w-full gap-[16px]">
                            {userSubscriptionData?.plan?.featureDescriptions?.map((feature, index) => (
                                <div key={index} className="flex flex-rox w-full items-start gap-[12px]">
                                    <div className="flex flex-col w-[24px] h-[24px] justify-center items-center bg-[#EDF7FF] rounded-full p-1">
                                    <svg width="13" height="11" viewBox="0 0 13 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M11.098 0.390159L3.93797 7.30016L2.03797 5.27016C1.68797 4.94016 1.13797 4.92016 0.737968 5.20016C0.347968 5.49016 0.237968 6.00016 0.477968 6.41016L2.72797 10.0702C2.94797 10.4102 3.32797 10.6202 3.75797 10.6202C4.16797 10.6202 4.55797 10.4102 4.77797 10.0702C5.13797 9.60016 12.008 1.41016 12.008 1.41016C12.908 0.490159 11.818 -0.31984 11.098 0.38016V0.390159Z" fill="#00CDAE"/>
                                    </svg>
                                    </div>
                                    <Text className="font-dm-sans-regular text-base leading-6 text-left w-full text-[#344053]">
                                    {t(feature)}
                                    </Text>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex space-x-3 md:space-x-5 items-start w-full justify-start pt-1 pb-2">
                        <button onClick={props.onRequestClose} type="button" className="flex items-center justify-center bg-[#E4E7EC] text-[#475467] hover:bg-[#D0D5DD] active:bg-light_blue-100 h-[44px] min-w-[179px] py-2 px-[30px] font-dm-sans-medium text-base leading-5 tracking-normal rounded-md cursorpointer">{t('settings.cancelSubscription.keepPlan', { planName:  t(`subscriptionPlans.${userSubscriptionData?.plan?.name.toLowerCase()}.name`) })}</button>
                        <button 
                            onClick={submit}
                            type="button" 
                            className={`flex items-center justify-center ml-auto ${sendingOk ? 'bg-[#F02A3C] min-w-[180px]' : 'bg-[#EF4352]'} hover:bg-[#F02A3C] text-white-A700 h-[44px] py-2 px-[20px] min-w-[209px] font-dm-sans-medium text-base leading-5 tracking-normal rounded-md cursorpointer`}>
                            {sendingOk ? 
                            <div className="flex items-center justify-center gap-6"> Sending... 
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10.4995 13.5002L20.9995 3.00017M10.6271 13.8282L13.2552 20.5862C13.4867 21.1816 13.6025 21.4793 13.7693 21.5662C13.9139 21.6415 14.0862 21.6416 14.2308 21.5664C14.3977 21.4797 14.5139 21.1822 14.7461 20.5871L21.3364 3.69937C21.5461 3.16219 21.6509 2.8936 21.5935 2.72197C21.5437 2.57292 21.4268 2.45596 21.2777 2.40616C21.1061 2.34883 20.8375 2.45364 20.3003 2.66327L3.41258 9.25361C2.8175 9.48584 2.51997 9.60195 2.43326 9.76886C2.35809 9.91354 2.35819 10.0858 2.43353 10.2304C2.52043 10.3972 2.81811 10.513 3.41345 10.7445L10.1715 13.3726C10.2923 13.4196 10.3527 13.4431 10.4036 13.4794C10.4487 13.5115 10.4881 13.551 10.5203 13.5961C10.5566 13.647 10.5801 13.7074 10.6271 13.8282Z" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            </div>  :  
                            t('settings.cancelSubscription.continueCancellation')}
                            </button>
                    </div>
                </div>
            </div>
          </div>
        </ModalProvider>
    )
}
export default CancelPlanModal;