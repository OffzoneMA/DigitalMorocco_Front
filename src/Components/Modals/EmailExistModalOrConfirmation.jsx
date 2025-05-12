import React from 'react';
import { Text } from '../Text';
import { useTranslation } from 'react-i18next';
import emailError from '../../Media/emailError.svg';
import Popup from 'reactjs-popup';

const EmailExistModalOrConfirmation = (props) => {
  const {t} = useTranslation();

  return (
    <Popup
    open={props?.isOpen}
    onClose={props?.onRequestClose}
  >
    <div className="max-h-[97vh] sm:w-full md:w-full">
      <div className="bg-white-A700 border border-gray-500_33 border-solid flex flex-col gap-6 items-center justify-start max-w-screen-sm p-5  rounded-[14px] w-full">
        <div className="flex items-center justify-end pb-6 w-full ml-auto">
          <div className="hover:bg-gray-201 rounded-full p-1" onClick={props.onRequestClose}>
          <svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.5 1L1.5 10M1.5 1L10.5 10" stroke="#A9ACB0" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
         </svg>
          </div>
        </div>
        <div className="flex flex-col gap-6 items-center justify-start max-w-[460px]">
          {props?.content || 
            <div className="flex flex-col gap-[38px] items-center justify-start  w-full">
            <img
              className="h-[100px] w-[100px]"
              src={emailError}
              alt="successtick"
            />
            <div className="flex flex-col gap-5 items-center justify-start w-full">
              <Text
                className="leading-[26.00px] font-dm-sans-medium text-[18px] text-gray-801 text-center "
              >
                  {t('signup.emailExist')}
              </Text>
              <Text
                className="leading-[26.00px] font-dm-sans-regular  text-gray-801 text-center text-sm"
              >
                <>
                  {t('signup.emailExistMsg')}
                </>
              </Text>
            </div>
          </div>
          }
          <Text
            className="leading-[160.00%] text-blue_gray-500 text-center text-xs w-full  pt-6"
            size="txtDMSansRegular12Bluegray500"
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
  </Popup>
  );
};

export default EmailExistModalOrConfirmation;
