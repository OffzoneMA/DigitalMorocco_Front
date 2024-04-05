import React, { useState } from 'react';
import { Text } from './Text';
import {default as ModalProvider} from "react-modal";
import { IoCloseOutline } from "react-icons/io5";

const DeleteModal = (props) => {

  return (
    <ModalProvider
    appElement={document.getElementById("root")}
    className="m-auto w-[65%] md:w-[45%] lg:w-[45%] xl:w-[40%] 2xl:w-[35%]"
    overlayClassName="bg-blue_gray-900_c1 fixed flex h-full inset-y-[0] w-full"
    {...props}
  >
    <div className="max-h-[97vh] sm:w-full md:w-full">
      <div className="bg-white-A700 border border-gray-500_33 border-solid flex flex-col gap-6 items-center justify-start max-w-screen-sm p-5 md:px-8 sm:px-8 rounded-[14px] w-full">
        <div className="flex flex-row items-center justify-between w-full ">
            <Text
                className="leading-7 max-w-[460px] md:max-w-full text-center text-lg font-medium font-DmSans"
              >
                {props.title}
              </Text>
              <div className="hover:bg-gray-200 rounded-full p-1" onClick={props.onRequestClose}>
                <IoCloseOutline  className='text-blue_gray-500'
                  size={20}
                />
              </div>
        </div>
        <div className="bg-indigo-50 h-px w-full" />
        <div className="flex flex-col items-center justify-start w-full">
          <div className="flex flex-col items-center justify-start w-auto px-5 w-full">
            <div className="flex flex-col gap-2 items-center justify-start pb-4 w-auto w-full">
              <Text
                className=""
                size=""
              >
                {props.content}
              </Text>
            </div>
            <div className="flex flex-row gap-5 items-center justify-between w-auto">
              <button 
              className="cursor-pointer font-medium h-11 leading-[normal] min-w-[93px] rounded-md p-2.5 text-base text-center bg-indigo-50 text-blue_gray-700"
              onClick={props.onRequestClose}>
                Cancel
              </button>
              <button 
              onClick={props.onDelete}
              className="cursor-pointer font-medium h-11 leading-[normal] rounded-md p-2.5 min-w-[127px] bg-red-400 text-white-A700 text-base text-center">
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
