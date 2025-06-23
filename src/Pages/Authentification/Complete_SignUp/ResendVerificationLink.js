import React, { useState , useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Text } from '../../../Components/Text';
import logo from '../../../Media/img_logo.svg'
import confirmImage from '../../../Media/img_role_confirmed.svg';
import { useNavigate } from 'react-router-dom';
import errorImg from '../../../Media/emailError.svg'
import verifyImage from '../../../Media/img_verify.svg';
import checkVerifyImg from '../../../Media/check-verified-02.svg';
import EmailExistModalOrConfirmation from '../../../Components/Modals/EmailExistModalOrConfirmation';
import { authApi } from '../../../Services/Auth';
import { useLocation } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { logout } from "../../../Redux/auth/authSlice";
import HelmetWrapper from '../../../Components/common/HelmetWrapper';

const ResendVerificationLink = () => {
    const {t} = useTranslation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [userTrigger ,{ data: userData, error: userError } ]  = authApi.endpoints.getUserByEmail.useLazyQuery()
    const [trigger, { data, status , isSuccess , error: sendError , isLoading}] = authApi.endpoints.sendEmailVerification.useLazyQuery()
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const storedEmail = sessionStorage.getItem('email') || '';
    const storedUserId = sessionStorage.getItem('user_id') || '';
    const [message, setMessage] = useState('');
    const [isSending, setIsSending] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
      };
    
      const closeModal = () => {
        setIsModalOpen(false);
        // Perform logout and navigate
        dispatch(logout());
        sessionStorage.clear();
        // Redirect to external site
        window.location.href = 'https://digitalmorocco.net';
      };

      const handleResendEmail = async () => {
        try {
            setIsSending(true)
            trigger({ userId: storedUserId, lang: localStorage.getItem('language')}).then((response) => {
                if (response.isSuccess) {
                    setIsSending(false)
                  openModal(); 
                }
              });
        } catch (error) {
          console.error('Resend email request failed:', error);
        }
      };

    return (
        <>
        <HelmetWrapper 
          title={t('helmet.resendVerificationLink.title')}
          description={t('helmet.resendVerificationLink.description')}
          keywords={t('helmet.resendVerificationLink.keywords')}
          canonical={`${process.env.REACT_APP_URL}/ResendVerificationLink`}
        />
        <div className={`bg-white-A700 flex flex-col font-DmSans gap-[50px] items-center justify-start mx-auto pb-[50px] w-full min-h-screen overflow-y-auto`}>
            <div className="border-b border-gray-201 border-solid flex flex-row md:flex-row gap-10 items-center justify-between pl-2 pr-12 md:px-[100px] py-5 w-full relative">
              <a href="https://digitalmorocco.net" target='_blank' rel='noreferrer'>
                  <img
                  className="h-[47px] w-[180px]"
                  src={logo}
                  alt="logo"
                  />
              </a>
            </div>
            <div className='flex px-3 w-full items-center justify-center'>
              <div className="bg-white-A700 shadow-loginModalbsReduced border border-gray-500_33 border-solid flex flex-col gap-6 items-center justify-start max-w-screen-sm p-5 rounded-[14px] w-full">
                  <div className="flex flex-col gap-[38px] items-center justify-start max-w-[460px] w-full">
                  <img
                    className="w-20 h-20 "
                    src={errorImg}
                    alt="errortick"
                  />
                  <div className="flex flex-col gap-1.5 items-center justify-start w-auto ">
                    <Text
                      className="leading-[28.00px] font-dm-sans-medium text-gray-801 text-center text-lg "
                    >
                      <span className=" font-dm-sans-medium">
                        {t('verification.linkExpire')}{" "}
                      </span>
                    </Text>
                    <Text
                      className="flex flex-col mt-3 font-dm-sans-regular leading-[26.00px] text-[#1D2939]  text-center text-sm"
                    >
                      <>
                        {t('verification.linkExpireMsg')}
                      </>
                    </Text>
                    <Text
                      className="flex flex-col font-dm-sans-medium leading-[26.00px] text-[#2575f0]  text-center text-sm"
                    >
                      <>
                        {t('verification.linkExpireMsg1')}
                      </>
                    </Text>
                    <Text
                      className="flex flex-col mt-4 font-dm-sans-regular leading-[26.00px] text-[#1D2939]  text-center text-sm"
                    >
                      <>
                        {t('verification.linkExpireMsg2')}
                      </>
                    </Text>
                    <button className="px-10 py-[18px] mt-6 bg-[#00cdae] rounded-[200px] justify-center items-center gap-6 inline-flex cursorpointer" 
                    onClick={handleResendEmail} >
                        <div className="justify-center items-center gap-4 flex">
                            <div className="text-white-A700 text-base font-dm-sans-medium ">{(isSending || isLoading ) ? t("all.sending") : t('resetEmail.resendEmail') }</div>
                        </div>
                    </button>
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
        <EmailExistModalOrConfirmation isOpen={isModalOpen}
            onRequestClose={closeModal} content={
              <div className="flex flex-col gap-[38px] items-center justify-start  w-full">
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

export default ResendVerificationLink;
