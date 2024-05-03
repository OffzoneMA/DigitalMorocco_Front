import React , {useRef} from 'react'
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

  const formButtonRef = useRef();

  const onButtonClick = (inputref) => {
    inputref.current.click();
  };


    return (
        <>
          <div className="bg-gray-100 flex flex-col min-h-screen font-DmSans items-center justify-start mx-auto p-[60px] md:px-10 sm:px-5 w-full">
            <div className=" flex flex-col gap-[42px] items-center justify-start mb-[77px] w-auto w-full">
              <a href='' className="flex flex-col items-center justify-center w-full">
                <img
                  className="h-[50px] w-[183px]"
                  src="images/img_logo.svg"
                  alt="logo"
                />
              </a>
              <div className="bg-white-A700 flex flex-col gap-9 items-center justify-start px-6 py-[42px] rounded-[12px] shadow-formbs max-w-[520px] w-full">
                <div className="flex flex-col items-center justify-start w-auto">
                  <img
                    className="h-[235px] w-[256px]"
                    src="images/img_verify.svg"
                    alt="logo"
                  />
                </div>
                <Text
                  className="text-[22px] font-dm-sans-medium text-gray-901 leading-8 w-auto"
                >
                  {t('resetEmail.checkInbox')}
                </Text>
                <div className="flex flex-col gap-9 items-center justify-start w-full">
                  <div className="flex flex-col gap-6 items-center justify-start w-full">
                    <Text
                      className="leading-[28.00px] font-dm-sans-medium text-center text-gray-901 text-[18px] "
                    >
                      {t('resetEmail.resetLinkSent')}
                    </Text>
                    <Text
                      className="leading-[26.00px] font-dm-sans-medium text-base text-gray500 text-center"
                    >
                      <>
                        {t('resetEmail.cantFindEmail')}
                      </>
                    </Text>
                  </div>
                  <div className="flex flex-col gap-6 items-center justify-start w-full">
                    <div className="bg-teal-A700 flex flex-row gap-6 h-[52px] md:h-auto items-center justify-center px-6 py-[14px] rounded-[26px] ">
                        <button
                            type="button"
                            onClick={handleResendEmail}
                            className="text-base items-center justify-center font-dm-sans-medium text-white-A700 w-auto"
                        >
                            {isLoading? t('forgot.resetPasswordSend') :t('resetEmail.resendEmail') }
                        </button>
                    </div>
                    <div className="flex flex-row gap-2.5 items-center justify-start w-auto">
                      <Text
                        className="text-blue_gray-900_02 font-dm-sans-medium leading-[26px] text-sm w-auto"
                        >
                        {t('resetEmail.signInTrouble')}
                      </Text>
                      <Text
                        className="text-deep_purple-A400 leading-[26px] font-dm-sans-bold text-sm w-auto"
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