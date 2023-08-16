import React from 'react';
import WhoAreWe from './LandingPage/WhoAreWe';
import WhyJoinUs from './LandingPage/WhyJoinUs';
import OurGoals from './LandingPage/OurGoals';
import OurActivities from './LandingPage/OurActivities';

export default function Home() {
  return (
    <div>
     <div className="w-full h-[803px] bg-[#182049] bg-[url(/public/img/Bg.png),_url(/public/img/MorrocoMap.png)] bg-no-repeat bg-right">
      <div className="h-[474px] p-[229px] w-[1424px]">
        <div className="w-[514px] -my-10 -mt-10 -mx-10 ">
         <h2 className="text-6xl font-bold text-white tracking-wide leading-snug">Grow your business through networking and digital solutions!</h2>
         <p className="py-3 tracking-wide font-normal text-lg text-white text-opacity-50">Expand your professional network, gain access to exclusive resources, and connect with individuals and organizations committed to advancing the digital landscape in Morocco.</p>
         <button className="w-[224px] h-[60px] rounded-full justify-center tracking-wide bg-blue-500 text-lg font-normal leading-6 text-white shadow-sm  hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500">Get Started Now</button>
        </div>
      </div>
     </div>
      <WhoAreWe />
      <WhyJoinUs />
      <OurGoals />
      <OurActivities />
    </div>
  
  )
}