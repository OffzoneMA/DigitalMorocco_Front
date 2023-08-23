import { ArrowTrendingUpIcon, MegaphoneIcon, RocketLaunchIcon } from '@heroicons/react/24/solid';
import React from 'react';
import { FaHandHoldingHeart } from 'react-icons/fa';
export default function OurGoals(){
    return(
        <div className="flex flex-col p-6 items-center justify-center md:items-start md:justify-start sm:p-12 lg:px-40 lg:py-20 xl:px-52 xl:py-20  bg-[#616886]">
            <div className="space-y-5 pt-4 " >
                <h1 className="text-white text-4xl 3xl:text-7xl font-bold text-center lg:text-left  ">Experience the power of networking</h1>
                <p className="text-white xl:max-w-[719px] text-center sm:text-left text-opacity-50 text-medium 3xl:text-4xl 3xl:max-w-screen-2xl leading-normal font-semibold text-left tracking-wide ">The fourth industrial revolution, known as "Industry 4.0," has transformed the world of technology. However, it does not evolve on its own. By sharing our experiences and achievements during events, conferences, training sessions, and other professional gatherings, we hope that our collective efforts will position us at the forefront of decision-makers in the digital world.</p>
            </div>
            <div className="flex flex-col lg:grid md:grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2  items-center justify-center md:items-start md:justify-start gap-x-20 gap-y-6 pt-4 3xl:pt-20">
                <div className="py-6 space-y-5">
                    <div className="flex justify-center lg:justify-start xl:justify-start">
                    <ArrowTrendingUpIcon className='h-10 w-10 text-white 3xl:h-32 3xl:w-32 '/>
                    </div>
                    <h1 className="text-white text-lg font-medium text-center lg:text-left 3xl:text-4xl">A Strong Professional Network</h1>
                    <p className="text-white text-center text-opacity-50 text-sm leading-normal font-normal sm:text-left tracking-wide 3xl:text-3xl">The essence of startups lies in having a strong professional network. One of our fundamental objectives is to connect trusted entities, whether they are service providers, partners, or investors.</p>
                </div>
                <div className="py-6 space-y-5 ">
                    <div className="flex justify-center lg:justify-start xl:justify-start">
                    <RocketLaunchIcon className='h-10 w-10 text-white 3xl:h-32 3xl:w-32'/>
                    </div>
                    <h1 className="text-white text-lg font-medium text-center  lg:text-left 3xl:text-4xl ">Successful Investments</h1>
                    <p className="text-white text-center text-opacity-50 text-sm leading-normal font-normal sm:text-left tracking-wide 3xl:text-3xl">We aim to showcase the successful experiences of startups and businesses and share them with our members. Working together, we strive to implement digital-based development projects.</p>
                </div>
            
                <div className="py-6 space-y-5 ">
                    <div className="flex justify-center lg:justify-start xl:justify-start">
                    <FaHandHoldingHeart className=' h-10 w-10 text-white 3xl:h-32 3xl:w-32' />
                    </div>
                    <h1 className="text-white text-lg font-medium text-center lg:text-left 3xl:text-4xl">Unity and Strength</h1>
                    <p className="text-white text-center text-opacity-50 text-sm leading-normal font-normal sm:text-left tracking-wide 3xl:text-3xl">Because unity is strength, one of our main objectives is to build a strong community that helps members overcome professional challenges and difficulties. Our aim is to become an official reference point for various sectors in the technological and digital world.</p>
                </div>
                <div className="py-6 space-y-5 ">
                    <div className="flex justify-center lg:justify-start xl:justify-start">
                    <MegaphoneIcon className='h-10 w-10 text-white 3xl:h-32 3xl:w-32'/>
                    </div>
                    <h1 className="text-center text-white text-lg font-medium  lg:text-left 3xl:text-4xl">Investment Opportunities</h1>
                    <p className="text-center text-white text-opacity-50 text-sm  leading-normal font-normal sm:text-left tracking-wide 3xl:text-3xl">We aim to be the long-term partner for businesses of all sizes, providing partners, investors, and financial institutions with exceptional opportunities to invest and support inclusive and sustainable growth. Digital Morocco fosters relationships between startups, companies, and investors to unleash the potential of businesses and set them on a path of sustainable growth.</p>
                </div>
            </div>
        </div>
        

)
}