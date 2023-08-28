import React from 'react';
import { NavLink} from 'react-router-dom';

export default function AboutDigitalM(){
    return(
        <div className="bg-[#F9FAFB] flex flex-col md:grid md:grid-cols-2 py-5 gap-10 px-3 md:gap-16 md:px-10 md:py-20  lg:px-40  xl:px-60 3xl:px-80">
            <div className="space-y-5">
                <h2 className="md:text-left text-center text-[#1E0E62] font-semibold 2xl:text-2xl 3xl:text-3xl">Unleashing Growth and Innovation</h2>
                <p className="md:text-left text-center text-[#15143966] font-medium text-medium 2xl:text-xl 3xl:text-2xl 3xl:leading-loose">Welcome to Digital Morocco, a thriving community of businesses, institutions, investors, and esteemed local and international experts in the digital field. We are united by a common goal: to foster the development of skills, advance cutting-edge technologies, and empower startups and digital projects to conquer the challenges of today's ever-evolving market.</p>
                <div className='flex items-center justify-center md:items-start md:justify-start'>
                <NavLink to="/About-Us/Explore" className=" text-[#1E0E62] font-semibold border-2 w-fit px-6 py-2 text-medium rounded-full border-[#EBEAED] cursor-pointer 2xl:text-xl 3xl:text-2xl">Explore</NavLink>            </div>
                </div>
            <div className='flex items-center justify-center'>
                <img src="/img/picture1.png" alt="" className="md:h-full md:w-full 3xl:w-full"/>
            </div>
            <div className='flex items-center justify-center'>
                <img src="/img/picture2.png" alt="" className="md:h-full md:w-full 3xl:w-full "/>
            </div>
            <div className="space-y-5 ">
                <h2 className="md:text-left text-center text-[#1E0E62] font-semibold 2xl:text-2xl 3xl:text-3xl">Revolutionizing the Future of Business in Morocco and Beyond</h2>
                <p className="md:text-left text-center text-[#15143966] font-medium text-medium 2xl:text-xl 3xl:text-2xl 3xl:leading-loose">Digital Morocco is a community comprised of businesses, institutions, investors, and local and international experts in the digital field. Our collective efforts are focused on developing skills, technologies, and qualifications for startups and digital projects, ensuring they are well-equipped to navigate market challenges and adapt to the evolving business environment in Morocco and worldwide.</p>
                <div className='flex items-center justify-center md:items-start md:justify-start'>
                <NavLink to="/About-Us/Explore" className=" text-[#1E0E62] font-semibold border-2 w-fit px-6 py-2 text-medium rounded-full border-[#EBEAED] cursor-pointer 2xl:text-xl 3xl:text-2xl">Explore</NavLink>
                </div>
            </div>
        </div>
    )
}