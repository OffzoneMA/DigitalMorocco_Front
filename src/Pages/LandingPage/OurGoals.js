import { ArrowTrendingUpIcon, MegaphoneIcon, RocketLaunchIcon } from '@heroicons/react/24/solid';
import React from 'react';
import { FaHandHoldingHeart } from 'react-icons/fa';
export default function OurGoals(){
    return(
        <div className="w-[1424px] h-[950px] bg-[#616886] py-[100px] px-[233px]">
            <div className="w-[680px] h-[222px] space-y-5 pt-4" >
                <h1 className="text-white text-4xl font-bold ">Experience the power of networking</h1>
                <p className="text-white text-opacity-50 text-medium leading-normal font-semibold text-left tracking-wide ">The fourth industrial revolution, known as "Industry 4.0," has transformed the world of technology. However, it does not evolve on its own. By sharing our experiences and achievements during events, conferences, training sessions, and other professional gatherings, we hope that our collective efforts will position us at the forefront of decision-makers in the digital world.</p>
            </div>
            <div className="w-[958px] h-[230px] grid grid-cols-2 gap-2 pt-4">
                <div className="w-[350px] h-[230px] space-y-5">
                    <ArrowTrendingUpIcon className='h-10 w-10 text-white'/>
                    <h1 className="text-white text-lg font-medium">A Strong Professional Network</h1>
                    <p className="text-white text-opacity-50 text-sm leading-normal font-normal text-left tracking-wide ">The essence of startups lies in having a strong professional network. One of our fundamental objectives is to connect trusted entities, whether they are service providers, partners, or investors.</p>
                </div>
                <div className="w-[350px] h-[230px] space-y-5">
                    <RocketLaunchIcon className='h-10 w-10 text-white'/>
                    <h1 className="text-white text-lg font-medium">Successful Investments</h1>
                    <p className="text-white text-opacity-50 text-sm leading-normal font-normal text-left tracking-wide">We aim to showcase the successful experiences of startups and businesses and share them with our members. Working together, we strive to implement digital-based development projects.</p>
                </div>
            </div>
            <div className="w-[958px] h-[308px] grid grid-cols-2 gap-2 pt-4">
                <div className="w-[350px] h-[230px] space-y-5">
                    <FaHandHoldingHeart className='h-10 w-10 text-white' />
                    <h1 className="text-white text-lg font-medium">Unity and Strength</h1>
                    <p className="text-white text-opacity-50 text-sm leading-normal font-normal text-left tracking-wide ">Because unity is strength, one of our main objectives is to build a strong community that helps members overcome professional challenges and difficulties. Our aim is to become an official reference point for various sectors in the technological and digital world.</p>
                </div>
                <div className="w-[350px] h-[230px] space-y-5">
                    <MegaphoneIcon className='h-10 w-10 text-white'/>
                    <h1 className="text-white text-lg font-medium">Investment Opportunities</h1>
                    <p className="text-white text-opacity-50 text-sm leading-normal font-normal text-left tracking-wide">We aim to be the long-term partner for businesses of all sizes, providing partners, investors, and financial institutions with exceptional opportunities to invest and support inclusive and sustainable growth. Digital Morocco fosters relationships between startups, companies, and investors to unleash the potential of businesses and set them on a path of sustainable growth.</p>
                </div>
            </div>
        </div>
        

)
}