import React, { useRef, useState, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { ArrowRightIcon } from '@heroicons/react/24/solid'
import { gsap } from "gsap";
import { useLocation } from "react-router-dom";
import { useGetUserDetailsQuery } from '../Services/Auth';
import { useDispatch, useSelector } from "react-redux";
import { logout, setCredentials } from "../Redux/auth/authSlice";
import { ExclamationTriangleIcon } from '@heroicons/react/24/solid';
import { useTranslation } from 'react-i18next';
import frImg from '../Media/fr.svg';
import ukImg from '../Media/uk.svg';


export default function LanguageHeader() {
  const [isHovered, setIsHovered] = useState(false);
  const { t, i18n } = useTranslation();
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  const handleLanguageChange = (language) => {
    i18n.changeLanguage(language);
  };

  const handleFlagClick = () => {
    const newLanguage = i18n.language === 'en' ? 'fr' : 'en';
    i18n.changeLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
  };

  const tooltipText = i18n.language === 'en' ? 'Français (France)' : 'English (United Kingdom)';


  return (

    <div className='absolute top-0 right-0 z-[100]'>
      <div className='relative w-full   '>
        <div className='w-auto  relative w-[41px] h-[41px] flex items-center'>

          {/* Lang */}
          {/* <div className='hover:scale-105 transition-all ease-in-out duration-200 border border-[#F2F4F7] cursorpointer absolute w-[41px] h-[41px] right-0 top-10 shadow-langbs bg-white-A700 rounded-l-md flex justify-center items-center ' 
           onClick={handleFlagClick}>
            <a className='cursorpointer  '>
            <img
                src={
                i18n.language === 'en' 
                    ? frImg
                    : ukImg
                }
                alt="Flag"
                className='w-[25px] h-[25px]'
            />
            </a>
          </div> */}
          <div
            className='hover:scale-105 transition-all ease-in-out duration-200 border border-[#F2F4F7] cursorpointer relative w-[41px] h-[41px] right-0 top-10 shadow-langbs bg-white-A700 rounded-l-md flex justify-center items-center'
            onClick={handleFlagClick} title={tooltipText}
          >
            <a className='cursorpointer'>
              <img
                src={i18n.language === 'en' ? frImg : ukImg}
                alt="Flag"
                className='w-[25px] h-[25px]'
              />
            </a>
          </div>
        </div>
      </div>

    </div>
  )
}
