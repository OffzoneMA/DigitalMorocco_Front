import React from 'react';
import WhoAreWe from './LandingPage/WhoAreWe';
import WhyJoinUs from './LandingPage/WhyJoinUs';
import OurGoals from './LandingPage/OurGoals';
import OurActivities from './LandingPage/OurActivities';

export default function Home() {
  return (

    <div>
      <div className="flex items-center justify-center md:items-start md:justify-start px-5 sm:px-20   md:pt-48 md:pl-48   w-full h-screen bg-[#182049] bg-[url(/public/img/Bg.png),_url(/public/img/MorrocoMap.png)]  bg-no-repeat bg-center md:bg-right">
        <div className="flex flex-col items-center justify-center  md:items-start md:justify-start   md:max-w-[514px] space-y-4  ">
          <h2 className=" text-center md:text-left text-3xl md:text-6xl font-bold text-white ">Grow your<br />business through networking and digital solutions!</h2>
          <p className=" text-center md:text-left py-3 tracking-wide font-normal  text-white md:text-opacity-50 ">Expand your professional network, gain access to exclusive resources, and connect with individuals and organizations committed to advancing the digital landscape in Morocco.</p>
          <button className=" px-3 py-2 rounded-full justify-center tracking-wide w-fit bg-blue-500 text-lg font-normal leading-6 text-white shadow-sm  hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500">Get Started Now</button>
        </div>

      </div>
      <WhoAreWe />
     {/*  <WhyJoinUs />
      <OurGoals />
      <OurActivities /> */}

    </div>

  )
}