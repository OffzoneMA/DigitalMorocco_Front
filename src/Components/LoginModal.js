import React from 'react';
import { Text } from './Text';
import {default as ModalProvider} from "react-modal";
import { useTranslation } from 'react-i18next';

import confirmImage from '../Media/img_role_confirmed.svg'

const LoginModal = (props) => {
  const {t} = useTranslation();

  return (
    <ModalProvider
    appElement={document.getElementById("root")}
    className="m-auto w-auto max-w-[640px] "
    overlayClassName="bg-blue_gray-900_c1 fixed flex h-full inset-y-[0] w-full"
    shouldFocusAfterRender={false}
    shouldReturnFocusAfterClose={false}
    {...props}
  >
    <div className="max-h-[97vh] overflow-y-auto w-full">
      <div className="bg-white-A700 shadow-loginModalbs border border-gray-500_33 border-solid flex flex-col gap-6 items-center justify-start max-w-screen-sm p-5 rounded-[14px] w-full">
        <div className="flex items-center justify-end pb-6 w-full ml-auto">
          <div className="hover:bg-gray-201 rounded-full p-1" onClick={props.onRequestClose}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.5 1.5L1.5 10.5M1.5 1.5L10.5 10.5" stroke="#A9ACB0" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
        <div className="flex flex-col gap-6 items-center justify-start w-full ">
          <div className="flex flex-col gap-[38px] items-center justify-start max-w-[460px] px-3 w-full">
            <img
              className="h-[172px] w-[172px]"
              src={confirmImage}
              alt="successtick"
            />
            <div className="flex flex-col gap-5 items-center justify-start w-auto ">
              <Text
                className="leading-[28.00px] font-dm-sans-medium text-gray-801 text-center text-[18px] "
              >
                <span className=" font-dm-sans-medium">
                  {t('signin.congrate')}{" "}
                </span> <br/>
                <span className="text-blue-A400 font-dm-sans-medium">
                  {t('signin.congrate1')}
                </span>
              </Text>
              <Text
                className="flex flex-col gap-4 font-dm-sans-regular leading-[26.00px] text-gray-801 text-center text-sm"
              >
                <>
                  {t('signin.congrate2')}
                  <br/>
                  <span className=''>{t('chooserole.confirmed.m4')}</span>
                </>
              </Text>
            </div>
          </div>
          <Text
            className="leading-[160.00%] font-dm-sans-regular text-blue_gray-500 text-center text-xs w-full sm:px-16 pt-4"
          >
            <span className="text-blue_gray-500 font-dm-sans-regular">
              {t('chooserole.confirmed.m5')}
            </span>
            <span className="text-blue_gray-500 font-dm-sans-regular">
              {" "}
            </span>
            <span className="text-blue-A400 font-dm-sans-regular">
              {t('chooserole.confirmed.m6')}
            </span>
          </Text>
        </div>
      </div>
    </div>
  </ModalProvider>
  );
};

export default LoginModal;
