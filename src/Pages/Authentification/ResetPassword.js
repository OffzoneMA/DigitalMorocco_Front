import React, {useRef , useState , useEffect} from 'react'
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom'
import { Text } from '../../Components/Text';
import { useTranslation } from 'react-i18next';
import { useResetPasswordMutation } from '../../Services/Auth';
import logo from '../../Media/img_logo.svg';
import mailSendImage from '../../Media/img_mailsent.svg';



export default function ResetPassword() {
  const { t } = useTranslation();
  const [resetPassword, { isLoading , isSuccess , }] = useResetPasswordMutation()
  const [showPassword, setShowPassword] = useState(false); 
  const [showConfPassword, setShowConfPassword] = useState(false); 


  const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
        watch,
  } = useForm();
    
  const navigate = useNavigate()

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => navigate('/PasswordResetSucces'), 1000)
    }

  }, [isSuccess , isLoading ])

  const formButtonRef = useRef();

  const onButtonClick = (inputref) => {
    inputref.current.click();
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfPasswordVisibility = () => {
    setShowConfPassword(!showConfPassword);
  };
    
  const validateConfirmPassword = (value) => {
    const password = watch("password"); 
    return value == password || t('resetPassword.notMatch');
  };

  function extractTokenFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('token');
  }
    
  async function onSubmit(values) {
    const token = extractTokenFromURL();
    const payload = { ...values, token };

    try {
       resetPassword(payload); 
    } catch (error) {
      console.log(error)
    }
  }

    return (
        <>
          <div className="bg-gray-100 flex flex-col min-h-screen font-DmSans items-center justify-end mx-auto md:px-10 px-5 py-[20px] md:py-[42px] w-full">
            <div className="flex flex-col gap-[42px] items-center justify-start mt-[27px] md:px-5 w-full">
              <a href='https://digitalmorocco.net' target='_blank' className="flex flex-col items-center justify-center">
                <img
                  className="h-[50px] w-[183px]"
                  src={logo}
                  alt="logo"
                />
              </a>
              <div className="bg-white-A700 flex flex-col gap-9 items-center justify-start px-8 py-[42px] rounded-[12px] shadow-formbs max-w-[520px] w-full">
                <div className="flex flex-col items-center justify-start pb-3 w-auto">
                  <img
                    className="h-[215px] w-64"
                    src={mailSendImage}
                    alt="mailsent"
                  />
                </div>
                <Text
                  className="md:text-[22px] text-lg font-dm-sans-medium text-gray-901 leading-8 w-auto"
                  >
                  {t('resetPassword.resetPassword')}
                </Text>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 items-center justify-start w-full">
                  <div className="flex flex-col gap-6 items-center justify-start w-full">
                    <Text
                      className="leading-[28.00px] w-full font-dm-sans-medium text-left text-gray-901 text-lg "
                      >
                      {t('resetPassword.enterNewPassword')}
                    </Text>
                    <div className="flex flex-col gap-2 items-start justify-start w-full">
                      <Text
                      className="text-gray-901 font-dm-sans-medium text-base leading-[26px] text-left w-auto"
                      >
                        {t('resetPassword.newPassword')}
                      </Text>
                      <div className="relative w-full">
                        <input
                          {...register("password", {
                            validate: {
                              hasUpperCase: v => /[A-Z]/.test(v),
                              hasLowerCase: v => /[a-z]/.test(v),
                              hasNumber: v => /\d/.test(v),
                              hasSpecialChar: v => /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(v),
                              minLength: v => v.length >= 8,
                            }

                          })}
                          id="password"
                          name="password"
                          type={showPassword ? "text" : "password"}
                          placeholder={t('signup.enterPassword')}
                          style={{ appearance: 'none' }}
                          className={`${!showPassword ? 'tracking-[0.32em]' : ''} placeholder:tracking-normal bg-white w-full border border-solid ${(errors?.password) ? 'border-errorColor focus:border-errorColor shadow-inputBsError' : 'border-borderColor focus:border-focusColor focus:shadow-inputBs'} rounded-full px-[18px] py-[12px] placeholder:text-placehColor font-dm-sans-regular placeholder:text-[14px] text-[15px] text-${errors?.password ? 'errorColor' : 'gray-801'}`}
                        />
                        <button
                          type="button"
                          className="absolute top-0 right-0 h-full px-3 flex items-center cursorpointer-green"
                          onClick={togglePasswordVisibility}
                        >
                          {showPassword ? (
                            <svg width="18" height="18" viewBox="0 0 32 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14.1144 4.63848C14.724 4.54835 15.3529 4.5 16.0006 4.5C23.6581 4.5 28.6829 11.2573 30.371 13.9302C30.5754 14.2538 30.6775 14.4155 30.7347 14.665C30.7776 14.8524 30.7776 15.148 30.7346 15.3354C30.6774 15.5849 30.5745 15.7477 30.3688 16.0734C29.919 16.7852 29.2333 17.7857 28.3247 18.8707M8.08648 7.07256C4.84337 9.27255 2.64168 12.3291 1.63166 13.9279C1.42643 14.2528 1.32381 14.4152 1.26661 14.6647C1.22365 14.8521 1.22363 15.1477 1.26657 15.335C1.32374 15.5845 1.4259 15.7463 1.6302 16.0698C3.31831 18.7427 8.34312 25.5 16.0006 25.5C19.0882 25.5 21.7478 24.4014 23.9332 22.9149M2.50062 1.5L29.5006 28.5M12.8186 11.818C12.0043 12.6324 11.5006 13.7574 11.5006 15C11.5006 17.4853 13.5153 19.5 16.0006 19.5C17.2433 19.5 18.3683 18.9963 19.1826 18.182" stroke="#1D2939" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>                            
                          ) : (
                            <svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path fillRule="evenodd" clipRule="evenodd" d="M1.60556 7C1.68752 7.14165 1.79619 7.32216 1.93081 7.53061C2.27658 8.06598 2.78862 8.77795 3.4534 9.48704C4.79664 10.9198 6.67463 12.25 9 12.25C11.3254 12.25 13.2034 10.9198 14.5466 9.48704C15.2114 8.77795 15.7234 8.06598 16.0692 7.53061C16.2038 7.32216 16.3125 7.14165 16.3944 7C16.3125 6.85835 16.2038 6.67784 16.0692 6.46939C15.7234 5.93402 15.2114 5.22205 14.5466 4.51296C13.2034 3.08017 11.3254 1.75 9 1.75C6.67463 1.75 4.79664 3.08017 3.4534 4.51296C2.78862 5.22205 2.27658 5.93402 1.93081 6.46939C1.79619 6.67784 1.68752 6.85835 1.60556 7ZM17.25 7C17.9208 6.66459 17.9207 6.66434 17.9206 6.66406L17.9193 6.66165L17.9168 6.65653L17.9082 6.63987C17.9011 6.62596 17.891 6.60648 17.8779 6.58183C17.8518 6.53252 17.814 6.46242 17.7645 6.37449C17.6657 6.19873 17.5201 5.95114 17.3292 5.65561C16.9485 5.06598 16.3824 4.27795 15.6409 3.48704C14.1716 1.91983 11.9246 0.25 9 0.25C6.07537 0.25 3.82836 1.91983 2.3591 3.48704C1.61763 4.27795 1.05155 5.06598 0.670752 5.65561C0.479888 5.95114 0.334344 6.19873 0.235479 6.37449C0.186018 6.46242 0.148155 6.53252 0.122065 6.58183C0.109018 6.60648 0.0989064 6.62596 0.0917535 6.63987L0.0832425 6.65653L0.0806542 6.66165L0.0797776 6.6634C0.0796397 6.66367 0.0791796 6.66459 0.75 7L0.0791796 6.66459C-0.0263932 6.87574 -0.0263932 7.12426 0.0791796 7.33541L0.75 7C0.0791796 7.33541 0.0790418 7.33513 0.0791796 7.33541L0.0806542 7.33835L0.0832425 7.34347L0.0917535 7.36013C0.0989064 7.37405 0.109018 7.39352 0.122065 7.41817C0.148155 7.46748 0.186018 7.53758 0.235479 7.62551C0.334344 7.80127 0.479888 8.04886 0.670752 8.34439C1.05155 8.93402 1.61763 9.72205 2.3591 10.513C3.82836 12.0802 6.07537 13.75 9 13.75C11.9246 13.75 14.1716 12.0802 15.6409 10.513C16.3824 9.72205 16.9485 8.93402 17.3292 8.34439C17.5201 8.04886 17.6657 7.80127 17.7645 7.62551C17.814 7.53758 17.8518 7.46748 17.8779 7.41817C17.891 7.39352 17.9011 7.37405 17.9082 7.36013L17.9168 7.34347L17.9193 7.33835L17.9202 7.3366C17.9204 7.33633 17.9208 7.33541 17.25 7ZM17.25 7L17.9208 7.33541C18.0264 7.12426 18.0261 6.87521 17.9206 6.66406L17.25 7Z" fill="#37363B"/>
                              <path fillRule="evenodd" clipRule="evenodd" d="M9 5.5C8.17157 5.5 7.5 6.17157 7.5 7C7.5 7.82843 8.17157 8.5 9 8.5C9.82843 8.5 10.5 7.82843 10.5 7C10.5 6.17157 9.82843 5.5 9 5.5ZM6 7C6 5.34315 7.34315 4 9 4C10.6569 4 12 5.34315 12 7C12 8.65685 10.6569 10 9 10C7.34315 10 6 8.65685 6 7Z" fill="#37363B"/>
                            </svg>                            
                          )}
                        </button>
                      </div>
                      {(errors?.password && getValues('password')?.length > 0) &&<span className="text-red-400 text-sm">{t('signup.passwordValidation1')}</span>}
                    </div>
                    <div className="flex flex-col gap-2 items-start justify-start w-full">
                      <Text
                      className="text-gray-901 font-dm-sans-medium text-base leading-[26px] text-left w-auto"
                      >
                        {t('resetPassword.reenterPassword')}
                      </Text>
                      <div className={`relative w-full`}>
                      <input
                      {...register("confirmPassword", {
                        required: {
                          value : true
                        },
                        validate: val => {
                          if (watch('password') !== val) {
                            return t('resetPassword.notMatch');
                          }
                        },
                      })}
            
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfPassword ? "text" : "password"}
                      placeholder={t('resetPassword.confirmPassword')}
                      className={`${!showConfPassword ? 'tracking-[0.32em]' : ''} placeholder:tracking-normal bg-white w-full border border-solid ${(errors?.confirmPassword) ? 'border-errorColor focus:border-errorColor shadow-inputBsError ' : 'border-borderColor focus:border-focusColor focus:shadow-inputBs'} rounded-full px-[18px] py-[12px] placeholder-text-placehColor font-dm-sans-regular placeholder:text-[14px] text-[15px] text-${errors?.confirmPassword ? 'errorColor' : 'gray-801'}`}
                      ></input>
                      <button
                          type="button"
                          className="absolute top-0 right-0 h-full px-3 flex items-center cursorpointer-green"
                          onClick={toggleConfPasswordVisibility}
                        >
                          {showConfPassword ? (
                            <svg width="18" height="18" viewBox="0 0 32 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14.1144 4.63848C14.724 4.54835 15.3529 4.5 16.0006 4.5C23.6581 4.5 28.6829 11.2573 30.371 13.9302C30.5754 14.2538 30.6775 14.4155 30.7347 14.665C30.7776 14.8524 30.7776 15.148 30.7346 15.3354C30.6774 15.5849 30.5745 15.7477 30.3688 16.0734C29.919 16.7852 29.2333 17.7857 28.3247 18.8707M8.08648 7.07256C4.84337 9.27255 2.64168 12.3291 1.63166 13.9279C1.42643 14.2528 1.32381 14.4152 1.26661 14.6647C1.22365 14.8521 1.22363 15.1477 1.26657 15.335C1.32374 15.5845 1.4259 15.7463 1.6302 16.0698C3.31831 18.7427 8.34312 25.5 16.0006 25.5C19.0882 25.5 21.7478 24.4014 23.9332 22.9149M2.50062 1.5L29.5006 28.5M12.8186 11.818C12.0043 12.6324 11.5006 13.7574 11.5006 15C11.5006 17.4853 13.5153 19.5 16.0006 19.5C17.2433 19.5 18.3683 18.9963 19.1826 18.182" stroke="#1D2939" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            ) : (
                            <svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path fillRule="evenodd" clipRule="evenodd" d="M1.60556 7C1.68752 7.14165 1.79619 7.32216 1.93081 7.53061C2.27658 8.06598 2.78862 8.77795 3.4534 9.48704C4.79664 10.9198 6.67463 12.25 9 12.25C11.3254 12.25 13.2034 10.9198 14.5466 9.48704C15.2114 8.77795 15.7234 8.06598 16.0692 7.53061C16.2038 7.32216 16.3125 7.14165 16.3944 7C16.3125 6.85835 16.2038 6.67784 16.0692 6.46939C15.7234 5.93402 15.2114 5.22205 14.5466 4.51296C13.2034 3.08017 11.3254 1.75 9 1.75C6.67463 1.75 4.79664 3.08017 3.4534 4.51296C2.78862 5.22205 2.27658 5.93402 1.93081 6.46939C1.79619 6.67784 1.68752 6.85835 1.60556 7ZM17.25 7C17.9208 6.66459 17.9207 6.66434 17.9206 6.66406L17.9193 6.66165L17.9168 6.65653L17.9082 6.63987C17.9011 6.62596 17.891 6.60648 17.8779 6.58183C17.8518 6.53252 17.814 6.46242 17.7645 6.37449C17.6657 6.19873 17.5201 5.95114 17.3292 5.65561C16.9485 5.06598 16.3824 4.27795 15.6409 3.48704C14.1716 1.91983 11.9246 0.25 9 0.25C6.07537 0.25 3.82836 1.91983 2.3591 3.48704C1.61763 4.27795 1.05155 5.06598 0.670752 5.65561C0.479888 5.95114 0.334344 6.19873 0.235479 6.37449C0.186018 6.46242 0.148155 6.53252 0.122065 6.58183C0.109018 6.60648 0.0989064 6.62596 0.0917535 6.63987L0.0832425 6.65653L0.0806542 6.66165L0.0797776 6.6634C0.0796397 6.66367 0.0791796 6.66459 0.75 7L0.0791796 6.66459C-0.0263932 6.87574 -0.0263932 7.12426 0.0791796 7.33541L0.75 7C0.0791796 7.33541 0.0790418 7.33513 0.0791796 7.33541L0.0806542 7.33835L0.0832425 7.34347L0.0917535 7.36013C0.0989064 7.37405 0.109018 7.39352 0.122065 7.41817C0.148155 7.46748 0.186018 7.53758 0.235479 7.62551C0.334344 7.80127 0.479888 8.04886 0.670752 8.34439C1.05155 8.93402 1.61763 9.72205 2.3591 10.513C3.82836 12.0802 6.07537 13.75 9 13.75C11.9246 13.75 14.1716 12.0802 15.6409 10.513C16.3824 9.72205 16.9485 8.93402 17.3292 8.34439C17.5201 8.04886 17.6657 7.80127 17.7645 7.62551C17.814 7.53758 17.8518 7.46748 17.8779 7.41817C17.891 7.39352 17.9011 7.37405 17.9082 7.36013L17.9168 7.34347L17.9193 7.33835L17.9202 7.3366C17.9204 7.33633 17.9208 7.33541 17.25 7ZM17.25 7L17.9208 7.33541C18.0264 7.12426 18.0261 6.87521 17.9206 6.66406L17.25 7Z" fill="#37363B"/>
                              <path fillRule="evenodd" clipRule="evenodd" d="M9 5.5C8.17157 5.5 7.5 6.17157 7.5 7C7.5 7.82843 8.17157 8.5 9 8.5C9.82843 8.5 10.5 7.82843 10.5 7C10.5 6.17157 9.82843 5.5 9 5.5ZM6 7C6 5.34315 7.34315 4 9 4C10.6569 4 12 5.34315 12 7C12 8.65685 10.6569 10 9 10C7.34315 10 6 8.65685 6 7Z" fill="#37363B"/>
                            </svg>                            
                          )}
                      </button>
                    </div>
                    {(errors?.confirmPassword && getValues('confirmPassword')?.length > 0) &&<span className="text-red-400 text-sm">{errors?.confirmPassword?.message}</span>}
                    </div>
                  </div>
                  <div className="flex flex-col gap-4 items-center justify-start w-full">
                    <div className={` my-3 flex flex-row gap-6 h-[52px] md:h-auto items-center justify-center py-[14px] rounded-[26px] w-full cursorpointer ${isLoading ? 'bg-greenbtnhoverbg' : 'bg-teal-A700 hover:bg-greenbtnhoverbg  hover:svg-translate'}`} 
                      onClick={()=> onButtonClick(formButtonRef)}>
                        <button
                        ref={formButtonRef}
                          type="submit"
                          className={`text-base leading-[20.83px] text-white-A700 font-dm-sans-medium w-auto ${isLoading ? 'disabled' : ''}`}
                        >
                          {isLoading? t("all.sending")  : t('resetPassword.submit')}
                        </button>
                        {isLoading ? 
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                          <path d="M10.4995 13.5002L20.9995 3.00017M10.6271 13.8282L13.2552 20.5862C13.4867 21.1816 13.6025 21.4793 13.7693 21.5662C13.9139 21.6415 14.0862 21.6416 14.2308 21.5664C14.3977 21.4797 14.5139 21.1822 14.7461 20.5871L21.3364 3.69937C21.5461 3.16219 21.6509 2.8936 21.5935 2.72197C21.5437 2.57292 21.4268 2.45596 21.2777 2.40616C21.1061 2.34883 20.8375 2.45364 20.3003 2.66327L3.41258 9.25361C2.8175 9.48584 2.51997 9.60195 2.43326 9.76886C2.35809 9.91354 2.35819 10.0858 2.43353 10.2304C2.52043 10.3972 2.81811 10.513 3.41345 10.7445L10.1715 13.3726C10.2923 13.4196 10.3527 13.4431 10.4036 13.4794C10.4487 13.5115 10.4881 13.551 10.5203 13.5961C10.5566 13.647 10.5801 13.7074 10.6271 13.8282Z" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        :
                        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-transform transform">
                            <path d="M11 15L15 11M15 11L11 7M15 11H7M21 11C21 16.5228 16.5228 21 11 21C5.47715 21 1 16.5228 1 11C1 5.47715 5.47715 1 11 1C16.5228 1 21 5.47715 21 11Z" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        }
                    </div>
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
                </form>
              </div>
            </div>
          </div>
        </>
      );
}