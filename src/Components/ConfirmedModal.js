import React from 'react';
import { Text } from './Text';
import {default as ModalProvider} from "react-modal";
import { IoCloseOutline } from "react-icons/io5";
import { useTranslation } from 'react-i18next';

const ConfirmedModal = (props) => {
  const {t} = useTranslation();

  return (
    <ModalProvider
    appElement={document.getElementById("root")}
    className="m-auto w-[95%] max-w-[640px] outline-none"
    overlayClassName="bg-blue_gray-900_c1 fixed flex h-full inset-y-[0] w-full"
    {...props}
  >
    <div className="max-h-[97vh] sm:w-full md:w-full">
      <div className="bg-white-A700 shadow-loginModalbs border border-gray-500_33 border-solid flex flex-col gap-6 items-center justify-start max-w-screen-sm p-5 md:px-5 rounded-[14px] w-full">
        <div className="flex items-center justify-end pb-6 w-full ml-auto">
          <div className="hover:bg-gray-201 rounded-full p-1" onClick={props.onRequestClose}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.5 1.5L1.5 10.5M1.5 1.5L10.5 10.5" stroke="#A9ACB0" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
        </div>
        <div className="flex flex-col gap-6 items-center justify-start w-full">
          <div className="flex flex-col gap-[38px] items-center justify-start w-full px-[45px]">
            <img
              className="h-[172px] w-[172px]"
              src="/images/img_role_confirmed.svg"
              alt="successtick"
            />
            <div className="flex flex-col gap-5 items-center justify-start w-auto sm:w-full">
              <Text
                className="leading-[28.00px] max-w-[460px] md:max-w-full text-blue_gray-900_03 text-center text-lg"
                size="txtDMSansMedium18"
              >
                <span className="text-blue_gray-900_03 font-DmSans text-base font-semibold leading-7">
                  {props.m1}
                </span>
                <br/>
                <span className="text-blue-A400 font-DmSans text-base font-semibold leading-7">
                  {props.m2}
                </span>
              </Text>
              <Text
                className="font-dm-sans-regular text-sm leading-6 text-blue_gray-900_03 text-center"
                size="txtDMSansRegular14Bluegray90003"
              >
                <>
                  {props.m3}
                  {props?.m4 && 
                  <>
                    <br />
                  {props.m4}
                  </>
                  }
                  
                </>
              </Text>
            </div>
          </div>
          <Text
            className="leading-[160.00%] text-blue_gray-500 text-center text-xs w-full px-16 pt-4"
            size="txtDMSansRegular12Bluegray500"
          >
            <span className="text-blue_gray-500 font-dm-sans-regular">
              {`Need Assistance? If you have any questions or need assistance, feel free to contact our support team at`}
            </span>
            <span className="text-blue_gray-500 font-dm-sans-regular">
              {" "}
            </span>
            <span className="text-blue-A400 font-dm-sans-regular">
            {`support@digitalmorocco.com`}
            </span>
          </Text>
        </div>
      </div>
    </div>
  </ModalProvider>
  );
};

export default ConfirmedModal;
