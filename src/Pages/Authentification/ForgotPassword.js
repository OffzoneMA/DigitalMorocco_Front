import React , {useRef , useEffect, useState} from 'react'
import { useForm } from "react-hook-form";
import { useDispatch } from 'react-redux';
import { setUserEmail } from '../../Redux/auth/authSlice';
import { useNavigate } from 'react-router-dom'
import { Text  } from '../../Components/Text';
import { Toaster } from "react-hot-toast";
import { useTranslation } from 'react-i18next';
import { useSendForgotPasswordMutation } from '../../Services/Auth';
import arrowLeftImage from '../../Media/img_arrowleft.svg';
import { authApi } from '../../Services/Auth';
import { Link } from 'react-router-dom';
import HelmetWrapper from '../../Components/common/HelmetWrapper';
import isEmail from 'validator/lib/isEmail';


export default function ForgotPassword(){
  const { t } = useTranslation();
  const [sendForgotPassword, { isLoading , isSuccess , error}] = useSendForgotPasswordMutation()
  let [userTrigger ,{ data: userData, error: userError, isLoading: isLoadingUser , } ]  = authApi.endpoints.getUserByEmail.useLazyQuery()
  const [userErrorVal , setUserErrorVal] = useState(null);
  const navigate = useNavigate()
  const dispatch = useDispatch();


    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors },
      } = useForm();

  const formButtonRef = useRef();

  const onButtonClick = (inputref) => {
    inputref.current.click();
  };

  useEffect(() => {
    if (isSuccess) {
      // toast.success("Successfuly !")
      setTimeout(() => navigate('/ResetPasswordEmail'), 1000)
    }
    if (error ) {
    console.log(error)
    }
    if (userError ) {
      console.log(userError?.data?.message)
    }
    setUserErrorVal(null)

  }, [isSuccess , userError , error , navigate]);

  async function onSubmit(values) {
    const lang = localStorage.getItem('language');
    const valuesWithLang = {
      ...values,
      lang
    };

    try {
      userTrigger(values.email).then(async (payload) => {
        if (payload?.isSuccess) {
          await sendForgotPassword(valuesWithLang);
          dispatch(setUserEmail(values.email)); 
          localStorage.setItem('userEmail', values?.email);
        }
        else {
          setUserErrorVal(payload?.error?.data?.message)
        }
      });    
    } catch (error) {
      console.error('Forgot password request failed:', error);
    }
  }

    return (
        <>
        <HelmetWrapper 
          title={t(`helmet.resetPassword.ForgotPassword.title`)}
          description={t(`helmet.resetPassword.ForgotPassword.description`)}
          keywords={t(`helmet.resetPassword.ForgotPassword.keywords`)}
          canonical={`${process.env.REACT_APP_URL}/ForgotPassword`}
        />
          <div className="bg-gray-100 flex flex-col font-manrope gap-4 mx-auto md:px-10 min-h-screen px-[12px] py-[30px] overflow-y-auto w-full">
            <div className={`self-start flex flex-col h-11 items-center justify-center w-auto`}>
              <Link to="/SignIn" className="px-5 items-center self-start flex flex-col h-full w-full cursorpointer-green">
                <div className="flex flex-row gap-3 items-center justify-center">
                    <img
                        className="h-[22px] w-[22px]"
                        src={arrowLeftImage}
                        alt="arrowleft"
                    />
                    <span className="text-[#8C8C8E] text-sm tracking-[0.14px]">
                        <Text className='font-manrope text-sm font-semibold leading-[19.12px] tracking-[0.01em]'>
                            {t('backToLogin')}
                        </Text>
                    </span>
                </div>
              </Link>
            </div>
            <div className="flex flex-col font-dmsans gap-[42px] items-center justify-start mb-[368px]  w-full ">
              <a href='https://digitalmorocco.net' target='_blank' rel='noreferrer' className="flex flex-col items-center justify-center w-full">
                <img
                  className="h-[50px] w-[183px]"
                  src="/images/img_logo.svg"
                  alt="logo"
                />
              </a>
              <div className="bg-white-A700 flex flex-col gap-8 items-center justify-start px-5  py-8 rounded-[12px] shadow-formbs max-w-[520px] w-full">
              <Toaster />
                <p
                  className="text-lg font-dm-sans-medium text-gray-901 leading-[32px] sm:text-lg md:text-[22px] w-auto"
                >
                  <Text className='text-lg md:text-[22px] font-dm-sans-medium' >{t('forgot.forgotPassword')} </Text>
                </p>
                <div className="flex flex-col gap-8 items-center justify-start w-full">
                  <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 items-center justify-start w-full">
                    <Text
                      className="text-gray-901 font-dm-sans-medium text-[18px] leading-[28px] w-full"
                    >
                      {t('forgot.enterEmailAddress')}
                    </Text>
                    <div className="flex flex-col gap-4  justify-start w-full">
                      <div className="flex flex-col font-dmsans items-start justify-start w-full">
                        <Text
                          className="text-base font-dm-sans-medium text-[#1D1C21] w-auto"
                        >
                          {t('forgot.emailAddress')}
                        </Text>
                      </div>
                      <div className="relative w-full">
                        <input
                            {...register("email", {
                                required: {
                                    value: true,
                                },
                                minLength: {
                                    value: 2,
                                    message: t('signup.emailPattern'),
                                },
                                maxLength: {
                                    value: 120,
                                    // message: t('signup.emailMaxLength'),
                                },
                                validate: (value) => isEmail(value) || t('signup.emailPattern'),
                            })}
                            id="email"
                            name="email"
                            placeholder={t('signup.enterEmailAddress')}
                            className={`bg-white w-full border border-solid ${(errors?.email || userError) ? 'border-errorColor shadow-inputBsError ' : 'border-borderColor'} rounded-full px-[18px] py-[11px] ${(errors?.email || userError) ? 'focus:border-errorColor' : 'focus:border-focusColor focus:shadow-inputBs'} placeholder:text-placehColor font-dm-sans-regular placeholder:text-[14px] text-[16px] ${(errors?.email || userError) ? '!text-errorColor' : '!text-gray-801'}`}
                            type="text"
                        />
                        <button
                        type="button"
                        className="absolute top-0 right-0 h-full px-3 flex items-center"
                      >
                        {(errors?.email || userError) ? 
                        <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M7.89623 0.712233C8.2332 0.522518 8.61337 0.422852 9.00008 0.422852C9.38678 0.422852 9.76695 0.522518 10.1039 0.712233C10.4409 0.901948 10.7233 1.17531 10.9238 1.50594L10.926 1.5095L17.2785 12.1145L17.2846 12.1249C17.481 12.4651 17.585 12.8508 17.5861 13.2437C17.5872 13.6366 17.4854 14.0229 17.2908 14.3642C17.0963 14.7055 16.8158 14.99 16.4771 15.1892C16.1385 15.3884 15.7537 15.4955 15.3608 15.4999L15.3526 15.5L2.63933 15.4999C2.24648 15.4956 1.86161 15.3884 1.52301 15.1892C1.1844 14.99 0.903866 14.7055 0.709314 14.3642C0.514761 14.0229 0.412971 13.6366 0.414071 13.2437C0.415171 12.8508 0.519123 12.4651 0.715584 12.1249L0.721676 12.1145L7.07632 1.50593C7.27687 1.1753 7.55926 0.901948 7.89623 0.712233ZM9.00008 1.92285C8.87118 1.92285 8.74445 1.95607 8.63213 2.01931C8.52031 2.08226 8.42653 2.17285 8.35973 2.28239L2.01209 12.8793C1.94821 12.9916 1.91443 13.1186 1.91407 13.2479C1.9137 13.3789 1.94763 13.5076 2.01248 13.6214C2.07733 13.7352 2.17084 13.83 2.28371 13.8964C2.39559 13.9622 2.52262 13.9979 2.65237 13.9999H15.3478C15.4775 13.9979 15.6046 13.9622 15.7164 13.8964C15.8293 13.83 15.9228 13.7352 15.9877 13.6214C16.0525 13.5076 16.0865 13.3789 16.0861 13.2479C16.0857 13.1186 16.052 12.9917 15.9881 12.8793L9.64133 2.28388L9.64042 2.28239C9.57362 2.17285 9.47984 2.08226 9.36802 2.01931C9.2557 1.95607 9.12898 1.92285 9.00008 1.92285Z" fill="#EC7373"/>
                                <path fillRule="evenodd" clipRule="evenodd" d="M9.00008 4.99991C9.41429 4.99991 9.75008 5.3357 9.75008 5.74991V8.74991C9.75008 9.16412 9.41429 9.49991 9.00008 9.49991C8.58586 9.49991 8.25008 9.16412 8.25008 8.74991V5.74991C8.25008 5.3357 8.58586 4.99991 9.00008 4.99991Z" fill="#EC7373"/>
                                <path fillRule="evenodd" clipRule="evenodd" d="M8.25008 11.7499C8.25008 11.3357 8.58586 10.9999 9.00008 10.9999H9.00758C9.42179 10.9999 9.75758 11.3357 9.75758 11.7499C9.75758 12.1641 9.42179 12.4999 9.00758 12.4999H9.00008C8.58586 12.4999 8.25008 12.1641 8.25008 11.7499Z" fill="#EC7373"/>
                            </svg>
                            :
                          <>
                          {getValues('email')?.length > 0  &&
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <g clipPath="url(#clip0_1051_1887)">
                                  <path d="M5.625 9L7.875 11.25L12.375 6.75M16.5 9C16.5 13.1421 13.1421 16.5 9 16.5C4.85786 16.5 1.5 13.1421 1.5 9C1.5 4.85786 4.85786 1.5 9 1.5C13.1421 1.5 16.5 4.85786 16.5 9Z" stroke="#22C332" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </g>
                              <defs>
                                  <clipPath id="clip0_1051_1887">
                                      <rect width="18" height="18" fill="white"/>
                                  </clipPath>
                              </defs>
                            </svg>  
                            }
                          </>   
                            } 
                            
                      </button>
                    </div>
                    {(errors?.email?.message || userError || error) &&<span className="text-red-400 text-sm">{t('signup.emailPattern')}</span>}
                    </div>
                  <div className="flex flex-col gap-4 items-center justify-start w-full">
                    <div 
                    className={`${errors?.email? 'bg-gray-202 text-placehColor cursorpointer-green' : isLoading? 'bg-greenbtnhoverbg  text-white-A700' :'bg-teal-A700 text-white-A700 hover:bg-greenbtnhoverbg hover:svg-translate cursorpointer' } my-3 flex flex-row gap-6 h-[52px] md:h-auto items-center justify-center py-[13px] rounded-[26px] w-full `} 
                    onClick={() => onButtonClick(formButtonRef)}>
                      <button ref={formButtonRef} type="submit" className={`text-base items-center ${(errors?.email || isLoading)? 'disabled' : ''} justify-center font-dm-sans-medium w-auto`}>
                          {(isLoading || isLoadingUser) ? t('all.sending') : t('forgot.resetPassword')}
                      </button>
                      {(isLoading || isLoadingUser) ?
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                          <path d="M10.4995 13.5002L20.9995 3.00017M10.6271 13.8282L13.2552 20.5862C13.4867 21.1816 13.6025 21.4793 13.7693 21.5662C13.9139 21.6415 14.0862 21.6416 14.2308 21.5664C14.3977 21.4797 14.5139 21.1822 14.7461 20.5871L21.3364 3.69937C21.5461 3.16219 21.6509 2.8936 21.5935 2.72197C21.5437 2.57292 21.4268 2.45596 21.2777 2.40616C21.1061 2.34883 20.8375 2.45364 20.3003 2.66327L3.41258 9.25361C2.8175 9.48584 2.51997 9.60195 2.43326 9.76886C2.35809 9.91354 2.35819 10.0858 2.43353 10.2304C2.52043 10.3972 2.81811 10.513 3.41345 10.7445L10.1715 13.3726C10.2923 13.4196 10.3527 13.4431 10.4036 13.4794C10.4487 13.5115 10.4881 13.551 10.5203 13.5961C10.5566 13.647 10.5801 13.7074 10.6271 13.8282Z" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      :
                      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" 
                        className={`transition-transform transform ${errors?.email ? 'text-placehColor' : 'text-white-A700'}`}
                      >
                        <path d="M11 15L15 11M15 11L11 7M15 11H7M21 11C21 16.5228 16.5228 21 11 21C5.47715 21 1 16.5228 1 11C1 5.47715 5.47715 1 11 1C16.5228 1 21 5.47715 21 11Z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                       }
                      
                    </div>
                    <div className="flex flex-row gap-2.5 items-center justify-between w-auto">
                      <Text
                        className="text-blue_gray-900_02 font-dm-sans-medium leading-[26px] text-sm w-auto"
                      >
                        {t('forgot.havingTroubleSigningIn')}
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
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      );
    
}