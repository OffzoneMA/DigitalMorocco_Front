import React , {useRef} from 'react'
import { useNavigate } from 'react-router-dom'
import { Text } from '../../Components/Text';
import { useTranslation } from 'react-i18next';
import logo from '../../Media/img_logo.svg';
import succesImage from '../../Media/img_frame12.svg';


export default function PasswordResetSucces() {
  const { t } = useTranslation();

    const navigate = useNavigate()

    const formButtonRef = useRef();

    const onButtonClick = (inputref) => {
      inputref.current.click();
    };

    return (
        <>
          <div className="bg-gray-100 flex flex-col font-DmSans items-center min-h-screen justify-start mx-auto p-[60px] md:px-10 sm:px-5 w-full">
            <div className="flex flex-col gap-[42px] items-center justify-start mb-[213px] w-auto w-full">
              <a href='https://digitalmorocco.net' className="flex flex-col items-center justify-center w-full">
                <img
                  className="h-[50px] w-[183px]"
                  src={logo}
                  alt="logo"
                />
              </a>
              <div className="bg-white-A700 flex flex-col gap-9 items-center justify-start px-6 py-[42px] rounded-[12px] shadow-formbs max-w-[520px] w-full">
                <img
                  className="h-[235px] w-64"
                  src={succesImage}
                  alt="succes"
                />
                <div className="flex flex-col gap-9 items-center justify-start w-full">
                  <Text
                  className="text-[22px] text-center font-dm-sans-medium text-gray-901 leading-8 w-auto"
                  >
                    <>
                      {t('resetSuccess.resetSuccess')}
                    </>
                  </Text>
                  <div className="flex flex-col gap-6 items-center justify-start w-full">
                    <div className="bg-teal-A700 my-3 flex flex-row gap-6 h-[52px] md:h-auto items-center justify-center py-[14px] rounded-[26px] w-full cursorpointer hover:bg-greenbtnhoverbg hover:svg-translate" 
                    onClick={()=> navigate("/SignIn")}>
                        <button
                          type="button"
                          className="text-base leading-[20.83px] text-white-A700 font-dm-sans-medium w-auto"
                        >
                        {t('resetSuccess.signIn')}
                        </button>
                        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-transform transform">
                          <path d="M11 15L15 11M15 11L11 7M15 11H7M21 11C21 16.5228 16.5228 21 11 21C5.47715 21 1 16.5228 1 11C1 5.47715 5.47715 1 11 1C16.5228 1 21 5.47715 21 11Z" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
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
                </div>
              </div>
            </div>
          </div>
        </>
      );
}