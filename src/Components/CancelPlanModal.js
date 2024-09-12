import React , {useState , useEffect} from "react";
import { default as ModalProvider } from "react-modal";
import { Text } from "./Text";
import { IoCloseOutline } from "react-icons/io5";
import { GiCheckMark } from "react-icons/gi";
import axios from 'axios';

const CancelPlanModal = (props) => {
    const [userSubscriptionData , setUserSusbcriptionData] = useState(null);
    const [isSubscribeLoading , setIsSubscribeLoading] = useState(true);
    const token = sessionStorage.getItem("userToken");

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
                    Are you sure you want to cancel?              
                  </Text>
                    <Text
                        className="font-dm-sans-regular text-base leading-6 text-[#1D1C21] text-left w-full"
                        >
                        {`You’ll lose this ${userSubscriptionData?.plan?.name || 'Basic'} Plan with all the features`}
                    </Text>
                    <div className='flex flex-col w-full rounded-[12px] border p-5 border-gray-301 gap-4 '>
                        <Text
                        className="font-dm-sans-medium text-[22px] leading-8 text-left  text-[#2575F0]"
                        >
                        {userSubscriptionData?.plan?.name || 'Basic'}
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
                                    {feature}
                                    </Text>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex space-x-3 md:space-x-5 items-start w-full justify-start pt-1 pb-2">
                        <button onClick={props.onRequestClose} type="button" className="flex items-center justify-center bg-[#E4E7EC] text-[#475467] hover:bg-[#D0D5DD] active:bg-light_blue-100 h-[44px] min-w-[179px] py-2 px-[30px] font-dm-sans-medium text-base leading-5 tracking-normal rounded-md cursorpointer-green">Keep Basic Plan</button>
                        <button 
                            onClick={props?.method}
                            type="button" 
                            className="flex items-center justify-center ml-auto bg-[#EF4352] hover:bg-[#F02A3C] text-white-A700 h-[44px] py-2 px-[20px] min-w-[209px] font-dm-sans-medium text-base leading-5 tracking-normal rounded-md cursorpointer-green">Continue Cancellation</button>
                    </div>
                </div>
            </div>
          </div>
        </ModalProvider>
    )
}
export default CancelPlanModal;