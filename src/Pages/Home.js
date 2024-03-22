import React from 'react';
import WhoAreWe from './LandingPage/WhoAreWe';
import WhyJoinUs from './LandingPage/WhyJoinUs';
import OurGoals from './LandingPage/OurGoals';
import OurActivities from './LandingPage/OurActivities';
import { useTranslation } from 'react-i18next';


export default function Home() {
  const { t, i18n } = useTranslation();

  return (

    <div className="">
      <div className="flex items-center justify-center md:items-start md:justify-start px-5 sm:px-20 md:pt-40 lg:px-40  w-full h-screen bg-[#182049] bg-[url(/public/img/Bg.png),_url(/public/img/MorrocoMap.png)]  bg-no-repeat bg-center  md:bg-right md:bg-right-top xl:bg-[size:cover,_auto]  2xl:bg-[size:cover,_contain] 2xl:bg-right-top ">
        <div className="flex flex-col items-center justify-center  md:items-start md:justify-start md:max-w-md 2xl:max-w-4xl 3xl:max-w-7xl 3xl:pl-40 3xl:py-40 2xl:space-y-8 space-y-4 md:space-y-0 xl:py-10 lg:py-10  md:py-5 ">
          <h2 className=" text-center md:text-left text-3xl md:text-4xl lg:text-5xl 2xl:text-8xl 3xl:text-8xl font-bold text-white ">{t('home.h2')}</h2>
          <p className=" text-center md:text-left py-3 tracking-wide font-normal 2xl:text-2xl 3xl:text-4xl 3xl:leading-normal  text-white md:text-opacity-50 ">{t('home.expand')}</p>
          <button className="px-6 py-3 3xl:text-4xl 3xl:px-6 3xl:py-4 rounded-full justify-center tracking-wide w-fit bg-blue-500 text-lg font-normal leading-6 text-white shadow-sm  hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500">{t('home.getStartedNow')}</button>
        </div>

      </div>
      <WhoAreWe />
      <WhyJoinUs />
      <OurGoals />
      <OurActivities />

    </div>

  )
}