import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Text } from '../../Components/Text';
import { useTranslation } from 'react-i18next';

export default function PasswordResetSucces() {
  const { t } = useTranslation();

    const navigate = useNavigate()

    return (
        <>
          <div className="bg-gray-100 flex flex-col font-dmsans items-center justify-start mx-auto p-[60px] md:px-10 sm:px-5 w-full">
            <div className="flex flex-col gap-[42px] items-center justify-start mb-[213px] w-auto w-full">
              <div className="flex flex-col items-center justify-center w-full">
                <img
                  className="h-[50px] w-[183px]"
                  src="images/img_logo.svg"
                  alt="logo"
                />
              </div>
              <div className="bg-white-A700 flex flex-col gap-9 items-center justify-start sm:px-5 px-8 py-[42px] rounded-[12px] shadow-bs1 max-w-[520px] w-full">
                <img
                  className="h-[235px] w-64"
                  src="images/img_frame12.svg"
                  alt="frameTwelve"
                />
                <div className="flex flex-col gap-9 items-center justify-start w-full">
                  <Text
                    className="leading-[32.00px] text-[22px] text-center text-gray-900_01 sm:text-lg md:text-xl w-full"
                    size="txtDMSansMedium22Gray90001"
                  >
                    <>
                      {t('resetSuccess.resetSuccess')}
                    </>
                  </Text>
                  <div className="flex flex-col gap-6 items-center justify-start w-full">
                  <div className="bg-teal-A700 flex flex-row gap-6 h-[52px] md:h-auto items-center justify-center sm:px-5 px-7 py-[13px] rounded-[26px] w-full">
                    <div className="flex flex-col items-center justify-center w-auto">
                      <button
                        type="button"
                        onClick={()=> navigate("/SignIn")}
                        className="text-base text-white-A700 w-auto"
                        size="font-dmsans font-medium"
                      >
                        {t('resetSuccess.signIn')}
                      </button>
                    </div>
                    <img
                      className="h-6 w-6"
                      src="images/img_arrowright.svg"
                      alt="arrowright"
                    />
                  </div>                    
                    <div className="flex flex-row gap-2.5 items-center justify-start w-auto">
                      <Text
                        className="text-blue_gray-900_02 text-sm w-auto"
                        size="txtDMSansMedium14"
                      >
                        {t('resetSuccess.troubleSigningIn')}
                      </Text>
                      <Text
                        className="text-deep_purple-A400 text-sm w-auto"
                        size="txtDMSansBold14"
                      >
                        {t('resetSuccess.contactSupport')}
                      </Text>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      );
}