import React, { useEffect, useState , useRef } from 'react'
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from 'react-redux'
import { LoginUser } from '../../Redux/auth/authAction';
import { useNavigate , Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next';
import { Text } from '../../Components/Text';
import { Button } from '../../Components/Button';
import { IoIosCheckmark } from "react-icons/io";


export default function SignIn() {
  const { t, i18n } = useTranslation();

  const { loading, userInfo, error } = useSelector((state) => state.auth)
  const [Mount, setMount] = useState(true)
  const dispatch = useDispatch()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const formButtonRef = useRef();

  const onButtonClick = (inputref) => {
    inputref.current.click();
  };

  const navigate = useNavigate()

  useEffect(() => {
    if (Mount) { setMount(false) }
    else {
      if (userInfo) {
        toast.success("Logged In")
        setTimeout(() =>{
        
        if (!userInfo?.role) { navigate('/ChooseRole') }
        else{
          navigate('/Dashboard')
        }
        }, 2000)
      }
      if (error) {
        toast.error(error)
      }
    }

  }, [loading])

  const handleGoogleButtonClick = () => {
    window.location.href = `${process.env.REACT_APP_baseURL}/users/auth/google`;
  };

  const handleLinkedinButtonClick = () => {
    window.location.href = `${process.env.REACT_APP_baseURL}/users/auth/linkedin`;
  };

  const handleFacebookButtonClick = () => {
    window.location.href = `${process.env.REACT_APP_baseURL}/users/auth/facebook`;
  };



  async function onSubmit(values) {
    dispatch(LoginUser(values))
  }


  return (
    <>
    <div className="bg-blue_gray-900_01 bg-[url(/public/images/Bg.png)] bg-no-repeat bg-center  md:bg-right md:bg-right-top xl:bg-[size:cover,_auto]  2xl:bg-[size:cover,_contain] 2xl:bg-right-top flex flex-col font-dmsans items-center justify-start mx-auto p-[42px] md:px-10 sm:px-5 min-h-screen w-full">
      <div className="flex flex-col gap-[42px] items-center justify-start mb-[63px] w-auto w-full">
          <div className="flex flex-col items-center justify-center w-full">
          <Link to="/"><img
              className="h-[50px] w-[183px]"
              src="images/img_logo2.svg"
              alt="logo"
            />
      </Link>
            
          </div>
          <div className="bg-white-A700 gap-5 md:gap-10 flex flex-col items-center justify-start px-6 px-6 py-8 rounded-[12px] shadow-bs1 w-full max-w-[520px]">
          <div className="flex flex-col gap-4 items-center justify-start w-full">
          <Toaster />
            <div className="flex flex-col gap-3 items-start justify-start w-full">
              
              <Button
                className="border border-gray-300 border-solid cursor-pointer flex items-center justify-center min-w-full"
                onClick={handleGoogleButtonClick}
                leftIcon={
                  <img
                    className="h-6 w-6 mr-2.5"
                    src="images/img_flatcoloriconsgoogle.svg"
                    alt="flatcoloriconsg"
                  />
                }
                shape="round"
              >
                <div className="font-medium leading-[normal] text-left text-sm tracking-[0.14px]">
                {t('signin.googleSignIn')}
                </div>
              </Button>
              <Button
                className="border border-gray-300 border-solid cursor-pointer flex items-center justify-center min-w-full"
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
                  {t('signin.linkedinSignIn')}
                </div>
              </Button>
              <Button
                className="border border-gray-300 border-solid cursor-pointer flex items-center justify-center min-w-full"
                onClick={handleFacebookButtonClick}
                leftIcon={
                  <img
                    className="h-6 mr-2.5"
                    src="images/img_logosfacebook.svg"
                    alt="logos:facebook"
                  />
                }
                shape="round"
              >
                <div className="font-medium leading-[normal] text-left text-sm tracking-[0.14px]">
                  {t('signin.facebookSignIn')}
                </div>
              </Button>
            </div>
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
            <div className="flex flex-col gap-4 items-center justify-start w-full">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 items-center justify-start w-full">
              <Text
                className="text-base text-gray-900 tracking-[0.16px] w-auto"
                size="txtDMSansMedium16"
              >
                {t('signin.usingEmail')}
              </Text>
              <div className="flex flex-col gap-4 items-center justify-start w-full">
                  <div className="flex flex-col gap-2 items-start justify-start w-full">
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
                      placeholder={t('signin.emailPlaceholder')}
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
                      <div className={`border border-solid w-full rounded-[21px] 
                    pb-2.5 pt-[10px] px-2.5 fill bg-white-A700 text-${errors?.password ? 'red-400' : ''}  
                    ${errors?.password ? 'border-red-500' : 'border-blue_gray-100'}`}>
                    <input
                      {...register("password", {
                        required: t('signup.passwordRequired'),
                        minLength: {
                          value: 8,
                          message: t('signup.passwordMinLength'),
                        },
                      })}
                        id="password"
                        name="password"
                        type="password"
                      placeholder={t('signin.passwordPlaceholder')}
                      className="leading-[normal] md:h-auto p-0 placeholder:text-gray-500 sm:h-auto text-left text-sm tracking-[0.14px] w-full bg-transparent border-0"
                    ></input>
                    </div>
                    {errors?.password?.message &&
                    <span className="text-red-400 text-sm">
                    {errors?.password?.message}
                   </span>
                    }
                    </div>
                  </div>
                  <div className="flex flex-row gap-2.5 items-center  w-full">
                      <div className="flex flex-row flex-1 items-center justify-start m-auto w-auto">
                        <label htmlFor={`rememberme`} className="cursor-pointer relative inline-flex items-center justify-center peer-checked:border-0 rounded-[3px] mr-2">
                          <input
                          {...register("rememberme" , {
                            required: {value: false , message: t('signup.termsValidation')},
                          }
                          )}
                            id={`rememberme`}
                            type="checkbox"
                            name="rememberme"
                            className={`peer appearance-none w-4 h-4 bg-white_A700 checked:bg-blue-600 checked:border-blue-600 border border-solid border-gray-300 rounded-[3px] focus:ring-blue-500 relative`}
                          />
                          <IoIosCheckmark size={22} className="absolute text-white-A700 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 transition opacity-0 peer-checked:opacity-100"/>
                        </label>
                        
                        <Text
                          className="text-[13px] text-gray-700 w-auto"
                          size="txtAvenirNextLTProRegular13Gray700"
                        >
                          {t('signin.rememberMe')}                       
                        </Text>
                    </div>
                    <a className="text-[13px] text-deep_purple-A400 tracking-[0.13px]  w-1/3 justify-end">
                      <Text
                        className="common-pointer"
                        size="txtDMSansRegular13"
                        onClick={() => navigate("/ForgotPassword")}
                      >
                        {t('signin.forgotPassword')}
                      </Text>
                    </a>
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
                            {t('signin.signIn')}
                        </button>
                      </div>
                        <img
                        className="h-6 w-6"
                        src="images/img_arrowright.svg"
                        alt="arrowright"
                        />
                    </div>
                    <div className="flex flex-row gap-2.5 items-center justify-start w-auto mt-5">
                        <Text
                            className="text-blue_gray-900_02 text-sm w-auto"
                            size="txtDMSansMedium14"
                        >
                            {t('signin.newToDigitalMorocco')}
                        </Text>
                        <a
                            href="/SignUp"
                            className="text-deep_purple-A400 text-sm w-auto"
                        >
                            <Text size="txtDMSansBold14">{t('signin.createAccount')} </Text>
                        </a>
                    </div>
                  </div>
                </div>
              </form>
            </div>
        </div>

        </div>
        </div>
    </div>
    </>
  )
}