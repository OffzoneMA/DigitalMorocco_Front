import React, { useState , useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Text } from '../../Components/Text';
import logo from '../../Media/img_logo.svg'
import confirmImage from '../../Media/img_role_confirmed.svg';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../Redux/auth/authSlice';

const RedirectFromSignIn = () => {

    const {t} = useTranslation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [showLogout , setShowLogout] = useState(false);

    const dropdownRef = useRef(null);

  const handleMouseEnter = () => {
    setShowLogout(true);
  };

  const handleMouseLeave = () => {
    setShowLogout(false);
  };

    return (
        <div className={`bg-white-A700 flex flex-col font-DmSans gap-[50px] items-center justify-start mx-auto pb-[50px] w-full min-h-screen overflow-y-auto`}>
            <div className="border-b border-gray-201 border-solid flex flex-row md:flex-row gap-10 items-center justify-between pl-2 pr-12 md:px-[100px] py-5 w-full relative">
              <a href="https://digitalmorocco.net" target='_blank' rel='noreferrer'>
                  <img
                  className="h-[47px] w-[180px]"
                  src={logo}
                  alt="logo"
                  />
              </a>
              <div
                  className="flex flex-row gap-[21px] items-start justify-start w-auto h-full relative btnUserProfil"
                  ref={dropdownRef}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
              >
                  <button id="profileBtn" className="btnUserProfil cursorpointer relative" onClick={() => setShowLogout(!showLogout)}>
                  <svg width="40" height="41" viewBox="0 0 40 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="1" y="1.78027" width="38" height="38" rx="19" stroke="#1F2545" strokeWidth="2" />
                      <path d="M11 28.7803C13.3358 26.3029 16.507 24.7803 20 24.7803C23.493 24.7803 26.6642 26.3029 29 28.7803M24.5 16.2803C24.5 18.7656 22.4853 20.7803 20 20.7803C17.5147 20.7803 15.5 18.7656 15.5 16.2803C15.5 13.795 17.5147 11.7803 20 11.7803C22.4853 11.7803 24.5 13.795 24.5 16.2803Z" stroke="#303030" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  </button>
                  {showLogout && (
                  <div className="absolute top-[100%] right-0 w-[248px]">
                      <button className="cursorpointer-green bg-white-A700 text-blue_gray-904 flex flex-row gap-4 px-[18px] mt-[5px] border border-gray-201 w-[248px] rounded-[6px] h-[46px] items-center transition-colors duration-100 hover:text-[#EA6479] hover:stroke-red"
                      onClick={() => {
                      dispatch(logout());
                      navigate('/SignIn');
                      }} >
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M14 15L19 10M19 10L14 5M19 10H7M10 15C10 15.93 10 16.395 9.89778 16.7765C9.62038 17.8117 8.81173 18.6204 7.77646 18.8978C7.39496 19 6.92997 19 6 19H5.5C4.10218 19 3.40326 19 2.85195 18.7716C2.11687 18.4672 1.53284 17.8831 1.22836 17.1481C1 16.5967 1 15.8978 1 14.5V5.5C1 4.10217 1 3.40326 1.22836 2.85195C1.53284 2.11687 2.11687 1.53284 2.85195 1.22836C3.40326 1 4.10218 1 5.5 1H6C6.92997 1 7.39496 1 7.77646 1.10222C8.81173 1.37962 9.62038 2.18827 9.89778 3.22354C10 3.60504 10 4.07003 10 5" stroke="#203668" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span className="flex items-center font-dm-sans-regular text-base leading-[26px] transition-colors duration-100">{t('chooserole.signout')}</span>
                      </button>
                  </div>
                  )}
              </div>
            </div>
            <div className='flex px-3 w-full items-center justify-center'>
              <div className="bg-white-A700 shadow-loginModalbsReduced border border-gray-500_33 border-solid flex flex-col gap-6 items-center justify-start max-w-screen-sm p-5 rounded-[14px] w-full">
                  <div className="flex flex-col gap-[38px] items-center justify-start max-w-[460px] px-3 w-full">
                  <img
                    className="h-[172px] w-[172px]"
                    src={confirmImage}
                    alt="successtick"
                  />
                  <div className="flex flex-col gap-5 items-center justify-start w-auto ">
                    <Text
                      className="leading-[28.00px] font-dm-sans-medium text-gray-801 text-center text-[18px] "
                    >
                      <span className=" font-dm-sans-medium">
                        {t('signin.congrate')}{" "}
                      </span> <br/>
                      <span className="text-blue-A400 font-dm-sans-medium">
                        {t('signin.congrate1')}
                      </span>
                    </Text>
                    <Text
                      className="flex flex-col gap-4 font-dm-sans-regular leading-[26.00px] text-gray-801 text-center text-sm"
                    >
                      <>
                        {t('signin.congrate2')}
                        <br/>
                        <span className=''>{t('chooserole.confirmed.m4')}</span>
                      </>
                    </Text>
                  </div>
                  </div>
                  <Text
                    className="leading-[160.00%] font-dm-sans-regular text-blue_gray-500 text-center text-xs w-full sm:px-16 pt-4"
                  >
                    <span className="text-blue_gray-500 font-dm-sans-regular">
                      {t('chooserole.confirmed.m5')}
                    </span>
                    <span className="text-blue_gray-500 font-dm-sans-regular">
                      {" "}
                    </span>
                    <span className="text-blue-A400 font-dm-sans-regular">
                      {t('chooserole.confirmed.m6')}
                    </span>
                  </Text>
              </div>
            </div>
        </div>
    );
}

export default RedirectFromSignIn;
