import React, { useState } from 'react';
import { Text } from './Text';
import {default as ModalProvider} from "react-modal";
import { IoCloseOutline } from "react-icons/io5";
import { useTranslation } from 'react-i18next';

const ConfirmedModal = (props) => {
  const {t} = useTranslation();

  return (
    <ModalProvider
    appElement={document.getElementById("root")}
    className="m-auto w-[65%] md:w-[45%] lg:w-[40%] xl:w-[40%] 2xl:w-[35%] max-w-[620px]"
    overlayClassName="bg-blue_gray-900_c1 fixed flex h-full inset-y-[0] w-full"
    {...props}
  >
    <div className="max-h-[97vh] overflow-y-auto sm:w-full md:w-full">
      <div className="bg-white-A700 border border-gray-500_33 border-solid flex flex-col gap-6 items-center justify-start max-w-screen-sm p-5 md:px-5 rounded-[14px] w-full">
        <div className="flex items-center justify-end pb-6 w-full ml-auto">
          <div className="hover:bg-gray-200 rounded-full p-1" onClick={props.onRequestClose}>
              <IoCloseOutline  className='text-blue_gray-500'
                 size={20}
              />
          </div>
        </div>
        <div className="flex flex-col gap-6 items-center justify-start w-full">
          <div className="flex flex-col gap-[38px] items-center justify-start w-auto px-[45px] w-full">
            <img
              className="h-[172px] w-[172px]"
              src="images/img_role_confirmed.svg"
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
                className="font-DmSans text-sm font-normal leading-6 text-blue_gray-900_03 text-center"
                size="txtDMSansRegular14Bluegray90003"
              >
                <>
                  {props.m3}
                  {/* <br />
                  {t('chooserole.confirmed.m4')} */}
                </>
              </Text>
            </div>
          </div>
          <Text
            className="leading-[160.00%] text-blue_gray-500 text-center text-xs w-full px-16 pt-4"
            size="txtDMSansRegular12Bluegray500"
          >
            <span className="text-blue_gray-500 font-DmSans font-normal">
              {`Need Assistance? If you have any questions or need assistance, feel free to contact our support team at`}
            </span>
            <span className="text-blue_gray-500 font-DmSans font-normal">
              {" "}
            </span>
            <span className="text-blue-A400 font-DmSans font-normal">
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
