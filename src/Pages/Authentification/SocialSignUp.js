import React, { useEffect, useState , useRef } from 'react'
import { useForm } from "react-hook-form";
import {Text } from '../../Components/Text'
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import EmailExistModal from '../../Components/EmailExistModal';

export default function SocialSignUp() {
  const { t, i18n } = useTranslation();

  const { loading, userInfo, error } = useSelector((state) => state.auth)
  const [isModalOpen, setIsModalOpen] = useState(false);

  const formButtonRef = useRef();


  const onButtonClick = (inputref) => {
    inputref.current.click();
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const {
    register,
    handleSubmit,
    reset, getValues,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate()

  const onSubmit = (data) => {
    console.log(data)
    openModal();
  };

  return (
    <>
    <div className="bg-gray-100 flex flex-col min-h-screen font-DmSans items-center justify-start mx-auto pt-[80px] p-[42px] md:px-10 sm:px-5 w-full">
      <div className="flex flex-col gap-[42px] items-center justify-start mb-[63px] w-auto sm:w-full">
          <a className="flex flex-col items-center justify-center w-full">
            <img
              className="h-[50px] w-[183px]"
              src="images/img_logo.svg"
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
                        minLength: {
                          value: 3,
                          // message: t('signup.fullNameShort'),
                        },
                        maxLength: {
                          value: 50,
                          // message: t('signup.fullNameLong'),
                        },
                        
                      })}
                        id="displayName"
                      name="displayName"
                      placeholder={t('signup.enterFullName')}
                      className={`bg-white w-full leading-[18.23px] border border-solid !focus:border !focus:border-solid ${errors?.displayName ? 'border-errorColor' : 'border-borderColor'} rounded-full px-[18px] py-[12px] ${errors?.displayName ? ' focus:border-errorColor' : ' focus:border-focusColor focus:shadow-inputBs'} placeholder:text-placehColor font-dm-sans-regular placeholder:text-[14px] text-[15px] text-${errors?.displayName ? 'errorColor' : 'gray-801'}`}
                      type="text"
                    ></input>
                    {errors?.displayName?.message &&<span className="text-red-400 text-sm">{errors?.displayName?.message}</span>}
                  </div>
                  <div className="flex flex-col mt-4 mb-3 gap-2.5 justify-start w-full">
                    <Text
                      className="font-Avenir-next-LTPro font-normal leading-[18.2px] text-[13px] text-[#585E66] w-full"
                      >
                      {t('signup.accordance')}
                    </Text>
                    <div className="flex flex-row items-start mt-4 justify-start w-full">
                        <label htmlFor={`acceptTerms`} className="cursor-pointer relative inline-flex items-center  peer-checked:border-0 rounded-[3px] mr-2">
                          <input
                          {...register("acceptTerms" , {
                            required: t('signup.termsValidation'),
                          }
                          )}
                            id={`acceptTerms`}
                            type="checkbox"
                            name="acceptTerms"
                            className={`peer appearance-none w-4 h-4 bg-white_A700 checked:bg-blue-600 checked:border-blue-600 border border-solid border-gray-300 ${errors?.acceptTerms ? 'border-red-500 text-red-400' : 'border-gray-300'} rounded-[3px] focus:ring-blue-500 relative`}
                          />
                          <svg width="12" height="9" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 transition opacity-0 peer-checked:opacity-100">
                            <path d="M5.10497 8.10407L5.08735 8.12169L0.6875 3.72185L2.12018 2.28917L5.10502 5.27402L9.87904 0.5L11.3117 1.93268L5.12264 8.12175L5.10497 8.10407Z" fill="white"/>
                          </svg>
                        </label>                      
                        <Text
                          className="text-[13px] leading-[16.93px] text-gray-700 w-auto font-dm-sans-regular"
                          >
                          <p dangerouslySetInnerHTML={{ __html: t('signup.terms') }} />                        
                        </Text>
                    </div>
                    {errors?.acceptTerms?.message &&
                    <span className="text-red-400 text-sm">
                    {errors?.acceptTerms?.message}
                   </span>
                    }
                  </div>
                  <div className="bg-teal-A700 my-3 flex flex-row gap-6 h-[52px] md:h-auto items-center justify-center py-[13px] rounded-[26px] w-full cursor-pointer hover:bg-greenbtnhoverbg hover:svg-translate" 
                    onClick={()=> onButtonClick(formButtonRef)}>
                    <button ref={formButtonRef} type="submit" className="text-base items-center justify-center font-dm-sans-medium text-white-A700 w-auto">
                    {t('signup.signup')}
                    </button>
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-transform transform">
                        <path d="M11 15L15 11M15 11L11 7M15 11H7M21 11C21 16.5228 16.5228 21 11 21C5.47715 21 1 16.5228 1 11C1 5.47715 5.47715 1 11 1C16.5228 1 21 5.47715 21 11Z" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
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
              className="text-[#482BE7] text-sm font-dm-sans-bold leading-[26px] w-auto"
            >
              <Text className='cursor-pointer'>{t('signup.signIn')}</Text>
            </a>
          </div>
      </div>
      <EmailExistModal isOpen={isModalOpen}
        onRequestClose={closeModal}/>
    </div>
    </>

  )
}
