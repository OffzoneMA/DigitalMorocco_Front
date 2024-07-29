import React, { useEffect, useState , useRef} from 'react'
import { useForm } from "react-hook-form";
import {Text } from '../../Components/Text'
import {Button } from '../../Components/Button'
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from 'react-redux'
import { registerUser } from '../../Redux/auth/authAction';
import { setUserEmail } from '../../Redux/auth/authSlice';
import { useSendOTPMutation } from '../../Services/Auth';
import { useNavigate , Link , useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import logo from '../../Media/img_logo.svg';
import googleLogo  from '../../Media/img_flatcoloriconsgoogle.svg';
import faceBookLogo from '../../Media/img_logosfacebook.svg';
import linkLogo from '../../Media/img_link.svg';
import { authApi } from '../../Services/Auth';
import { useGetUserByEmailQuery } from '../../Services/Auth';
import EmailExistModalOrConfirmation from '../../Components/EmailExistModalOrConfirmation';
import { languages } from '../../data/tablesData';


export default function SignUp() {
  const { t, i18n } = useTranslation();
  const [searchParams] = useSearchParams();
  const { loading, userInfo, error } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const [user , setUser] = useState(userInfo);
  const [errorSocial, seterrorSocial] = useState(searchParams.get('error') ? searchParams.get('error')  :null)
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [Mount, setMount] = useState(true)
  const [sendOTP] = useSendOTPMutation();
  const [trigger, { data, isLoading, status , isSuccess , error: triggerError }] = authApi.endpoints.sendEmailVerification.useLazyQuery()
  const [userTrigger ,{ data: userData, error: userError, isLoading: userFetching , isSuccess: userSucces} ]  = authApi.endpoints.getUserByEmail.useLazyQuery()
  const [showPassword, setShowPassword] = useState(false); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [socialType ,  setSocialType] = useState('');
  const [sending , setSending] = useState(false);

  /**
     * Language
     */
  const currentLanguage = localStorage.getItem('language') || 'en'; 

  const {
    register,
    handleSubmit,
    reset, getValues,
    watch,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate()
  const formButtonRef = useRef();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const onButtonClick = (inputref) => {
    inputref.current.click();
    setSending(true);
  };

  // useEffect(() => {
  //   if (user) {
  //     trigger({ userId: userInfo?._id, lang: localStorage.getItem('language')}).then((payload) => {
  //       if (payload?.isSuccess) {
  //         setSending(false);
  //         setTimeout(() => navigate('/VerificationEmail'), 2500);
  //         setUser(null);
  //       } else {
  //         console.error('Une erreur s\'est produite lors de l\'envoi de l\'email de vérification:', triggerError);
  //       }
  //   }
  //   )
  //   }
  // } ,[user])

  useEffect(() => {
    if (Mount) { setMount(false) }
   else{ if (userInfo) {
      // toast.success("Successfuly !")
      dispatch(setUserEmail(userInfo?.email));
      setUser(userInfo)
      localStorage.setItem('userEmail', userInfo?.email);
      setTimeout(() => navigate('/VerificationEmail'), 1000);
    //   trigger({ userId: userInfo?._id, lang: localStorage.getItem('language')}).then((payload) => {
    //     if (payload?.isSuccess) {
    //       setSending(false);
    //       setTimeout(() => navigate('/VerificationEmail'), 2500);
    //       setUser(null);
    //     } else {
    //       console.error('Une erreur s\'est produite lors de l\'envoi de l\'email de vérification:', triggerError);
    //     }
    //  }
    // )
    }
  }

  }, [userInfo])

  const getLanguageLabelById = (id) => {
    const language = languages.find(lang => lang.id === id);
    return language ? language.label : null;
  };

  const password = watch("password", "");

  const validatePassword = (value) => {
    return {
      hasUpperCase: /[A-Z]/.test(value),
      hasLowerCase: /[a-z]/.test(value),
      hasSpecialChar: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(value),
      hasDigit: /\d/.test(value),
      minLength: value.length >= 8,
    };
  };

  const passwordValidation = validatePassword(password);

  const getPasswordErrorMessage = () => {
    const errorMessage = [];

    if (!passwordValidation.minLength) {
        errorMessage.push(t('signup.passwordMinLength'));
    }

    if (!passwordValidation.hasLowerCase) {
        errorMessage.push(t('signup.passwordLowerCase'));
    }

    if (!passwordValidation.hasUpperCase) {
        errorMessage.push(t('signup.passwordUpperCase'));
    }

    if (!passwordValidation.hasSpecialChar) {
        errorMessage.push(t('signup.specialChar'));
    }

    let message = '';

    if (errorMessage.length === 1) {
        message = errorMessage[0];
    } else if (errorMessage.length === 2) {
        message = `${errorMessage[0]} et ${errorMessage[1]}`;
    } else if (errorMessage.length > 2) {
        const lastMessage = errorMessage.pop();
        message = `${errorMessage.join(', ')} et ${lastMessage}`;
    }

    return message;
};


const onSubmit = (data) => {
  const languageId = localStorage.getItem('language');
  
  const languageLabel = getLanguageLabelById(languageId);
  
  // If language label is found, add it to the data object
  if (languageLabel) {
    data.language = languageLabel;
  }

  userTrigger(data.email).then((payload)=> {
    if(payload?.isSuccess) {
      if (payload?.data) {
        openModal();
      } else {
        dispatch(registerUser(data));
      }
    }
    else {
      if(payload?.error?.status == 404) {
        dispatch(registerUser(data));
      }
    }
  });
};

  const socialSignUp = (type) => {
    setSocialType(type)
    navigate('/SocialSignUp', { state: { socialType: type } });
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const openErrorModal = () => {
    setIsErrorModalOpen(true);
  };

  const closeErrorModal = () => {
    setIsErrorModalOpen(false);
    navigate('/SignUp');
  };

  useEffect(() => {
    if(errorSocial) {
      if (errorSocial === "An account already exists with this email") {
        openErrorModal();
      } 
      else {
        // toast.error(errorSocial || 'Oops, something went wrong!')
      }
    }
  }, [error]);

  return (
    <>
    <div className="bg-gray-100 flex flex-col font-DmSans items-center justify-start mx-auto min-h-screen md:px-10 px-[12px] py-[30px] w-full">
        <div className="flex flex-col gap-[42px] items-center justify-start mb-[63px] w-auto sm:w-full">
          <div className="flex flex-col items-center justify-center w-full cursorpointer">
            <Link to="https://digitalmorocco.net" target='_blank'><img
                className="h-[50px] w-[183px]"
                src={logo}
                alt="logo"
              />
            </Link>  
          </div>
          <div className="bg-white-A700 shadow-formbs gap-5 md:gap-10 flex flex-col items-center justify-start px-6 py-8 rounded-[12px] w-full max-w-[520px]">
            <div className="flex flex-col gap-4 items-center justify-start w-full">
              <Toaster />
              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 items-center justify-start w-full">
                <Text
                className="text-base font-dm-sans-medium leading-[25.6px] text-gray-901 tracking-[0.16px] w-auto"
                >
                  {t('signup.creatingAccount')}
                </Text>
                <div className="flex flex-col gap-4 items-center justify-start w-full">
                  <div className="flex flex-col gap-2 items-start justify-start w-full">
                    <label
                      htmlFor='displayName'
                      className="text-gray-900_01 font-dm-sans-regular text-sm leading-[26px] text-left w-auto"
                    >
                      {t('signup.fullName')}
                    </label>
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
                      className={`bg-white w-full  border border-solid !focus:border !focus:border-solid ${errors?.displayName ? 'border-errorColor shadow-inputBsError' : 'border-borderColor'} rounded-full px-[18px] py-[10px] ${errors?.displayName ? ' focus:border-errorColor' : ' focus:border-focusColor focus:shadow-inputBs'} placeholder:text-placehColor font-dm-sans-regular placeholder:text-[14px] text-[15px] text-${errors?.displayName ? 'errorColor' : 'gray-801'}`}
                      type="text"
                    ></input>
                    {errors?.displayName?.message &&<span className="text-errorColor text-sm">{errors?.displayName?.message}</span>}
                  </div>
                  <div className="flex flex-col gap-2 items-start justify-start w-full">
                    <label
                      htmlFor='email'
                      className="text-gray-900_01 font-dm-sans-regular text-sm leading-[26px] text-left w-auto"
                      >
                      {t('signup.emailAddress')}
                    </label>
                    <input
                      {...register("email", {
                        required: {
                          value: true,
                        },
                        minLength: {
                          value: 2,
                          // message: t('signup.emailMinLength'),
                        },
                        maxLength: {
                          value: 120,
                          // message: t('signup.emailMaxLength'),
                        },
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: t('signup.emailPattern'),
                        },
                      })}
                        id="email"
                        name="email"
                      placeholder={t('signup.enterEmailAddress')}
                      className={`bg-white w-full border border-solid !focus:border !focus:border-solid ${errors?.email ? 'border-errorColor shadow-inputBsError' : 'border-borderColor'} rounded-full px-[18px] py-[10px] ${errors?.email ? ' focus:border-errorColor' : ' focus:border-focusColor focus:shadow-inputBs'} placeholder:text-placehColor font-dm-sans-regular placeholder:text-[14px] text-[15px] text-${errors?.email ? 'errorColor' : 'gray-801'}`}
                      type="text"
                    ></input>
                    {(errors?.email?.message && getValues('email') !=='') &&<span className="text-errorColor font-dm-sans-regular text-sm">{errors?.email?.message}</span>}
                  </div>
                  <div className="flex flex-col gap-3 items-end justify-start w-full">
                    <div className="flex flex-col gap-2 items-start justify-start w-full">
                      <label
                      htmlFor='password'
                      className="text-gray-900_01 font-dm-sans-regular text-sm leading-[26px] text-left w-auto"
                      >
                        {t('signup.password')}
                      </label>
                      <div className="relative w-full">
                        <input
                          {...register("password", {
                            validate: {
                              hasUpperCase: v => /[A-Z]/.test(v) ,
                              // message : t('signup.passwordUpperCaseVal')
                            },
                            validate: {
                              hasLowerCase: v => /[a-z]/.test(v),
                              // message : t('signup.passwordLowerCaseVal')
                            },
                            validate: {
                              hasSpecialChar:  v => /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(v),
                            },
                            validate: {
                              hasDigit:  v => /\d/.test(v),
                            },
                            minLength: {
                              value: 8,
                              message: t('signup.passwordMinLengthVal')
                            },
                            
                          })}
                          id="password"
                          name="password"
                          type={showPassword ? "text" : "password"}
                          placeholder={t('signup.enterPassword')}
                          style={{ appearance: 'none' }}
                          className={`${!showPassword ? 'tracking-[0.32em]' : ''} placeholder:tracking-normal bg-white w-full border border-solid ${errors?.password ? 'border-errorColor shadow-inputBsError ' : 'border-borderColor'} rounded-full px-[18px] py-[10px] ${errors?.password ? 'focus:border-errorColor' : 'focus:border-focusColor focus:shadow-inputBs'} placeholder-text-placehColor font-dm-sans-regular placeholder:text-[14px] text-[15px] text-${errors?.password ? 'errorColor' : 'gray-801'}`}
                        />
                        {getValues('password')?.length > 0 && 
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
                        }
                        
                      </div>
                      {(!errors?.password && getValues('password') =='' ) &&<span className="font-dm-sans-regular mt-1 text-xs leading-[15.62px] tracking-[0.01em] text-left text-[#555458]">{t('signup.passwordValidation')}</span>}

                    {(errors?.password || passwordValidation.minLength || passwordValidation.hasLowerCase || passwordValidation.hasUpperCase || passwordValidation.hasDigit) &&
                      <>
                        <span className=''>
                        <ul style={{ listStyle: "none", paddingLeft: 0 }} className='flex flex-wrap items-center gap-4 mt-1' >
                          <li className={`text-[#555458] items-center justify-start text-xs flex ${errors.password?.type === 'minLength' ? 'error' : 'valid'}`}>
                              {!passwordValidation.minLength  || getValues('password')==''  ? (
                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M6 0C2.6865 0 0 2.6865 0 6C0 9.3135 2.6865 12 6 12C9.3135 12 12 9.3135 12 6C12 2.6865 9.3135 0 6 0ZM5.07 8.76863L2.30925 6.0075L3.36975 4.947L5.06962 6.64762L8.676 3.04125L9.7365 4.10175L5.07 8.76863Z" fill="#D0D5DD"/>
                                </svg> 
                              ) : (
                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6 0C2.6865 0 0 2.6865 0 6C0 9.3135 2.6865 12 6 12C9.3135 12 12 9.3135 12 6C12 2.6865 9.3135 0 6 0ZM5.07 8.76863L2.30925 6.0075L3.36975 4.947L5.06962 6.64762L8.676 3.04125L9.7365 4.10175L5.07 8.76863Z" fill="#0EA472"/>
                                </svg>
                              )}
                            <span className='ml-1'>
                              {t('signup.passwordMinLengthVal')}
                            </span>
                          </li>
                          <li className={`text-[#555458] text-xs justify-start items-center flex ${errors.password?.type === "hasLowerCase" ? "error" : "valid"}`}>
                              {!passwordValidation.hasLowerCase  || getValues('password')==''? (
                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M6 0C2.6865 0 0 2.6865 0 6C0 9.3135 2.6865 12 6 12C9.3135 12 12 9.3135 12 6C12 2.6865 9.3135 0 6 0ZM5.07 8.76863L2.30925 6.0075L3.36975 4.947L5.06962 6.64762L8.676 3.04125L9.7365 4.10175L5.07 8.76863Z" fill="#D0D5DD"/>
                                </svg> 
                              ) : (
                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6 0C2.6865 0 0 2.6865 0 6C0 9.3135 2.6865 12 6 12C9.3135 12 12 9.3135 12 6C12 2.6865 9.3135 0 6 0ZM5.07 8.76863L2.30925 6.0075L3.36975 4.947L5.06962 6.64762L8.676 3.04125L9.7365 4.10175L5.07 8.76863Z" fill="#0EA472"/>
                                </svg>
                              )}
                            <span className='ml-1'>
                              {t('signup.passwordLowerCaseVal')}
                            </span>
                          </li>
                          <li className={`text-[#555458] text-xs items-center justify-start flex ${errors.password?.type === "hasUpperCase" ? "error" : "valid"}`}>
                              {!passwordValidation.hasUpperCase  || getValues('password')=='' ? (
                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M6 0C2.6865 0 0 2.6865 0 6C0 9.3135 2.6865 12 6 12C9.3135 12 12 9.3135 12 6C12 2.6865 9.3135 0 6 0ZM5.07 8.76863L2.30925 6.0075L3.36975 4.947L5.06962 6.64762L8.676 3.04125L9.7365 4.10175L5.07 8.76863Z" fill="#D0D5DD"/>
                                </svg> 
                              ) : (
                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6 0C2.6865 0 0 2.6865 0 6C0 9.3135 2.6865 12 6 12C9.3135 12 12 9.3135 12 6C12 2.6865 9.3135 0 6 0ZM5.07 8.76863L2.30925 6.0075L3.36975 4.947L5.06962 6.64762L8.676 3.04125L9.7365 4.10175L5.07 8.76863Z" fill="#0EA472"/>
                                </svg>
                              )}
                            <span className='ml-1'>
                              {t('signup.passwordUpperCaseVal')}
                            </span>
                          </li>
                          <li className={`text-[#555458] text-xs items-center justify-start flex ${errors.password?.type === "hasUpperCase" ? "error" : "valid"}`}>
                              {!passwordValidation.hasSpecialChar  || getValues('password')=='' ? (
                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M6 0C2.6865 0 0 2.6865 0 6C0 9.3135 2.6865 12 6 12C9.3135 12 12 9.3135 12 6C12 2.6865 9.3135 0 6 0ZM5.07 8.76863L2.30925 6.0075L3.36975 4.947L5.06962 6.64762L8.676 3.04125L9.7365 4.10175L5.07 8.76863Z" fill="#D0D5DD"/>
                                </svg> 
                              ) : (
                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6 0C2.6865 0 0 2.6865 0 6C0 9.3135 2.6865 12 6 12C9.3135 12 12 9.3135 12 6C12 2.6865 9.3135 0 6 0ZM5.07 8.76863L2.30925 6.0075L3.36975 4.947L5.06962 6.64762L8.676 3.04125L9.7365 4.10175L5.07 8.76863Z" fill="#0EA472"/>
                                </svg>
                              )}
                            <span className='ml-1'>
                              {t('signup.SpecialCharVal')}
                            </span>
                          </li>
                          <li className={`text-[#555458] text-xs items-center justify-start flex ${errors.password?.type === "hasDigit" ? "error" : "valid"}`}>
                              {!passwordValidation.hasDigit  || getValues('password')=='' ? (
                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M6 0C2.6865 0 0 2.6865 0 6C0 9.3135 2.6865 12 6 12C9.3135 12 12 9.3135 12 6C12 2.6865 9.3135 0 6 0ZM5.07 8.76863L2.30925 6.0075L3.36975 4.947L5.06962 6.64762L8.676 3.04125L9.7365 4.10175L5.07 8.76863Z" fill="#D0D5DD"/>
                                </svg> 
                              ) : (
                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6 0C2.6865 0 0 2.6865 0 6C0 9.3135 2.6865 12 6 12C9.3135 12 12 9.3135 12 6C12 2.6865 9.3135 0 6 0ZM5.07 8.76863L2.30925 6.0075L3.36975 4.947L5.06962 6.64762L8.676 3.04125L9.7365 4.10175L5.07 8.76863Z" fill="#0EA472"/>
                                </svg>
                              )}
                            <span className='ml-1'>
                              {t('signup.number')}
                            </span>
                          </li>
                        </ul>
                        </span>
                        {/* <span className="text-errorColor font-dm-sans-regular text-sm mt-1">
                        { getValues('password') !=='' && getPasswordErrorMessage()}
                        </span> */}
                      </>
                    }
                    </div>
                  </div>
                  <div className="flex flex-col mt-1 mb-1 gap-2.5 items-start justify-start w-full">
                    <Text
                      className="font-Avenir-next-LTPro leading-[16.8px] text-[12px] text-[#585E66] w-full"
                    >
                      {t('signup.accordance')} <br/>
                      {t('signup.accordance1')} <span className='font-Montserrat-semiBold'>D-W-266/2024.</span>
                    </Text>
                    <div className="flex flex-row items-start justify-start m-auto w-full mt-4">
                        <label htmlFor={`acceptTerms`} className="cursorpointer relative inline-flex items-center  peer-checked:border-0 rounded-[3px] mr-2">
                          <input
                          {...register("acceptTerms" , {
                            required: t('signup.termsValidation'),
                          }
                          )}
                            id={`acceptTerms`}
                            type="checkbox"
                            name="acceptTerms"
                            className={`peer appearance-none w-[16px] h-[16px] bg-white_A700 checked:bg-blue-600 checked:border-blue-600 checked:shadow-none border-[0.5px]  ${(errors?.acceptTerms?.message && sending)? 'border-errorColor shadow-checkErrorbs': 'shadow-none border-[#303030]' } rounded-[4px]  relative`}
                          />
                          <svg width="12" height="9" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 transition opacity-0 peer-checked:opacity-100">
                            <path d="M5.10497 8.10407L5.08735 8.12169L0.6875 3.72185L2.12018 2.28917L5.10502 5.27402L9.87904 0.5L11.3117 1.93268L5.12264 8.12175L5.10497 8.10407Z" fill="white"/>
                          </svg>
                        </label>
                        <label
                          htmlFor='acceptTerms'
                          className="text-[13px] leading-[16.93px] text-[#555458] w-auto font-dm-sans-regular"
                        >
                          {t('signup.terms1')} <a href={`https://digitalmorocco.net/terms?lang=${currentLanguage}`} target='_blank' className='text-[#2575F0] hover:text-[#00CDAE] cursorpointer'><span>{t('signup.terms2')}</span></a> {t('signup.terms3')} <a href={`https://digitalmorocco.net/privacy?lang=${currentLanguage}`} target='_blank' className='text-[#2575F0] hover:text-[#00CDAE] cursorpointer'><span>{t('signup.terms4')}</span></a> {t('signup.terms5')}                     
                        </label>
                    </div>
                    <div className="flex flex-row items-start justify-start m-auto w-full mt-2">
                        <label htmlFor={`offers`} className="cursorpointer relative inline-flex items-center  peer-checked:border-0 rounded-[3px] mr-2">
                          <input {...register("offers")}
                            id={`offers`}
                            type="checkbox"
                            name="offers"
                            className={`peer appearance-none w-[16px] h-[16px] bg-white_A700 checked:bg-blue-600 checked:border-blue-600 checked:shadow-none border-[0.5px] border-[#303030] rounded-[4px]  relative`}
                          />
                          <svg width="12" height="9" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 transition opacity-0 peer-checked:opacity-100">
                            <path d="M5.10497 8.10407L5.08735 8.12169L0.6875 3.72185L2.12018 2.28917L5.10502 5.27402L9.87904 0.5L11.3117 1.93268L5.12264 8.12175L5.10497 8.10407Z" fill="white"/>
                          </svg>
                        </label>
                        <label
                          htmlFor='offers'
                          className="text-[13px] leading-[16.93px] text-[#555458] w-auto font-dm-sans-regular"
                        >
                          {t('signup.acceptOffers')}
                        </label>
                    </div>
                  </div>
                  <div className={`my-3 flex flex-row gap-6 h-[52px] md:h-auto items-center justify-center py-[13px] rounded-[26px] w-full cursorpointer ${ loading ? 'bg-greenbtnhoverbg' : 'bg-teal-A700 hover:bg-greenbtnhoverbg  hover:svg-translate'} `}
                    onClick={()=> onButtonClick(formButtonRef)}>
                      <button ref={formButtonRef} type="submit" className={`text-base items-center justify-center font-dm-sans-medium text-white-A700 w-auto ${loading ? 'disabled' : ''}`}>
                      {loading? t("all.sending") : t('signup.signup')}
                      </button>
                      {loading ? 
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
              <div className="flex sm:flex-row flex-row gap-2.5 items-center justify-start py-2.5 w-full">
                <div className="bg-gray-300 h-px w-[46%]" />
                <Text
                  className="text-[15px] font-dm-sans-medium leading-[19.53px] text-gray700 tracking-[0.15px] w-auto"
                >
                  {t('signup.or')}
                </Text>
                <div className="bg-gray-300 h-px w-[46%]" />
              </div>
              <div className="flex flex-col gap-3 items-center justify-start w-full">
                <Text
                  className="text-base font-dm-sans-medium leading-[25.6px] tracking-[0.01em] text-gray-901 w-auto"
                >
                  {t('signup.registerSocial')}
                </Text>
                <div className="flex flex-col gap-3 items-center justify-start w-full">
                  <Button
                    className=" text-[#37363B] border border-gray-300 text-[14px] font-dm-sans-medium leading-[18.23px] tracking-[0.01em] border-solid cursorpointer flex items-center justify-center  min-w-full hover:border-solid hover:border-[#00CDAE33]  hover:bg-[#00CDAE33]"
                    onClick={() => socialSignUp('google')}
                    leftIcon={
                      <img
                        className="h-6 mr-2.5"
                        src={googleLogo}
                        alt="flat-color-icons:google"
                      />
                    }
                    shape="round"
                  >
                    <div className="w-[210px] font-medium leading-[normal] text-left text-sm tracking-[0.14px]">
                      {t('signup.googleSignUp')}
                    </div>
                  </Button>
                  <Button
                    className=" text-[#37363B] text-[14px] font-dm-sans-medium leading-[18.23px] tracking-[0.01em] border border-gray-300 border-solid cursorpointer flex items-center justify-center  min-w-full hover:border-solid hover:border-[#00CDAE33]  hover:bg-[#00CDAE33]"
                    onClick={() => socialSignUp('linkedin')}
                    leftIcon={
                      <img
                        className="h-6 mr-2.5"
                        src={linkLogo}
                        alt="link"
                      />
                    }
                    shape="round"
                  >
                    <div className="w-[210px] font-medium leading-[normal] text-left text-sm tracking-[0.14px]">
                      {t('signup.linkedinSignUp')}
                    </div>
                  </Button>
                  {/* <Button
                    className="text-[14px] font-dm-sans-medium leading-[18.23px] tracking-[0.01em] text-[#37363B] border border-gray-300 border-solid cursorpointer flex items-center justify-center  min-w-full hover:border-solid hover:border-[#00CDAE33]  hover:bg-[#00CDAE33]"
                    onClick={() => socialSignUp('facebook')}
                    leftIcon={
                      <img
                        className="h-6 mr-2.5"
                        src={faceBookLogo}
                        alt="link"
                      />
                    }
                    shape="round"
                  >
                    <div className="w-[210px] font-medium leading-[normal] text-left text-sm tracking-[0.14px]">
                      {t('signup.facebookSignUp')}
                    </div>
                  </Button> */}
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-row gap-2.5 items-center justify-start w-auto">
            <a
              className="text-[#37363B] text-sm font-dm-sans-medium leading-[26px]  w-auto"
            >
              <Text className=''>{t('signup.haveAccount')}</Text>
            </a>
            <Link
              to="/SignIn"
              className="text-[#482BE7] cursorpointer hover:text-[#00CDAE]  text-sm font-dm-sans-bold leading-[26px] w-auto"
            >
              <Text className=''>{t('signup.signIn')}</Text>
            </Link>
          </div>
        </div>
    </div>

    <EmailExistModalOrConfirmation isOpen={isModalOpen}
                      onRequestClose={closeModal}
                      />
    <EmailExistModalOrConfirmation isOpen={isErrorModalOpen}
                      onRequestClose={closeErrorModal}
                      />
    </>

  )
}
