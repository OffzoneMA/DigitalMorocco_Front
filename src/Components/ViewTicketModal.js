import React, {useState} from "react";
import { default as ModalProvider } from "react-modal";
import { Text } from "./Text";
import { IoCloseOutline } from "react-icons/io5";
import { MdOutlineDateRange } from "react-icons/md";
import { BiMap } from "react-icons/bi";
import { PiTagBold } from "react-icons/pi";
import QRCode from "react-qr-code";

const ViewTicketModal = (props) => {
    const rowData = props?.rowData? props.rowData : null;
    return (
        <ModalProvider
          appElement={document.getElementById("root")}
          className="m-auto w-[65%] md:w-[48%] lg:w-[43%] xl:w-[43%] 2xl:w-[38%]"
          overlayClassName="bg-blue_gray-900_c1 fixed flex h-full inset-y-[0] w-full"
          {...props}
        >
          <div className="max-h-[97vh] overflow-y-auto w-full md:w-full">
            <div className="bg-white-A700 border border-gray-500_33 border-solid flex flex-col gap-6 items-center justify-start max-w-screen-sm  rounded-[10px] w-full">
                <div className="h-36 pb-6 w-full flex flex-row items-start rounded-t-[10px]" style={{backgroundImage: `url(${rowData?.image})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat'}}>
                    <div className="hover:bg-gray-200 w-auto rounded-full p-1 justify-end ml-auto" onClick={props.onRequestClose}>
                        <IoCloseOutline  className='text-white-A700'
                                        size={20}
                        />
                    </div>
                </div>
                <div className="flex flex-col w-full px-3 gap-3">
                    <Text
                    className="font-DmSans text-lg font-medium leading-7 text-center text-blue_gray-900_03 w-full"
                    >
                        {rowData?.eventName}
                    </Text>
                    <div className="flex flex-row gap-3 items-center justify-center">
                        <MdOutlineDateRange  size={20} className="text-teal-A300"/>
                        <Text
                        className="text-blue_gray-601 font-DmSans text-base font-normal leading-6"
                        >
                        {/* {rowData?.dateTime} */}
                        Fri, Sep 1, 2023<span style={{ marginRight: '10px', marginLeft: '10px' }}>•</span>11:00 AM
                        </Text>
                    </div>
                    <div className="flex flex-row gap-3 items-center justify-center">
                        <BiMap  size={22} className="text-teal-A300"/>
                        <Text
                        className="text-blue_gray-601 font-DmSans text-base font-normal leading-6"
                        >
                        Virtual Event [Online Only]
                        </Text>
                    </div>
                    <div className="flex flex-row gap-3 items-center justify-center">
                        <PiTagBold    size={20} className="text-teal-A300"/>
                        <Text
                        className="text-blue_gray-601 font-DmSans text-base font-normal leading-6"
                        >
                        From $0.00
                        </Text>
                    </div>
                    <div className="flex flex-row py-3 items-center justify-center">
                        <QRCode size={170} value={rowData?.eventName}></QRCode>
                    </div>
                    <div className="flex flex-row px-12 items-center justify-center">
                        <Text
                        className="text-blue_gray-601 font-DmSans text-center text-xs font-normal leading-[19.2px]"
                        >
                        The <span className="text-blue-A400">Ticket Terms and Conditions</span> apply to the booking of all Event tickets to the exclusion of all other terms and conditions.
                        </Text>
                    </div>
                    <div className="flex flex-row px-12  pb-5 items-center justify-center">
                        <Text
                        className="text-blue_gray-601 font-DmSans text-center text-xs font-normal leading-[19.2px]"
                        >
                        Need Assistance? If you have any questions or need assistance, feel free to contact our support team at<span className="text-blue-A400">support@digitalmorocco.com</span>.
                        </Text>
                    </div>
                </div>
            </div>
          </div>
        </ModalProvider>
    )
}
export default ViewTicketModal;