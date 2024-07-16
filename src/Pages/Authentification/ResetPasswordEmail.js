import React , {useRef , useState , useEffect} from 'react'
import { Text } from "../../Components/Text";
import toast, { Toaster } from "react-hot-toast";
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useSendForgotPasswordMutation } from '../../Services/Auth';
import logo from '../../Media/img_logo.svg';
import verifyImage from '../../Media/img_verify.svg';
import { useNavigate } from 'react-router-dom';
import EmailExistModalOrConfirmation from '../../Components/EmailExistModalOrConfirmation';
import checkVerifyImg from '../../Media/check-verified-02.svg';


export default function ResetPasswordEmail() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { userEmail } = useSelector((state) => state.auth)
  const [sendForgotPassword, { isLoading , isSuccess , error}] = useSendForgotPasswordMutation()

  const handleResendEmail = async () => {
    const lang = localStorage.getItem('language');
    try {
      await sendForgotPassword({email: userEmail , lang: lang});
    } catch (error) {
      console.error('Resend email request failed:', error);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (isSuccess) {
      openModal();
    }
    if (error ) {
    // toast.error(error?.data?.message)
    }

  }, [isSuccess , error])

  const formButtonRef = useRef();

  const onButtonClick = (inputref) => {
    inputref.current.click();
  };


    return (
        <>
          <div className="bg-gray-100 flex flex-col min-h-screen font-DmSans items-center justify-start mx-auto md:py-[60px] md:px-10 px-3 py-[30px] w-full">
            <div className=" flex flex-col gap-[42px] items-center justify-start mb-[77px] w-auto w-full">
              <a href='https://digitalmorocco.net' target='_blank' className="flex flex-col items-center justify-center w-full">
                <img
                  className="h-[50px] w-[183px]"
                  src={logo}
                  alt="logo"
                />
              </a>
              <div className="bg-white-A700 flex flex-col gap-9 items-center justify-start px-6 py-[42px] rounded-[12px] shadow-formbs max-w-[520px] w-full">
                <Toaster/>
                <div className="flex flex-col items-center justify-start w-auto">
                  <img
                    className="h-[235px] w-[256px]"
                    src={verifyImage}
                    alt="logo"
                  />
                </div>
                <Text
                  className="text-lg md:text-[22px] font-dm-sans-medium text-gray-901 leading-8 w-auto"
                >
                  {t('resetEmail.checkInbox')}
                </Text>
                <div className="flex flex-col gap-9 items-center justify-start w-full">
                  <div className="flex flex-col gap-6 items-center justify-start w-full">
                    <Text
                      className="leading-[28.00px] font-dm-sans-medium text-center text-gray-901 text-lg "
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
                      <button
                          type="button"
                          onClick={handleResendEmail}
                          className={`flex flex-row gap-6 h-[52px]  cursorpointer ${isLoading ? 'disabled bg-greenbtnhoverbg' : 'bg-teal-A700 hover:bg-greenbtnhoverbg'} items-center justify-center px-6 py-[14px] rounded-[26px] text-base font-dm-sans-medium text-white-A700 w-auto`}
                      >
                          {isLoading ? t("all.sending") : t('resetEmail.resendEmail') }
                      </button>
                    <div className="flex flex-row gap-2.5 items-center justify-start w-auto">
                      <Text
                        className="text-blue_gray-900_02 font-dm-sans-medium leading-[26px] text-sm w-auto"
                        >
                        {t('resetEmail.signInTrouble')}
                      </Text>
                      <a href="mailto:support@digitalmorocco.net">
                        <Text
                          className=" text-deep_purple-A400 hover:text-[#00CDAE] leading-[26px] font-dm-sans-bold text-sm w-auto cursorpointer"
                        >
                          {t('resetEmail.contactSupport')}
                        </Text>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <EmailExistModalOrConfirmation isOpen={isModalOpen}
            onRequestClose={closeModal} content={
              <div className="flex flex-col gap-[38px] items-center justify-start w-auto  w-full">
            <img
              className="h-[80px] w-[80px]"
              src={checkVerifyImg}
              alt="successtick"
            />
            <div className="flex flex-col gap-5 items-center justify-start w-full">
              <Text
                className="leading-[26.00px] font-dm-sans-medium text-[18px] text-gray-801 text-center "
              >
                  {t('verification.confirmTitle')}
              </Text>
              <Text
                className="leading-[26.00px] font-dm-sans-regular  text-gray-801 text-center text-sm"
              >
                <>
                  {t('verification.confirmMsg')}
                </>
              </Text>
            </div>
          </div>
            }/>
        </>
      );
}