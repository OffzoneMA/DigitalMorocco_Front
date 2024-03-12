import React, { useState } from 'react';
import { Text } from './Text';
import {default as ModalProvider} from "react-modal";
import { IoCloseOutline } from "react-icons/io5";
import { useTranslation } from 'react-i18next';

const RoleConfirmedModal = (props) => {
  const {t} = useTranslation();

  return (
    <ModalProvider
    appElement={document.getElementById("root")}
    className="m-auto !w-[45%]"
    overlayClassName="bg-blue_gray-900_c1 fixed flex h-full inset-y-[0] w-full"
    {...props}
  >
    <div className="max-h-[97vh] overflow-y-auto sm:w-full md:w-full">
      <div className="bg-white-A700 border border-gray-500_33 border-solid flex flex-col gap-6 items-center justify-start max-w-screen-sm p-5 md:px-5 rounded-[14px] w-full">
        <div className="flex items-center justify-end pb-6 w-full ml-auto">
          <IoCloseOutline  className='text-blue_gray-500'
          onClick={props.onRequestClose}
            size={20}
          />
        </div>
        <div className="flex flex-col gap-6 items-center justify-start w-full">
          <div className="flex flex-col gap-[38px] items-center justify-start w-auto sm:px-16 w-full">
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
                <span className="text-blue_gray-900_03 font-dmsans font-normal">
                  {t('chooserole.confirmed.m1')}{" "}
                </span>
                <span className="text-blue-A400 font-dmsans font-medium">
                  {t('chooserole.confirmed.m2')}
                </span>
              </Text>
              <Text
                className="leading-[26.00px] text-blue_gray-900_03 text-center text-sm"
                size="txtDMSansRegular14Bluegray90003"
              >
                <>
                  {t('chooserole.confirmed.m3')}
                  <br />
                  {t('chooserole.confirmed.m4')}
                </>
              </Text>
            </div>
          </div>
          <Text
            className="leading-[160.00%] text-blue_gray-500 text-center text-xs w-full sm:px-16 pt-4"
            size="txtDMSansRegular12Bluegray500"
          >
            <span className="text-blue_gray-500 font-dmsans font-normal">
              {t('chooserole.confirmed.m5')}
            </span>
            <span className="text-blue_gray-500 font-dmsans font-normal">
              {" "}
            </span>
            <span className="text-blue-A400 font-dmsans font-normal">
              {t('chooserole.confirmed.m6')}
            </span>
          </Text>
        </div>
      </div>
    </div>
  </ModalProvider>
  );
};

export default RoleConfirmedModal;
