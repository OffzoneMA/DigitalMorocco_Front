import React from 'react';
import { Text } from './Text';
import {default as ModalProvider} from "react-modal";
import { IoCloseOutline } from "react-icons/io5";
import { useTranslation } from 'react-i18next';

const CommonModal = (props) => {
  const { t } = useTranslation();
  const currentLanguage = localStorage.getItem('language') || 'en'; 
  
  return (
    <ModalProvider
    appElement={document.getElementById("root")}
    className="m-auto w-[95%] md:w-[100%] max-w-[640px] outline-none"
    overlayClassName="bg-blue_gray-900_c1 fixed flex h-full inset-y-[0] w-full"
    {...props}
  >
    <div className="max-h-[97vh] sm:w-full md:w-full">
      <div className="bg-white-A700 border border-gray-500_33 border-solid flex flex-col gap-[24px] items-center justify-start max-w-screen-sm p-5 md:px-8 sm:px-8 rounded-[14px] w-full">
        <div className="flex flex-row items-center justify-between w-full ">
            <Text
                className="leading-7 text-center text-lg text-[#1D2939] font-dm-sans-medium"
              >
                {props.title}
              </Text>
        </div>
        <div className="bg-gray-201 h-px w-full" />
          <div className="flex flex-col items-center justify-start gap-[24px] px-5 w-full">
                {props.content}
          </div>
        </div>
    </div>
  </ModalProvider>
  );
};

export default CommonModal;
