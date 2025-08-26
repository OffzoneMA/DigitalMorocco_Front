import React from "react";
import QRCode from 'qrcode.react';


const DownloadTicket = React.forwardRef((props, ref) => {

    return(
        <>
        <div ref={ref} id="downloadTicketComponent" className='flex flex-col max-w-[900px] mx-auto border border-bord'>
            <div className='flex flex-col w-full gap-2 bg-gray-101 px-5 py-8'>
                <p
                    className="font-DmSans text-sm font-bold leading-[19.6px] text-blue-501"
                    >
                    #432-092
                </p>
                <p
                    className="font-dm-sans-medium text-[22px] leading-8 text-gray-900_01 "
                    >
                   {props.rowData?.eventName? props.rowData.eventName : `North Africa Dreamin' 2023`} 
                </p>
            </div>
            <div className="flex flex-col w-full gap-2 px-5 py-6 border-b border-gray-201">
                <div className="flex flex-row w-full ">
                    <div className="flew flex-col w-[200px] ">
                    <h2
                        className="font-dm-sans-medium text-sm leading-[26px] text-gray700"
                        >
                        Your Name
                    </h2>
                    </div>
                    <div className="flew flex-col flex-1 ">
                    <p
                        className="font-dm-sans-regular text-sm leading-[26px] text-blue_gray-601"
                        >
                        Cameron Williamson
                    </p>
                    </div>
                </div>
                <div className="flex flex-row w-full ">
                    <div className="flew flex-col w-[200px] ">
                    <h2
                        className="font-dm-sans-medium text-sm leading-[26px] text-gray700"
                        >
                        Address
                    </h2>
                    </div>
                    <div className="flew flex-col flex-1 ">
                    <p
                        className="font-dm-sans-regular text-sm leading-[26px] text-blue_gray-601"
                        >
                        2715 Ash Dr. San Jose, South Dakota 83475
                    </p>
                    </div>
                </div>
                <div className="flex flex-row w-full ">
                    <div className="flew flex-col w-[200px] ">
                    <h2
                        className="font-dm-sans-medium text-sm leading-[26px] text-gray700"
                        >
                        Email
                    </h2>
                    </div>
                    <div className="flew flex-col flex-1 ">
                    <p
                        className="font-dm-sans-regular text-sm leading-[26px] text-blue_gray-601"
                        >
                        janelle.champlin@hotmail.com
                    </p>
                    </div>
                </div>
            </div>
            <div className="flex flex-row w-full gap-2 px-5 py-6 border-b border-gray-201">
                <div className="flex flex-col flex-1 gap-2">
                    <h2
                        className="font-DmSans text-sm font-bold leading-[26px] text-gray700"
                        >
                        Your Ticket
                    </h2>
                    <div className="flex flex-row w-full ">
                        <div className="flew flex-col w-[200px] ">
                        <p
                            className="font-dm-sans-medium text-sm leading-[26px] text-gray700"
                            >
                            1 x 
                        </p>
                        </div>
                        <div className="flew flex-col flex-1 ">
                        <p
                            className="font-dm-sans-regular text-sm leading-[26px] text-blue_gray-601"
                            >
                            {props.rowData?.eventName? props.rowData.eventName : `North Africa Dreamin' 2023`}
                        </p>
                        </div>
                    </div>
                    <div className="flex flex-row w-full ">
                        <div className="flew flex-col w-[200px] ">
                        <h2
                            className="font-dm-sans-medium text-sm leading-[26px] text-gray700"
                            >
                            Date
                        </h2>
                        </div>
                        <div className="flew flex-col flex-1 ">
                        <p
                            className="font-dm-sans-regular text-sm leading-[26px] text-blue_gray-601"
                            >
                            {props.rowData?.dateTime? props.rowData.dateTime : `Fri, Sep 1, 2023  18:30AM`}
                        </p>
                        </div>
                    </div>
                    <div className="flex flex-row w-full ">
                        <div className="flew flex-col w-[200px] ">
                        <h2
                            className="font-dm-sans-medium text-sm leading-[26px] text-gray700"
                            >
                            Location
                        </h2>
                        </div>
                        <div className="flew flex-col flex-1 ">
                        <p
                            className="font-dm-sans-regular text-sm leading-[26px] text-blue_gray-601"
                            >
                            {props.rowData?.location? props.rowData.location : `Farah Hotel, Casablanca`}
                        </p>
                        </div>
                    </div>
                    <div className="flex flex-row w-full ">
                        <div className="flew flex-col w-[200px] ">
                        <h2
                            className="font-dm-sans-medium text-sm leading-[26px] text-gray700"
                            >
                            Ticket Code 
                        </h2>
                        </div>
                        <div className="flew flex-col flex-1 ">
                        <p
                            className="font-dm-sans-regular text-sm leading-[26px] text-blue_gray-601"
                            >
                            NAD00345
                        </p>
                        </div>
                    </div>
                </div>
                <div className="flex flex-row items-center justify-center">
                    <QRCode value="https://reactjs.org/" renderAs="canvas" className="w-full h-full"/>,
                </div>
            </div>
            <div className="flex flex-col w-full gap-2 px-5 py-5 items-center">
                <h2
                    className="font-dm-sans-regular text-xs leading-[19.2px] text-gray500"
                    >
                    The <span className="text-blue-501">Ticket Terms and Conditions</span> apply to the booking of all Event tickets to the exclusion of all other terms and conditions.
                </h2>
                <h2
                    className="font-dm-sans-regular text-xs leading-[19.2px] text-gray500"
                    >
                    Need Assistance? If you have any questions or need assistance, feel free to contact our support team at <span className="text-blue-501"> support@digitalmorocco.com</span>.
                </h2>
            </div>
        </div>
        {/* <button ref={buttonRef} onClick={printDocument}> Download</button> */}
        </>
    )
})

export default DownloadTicket;
