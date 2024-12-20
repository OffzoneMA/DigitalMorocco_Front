import React, { useRef, useState, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { ArrowRightIcon } from '@heroicons/react/24/solid'
import { gsap } from "gsap";
import { useLocation } from "react-router-dom";
import { useGetUserDetailsQuery } from '../../Services/Auth';
import { useDispatch, useSelector } from "react-redux";
import { logout, setCredentials } from "../../Redux/auth/authSlice";
import { ExclamationTriangleIcon } from '@heroicons/react/24/solid';
import { useTranslation } from 'react-i18next';


export default function Header() {

  const { t, i18n } = useTranslation();
  const handleLanguageChange = (language) => {
    i18n.changeLanguage(language);
  };

  const handleFlagClick = () => {
    const newLanguage = i18n.language === 'en' ? 'fr' : 'en';
    i18n.changeLanguage(newLanguage);
  };
  const [open, setOpen] = useState(false);
  const activeLink = "text-[#00cdae] ";
  const HeaderMenu = useRef(null);
  const Menu = useRef(null);
  const wrap = useRef(null);
  const location = useLocation();
  const { data, isFetching } = useGetUserDetailsQuery("userDetails", {
    pollingInterval: 900000,
  });
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  useEffect(() => {
    if (data) {
      dispatch(setCredentials(data));
    }
  }, [data]);

  useEffect(() => {
    CloseMenu()
    setOpen(false);
  }, [location.pathname])


  function OpenMenu() {
    gsap
      .timeline()
      .set(HeaderMenu.current, {
        display: "inline",
      })
      .to(wrap.current, {
        scale: 1.3,
        duration: 0.5,
        ease: "Expo.InOut",
      })
      .set(Menu.current.children, {
        opacity: 0,
      })
      .fromTo(
        Menu.current.children,
        {
          opacity: 0,
          yPercent: -50,
        },
        {
          opacity: 1,
          yPercent: 0,
          stagger: 0.2,
          ease: "Expo.InOut",
        }
      );
  }

  function CloseMenu() {
    gsap
      .timeline()
      .fromTo(
        Menu.current.children,
        {
          opacity: 1,
          yPercent: 0,
        },
        {
          opacity: 0,
          yPercent: -50,
          stagger: 0.1,
          ease: "Expo.InOut",
        }
      )
      .to(wrap.current, {
        scale: 0,
        duration: 0.3,
        ease: "Expo.InOut",
      })
      .set(HeaderMenu.current, {
        display: "none",
      });


  }

  return (

    <div className='w-screen absolute top-0 left-0 z-[100]'>
      <div className='relative w-full   '>
        {location.pathname !== '/ChooseRole' &&
          ["notVerified", "verified", "pending"].includes(userInfo?.status) &&
          <NavLink to="/ChooseRole" className="absolute left-1/2 top-[150%] transform -translate-x-1/2 -translate-y-1/2 bg-orange-400 text-white p-6 rounded-md shadow-lg z-50">


            <div className="flex gap-3 text-lg font-semibold p-4 items-center ">

              <ExclamationTriangleIcon className='h-6 w-6 text-white' />
              Please complete your sign up steps!

            </div>

          </NavLink>
        }

  
        <div className='  relative  px-5 sm:px-6 lg:px-20 py-9  3xl:px-40 3xl:py-10'>

          <div className='flex items-center justify-between'>




            <NavLink to="/">
              <img src={location.pathname === "/" ? "/img/LogoWhite.png" : "/img/Logo.png"} alt="" className='h-8 sm:h-9 lg:h-14 2xl:h-18 3xl:h-20 ' />
            </NavLink>



            <div className={`hidden md:flex items-center  gap-3 xl:gap-9 3xl:gap-10 text-sm xl:text-sm 2xl:text-lg 3xl:text-2xl ${location.pathname === "/" ? "text-white" : 'text-[#1f2545]'}   font-light `}  >
              <NavLink to="/About-Us" className={({ isActive }) =>


                isActive ? activeLink : ""
              }>
                {t('header.about')}
              </NavLink>

              <NavLink to="/Members"
                className={({ isActive }) =>
                  isActive ? activeLink : ""
                }>
                {t('header.members')}
              </NavLink>
              <NavLink to="/Partners"
                className={({ isActive }) =>
                  isActive ? activeLink : ""
                }>
                {t('header.partners')}
              </NavLink>      
                <NavLink to="/Events"
                className={({ isActive }) =>
                  isActive ? activeLink : ""
                }>
                {t('header.events')}
              </NavLink>     
                 <NavLink to="/Pricing"
                className={({ isActive }) =>
                  isActive ? activeLink : ""
                }>
                {t('header.pricing')}
              </NavLink>           
                 <NavLink to="/ContactUs"
                className={({ isActive }) =>
                  isActive ? activeLink : ""
                }>
                {t('header.contactUs')}
              </NavLink>


            </div>

            <div className='hidden md:flex items-center gap-3 ' style={{ color: "#ffffff" , fontWeight: "bold" }}>
              {!userInfo ?
                <>
                  <NavLink
                    to="/SignIn"
                    className={({ isActive }) =>
                      (isActive ? activeLink : "") + (location.pathname === "/" ? "text-white border-white" :"text-[#1f2545] border-[#1f2545]")+  " px-4 py-2 rounded-full  border 3xl:px-6 3xl:py-4 3xl:text-xl "
                    }

                  >
                    {t('header.signIn')}
                  </NavLink>
                  <NavLink
                    to="/SignUp"
                    className={({ isActive }) =>

                       (location.pathname !== "/" ? "text-[#1f2545] " : "text-[#1f2545] ") + "px-4 py-2 rounded-full text-[#1f2545] border-[#1f2545] 3xl:px-6 3xl:py-4 3xl:text-xl bg-[#00cdae]"

                    }
                  >
                    {t('header.getStarted')}
                  </NavLink></>
                :
                <button
                  onClick={() => {
                    dispatch(logout())
                    navigate('/SignIn')
                  }
                  }
                  className={`px-2 py-1 rounded-full border ${(location.pathname === "/" ? "text-white border-white" : "text-[#1f2545] border-[#1f2545]") }`}
                >
                  {t('header.logOut')}
                </button>}
              {userInfo?.role !== "Admin" && ["notVerified", "verified", "pending", "rejected"].includes(data?.status) &&
                <NavLink to="/Complete_SignUp"
                  className={({ isActive }) =>
                    (isActive ? activeLink : "") + "px-3 py-2 rounded-full text-black    bg-[#bdfff5]"
                  }>
                  {t('header.profileStatus')}
                </NavLink>}

                {userInfo && userInfo?.status === "accepted" && (
                <NavLink
                  to={"/Dashboard"}
                  className={({ isActive }) => (location.pathname !== "/" ? "text-white " : "text-[#1f2545] ") + "px-4 py-2 rounded-full text-black bg-[#00cdae]"}
                >
                  {t('header.dashboard')}
                </NavLink>
              )}


            </div>


            {/* Mobile nav */}
            <button
              onClick={() => {
                if (
                  !(
                    gsap.isTweening(HeaderMenu.current) ||
                    gsap.isTweening(wrap.current) ||
                    gsap.isTweening(Menu.current.children)
                  )
                ) {
                  setOpen(!open);
                  open ? CloseMenu() : OpenMenu();
                }
              }}
              className="MenuButton cursor-pointer  flex flex-col items-center justify-center space-y-1 outline-0	md:hidden z-[150]"
            >
              <span
                className={`w-8 h-1 ${location.pathname==="/" && !open ? "bg-white":"bg-black"}  rounded-full transform transition origin-[5px_3px] duration-500 ease-in-out ${open && `rotate-45`
                  }`}
              ></span>
              <span
                className={`w-8 h-1 ${location.pathname === "/" && !open ?  "bg-white":"bg-black"}  rounded-full transform transition origin-[5px_2px] duration-500 ease-in-out ${open && `-translate-x-1`
                  } ${open && `opacity-0`}`}
              ></span>
              <span
                className={`w-8 h-1 ${location.pathname === "/" && !open ?  "bg-white":"bg-black"}  rounded-full transform transition origin-[5px_3px] duration-500 ease-in-out ${open && `-rotate-45`
                  }`}
              ></span>
            </button>
          </div>

          {/* Lang */}
          <div className='hover:scale-105 transition-all ease-in-out duration-200 hover:shadow-2xl cursor-pointer absolute right-0 md:top-24 lg:top-8 p-3 shadow-xl bg-white rounded-l-xl hidden md:inline ring-1 ring-gray-100'>
        <a className='cursor-pointer' onClick={handleFlagClick}>
          {/* Change the image source based on the current language */}
          <img
            src={
              i18n.language === 'en' 
                ? '/img/lang/emojione_flag-for-france.png'
                : '/img/lang/icons8-usa-36.png'
            }
            alt="Flag"
            className='md:h-7 lg:h-8'
          />
        </a>
      </div>
          {/* <div className='hover:scale-105 transition-all ease-in-out duration-200 hover:shadow-2xl cursor-pointer absolute right-0 md:top-24 lg:top-8 p-3 shadow-xl bg-white rounded-l-xl hidden md:inline ring-1 ring-gray-100 '>
            <a className='cursor-pointer '><img src="/img/lang/emojione_flag-for-france.png" alt="" className='md:h-7 lg:h-8  ' /></a>
          </div> */}
        </div>



        {/* //Mobile Menu */}
        <div
          className="fixed overflow-hidden h-screen  w-screen top-0 left-0 hidden  z-[95]"
          ref={HeaderMenu}
        >
          <div
            ref={wrap}
            className={`rounded-bl-full h-screen bg-gray-50 w-screen tranform origin-top-right scale-0`}
          ></div>
          <div className={`flex flex-col items-center justify-center  h-screen w-screen  bg-gray-50 `} >
            <div
              className="fixed top-0 text-xl font-medium  h-screen w-screen flex flex-col items-center justify-center  space-y-10 text-center"
              ref={Menu}
            >
              <div className='flex items-center gap-2 text-2xl pb-7'>
                <div className={`cursor-pointer bg-gray-100 rounded-full px-2 py-1 ${
                i18n.language === 'en' ? 'text-blue-300' : ''
                }`}
                  onClick={() => handleLanguageChange('en')}>En</div>
                <div className={`cursor-pointer bg-gray-100 rounded-full px-2 py-1 ${
                i18n.language === 'fr' ? 'text-blue-300' : ''
                }`}
                onClick={() => handleLanguageChange('fr')}>Fr</div>
              </div>

              <NavLink to="/About-Us" className={({ isActive }) =>
                isActive ? activeLink : ""
              }>
                {t('header.about')}
              </NavLink>

              <NavLink to="/Members"
                className={({ isActive }) =>
                  isActive ? activeLink : ""
                }>
                {t('header.members')}
              </NavLink>
              <NavLink to="/Partners"
                className={({ isActive }) =>
                  isActive ? activeLink : ""
                }>
                {t('header.partners')}
              </NavLink>
              <NavLink to="/Events"
                className={({ isActive }) =>
                  isActive ? activeLink : ""
                }>
                {t('header.events')}
              </NavLink>
              <NavLink to="/Pricing"
                className={({ isActive }) =>
                  isActive ? activeLink : ""
                }>
                {t('header.pricing')}
              </NavLink>   
              {userInfo && userInfo?.status === "accepted" &&
                <NavLink to="/Dashboard"
                  className={({ isActive }) =>
                    isActive ? activeLink : ""
                  }>
                  {t('header.dashboard')}
                </NavLink>
              }
              
              { userInfo?.role !== "Admin" && ["notVerified", "verified", "pending", "rejected"].includes(data?.status) &&
                <NavLink to="/Complete_SignUp"
                  className={({ isActive }) =>
                    isActive ? activeLink : ""
                  }>
                  {t('header.profileStatus')}
                </NavLink>}
              
              {!userInfo ?
                <>
                  <NavLink
                    to="/SignUp"
                    className={({ isActive }) =>
                      isActive ? activeLink : ""
                    }
                  >
                    {t('header.signUp')}
                  </NavLink>
                  <NavLink
                    to="/SignIn"
                    className={({ isActive }) =>
                      isActive ? activeLink : ""
                    }
                  >
                    {t('header.signIn')}
                  </NavLink></>
                :
                <button
                  onClick={() => {
                    dispatch(logout())
                    navigate('/SignIn')
                  }
                  }
                  className="gap-1 flex   p-2 rounded-lg transform transition-all duration-300 ease-in-out hover:text-white/20 "
                >
                  {t('header.logOut')}
                </button>
              }
              {
                userInfo?.displayName ?
                  <NavLink className="flex items-center justify-center gap-1 text-blue-500">
                    {t('header.hi')}, {userInfo?.displayName}
                  </NavLink>
                  :
                  <NavLink className="flex items-center justify-center gap-1 text-blue-500 " to="/ContactUs">
                    <span className=' font-semibold'>{t('header.contactUs')}</span>
                    <ArrowRightIcon className='w-4 h-4' />
                  </NavLink>
              }


            </div>
          </div>
        </div>

      </div>

    </div>

  )
}
