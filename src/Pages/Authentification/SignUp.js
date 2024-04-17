import React, { useEffect, useState , useRef} from 'react'
import { useForm } from "react-hook-form";
import {Text } from '../../Components/Text'
import {Button } from '../../Components/Button'
import { FaCheck, FaTimes } from "react-icons/fa"; 
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from 'react-redux'
import { registerUser } from '../../Redux/auth/authAction';
import { setUserEmail } from '../../Redux/auth/authSlice';
import { useSendOTPMutation } from '../../Services/Auth';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { IoIosCheckmark } from "react-icons/io";

export default function SignUp() {
  const { t, i18n } = useTranslation();

  const { loading, userInfo, error } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const [Mount, setMount] = useState(true)
  const [sendOTP] = useSendOTPMutation();

  const {
    register,
    handleSubmit,
    reset, getValues,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate()
  const formButtonRef = useRef();


  const onButtonClick = (inputref) => {
    inputref.current.click();
  };

  useEffect(() => {
    if (Mount) { setMount(false) }
   else{ if (userInfo) {
      toast.success("Successfuly !")
      dispatch(setUserEmail(userInfo?.email));
      sendOTP(userInfo?.email)
      setTimeout(() => navigate('/VerificationCode'), 2500)
    }
    if (error) {
      toast.error(error)
    }}

  }, [loading])

  const password = getValues("password");
  const onSubmit = (data) => {
    console.log(data)
    dispatch(registerUser(data));
  };

  const handleGoogleButtonClick = () => {
    window.location.href = `${process.env.REACT_APP_baseURL}/users/auth/google`;
  };

  const handleLinkedinButtonClick = () => {
    window.location.href = `${process.env.REACT_APP_baseURL}/users/auth/linkedin`;
  };

  const handleFacebookButtonClick = () => {
    window.location.href = `${process.env.REACT_APP_baseURL}/users/auth/facebook`;
  };

  return (
    <>
    <div className="bg-gray-100 flex flex-col font-dmsans items-center justify-start mx-auto min-h-screen p-[42px] md:px-10 sm:px-5 w-full">
      <div className="flex flex-col gap-[42px] items-center justify-start mb-[63px] w-auto sm:w-full">
          <div className="flex flex-col items-center justify-center w-full">
            <img
              className="h-[50px] w-[183px]"
              src="images/img_logo.svg"
              alt="logo"
            />
          </div>
          <div className="bg-white-A700 gap-5 md:gap-10 flex flex-col items-center justify-start px-6 px-6 py-8 rounded-[12px] shadow-bs1 w-full max-w-[520px]">
          <div className="flex flex-col gap-4 items-center justify-start w-full">
          <Toaster />
              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 items-center justify-start w-full">
                <Text
                  className="text-base text-gray-900 tracking-[0.16px] w-auto"
                  size="txtDMSansMedium16"
                >
                  {t('signup.creatingAccount')}
                </Text>
                <div className="flex flex-col gap-4 items-center justify-start w-full">
                  <div className="flex flex-col gap-2 items-start justify-start w-full">
                    <Text
                      className="text-gray-900_01 text-sm w-auto"
                      size="txtDMSansRegular14Gray90001"
                    >
                      {t('signup.fullName')}
                    </Text>
                    <div className={`border border-solid w-full rounded-[21px] 
                    pb-2.5 pt-[10px] px-2.5 fill bg-white-A700 text-${errors?.displayName ? 'red-400' : ''}  
                    ${errors?.displayName ? 'border-red-500' : 'border-blue_gray-100'}`}>
                    <input
                      {...register("displayName", {
                        required: {
                          value: true,
                          message: t('signup.fullNameRequired'),
                        },
                        minLength: {
                          value: 3,
                          message: t('signup.fullNameShort'),
                        },
                        maxLength: {
                          value: 50,
                          message: t('signup.fullNameLong'),
                        },
                        
                      })}
                        id="displayName"
                      name="displayName"
                      placeholder={t('signup.enterFullName')}
                      className={`leading-[normal] md:h-auto p-0 placeholder:text-gray-500 sm:h-auto 
                      text-left text-sm tracking-[0.14px] w-full bg-transparent border-0 `}
                      type="text"
                    ></input>
                    </div>
                    {errors?.displayName?.message &&
                    <span className="text-red-400 text-sm">
                    {errors?.displayName?.message}
                   </span>
                    }
                  </div>
                  <div className="flex flex-col gap-2 items-start justify-start w-full">
                    <Text
                      className="text-gray-900_01 text-sm w-auto"
                      size="txtDMSansRegular14Gray90001"
                    >
                      {t('signup.emailAddress')}
                    </Text>
                    <div className={`border border-solid w-full rounded-[21px] 
                    pb-2.5 pt-[10px] px-2.5 fill bg-white-A700 text-${errors?.email ? 'red-400' : ''}  
                    ${errors?.email ? 'border-red-500' : 'border-blue_gray-100'}`}>
                    <input
                      {...register("email", {
                        required: {
                          value: true,
                          message: t('signup.emailRequired'),
                        },
                        minLength: {
                          value: 8,
                          message: t('signup.emailMinLength'),
                        },
                        maxLength: {
                          value: 120,
                          message: t('signup.emailMaxLength'),
                        },
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: t('signup.emailPattern'),
                        },
                      })}
                        id="email"
                        name="email"
                      placeholder={t('signup.enterEmailAddress')}
                      className="leading-[normal] md:h-auto p-0 placeholder:text-gray-500 sm:h-auto text-left text-sm tracking-[0.14px] w-full bg-transparent border-0"
                      type="text"
                    ></input>
                    </div>
                    {errors?.email?.message &&
                    <span className="text-red-400 text-sm">
                    {errors?.email?.message}
                   </span>
                    }
                  </div>
                  <div className="flex flex-col gap-3 items-end justify-start w-full">
                    <div className="flex flex-col gap-2 items-start justify-start w-full">
                      <Text
                        className="text-gray-900_01 text-sm w-auto"
                        size="txtDMSansRegular14Gray90001"
                      >
                        {t('signup.password')}
                      </Text>
                      <div className={`border border-solid w-full rounded-[21px] 
                    pb-2.5 pt-[10px] px-2.5 fill bg-white-A700 text-${errors?.password ? 'red-400' : ''}  
                    ${errors?.password ? 'border-red-500' : 'border-blue_gray-100'}`}>
                    <input
                      {...register("password", {
                        required: t('signup.passwordRequired'),
                        minLength: {
                          value: 8,
                          message: t('signup.passwordValidation'),
                        },
                        validate: {
                          hasUpperCase: v => /[A-Z]/.test(v) || t('signup.passwordValidation'),
                          hasLowerCase: v => /[a-z]/.test(v) || t('signup.passwordValidation'),
                          
                        }
                      })}
                        id="password"
                        name="password"
                        type="password"
                      placeholder={t('signup.enterPassword')}
                      className="leading-[normal] md:h-auto p-0 placeholder:text-gray-500 sm:h-auto text-left text-sm tracking-[0.14px] w-full bg-transparent border-0"
                    ></input>
                    </div>
                    {errors?.password?.message &&
                    <>
                        <span className=''>
                        <ul style={{ listStyle: "none", display: 'flex', paddingLeft: 0 }} className='items-center justify-between space-x-4' >
                          <li className={`text-gray-600 text-sm flex ${errors.password?.type === 'minLength' ? 'error' : 'valid'}`}>
                          <div className={`rounded-full flex items-center justify-center w-4 h-4 ${errors.password?.type === "minLength" ? "bg-gray-200" : "bg-green-500"}`}>
                            {errors.password?.type === "minLength" ? (
                              <FaCheck size={8} style={{ color: "white" }} className='text-sm' />
                            ) : (
                              <FaCheck size={8} style={{ color: "white" }} />
                            )}
                          </div>
                            <span className='ml-1'>
                              {t('signup.passwordMinLengthVal')}
                            </span>
                          </li>

                          <li className={`text-gray-600 text-sm flex ${errors.password?.type === "hasLowerCase" ? "error" : "valid"}`}>
                            <div className={`rounded-full flex items-center justify-center w-4 h-4 ${errors.password?.type === "hasLowerCase" ? "bg-gray-200" : "bg-green-500"}`}>
                              {errors.password?.type === "hasLowerCase" ? (
                                <FaCheck size={8} style={{ color: "white" }} />
                              ) : (
                                <FaCheck size={8} style={{ color: "white" }} />
                              )}
                            </div>
                            <span className='ml-1'>
                              {t('signup.passwordLowerCaseVal')}
                            </span>
                          </li>

                          <li className={`text-gray-600 text-sm flex ${errors.password?.type === "hasUpperCase" ? "error" : "valid"}`}>
                            <div className={`rounded-full flex items-center justify-center w-4 h-4 ${errors.password?.type === "hasUpperCase" ? "bg-gray-200" : "bg-green-500"}`}>
                              {errors.password?.type === "hasUpperCase" ? (
                                <FaCheck size={9} style={{ color: "white" }} />
                              ) : (
                                <FaCheck size={9} style={{ color: "white" }} />
                              )}
                            </div>
                            <span className='ml-1'>
                              {t('signup.passwordUpperCaseVal')}
                            </span>
                          </li>
                        </ul>
                        </span>
                        <span className="text-red-400 text-sm mt-1">
                          {errors?.password?.message}
                      </span>
                        </>
                    }
                    </div>
                  </div>
                  <div className="flex flex-col font-avenirnextltpro mt-4 mb-3 gap-2.5 items-start justify-start w-full">
                    <Text
                      className="leading-[140.00%] text-[13px] text-gray-700 w-full"
                      size="txtAvenirNextLTProRegular13Gray700"
                    >
                      {t('signup.accordance')}
                    </Text>
                    <div className="flex flex-row items-start justify-start m-auto w-full">
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
                          <IoIosCheckmark size={22} className="absolute text-white-A700 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 transition opacity-0 peer-checked:opacity-100"/>
                        </label>
                        
                        <Text
                          className="text-[13px] text-gray-700 w-auto"
                          size="txtAvenirNextLTProRegular13Gray700"
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
                  <div className="flex flex-col items-center justify-start w-full">
                  <div className="bg-teal-A700 flex flex-row gap-6 h-[52px] md:h-auto items-center justify-center sm:px-5 px-7 py-[13px] rounded-[26px] w-full cursor-pointer" 
                  onClick={()=> onButtonClick(formButtonRef)}>
                    <div className="flex flex-col items-center justify-center w-auto">
                      <button
                      ref={formButtonRef}
                        type="submit"
                        className="text-base text-white-A700 w-auto"
                        size="font-dmsans font-medium"
                      >
                        {t('signup.next')}
                      </button>
                    </div>
                    <img
                      className="h-6 w-6"
                      src="images/img_arrowright.svg"
                      alt="arrowright"
                    />
                  </div>
                  </div>
                </div>
              </form>
              <div className="flex sm:flex-row flex-row gap-2.5 items-center justify-start py-2.5 w-full">
                <div className="bg-gray-300 h-px w-[46%]" />
                <Text
                  className="text-[15px] text-gray-700 tracking-[0.15px] w-auto"
                  size="txtDMSansMedium15"
                >
                  {t('signup.or')}
                </Text>
                <div className="bg-gray-300 h-px w-[46%]" />
              </div>
              <div className="flex flex-col gap-3 items-center justify-start w-full">
                <Text
                  className="text-base text-gray-900 tracking-[0.16px] w-auto"
                  size="txtDMSansMedium16"
                >
                  {t('signup.registerSocial')}
                </Text>
                <div className="flex flex-col gap-3 items-center justify-start w-full">
                  <Button
                    className="common-pointer border border-gray-300 border-solid cursor-pointer flex items-center justify-center min-w-full"
                    onClick={handleGoogleButtonClick}
                    leftIcon={
                      <img
                        className="h-6 mr-2.5"
                        src="images/img_flatcoloriconsgoogle.svg"
                        alt="flat-color-icons:google"
                      />
                    }
                    shape="round"
                  >
                    <div className="font-medium leading-[normal] text-left text-sm tracking-[0.14px]">
                      {t('signup.googleSignUp')}
                    </div>
                  </Button>
                  <Button
                    className="border border-gray-300 border-solid cursor-pointer flex items-center justify-center w-full"
                    onClick={handleLinkedinButtonClick}
                    leftIcon={
                      <img
                        className="h-6 mr-2.5"
                        src="images/img_link.svg"
                        alt="link"
                      />
                    }
                    shape="round"
                  >
                    <div className="font-medium leading-[normal] text-left text-sm tracking-[0.14px]">
                      {t('signup.linkedinSignUp')}
                    </div>
                  </Button>
                  <Button
                    className="border border-gray-300 border-solid cursor-pointer flex items-center justify-center w-full"
                    onClick={handleFacebookButtonClick}
                    leftIcon={
                      <img
                        className="h-6 mr-2.5"
                        src="images/img_logosfacebook.svg"
                        alt="link"
                      />
                    }
                    shape="round"
                  >
                    <div className="font-medium leading-[normal] text-left text-sm tracking-[0.14px]">
                      {t('signup.facebookSignUp')}
                    </div>
                  </Button>
                  
                </div>
              </div>
              </div>
          </div>
          <div className="flex flex-row gap-2.5 items-center justify-start w-auto">
            <a
              href="javascript:"
              className="text-blue_gray-900_02 text-sm w-auto"
            >
              <Text size="txtDMSansMedium14">{t('signup.haveAccount')}</Text>
            </a>
            <a
              href="/SignIn"
              className="text-deep_purple-A400 text-sm w-auto"
            >
              <Text size="txtDMSansBold14">{t('signup.signIn')}</Text>
            </a>
          </div>
      </div>
    </div>
    </>

  )
}
