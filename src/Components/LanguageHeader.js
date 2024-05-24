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


export default function LanguageHeader() {

  const { t, i18n } = useTranslation();
  const handleLanguageChange = (language) => {
    i18n.changeLanguage(language);
  };

  const handleFlagClick = () => {
    const newLanguage = i18n.language === 'en' ? 'fr' : 'en';
    i18n.changeLanguage(newLanguage);
  };


  return (

    <div className='absolute top-0 right-0 z-[100]'>
      <div className='relative w-full   '>
        <div className='  relative px-10 py-10 '>

          {/* Lang */}
          <div className='hover:scale-105 transition-all ease-in-out duration-200 border border-[#F2F4F7] cursorpointer absolute right-0 top-10 p-3 shadow-langbs bg-white-A700 rounded-l-md inline '>
            <a className='cursorpointer' onClick={handleFlagClick}>
            {/* Change the image source based on the current language */}
            <img
                src={
                i18n.language === 'en' 
                    ? '/img/lang/emojione_flag-for-france.png'
                    : '/img/lang/icons8-usa-36.png'
                }
                alt="Flag"
                className='h-7 w-7'
            />
            </a>
            </div>
        </div>
      </div>

    </div>
  )
}
