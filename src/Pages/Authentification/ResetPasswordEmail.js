import React from 'react'
import { Text } from "../../Components/Text";
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useSendForgotPasswordMutation } from '../../Services/Auth';


export default function ResetPasswordEmail() {
  const { t } = useTranslation();
  const { userEmail } = useSelector((state) => state.auth)
  const [sendForgotPassword, { isLoading }] = useSendForgotPasswordMutation()

  const handleResendEmail = async () => {
    try {
      console.log(userEmail)
      await sendForgotPassword(userEmail);
    } catch (error) {
      console.error('Resend email request failed:', error);
    }
  };


    return (
        <>
          <div className="bg-gray-100 flex flex-col min-h-screen font-dmsans items-center justify-start mx-auto p-[60px] md:px-10 sm:px-5 w-full">
            <div className=" flex flex-col gap-[42px] items-center justify-start mb-[77px] w-auto w-full">
              <div className="flex flex-col items-center justify-center w-full">
                <img
                  className="h-[50px] w-[183px]"
                  src="images/img_logo.svg"
                  alt="logo"
                />
              </div>
              <div className="bg-white-A700 flex flex-col gap-9 items-center justify-start sm:px-5 px-8 py-[42px] rounded-[12px] shadow-bs1 max-w-[520px] w-full">
                <div className="flex flex-col items-center justify-start pb-5 w-auto">
                <div className="flex flex-col items-center justify-center w-full">
                  <img
                    className="h-[235px] w-[256px]"
                    src="images/img_verify.svg"
                    alt="logo"
                  />
                </div>
                </div>
                <Text
                  className="text-[22px] text-gray-900 sm:text-lg md:text-xl w-auto"
                  size="txtDMSansMedium22"
                >
                  {t('resetEmail.checkInbox')}
                </Text>
                <div className="flex flex-col gap-9 items-center justify-start w-full">
                  <div className="flex flex-col gap-6 items-center justify-start w-full">
                    <Text
                      className="leading-[28.00px] max-w-[456px] md:max-w-full text-center text-gray-900 text-lg"
                      size="txtDMSansMedium18"
                    >
                      {t('resetEmail.resetLinkSent')}
                    </Text>
                    <Text
                      className="leading-[26.00px] max-w-[456px] md:max-w-full text-base text-blue_gray-500 text-center"
                      size="txtDMSansMedium16Bluegray500"
                    >
                      <>
                        {t('resetEmail.cantFindEmail')}
                      </>
                    </Text>
                  </div>
                  <div className="flex flex-col gap-6 items-center justify-start w-full">
                  <div className="bg-teal-A700 flex flex-row gap-6 h-[52px] md:h-auto items-center justify-center sm:px-5 px-7 py-[10px] rounded-[26px] ">
                        <button
                            type="button"
                            onClick={handleResendEmail}
                            className="text-base text-white-A700 w-auto"
                            size="font-dmsans font-medium"
                        >
                            {isLoading? t('forgot.resetPasswordSend') :t('resetEmail.resendEmail') }
                        </button>
                        
                    </div>
                    <div className="flex flex-row gap-2.5 items-center justify-start w-auto">
                      <Text
                        className="text-blue_gray-900_02 text-sm w-auto"
                        size="txtDMSansMedium14"
                      >
                        {t('resetEmail.signInTrouble')}
                      </Text>
                      <Text
                        className="text-deep_purple-A400 text-sm w-auto"
                        size="txtDMSansBold14"
                      >
                        {t('resetEmail.contactSupport')}
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