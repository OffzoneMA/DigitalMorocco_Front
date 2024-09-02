import React from 'react';
import { Text } from './Text';
import {default as ModalProvider} from "react-modal";
import { IoCloseOutline } from "react-icons/io5";

const DeleteModal = (props) => {

  return (
    <ModalProvider
    appElement={document.getElementById("root")}
    className="m-auto w-[95%] md:w-[100%] max-w-[540px] outline-none"
    overlayClassName="bg-blue_gray-900_c1 fixed flex h-full inset-y-[0] w-full"
    {...props}
  >
    <div className="max-h-[97vh] sm:w-full md:w-full">
      <div className="bg-white-A700 border border-gray-500_33 border-solid flex flex-col gap-6 items-center justify-start max-w-screen-sm p-5 md:px-8 sm:px-8 rounded-[14px] w-full">
        <div className="flex flex-row items-center justify-between w-full ">
            <Text
                className="leading-7 text-center text-lg text-[#1D2939] font-dm-sans-medium"
              >
                {props.title}
              </Text>
              <div className="hover:bg-gray-201 rounded-full p-1" onClick={props.onRequestClose}>
                <IoCloseOutline  className='text-[#A9ACB0]'
                  size={20}
                />
              </div>
        </div>
        <div className="bg-gray-201 h-px w-full" />
        <div className="flex flex-col items-center justify-start w-full">
          <div className="flex flex-col items-center justify-start  px-5 w-full">
            <div className="flex flex-col gap-2 items-center justify-start pb-4 w-full">
              <Text
                className=""
                size=""
              >
                {props.content}
              </Text>
            </div>
            <div className="flex flex-row gap-5 items-center justify-between w-auto">
              <button 
              className="flex items-center hover:bg-[#D0D5DD] active:bg-light_blue-100 cursorpointer-green py-[10px] md:py-[18px] px-[12px] md:px-[20px] font-dm-sans-medium text-base h-[44px] leading-5 tracking-normal rounded-[6px] min-w-[93px] text-center bg-[#E4E7EC] text-[#475467]"
              onClick={props.onRequestClose}>
                Cancel
              </button>
              <button 
              onClick={props.onDelete}
              className="flex items-center cursorpointer-green py-[10px] md:py-[18px] px-[12px] md:px-[20px] font-dm-sans-medium text-base h-[44px] leading-5 tracking-normal rounded-[6px] min-w-[127px] bg-[#EF4352] text-white-A700 text-center">
                Delete Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </ModalProvider>
  );
};

export default DeleteModal;
