import React, { useEffect, useState , useRef } from 'react'
import { useForm } from "react-hook-form";
import {Text } from '../../Components/Text'
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate  , useLocation} from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import logo from '../../Media/img_logo.svg';
import HelmetWrapper from '../../Components/common/HelmetWrapper';


export default function SocialSignUp() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const { loading, userInfo, error } = useSelector((state) => state.auth)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sending , setSending]  = useState(false);

  const formButtonRef = useRef();
  const socialType = location.state?.socialType;


  const onButtonClick = (inputref) => {
    inputref.current.click();
  };

  const {
    register,
    handleSubmit,
    reset, getValues,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate()

  const onSubmit = (data) => {
    // const userSocialInfos = {
    //   fullName: data?.displayName 
    // };
    setSending(true)
    sessionStorage.setItem('userSocialInfos', data?.displayName);

    window.location.href = `${process.env.REACT_APP_baseURL}/users/auth/${socialType}/signup`;
    // setSending(false)

  };

  return (
    <>
    <HelmetWrapper 
      title={t('helmet.socialSignUp.title')}
      description={t('helmet.socialSignUp.description')}
      keywords={t('helmet.socialSignUp.keywords')}
      canonical={`${process.env.REACT_APP_URL}/SocialSignUp`}
    />
    <div className="bg-gray-100 flex flex-col min-h-screen overflow-y-auto font-DmSans items-center justify-start mx-auto pt-[80px] md:px-10 px-[12px] py-[30px] w-full">
      <div className="flex flex-col gap-[42px] items-center justify-start mb-[63px] w-auto sm:w-full">
          <a href='https://digitalmorocco.net' target='_blank' className="flex flex-col items-center justify-center">
            <img
              className="h-[50px] w-[183px]"
              src={logo}
              alt="logo"
            />
          </a>
          <div className="bg-white-A700 gap-5 md:gap-10 flex flex-col items-center justify-start px-6 py-8 rounded-[12px] shadow-formbs w-full max-w-[520px]">
          <div className="flex flex-col gap-4 items-center justify-start w-full">
          <Toaster />
              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 items-center justify-start w-full">
                <Text
                className="text-base font-dm-sans-medium leading-[25.6px] text-gray-901 tracking-[0.16px] w-auto"
                >
                  {t('signup.creatingAccount')}
                </Text>
                <div className="flex flex-col gap-4 items-center justify-start w-full">
                  <div className="flex flex-col gap-2 items-start justify-start w-full">
                    <Text
                      className="text-gray-900_01 font-dm-sans-regular text-sm leading-[26px] text-left w-auto"
                      >
                      {t('signup.fullName')}
                    </Text>
                    <input
                      {...register("displayName", {
                        required: {
                          value: true,
                          // message: t('signup.fullNameRequired'),
                        },
                        
                      })}
                        id="displayName"
                      name="displayName"
                      placeholder={t('signup.enterFullName')}
                      className={`bg-white w-full leading-[18.23px] border border-solid !focus:border !focus:border-solid ${errors?.displayName ? 'border-errorColor shadow-inputBsError' : 'border-borderColor'} rounded-full px-[18px] py-[12px] ${errors?.displayName ? ' focus:border-errorColor' : ' focus:border-focusColor focus:shadow-inputBs'} placeholder:text-placehColor font-dm-sans-regular placeholder:text-[14px] text-[15px] text-${errors?.displayName ? 'errorColor' : 'gray-801'}`}
                      type="text"
                    ></input>
                    {(errors?.displayName && getValues('displayName')?.length > 0) &&<span className="text-red-400 text-sm">{t('signup.emailPattern')}</span>}
                  </div>
                  <div className="flex flex-col mt-4 mb-1 gap-2.5 justify-start w-full">
                    <Text
                      className="font-Avenir-next-LTPro leading-[16.8px] text-[12px] text-[#585E66] w-full"
                    >
                      {t('signup.accordance')} <br/>
                      {t('signup.accordance1')} <span className='font-Montserrat-semiBold'>D-W-266/2024.</span>
                    </Text>
                    <div className="flex flex-row items-start mt-4 justify-start w-full">
                        <label htmlFor={`acceptTerms`} className="cursorpointer relative inline-flex items-center  peer-checked:border-0 rounded-[3px] mr-2">
                          <input
                          {...register("acceptTerms" , {
                            required: t('signup.termsValidation'),
                          }
                          )}
                            id={`acceptTerms`}
                            type="checkbox"
                            name="acceptTerms"
                            className={`peer appearance-none w-[16px] h-[16px] bg-white_A700 checked:bg-blue-600 checked:border-blue-600 border-[0.5px] border-[#303030] ${errors?.acceptTerms ? 'border-errorColor text-errorColor shadow-checkErrorbs' : 'shadow-none border-[#303030] '} rounded-[4px] focus:ring-blue-500 relative`}
                          />
                          <svg width="12" height="9" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 transition opacity-0 peer-checked:opacity-100">
                            <path d="M5.10497 8.10407L5.08735 8.12169L0.6875 3.72185L2.12018 2.28917L5.10502 5.27402L9.87904 0.5L11.3117 1.93268L5.12264 8.12175L5.10497 8.10407Z" fill="white"/>
                          </svg>
                        </label>                      
                        <label
                          htmlFor='acceptTerms'
                          className="text-[13px] leading-[16.93px] text-[#555458] w-auto font-dm-sans-regular"
                        >
                          {t('signup.terms1')} <a href='https://digitalmorocco.net/terms' target='_blank' className='text-[#2575F0] hover:text-[#00CDAE] cursorpointer'><span>{t('signup.terms2')}</span></a> {t('signup.terms3')} <a href='https://digitalmorocco.net/privacy' target='_blank' className='text-[#2575F0] hover:text-[#00CDAE] cursorpointer'><span>{t('signup.terms4')}</span></a> {t('signup.terms5')}                      
                        </label>
                    </div>
                  </div>
                  <div className={`my-3 flex flex-row gap-6 h-[52px] md:h-auto items-center justify-center py-[13px] rounded-[26px] w-full cursorpointer ${ loading ? 'bg-greenbtnhoverbg' : 'bg-teal-A700 hover:bg-greenbtnhoverbg  hover:svg-translate'} `}
                    onClick={()=> onButtonClick(formButtonRef)}>
                    <button ref={formButtonRef} type="submit" className="text-base items-center justify-center font-dm-sans-medium text-white-A700 w-auto">
                    {sending? t("all.sending") : t('signup.next')}
                    </button>
                    {sending ? 
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                          <path d="M10.4995 13.5002L20.9995 3.00017M10.6271 13.8282L13.2552 20.5862C13.4867 21.1816 13.6025 21.4793 13.7693 21.5662C13.9139 21.6415 14.0862 21.6416 14.2308 21.5664C14.3977 21.4797 14.5139 21.1822 14.7461 20.5871L21.3364 3.69937C21.5461 3.16219 21.6509 2.8936 21.5935 2.72197C21.5437 2.57292 21.4268 2.45596 21.2777 2.40616C21.1061 2.34883 20.8375 2.45364 20.3003 2.66327L3.41258 9.25361C2.8175 9.48584 2.51997 9.60195 2.43326 9.76886C2.35809 9.91354 2.35819 10.0858 2.43353 10.2304C2.52043 10.3972 2.81811 10.513 3.41345 10.7445L10.1715 13.3726C10.2923 13.4196 10.3527 13.4431 10.4036 13.4794C10.4487 13.5115 10.4881 13.551 10.5203 13.5961C10.5566 13.647 10.5801 13.7074 10.6271 13.8282Z" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      :
                      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-transform transform">
                          <path d="M11 15L15 11M15 11L11 7M15 11H7M21 11C21 16.5228 16.5228 21 11 21C5.47715 21 1 16.5228 1 11C1 5.47715 5.47715 1 11 1C16.5228 1 21 5.47715 21 11Z" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      }
                  </div>
                </div>
              </form>
              </div>
          </div>
          <div className="flex flex-row gap-2.5 items-center justify-start w-auto">
            <a
              className="text-[#37363B] text-sm font-dm-sans-medium leading-[26px]  w-auto"
            >
              <Text className=''>{t('signup.haveAccount')}</Text>
            </a>
            <a
              href="/SignIn"
              className="text-[#482BE7] hover:text-[#00CDAE]  text-sm font-dm-sans-bold leading-[26px] w-auto"
            >
              <Text className='cursorpointer'>{t('signup.signIn')}</Text>
            </a>
          </div>
      </div>
      {/* <EmailExistModal isOpen={isModalOpen}
        onRequestClose={closeModal}/> */}
    </div>
    </>

  )
}
