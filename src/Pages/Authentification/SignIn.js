import React, { useEffect, useState , useRef } from 'react'
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom';
import { LoginUser } from '../../Redux/auth/authAction';
import { useNavigate , Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next';
import { Text } from '../../Components/Text';
import { Button } from '../../Components/Button';
import logo from '../../Media/img_logo2.svg';
import googleLogo  from '../../Media/img_flatcoloriconsgoogle.svg';
import faceBookLogo from '../../Media/img_logosfacebook.svg';
import linkLogo from '../../Media/img_link.svg';
import LoginModal from '../../Components/Modals/LoginModal';
import EmailExistModalOrConfirmation from '../../Components/Modals/EmailExistModalOrConfirmation';
import { authApi } from '../../Services/Auth';
import { setCredentials } from '../../Redux/auth/authSlice';
import axios from 'axios';
import emailError from '../../Media/emailError.svg';
import Cookies from "js-cookie";
import { languages } from '../../data/tablesData';
import HelmetWrapper from '../../Components/common/HelmetWrapper';


export default function SignIn() {
  const { t, i18n } = useTranslation();
  const [searchParams] = useSearchParams();
  const [errorSocial, seterrorSocial] = useState(searchParams.get('error') ? searchParams.get('error')  :null)
  const [auth, setAuth] = useState(searchParams.get('auth') ? searchParams.get('auth')  :null)
  const { loading, userInfo, error } = useSelector((state) => state.auth)
  const {  userToken } = useSelector((state) => state.auth)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [isExistErrorModalOpen, setIsExistErrorModalOpen] = useState(false);
  const [Mount, setMount] = useState(true)
  const [showPassword, setShowPassword] = useState(false); 
  const dispatch = useDispatch()
  const [getUserDetails , { data, isSuccess, isError, detailsError }] = authApi.endpoints.getUserDetails.useLazyQuery();
  const [loginError , setLoginError] = useState("");
  const [sendingOk , setSendingOk] = useState(false);
  const [scale, setScale] = useState(1);

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors }, setValue
  } = useForm();

  /**
   * Current Language
  */
  const currentLanguage = localStorage.getItem('language') || 'en';

  const formButtonRef = useRef();

  const onButtonClick = (inputref) => {
    inputref.current.click();
  };

  const navigate = useNavigate()

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openErrorModal = () => {
    setIsErrorModalOpen(true);
  };

  const closeErrorModal = () => {
    setIsErrorModalOpen(false);
    navigate('/SignIn');
  };

  const openExistErrorModal = () => {
    setIsExistErrorModalOpen(true);
  };

  const closeExistErrorModal = () => {
    setIsExistErrorModalOpen(false);
    navigate('/SignIn');
  };

  useEffect(() => {
    const calculateScale = () => {
      const currentHeight = window.innerHeight;
      
      // Hauteurs de référence pour différentes tailles d'écran
      const laptopHeight = 800; // Hauteur de référence pour 13 pouces
      const desktopHeight = 900; // Hauteur de référence pour les grands écrans
      
      let newScale = 1;
      
      if (currentHeight <= laptopHeight) {
        // Pour les écrans de 13 pouces et moins
        // Scale progressif de 0.85 à 0.95 pour les hauteurs entre 600px et 800px
        newScale = 0.9 + ((currentHeight - 600) / (laptopHeight - 600)) * 0.1;
        newScale = Math.max(0.9, Math.min(0.95, newScale));
      } else if (currentHeight <= desktopHeight) {
        // Pour les écrans entre 13 et 15 pouces
        // Scale progressif de 0.95 à 1 pour les hauteurs entre 800px et 900px
        newScale = 0.95 + ((currentHeight - laptopHeight) / (desktopHeight - laptopHeight)) * 0.05;
        newScale = Math.min(1, newScale);
      }
      // Pour les écrans plus grands que 15 pouces, garde scale = 1
      
      setScale(newScale);
    };

    calculateScale();
    window.addEventListener('resize', calculateScale);
    return () => window.removeEventListener('resize', calculateScale);
  }, []);


  useEffect(() => {
    if (Mount) { setMount(false) }
    else {
      if (userInfo) {  
        const newLanguage = languages.find(lang => lang.label === userInfo?.language)
        i18n.changeLanguage(newLanguage?.id);
        localStorage.setItem('language', newLanguage?.id);
        setTimeout(() =>{
          if(userInfo?.status === 'notVerified') {
            // toast.error("Account not Verified !")
            navigate('/VerificationEmail')
          }
          else {
            // toast.success("Logged In")
            if (!userInfo?.role) { 
              navigate('/ChooseRole') 
            }
            else{
              if (userInfo?.role?.toLowerCase() === "admin") { 
                navigate('/Dashboard_Admin') 
              }
              else if((userInfo?.role?.toLowerCase() === "member") && userInfo?.status?.toLowerCase() === "accepted") {
                navigate('/Dashboard')
              }
              else if(userInfo?.role?.toLowerCase() === "investor"  && userInfo?.status?.toLowerCase() === "accepted"){
                navigate('/Dashboard_Investor')
              }
              else if( userInfo?.role?.toLowerCase() === "partner" && userInfo?.status?.toLowerCase() === "accepted"){
                navigate('/Dashboard_Partner')
              }
              else if(userInfo?.status?.toLowerCase() === "pending") {
                navigate('/RedirectFromSignIn')
              }
              else{
                // navigate('/Dashboard')
                // openModal();
                navigate('/RedirectFromSignIn')
              }
            }
          }
        
        }, 2000)
      }
    }

  }, [userInfo, Mount])

  useEffect(() => {
    if(errorSocial) {
      if (errorSocial === "An account already exists with this email") {
        openErrorModal();
      } else if(errorSocial === "No account exists with this email") {
        openExistErrorModal();
      } 
      else if(errorSocial === "This account is not registered using this Social network") {
        openExistErrorModal();
      } 
      else {
        console.log(errorSocial || 'Oops, something went wrong!')
      }
    }
  }, [errorSocial]);

  useEffect(() => {
    if(error) {
      setSendingOk(false);
      if (error === "This email is registered through Google.") {
        setLoginError("Login RS error");
      } else if(error === "This email is registered through Linkedin.") {
        setLoginError("Login RS error");
      } 
      else if(error === "This email is registered through Facebook.") {
        setLoginError("Login RS error");
      } 
      else if(error === "This email is registered through another provider.") {
        setLoginError("Login RS error");
      }
      else {
        setLoginError("");
      }
    }
    else {
      setLoginError("");
    }
  }, [error]);

  useEffect(() => {
    // Récupérer les informations de connexion si elles sont stockées dans les cookies
    const savedEmail = Cookies.get("rememberedEmail");
    const savedPassword = Cookies.get("rememberedPassword");
    if (savedEmail && savedPassword) {
      setValue("email", savedEmail); 
      setValue("password", savedPassword);
      // setValue("rememberme" , true); 
    }
  }, [setValue]);


  const handleGoogleButtonClick = () => {
    window.location.href = `${process.env.REACT_APP_baseURL}/users/auth/google/signin`;
  };

  const handleLinkedinButtonClick = () => {
    window.location.href = `${process.env.REACT_APP_baseURL}/users/auth/linkedin/signin`;
  };

  const handleFacebookButtonClick = () => {
    window.location.href = `${process.env.REACT_APP_baseURL}/users/auth/facebook/signin`;
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  async function onSubmit(values) {
    setSendingOk(true);
    dispatch(LoginUser(values))
  }

  const handleRememberMe = (isChecked) => {
    if (isChecked) {
      localStorage.setItem('rememberMe', 'true');
    } else {
      localStorage.removeItem('rememberMe');
    }
  };
  
  const handleCheckboxChange = (event) => {
    const isChecked = event.target.checked;
    handleRememberMe(isChecked);
  };

console.log(scale)
  return (
    <>
      <HelmetWrapper 
        title={t('helmet.signIn.title')}
        description={t('helmet.signIn.description')}
        keywords={t('helmet.signIn.keywords')}
        canonical={`${process.env.REACT_APP_URL}/SignIn`}
      />
          <div  className=" bg-blue_gray-900_01 bg-[url(/public/images/Bg.png)] bg-no-repeat bg-center md:bg-right-top xl:bg-[size:cover,_auto]  2xl:bg-[size:cover,_contain] 2xl:bg-right-top flex flex-col items-center justify-start mx-auto min-h-screen overflow-y-auto w-full">
            <div style={{ 
              transform: `scale(${scale})`, 
              transformOrigin: 'center center',
              height: '100vh', // Pour compenser le scale
              width: '100vw',
            }}  className="flex-1 flex flex-col gap-8 md:gap-9 xl:gap-10 2xl:gap-11 items-center justify-center p-4 md:p-6 lg:p-8 xl:p-10 2xl:p-12">
              <div className="flex flex-col items-center justify-center w-full ">
                <Link to="https://digitalmorocco.net" target='_blank'><img
                    className="h-10 md:h-12 xl:h-[50px] 2xl:[54px] w-auto object-contain"
                    src={logo}
                    alt="logo"
                  />
                </Link>  
              </div>
              <div className="bg-white-A700 flex flex-col items-center justify-start px-6 py-8 rounded-xl shadow-formbs w-full max-w-[min(90%,400px)] sm:max-w-[440px] md:max-w-[480px] lg:max-w-[500px] xl:max-w-[520px]">
                <div className="flex flex-col gap-4 items-center justify-start w-full">
                  <Toaster />
                  <div className="self-stretch flex-col justify-start items-start gap-3 flex w-full">
                    <Button
                      className="h-[42px] w-full px-10 sm:px-20 py-3 border text-left border-gray-201 border-solid cursorpointer flex items-center  justify-center min-w-full text-[#37363B] hover:border-solid hover:border-[#00CDAE33]  hover:bg-[#00CDAE33] "
                      onClick={handleGoogleButtonClick}
                      leftIcon={
                        <img
                          className="h-6 w-6 mr-2.5"
                          src={googleLogo}
                          alt="flatcoloriconsg"
                        />
                      }
                      shape="round"
                    >
                      <div className={`${currentLanguage === 'fr'? 'w-[185px] ' : 'w-[143px]'} font-dm-sans-medium  leading-[18.23px] text-left text-[14px] tracking-[0.14px]`}>
                      {t('signin.googleSignIn')}
                      </div>
                    </Button>
                    <Button
                      className="h-[42px] w-full px-10 sm:px-20 py-3 text-left text-[#37363B] border border-gray-201 border-solid cursorpointer flex items-center  justify-center min-w-full hover:border-solid hover:border-[#00CDAE33]  hover:bg-[#00CDAE33]"
                      onClick={handleLinkedinButtonClick}
                      leftIcon={
                        <img
                          className="h-6 mr-2.5"
                          src={linkLogo}
                          alt="link"
                        />
                      }
                      shape="round"
                      >
                      <div className={`${currentLanguage === 'fr'? 'w-[185px] ' : 'w-[143px]'} font-dm-sans-medium leading-[normal] text-left text-sm tracking-[0.14px]`}>
                        {t('signin.linkedinSignIn')}
                      </div>
                    </Button>
                    {/* <Button
                      className="h-[42px] px-20 py-3 text-[#37363B] border border-gray-201 border-solid cursorpointer flex items-center justify-center  min-w-full hover:border-solid hover:border-[#00CDAE33]  hover:bg-[#00CDAE33]"
                      onClick={handleFacebookButtonClick}
                      leftIcon={
                        <img
                          className="h-6 mr-2.5"
                          src={faceBookLogo}
                          alt="logos:facebook"
                        />
                      }
                      shape="round"
                    >
                      <div className="w-[150px] font-dm-sans-medium leading-[normal] text-left text-sm tracking-[0.14px]">
                        {t('signin.facebookSignIn')}
                      </div>
                    </Button> */}
                  </div>
                  <div className="flex flex-row gap-2.5 items-center justify-start py-2.5 w-full">
                    <div className="flex-1 bg-gray-300 h-px" />
                    <Text
                      className="text-[15px] font-dm-sans-medium  text-gray700 tracking-[0.15px] w-auto"
                    >
                      {t('signup.or')}
                    </Text>
                    <div className="bg-gray-300 h-px flex-1" />
                  </div>
                  <div className="flex flex-col items-center justify-start w-full">
                    <form autoComplete='off' onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 items-center justify-start w-full">
                      <Text
                        className="text-base font-dm-sans-medium leading-[25.6px] text-gray-901 tracking-[0.16px] w-auto"
                      >
                        {t('signin.usingEmail')}
                      </Text>
                      <div className="flex flex-col gap-4 items-center justify-start w-full">
                          <div className="flex flex-col gap-2 items-start justify-start w-full">
                            <input
                              {...register("email", {
                                required: {
                                  value: true,
                                },
                                minLength: {
                                  value: 2,
                                },
                                maxLength: {
                                  value: 120,
                                },
                                pattern: {
                                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                },
                              })}
                              className={`bg-white-A700 transition-all duration-200 w-full border border-solid ${(errors?.email || (getValues('email')?.length > 0 && (error == 'Wrong email .' || loginError == "Login RS error") )) ? 'border-errorColor shadow-inputBsError ' : 'border-borderColor'} rounded-full px-[18px] py-[10px] ${(errors?.email || (getValues('email')?.length > 0 && (error == 'Wrong email .' || loginError == "Login RS error" )))? 'focus:border-errorColor' : 'focus:border-focusColor focus:shadow-inputBs'} placeholder:text-placehColor  placeholder:text-[14px] text-[15px] text-${(errors?.email || (getValues('email')?.length > 0 && (error == 'Wrong email .' || loginError == "Login RS error"))) ? 'errorColor' : 'gray-801'}`}
                              id="email"
                              name="email"
                              autoComplete='off'
                              placeholder={t('signin.emailPlaceholder')}
                            />
                          </div>
                          <div className="flex flex-col gap-2 items-start justify-start w-full">
                            <div className="relative w-full">
                              <input
                                {...register("password", {
                                  required: t('signup.passwordRequired'),
                                })}
                                id="password"
                                name="password"
                                autoComplete='off'
                                type={showPassword ? "text" : "password"}
                                placeholder={t('signup.enterPassword')}
                                style={{ appearance: 'none' }}
                                className={`${!showPassword ? 'tracking-[0.32em]' : ''} transition-all duration-200 placeholder:tracking-normal bg-white w-full  border border-solid ${(errors?.password || (getValues('password')?.length > 0 && (error == 'Wrong password !' || loginError == "Login RS error"))) ? 'border-errorColor shadow-inputBsError ' : 'border-borderColor'} rounded-full px-[18px] py-[10px] ${(errors?.password || (getValues('password')?.length > 0 && (error == 'Wrong password !' || loginError == "Login RS error"))) ? 'focus:border-errorColor' : 'focus:border-focusColor focus:shadow-inputBs'} placeholder-text-placehColor font-dm-sans-regular placeholder:text-[14px] text-[15px] text-${(errors?.password || (getValues('password')?.length > 0 && (error == 'Wrong password !' || loginError == "Login RS error" ) )) ? 'errorColor' : 'gray-801'}`}
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
                            {((errors?.password?.message && getValues('password')?.length > 0) || (errors?.email && getValues('email')?.length > 0) || (getValues('password')?.length > 0 && getValues('email')?.length > 0 && error)) &&<span className="text-errorColor text-sm ">{t('signup.emailPattern')}</span>}
                          </div>
                          <div className="flex flex-row gap-2.5 items-center justify-between  w-full">
                            <div className="flex flex-row flex-1 items-center justify-start m-auto w-auto">
                              <label htmlFor={`rememberme`} className="cursorpointer relative inline-flex items-center justify-center peer-checked:border-0 rounded-[3px] mr-2">
                                  <input
                                      {...register("rememberme" , {
                                          required: {value: false , message: t('signup.termsValidation')},
                                      })}
                                      id={`rememberme`}
                                      type="checkbox"
                                      name="rememberme"
                                      className={`peer appearance-none w-[16px] h-[16px] bg-white_A700 checked:bg-blue-600 checked:border-blue-600 border border-solid border-[#D0D5DD] rounded-[4px] focus:ring-blue-500 relative`}
                                  />
                                  <svg width="12" height="9" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 transition opacity-0 peer-checked:opacity-100">
                                      <path d="M5.10497 8.10407L5.08735 8.12169L0.6875 3.72185L2.12018 2.28917L5.10502 5.27402L9.87904 0.5L11.3117 1.93268L5.12264 8.12175L5.10497 8.10407Z" fill="white"/>
                                  </svg>
                              </label>
                              <label htmlFor={`rememberme`} className="text-[13px] mt-[0.5px] text-center font-dm-sans-regular leading-[16.93px] tracking-[0.01em] text-gray700 w-auto cursorpointer">
                                  {t('signin.rememberMe')}                       
                              </label>
                            </div>
                            <a className="cursorpointer text-[13px] hover:text-[#00CDAE] leading-[16.93px] font-dm-sans-regular text-deep_purple-A400 tracking-[0.01em] ">
                              <Text
                                className=" text-right"
                                onClick={() => navigate("/ForgotPassword")}
                              >
                                {t('signin.forgotPassword')}
                              </Text>
                            </a>
                          </div>
                          <div className="flex flex-col items-center justify-start w-full mt-[5px] ">
                            <button 
                              ref={formButtonRef}
                              type="submit"
                              onClick={() => onButtonClick(formButtonRef)}
                              className={`
                                my-3 flex flex-row gap-6 items-center justify-center 
                                h-[52px] md:h-auto py-[13px] px-4 rounded-[26px] w-full 
                                text-base font-dm-sans-medium text-white-A700
                                transition-colors cursorpointer transition-all duration-300
                                ${loading ? 'bg-greenbtnhoverbg cursor-not-allowed' : 'bg-teal-A700 hover:bg-greenbtnhoverbg active:bg-teal-700 hover:svg-translate '}
                              `}
                              disabled={loading}
                            >
                              <span>
                                {(loading || sendingOk) ? t("all.sending") : t("signin.signIn")}
                              </span>

                              {(loading || sendingOk) ? (
                                <svg 
                                  xmlns="http://www.w3.org/2000/svg" 
                                  width="24" 
                                  height="24" 
                                  viewBox="0 0 24 24" 
                                  fill="none"
                                  className="transition-transform"
                                >
                                  <path 
                                    d="M10.4995 13.5002L20.9995 3.00017M10.6271 13.8282L13.2552 20.5862C13.4867 21.1816 13.6025 21.4793 13.7693 21.5662C13.9139 21.6415 14.0862 21.6416 14.2308 21.5664C14.3977 21.4797 14.5139 21.1822 14.7461 20.5871L21.3364 3.69937C21.5461 3.16219 21.6509 2.8936 21.5935 2.72197C21.5437 2.57292 21.4268 2.45596 21.2777 2.40616C21.1061 2.34883 20.8375 2.45364 20.3003 2.66327L3.41258 9.25361C2.8175 9.48584 2.51997 9.60195 2.43326 9.76886C2.35809 9.91354 2.35819 10.0858 2.43353 10.2304C2.52043 10.3972 2.81811 10.513 3.41345 10.7445L10.1715 13.3726C10.2923 13.4196 10.3527 13.4431 10.4036 13.4794C10.4487 13.5115 10.4881 13.551 10.5203 13.5961C10.5566 13.647 10.5801 13.7074 10.6271 13.8282Z" 
                                    stroke="white" 
                                    strokeWidth="1.4" 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              ) : (
                                <svg 
                                  width="22" 
                                  height="22" 
                                  viewBox="0 0 22 22" 
                                  fill="none" 
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="transition-transform"
                                >
                                  <path 
                                    d="M11 15L15 11M15 11L11 7M15 11H7M21 11C21 16.5228 16.5228 21 11 21C5.47715 21 1 16.5228 1 11C1 5.47715 5.47715 1 11 1C16.5228 1 21 5.47715 21 11Z" 
                                    stroke="white" 
                                    strokeWidth="1.4" 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                  />
                                </svg>
                              )}
                            </button>
                            <div className="flex flex-row gap-2.5 items-center justify-start w-auto mt-5">
                                <Text
                                    className="font-dm-sans-medium text-[#37363B] text-sm w-auto"
                                >
                                    {t('signin.newToDigitalMorocco')}
                                </Text>
                                <Link
                                  to="/SignUp"
                                  className="text-[#482BE7] cursorpointer hover:text-[#00CDAE] text-sm w-auto sm:text-right font-dm-sans-bold"
                              >
                                  <Text className="font-dm-sans-bold">{t('signin.createAccount')}</Text>
                              </Link>
                            </div>
                          </div>
                        </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <LoginModal isOpen={isModalOpen}
              onRequestClose={closeModal}/>

          <EmailExistModalOrConfirmation isOpen={isErrorModalOpen}
                  onRequestClose={closeErrorModal}/>

          <EmailExistModalOrConfirmation isOpen={isExistErrorModalOpen}
            onRequestClose={closeExistErrorModal} content={
              <div className="flex flex-col gap-[38px] items-center justify-start w-full">
            <img
              className="h-[80px] w-[80px]"
              src={emailError}
              alt="successtick"
            />
            <div className="flex flex-col gap-5 items-center justify-start w-full">
              <Text
                className="leading-[26.00px] font-dm-sans-medium text-[18px] text-gray-801 text-center "
              >
                  {t('signin.emailRSNotFound')}
              </Text>
              <Text
                className="leading-[26.00px] font-dm-sans-regular  text-gray-801 text-center text-sm"
              >
                <>
                  {t('signin.emailRSNotFoundMsg')}
                </>
              </Text>
            </div>
          </div>
            } />
    </>
        
  )
}