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
  const [sendForgotPassword, { isLoading }] = useSendForgotPasswordMutation()
  const navigate = useNavigate()
  const dispatch = useDispatch();


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
            <div className="flex flex-col items-start md:px-5 w-auto">
            <div className={`self-start flex flex-col gap-[18px] h-11 md:h-auto items-center justify-center py-[18px] rounded-[22px] w-auto`}>
                <div className="flex flex-row gap-3 items-center justify-center w-auto w-full">
                <img
                    className="h-[22px] w-[22px]"
                    src="images/img_arrowleft.svg"
                    alt="arrowleft"
                />
                <a className="text-blue_gray-400_01 text-sm tracking-[0.14px] w-auto" href='/SignIn'>
                    <Text
                        size="txtManropeSemiBold14"
                    >
                        {t('backToLogin')}
                    </Text>
                </a>
                </div>
            </div>
            </div>
            <div className="flex flex-col font-dmsans gap-[42px] items-center justify-start mb-[368px] md:px-5 w-auto w-full">
              <div className="flex flex-col items-center justify-center w-full">
                <img
                  className="h-[50px] w-[183px]"
                  src="images/img_logo.svg"
                  alt="logo"
                />
              </div>
              <div className="bg-white-A700 flex flex-col gap-8 items-center justify-start sm:px-5 px-6 py-8 rounded-[12px] shadow-bs1 max-w-[520px] w-full">
                <a
                  href="javascript:"
                  className="text-[22px] text-gray-900 sm:text-lg md:text-xl w-auto"
                >
                  <Text size="txtDMSansMedium22">{t('forgot.forgotPassword')} </Text>
                </a>
                <div className="flex flex-col gap-8 items-center justify-start w-full">
                  <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 items-center justify-start w-full">
                    <Text
                      className="text-gray-900 text-lg w-full"
                      size="txtDMSansMedium18"
                    >
                      {t('forgot.enterEmailAddress')}
                    </Text>
                    <div className="flex flex-col gap-4  justify-start w-full">
                      <div className="flex flex-col font-dmsans items-start justify-start w-full">
                        <Text
                          className="text-base text-gray-900 w-auto"
                          size="txtDMSansMedium16"
                        >
                          {t('forgot.emailAddress')}
                        </Text>
                      </div>
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
                   </span>}
                    </div>
                  
                  <div className="flex flex-col gap-6 items-center justify-start w-full">
                    <div className="bg-teal-A700 flex flex-row gap-6 h-[52px] md:h-auto items-center justify-center sm:px-5 px-7 py-[13px] rounded-[26px] w-full cursor-pointer" 
                    onClick={()=> onButtonClick(formButtonRef)}>
                        <div className="flex flex-col items-center justify-center w-auto">
                        <button
                        ref={formButtonRef}
                            type="submit"
                            className="text-base text-white-A700 w-auto"
                            size="font-dmsans font-medium"
                        >
                          {isLoading ? t('forgot.resetPasswordSend') : t('forgot.resetPassword')}
                        </button>
                        </div>
                        <img
                        className="h-6 w-6"
                        src="images/img_arrowright.svg"
                        alt="arrowright"
                        />
                    </div>
                    <div className="flex flex-row gap-2.5 items-center justify-start w-auto">
                      <Text
                        className="text-blue_gray-900_02 text-sm w-auto"
                        size="txtDMSansMedium14"
                      >
                        {t('forgot.havingTroubleSigningIn')}
                      </Text>
                      <Text
                        className="text-deep_purple-A400 text-sm w-auto"
                        size="txtDMSansBold14"
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