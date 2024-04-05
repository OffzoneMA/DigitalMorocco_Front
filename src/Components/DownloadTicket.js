import { Text } from "./Text";
import React, { useRef , useEffect, useState} from "react";
import QRCode from 'qrcode.react';


const DownloadTicket = React.forwardRef((props, ref) => {
    console.log(props)
    
    return(
        <>
        <div ref={ref} id="downloadTicketComponent" className='flex flex-col max-w-[900px] mx-auto border border-bord'>
            <div className='flex flex-col w-full gap-2 bg-gray-101 px-5 py-8'>
                <Text
                    className="font-DmSans text-sm font-bold leading-[19.6px] text-blue-501"
                    >
                    #432-092
                </Text>
                <Text
                    className="font-DmSans text-[22px] font-medium leading-8 text-gray-900_01 "
                    >
                   {props.rowData?.eventName? props.rowData.eventName : `North Africa Dreamin' 2023`} 
                </Text>
            </div>
            <div className="flex flex-col w-full gap-2 px-5 py-6 border-b border-gray-201">
                <div className="flex flex-row w-full ">
                    <div className="flew flex-col w-[200px] ">
                    <Text
                        className="font-DmSans text-sm font-medium leading-[26px] text-gray700"
                        >
                        Your Name
                    </Text>
                    </div>
                    <div className="flew flex-col flex-1 ">
                    <Text
                        className="font-DmSans text-sm font-normal leading-[26px] text-blue_gray-601"
                        >
                        Cameron Williamson
                    </Text>
                    </div>
                </div>
                <div className="flex flex-row w-full ">
                    <div className="flew flex-col w-[200px] ">
                    <Text
                        className="font-DmSans text-sm font-medium leading-[26px] text-gray700"
                        >
                        Address
                    </Text>
                    </div>
                    <div className="flew flex-col flex-1 ">
                    <Text
                        className="font-DmSans text-sm font-normal leading-[26px] text-blue_gray-601"
                        >
                        2715 Ash Dr. San Jose, South Dakota 83475
                    </Text>
                    </div>
                </div>
                <div className="flex flex-row w-full ">
                    <div className="flew flex-col w-[200px] ">
                    <Text
                        className="font-DmSans text-sm font-medium leading-[26px] text-gray700"
                        >
                        Email
                    </Text>
                    </div>
                    <div className="flew flex-col flex-1 ">
                    <Text
                        className="font-DmSans text-sm font-normal leading-[26px] text-blue_gray-601"
                        >
                        janelle.champlin@hotmail.com
                    </Text>
                    </div>
                </div>
            </div>
            <div className="flex flex-row w-full gap-2 px-5 py-6 border-b border-gray-201">
                <div className="flex flex-col flex-1 gap-2">
                    <Text
                        className="font-DmSans text-sm font-bold leading-[26px] text-gray700"
                        >
                        Your Ticket
                    </Text>
                    <div className="flex flex-row w-full ">
                        <div className="flew flex-col w-[200px] ">
                        <Text
                            className="font-DmSans text-sm font-medium leading-[26px] text-gray700"
                            >
                            1 x 
                        </Text>
                        </div>
                        <div className="flew flex-col flex-1 ">
                        <Text
                            className="font-DmSans text-sm font-normal leading-[26px] text-blue_gray-601"
                            >
                            {props.rowData?.eventName? props.rowData.eventName : `North Africa Dreamin' 2023`}
                        </Text>
                        </div>
                    </div>
                    <div className="flex flex-row w-full ">
                        <div className="flew flex-col w-[200px] ">
                        <Text
                            className="font-DmSans text-sm font-medium leading-[26px] text-gray700"
                            >
                            Date
                        </Text>
                        </div>
                        <div className="flew flex-col flex-1 ">
                        <Text
                            className="font-DmSans text-sm font-normal leading-[26px] text-blue_gray-601"
                            >
                            {props.rowData?.dateTime? props.rowData.dateTime : `Fri, Sep 1, 2023  18:30AM`}
                        </Text>
                        </div>
                    </div>
                    <div className="flex flex-row w-full ">
                        <div className="flew flex-col w-[200px] ">
                        <Text
                            className="font-DmSans text-sm font-medium leading-[26px] text-gray700"
                            >
                            Location
                        </Text>
                        </div>
                        <div className="flew flex-col flex-1 ">
                        <Text
                            className="font-DmSans text-sm font-normal leading-[26px] text-blue_gray-601"
                            >
                            {props.rowData?.location? props.rowData.location : `Farah Hotel, Casablanca`}
                        </Text>
                        </div>
                    </div>
                    <div className="flex flex-row w-full ">
                        <div className="flew flex-col w-[200px] ">
                        <Text
                            className="font-DmSans text-sm font-medium leading-[26px] text-gray700"
                            >
                            Ticket Code 
                        </Text>
                        </div>
                        <div className="flew flex-col flex-1 ">
                        <Text
                            className="font-DmSans text-sm font-normal leading-[26px] text-blue_gray-601"
                            >
                            NAD00345
                        </Text>
                        </div>
                    </div>
                </div>
                <div className="flex flex-row items-center justify-center">
                    <QRCode value="https://reactjs.org/" renderAs="canvas" className="w-full h-full"/>,
                </div>
            </div>
            <div className="flex flex-col w-full gap-2 px-5 py-5 items-center">
                <Text
                    className="font-DmSans text-xs font-normal leading-[19.2px] text-gray500"
                    >
                    The <span className="text-blue-501">Ticket Terms and Conditions</span> apply to the booking of all Event tickets to the exclusion of all other terms and conditions.
                </Text>
                <Text
                    className="font-DmSans text-xs font-normal leading-[19.2px] text-gray500"
                    >
                    Need Assistance? If you have any questions or need assistance, feel free to contact our support team at <span className="text-blue-501"> support@digitalmorocco.com</span>.
                </Text>
            </div>
        </div>
        {/* <button ref={buttonRef} onClick={printDocument}> Download</button> */}
        </>
    )
})

export default DownloadTicket;
