import React, {useState} from "react";
import { default as ModalProvider } from "react-modal";
import { Text } from "./Text";
import { IoCloseOutline } from "react-icons/io5";
import { MdOutlineDateRange } from "react-icons/md";
import { BiMap } from "react-icons/bi";
import { PiTagBold } from "react-icons/pi";
// import QRCode from "react-qr-code";
import { BiError } from "react-icons/bi";

const DeleteAccountModal = (props) => {
    const rowData = props?.rowData? props.rowData : null;
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
                    <div className="hover:bg-gray-200 w-auto rounded-full p-1 justify-end ml-auto" onClick={props.onRequestClose}>
                        <IoCloseOutline  className='text-blue_gray-500'
                                        size={20}
                        />
                    </div>
                </div>
                <div className="flex flex-col w-full gap-3">
                    <div className="flex flex-row w-full gap-2 items-center">
                      <BiError size={30} className="text-red-601"/>
                      <Text
                        className="font-DmSans text-[20px] font-medium leading-6 text-red-601 w-full"
                        >
                        Are you sure you want to delete your account?              
                      </Text>
                    </div>
                    <Text
                        className="font-DmSans text-base font-normal leading-6 text-gray-901 text-left w-full"
                        >
                        After submitting this form, you have 14 days to log back into your account to restore it before it’s{` `}<span className="font-medium">permanently deleted.</span>              
                    </Text>
                    <div className="flex flex-col w-full gap-3">
                        <Text
                            className="font-DmSans text-base font-normal leading-6 text-gray-901 text-left w-full"
                            >
                            The following will be deleted as well:
                        </Text>
                        <ul className="list-disc list-inside space-y-2 font-DmSans text-base font-normal leading-6 text-gray-901 text-left">
                            <li>All your data, investors, and contact info</li>
                            <li>All uploaded documents</li>
                            <li>All your event tickets</li>
                        </ul>
                        <Text
                            className="font-DmSans text-base font-normal leading-6 text-gray-901 text-left w-full"
                            >
                            Enter your email and password if you want to proceed:
                        </Text>
                        <div className={`flex flex-row gap-14 items-center justify-start pt-3 w-full`}>
                            <Text
                                className="text-base text-gray-901 w-[100px]"
                                size="txtDMSansLablel"
                            >
                                Email
                            </Text>
                            <div className="flex md:flex-1 w-full md:w-full rounded-md p-2 border border-gray-301">
                                <input
                                className={`!placeholder:text-blue_gray-301 !text-gray700 font-manrope p-0 text-left text-sm tracking-[0.14px] w-full bg-transparent border-0`}
                                type="text"
                                name="name"
                                placeholder="Your email"
                                />
                            </div>
                        </div>
                        <div className={`flex flex-row gap-14 items-center justify-start pt-3 w-full`}>
                            <Text
                                className="text-base text-gray-901 w-[100px]"
                                size="txtDMSansLablel"
                            >
                                Password
                            </Text>
                            <div className="flex md:flex-1 w-full md:w-full rounded-md p-2 border border-gray-301">
                                <input
                                className={`!placeholder:text-blue_gray-301 !text-gray700 font-manrope p-0 text-left text-sm tracking-[0.14px] w-full bg-transparent border-0`}
                                type="text"
                                name="name"
                                placeholder="Your Password"
                                defaultValue={`• • • • • • • •`}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex items-end w-full pt-3 justify-end">
                        <div className="flex space-x-3 md:space-x-5 w-auto">
                            <button onClick={props.onRequestClose} type="reset" className="bg-gray-300 text-gray-700 py-2 md:py-3 px-2 md:px-5 font-DmSans text-base font-medium leading-5 tracking-normal rounded-md">Cancel</button>
                            <button type="submit" className="ml-auto bg-red-501 text-white-A700 py-2 md:py-3 px-2 md:px-5 font-DmSans text-base font-medium leading-5 tracking-normal rounded-md">Delete account</button>
                        </div>
                        </div>
                </div>
            </div>
          </div>
        </ModalProvider>
    )
}
export default DeleteAccountModal;