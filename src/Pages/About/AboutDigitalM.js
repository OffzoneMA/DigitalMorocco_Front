import React from 'react';
export default function AboutDigitalM(){
    return(
        <div className="bg-[#F9FAFB] flex flex-col md:grid md:grid-cols-2 py-5 gap-10 px-3 md:gap-16 md:px-20 md:py-20  lg:px-40  xl:px-60">
            <div className="space-y-5">
                <h2 className="md:text-left text-center text-[#1E0E62] font-semibold ">Unleashing Growth and Innovation</h2>
                <p className="md:text-left text-center text-[#15143966] font-medium text-medium">Welcome to Digital Morocco, a thriving community of businesses, institutions, investors, and esteemed local and international experts in the digital field. We are united by a common goal: to foster the development of skills, advance cutting-edge technologies, and empower startups and digital projects to conquer the challenges of today's ever-evolving market.</p>
                <button className="md:text-left text-center text-[#1E0E62] font-semibold border-2 w-fit px-6 py-2 rounded-full">Explore</button>
            </div>
            <div>
                <img src="/img/picture1.png" alt="" className=""/>
            </div>
            <div>
                <img src="/img/picture2.png" alt="" className=""/>
            </div>
            <div className="space-y-5">
                <h2 className="md:text-left text-center text-[#1E0E62] font-semibold">Revolutionizing the Future of Business in Morocco and Beyond</h2>
                <p className="md:text-left text-center text-[#15143966] font-medium text-medium">Digital Morocco is a community comprised of businesses, institutions, investors, and local and international experts in the digital field. Our collective efforts are focused on developing skills, technologies, and qualifications for startups and digital projects, ensuring they are well-equipped to navigate market challenges and adapt to the evolving business environment in Morocco and worldwide.</p>
                <button className="flex justify-center items center text-[#1E0E62] font-semibold border-2 w-fit px-6 py-2 text-medium rounded-full border-[#EBEAED]">Explore</button>
            </div>
        </div>
    )
}