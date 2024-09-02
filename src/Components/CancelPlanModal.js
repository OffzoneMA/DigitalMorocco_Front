import React from "react";
import { default as ModalProvider } from "react-modal";
import { Text } from "./Text";
import { IoCloseOutline } from "react-icons/io5";
import { GiCheckMark } from "react-icons/gi";

const CancelPlanModal = (props) => {
    return (
        <ModalProvider
          appElement={document.getElementById("root")}
          className="m-auto w-[65%] md:w-[50%] lg:w-[45%] xl:w-[45%] 2xl:w-[40%]"
          overlayClassName="bg-blue_gray-900_c1 fixed flex h-full inset-y-[0] w-full"
          {...props}
        >
          <div className="max-h-[97vh] overflow-y-auto w-full md:w-full">
            <div className="bg-white-A700 border border-gray-500_33 border-solid flex flex-col p-6 gap-4 items-center justify-start max-w-screen-sm  rounded-[10px] w-full">
                <div className="w-full flex flex-row items-start">
                    <div className="hover:bg-gray-201 w-auto rounded-full p-1 justify-end ml-auto" onClick={props.onRequestClose}>
                        <IoCloseOutline  className='text-gray-401'
                                        size={20}
                        />
                    </div>
                </div>
                <div className="flex flex-col w-full gap-5">
                      <Text
                        className="font-DmSans text-[20px] font-bold leading-[26px] text-blue_gray-801 w-full"
                        >
                        Are you sure you want to cancel?              
                      </Text>
                    <Text
                        className="font-dm-sans-regular text-base leading-6 text-gray-901 text-left w-full"
                        >
                        You’ll lose this Basic Plan with all the features
                    </Text>
                    <div className='flex flex-col w-full rounded-[12px] border p-5 border-gray-301 gap-4 '>
                        <Text
                        className="font-dm-sans-medium text-[22px] leading-8 text-left  text-blue-501"
                        >
                        Basic plan
                        </Text>
                        <div className='flex flex-rox w-full items-start gap-2'>
                            <div className="flex flex-col items-center bg-light_blue-100 rounded-full p-1">
                            <GiCheckMark   className='text-col1'
                                                size={14}
                            />
                            </div>
                            <Text
                                className="font-dm-sans-regular text-base leading-6 text-left w-full text-gray700"
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
                                className="font-dm-sans-regular text-base leading-6 text-left w-full text-gray700"
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
                                className="font-dm-sans-regular text-base leading-6 text-left w-full text-gray700"
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
                                className="font-dm-sans-regular text-base leading-6 text-left w-full text-gray700"
                            >
                            Initiate contact with investors by sending them requests.
                            </Text>
                        </div>
                    </div>
                    <div className="flex space-x-3 md:space-x-5 items-start w-full justify-start pt-1 pb-2">
                        <button onClick={props.onRequestClose} type="button" className="bg-gray-201 text-blue_gray-801 py-2 md:py-3 px-2 md:px-5 font-DmSans text-base font-medium leading-5 tracking-normal rounded-md">Keep Basic Plan</button>
                        <button type="button" className="ml-auto bg-red-501 text-white-A700 py-2 md:py-3 px-2 md:px-5 font-DmSans text-base font-medium leading-5 tracking-normal rounded-md">Continue Cancellation</button>
                    </div>
                </div>
            </div>
          </div>
        </ModalProvider>
    )
}
export default CancelPlanModal;