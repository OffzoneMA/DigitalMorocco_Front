import React , {useRef} from 'react'
import { useForm } from "react-hook-form";
import { useDispatch } from 'react-redux';
import { setUserEmail } from '../../Redux/auth/authSlice';
import { useNavigate } from 'react-router-dom'
import { Text  } from '../../Components/Text';
import { useTranslation } from 'react-i18next';
import { useSendForgotPasswordMutation } from '../../Services/Auth';


export default function ForgotPassword(){
  const { t } = useTranslation();
  const [sendForgotPassword, { isLoading  , error}] = useSendForgotPasswordMutation()
  const navigate = useNavigate()
  const dispatch = useDispatch();


    const {
        register,
        handleSubmit,
        reset,
        getValues,
        formState: { errors },
      } = useForm();

  const formButtonRef = useRef();

  const onButtonClick = (inputref) => {
    inputref.current.click();
  };
      async function onSubmit(values) {
        console.log(values);
        try {
          await sendForgotPassword(values);
          dispatch(setUserEmail(values)); 
          navigate('/ResetPasswordEmail');
        
        } catch (error) {
          console.error('Forgot password request failed:', error);
        }
      }

    return (
        <>
          <div className="bg-gray-100 flex flex-col font-manrope gap-4 mx-auto p-[30px] min-h-screen sm:px-5 w-full">
            <div className={`self-start flex flex-col px-5 gap-[18px] h-11 md:h-auto items-center justify-center py-[18px] rounded-[22px] w-auto`}>
                <div className="flex flex-row gap-3 items-center justify-center w-auto w-full cursor-pointer">
                  <img
                      className="h-[22px] w-[22px]"
                      src="images/img_arrowleft.svg"
                      alt="arrowleft"
                  />
                  <a className="text-[#8C8C8E] text-sm tracking-[0.14px] w-auto" href='/SignIn'>
                      <Text
                      className='font-manrope text-sm font-semibold leading-[19.12px] tracking-[0.01em] '
                      >
                          {t('backToLogin')}
                      </Text>
                  </a>
                </div>
            </div>
            <div className="flex flex-col font-dmsans gap-[42px] items-center justify-start mb-[368px]  w-auto w-full ">
              <a href='' className="flex flex-col items-center justify-center w-full">
                <img
                  className="h-[50px] w-[183px]"
                  src="images/img_logo.svg"
                  alt="logo"
                />
              </a>
              <div className="bg-white-A700 flex flex-col gap-8 items-center justify-start px-5  py-8 rounded-[12px] shadow-formbs max-w-[520px] w-full">
                <a
                  href=""
                  className="text-[22px] font-dm-sans-medium text-gray-901 leading-[32px] sm:text-lg md:text-xl w-auto"
                >
                  <Text className='text-[22px] font-dm-sans-medium' >{t('forgot.forgotPassword')} </Text>
                </a>
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
                          className="text-base font-dm-sans-medium text-gray-900 w-auto"
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
                                    value: 8,
                                    // message: t('signup.emailMinLength'),
                                },
                                maxLength: {
                                    value: 120,
                                    // message: t('signup.emailMaxLength'),
                                },
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                },
                            })}
                            id="email"
                            name="email"
                            placeholder={t('signup.enterEmailAddress')}
                            className={`bg-white w-full leading-[18.23px] border border-solid ${errors?.email ? 'border-errorColor' : 'border-borderColor'} rounded-full px-[18px] py-[12px] ${errors?.email ? 'focus:border-errorColor' : 'focus:border-focusColor focus:shadow-inputBs'} placeholder:text-placehColor  placeholder:text-[14px] text-[16px] text-${errors?.email ? 'errorColor' : 'gray-801'}`}
                            type="text"
                        />
                        <button
                        type="button"
                        className="absolute top-0 right-0 h-full px-3 flex items-center"
                      >
                        {errors?.email && 
                        <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M7.89623 0.712233C8.2332 0.522518 8.61337 0.422852 9.00008 0.422852C9.38678 0.422852 9.76695 0.522518 10.1039 0.712233C10.4409 0.901948 10.7233 1.17531 10.9238 1.50594L10.926 1.5095L17.2785 12.1145L17.2846 12.1249C17.481 12.4651 17.585 12.8508 17.5861 13.2437C17.5872 13.6366 17.4854 14.0229 17.2908 14.3642C17.0963 14.7055 16.8158 14.99 16.4771 15.1892C16.1385 15.3884 15.7537 15.4955 15.3608 15.4999L15.3526 15.5L2.63933 15.4999C2.24648 15.4956 1.86161 15.3884 1.52301 15.1892C1.1844 14.99 0.903866 14.7055 0.709314 14.3642C0.514761 14.0229 0.412971 13.6366 0.414071 13.2437C0.415171 12.8508 0.519123 12.4651 0.715584 12.1249L0.721676 12.1145L7.07632 1.50593C7.27687 1.1753 7.55926 0.901948 7.89623 0.712233ZM9.00008 1.92285C8.87118 1.92285 8.74445 1.95607 8.63213 2.01931C8.52031 2.08226 8.42653 2.17285 8.35973 2.28239L2.01209 12.8793C1.94821 12.9916 1.91443 13.1186 1.91407 13.2479C1.9137 13.3789 1.94763 13.5076 2.01248 13.6214C2.07733 13.7352 2.17084 13.83 2.28371 13.8964C2.39559 13.9622 2.52262 13.9979 2.65237 13.9999H15.3478C15.4775 13.9979 15.6046 13.9622 15.7164 13.8964C15.8293 13.83 15.9228 13.7352 15.9877 13.6214C16.0525 13.5076 16.0865 13.3789 16.0861 13.2479C16.0857 13.1186 16.052 12.9917 15.9881 12.8793L9.64133 2.28388L9.64042 2.28239C9.57362 2.17285 9.47984 2.08226 9.36802 2.01931C9.2557 1.95607 9.12898 1.92285 9.00008 1.92285Z" fill="#EC7373"/>
                                <path fillRule="evenodd" clipRule="evenodd" d="M9.00008 4.99991C9.41429 4.99991 9.75008 5.3357 9.75008 5.74991V8.74991C9.75008 9.16412 9.41429 9.49991 9.00008 9.49991C8.58586 9.49991 8.25008 9.16412 8.25008 8.74991V5.74991C8.25008 5.3357 8.58586 4.99991 9.00008 4.99991Z" fill="#EC7373"/>
                                <path fillRule="evenodd" clipRule="evenodd" d="M8.25008 11.7499C8.25008 11.3357 8.58586 10.9999 9.00008 10.9999H9.00758C9.42179 10.9999 9.75758 11.3357 9.75758 11.7499C9.75758 12.1641 9.42179 12.4999 9.00758 12.4999H9.00008C8.58586 12.4999 8.25008 12.1641 8.25008 11.7499Z" fill="#EC7373"/>
                            </svg>} 
                            {(!errors?.email && getValues('email') && getValues('email').length > 0) &&
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
                      </button>
                    </div>
                    {errors?.email?.message &&<span className="text-red-400 text-sm">{errors?.email?.message}</span>}
                    </div>
                  <div className="flex flex-col gap-6 items-center justify-start w-full">
                    <div className={`${errors?.email? 'bg-gray-202 text-placehColor' : ' bg-teal-A700 text-white-A700'} my-3 flex flex-row gap-6 h-[52px] md:h-auto items-center justify-center py-[13px] rounded-[26px] w-full cursor-pointer ${errors?.email? 'hover:bg-gray-301': 'hover:bg-greenbtnhoverbg'}  hover:svg-translate`}>
                      <button ref={formButtonRef} type="submit" className="text-base items-center justify-center font-dm-sans-medium w-auto">
                          {isLoading ? t('forgot.resetPasswordSend') : t('forgot.resetPassword')}
                      </button>
                      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" 
                        className={`transition-transform transform ${errors?.email ? 'text-placehColor' : 'text-white-A700'}`}
                    >
                        <path d="M11 15L15 11M15 11L11 7M15 11H7M21 11C21 16.5228 16.5228 21 11 21C5.47715 21 1 16.5228 1 11C1 5.47715 5.47715 1 11 1C16.5228 1 21 5.47715 21 11Z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    </div>
                    <div className="flex flex-row gap-2.5 items-center justify-between w-auto">
                      <Text
                        className="text-blue_gray-900_02 font-dm-sans-medium leading-[26px] text-sm w-auto"
                      >
                        {t('forgot.havingTroubleSigningIn')}
                      </Text>
                      <Text
                        className="text-deep_purple-A400 leading-[26px] font-dm-sans-bold text-sm w-auto"
                      >
                        {t('forgot.contactSupport')}
                      </Text>
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