import React from 'react';
import PageTitle from '../Components/PageTitle';
import Landscape from './Explore/Landscape';
import Discover from './Explore/Discover';

export default function Explore(){
    return(
        <div>
        <div className='px-2 3xl:py-5'>
            <PageTitle subtitle={'Unleashing Growth and Innovation'} title={'Unlocking Opportunities through Networking'} text={''} />
            <div className="flex flex-col lg:grid lg:grid-cols-4 py-10 gap-8 sm:py-16 md:py-10 md:gap-x-16 md:px-10  lg:px-40  xl:px-60 3xl:px-80 3xl:gap-x-10 2xl:py-12 3xl:py-16">
                <div className="col-span-4 3xl:px-20">
                    <h2 className="text-center text-bleu2 font-bold text-2xl md:text-4xl ">Powering Connections and Fueling Growth for Startups, Companies, Project Holders, and Investors</h2>
                </div>
                <div className="col-span-2 ">
                    <p className="text-center lg:text-left text-color2 text-base font-semibold opacity-70 2xl:text-xl 2xl:leading-relaxed 3xl:text-2xl 3xl:leading-loose">Ignite Your Business Potential with Digital Morocco!<br/>Looking for a powerful platform to propel your business forward? Look no further!Digital Morocco is the ultimate hub for startups, companies, project holders, and investors, where incredible opportunities await.</p>
                </div>
                <div className="col-span-2 ">
                    <p className="text-center lg:text-left text-color2 text-base font-semibold opacity-70 2xl:text-xl 2xl:leading-relaxed 3xl:text-2xl 3xl:leading-loose">Digital Morocco is dedicated to fostering meaningful connections and driving business success. We accomplish this through a range of engaging activities, including professional events such as conferences and training sessions, as well as various networking opportunities.</p>
                </div>
            </div> 
            </div>
            <Landscape/>   
            <Discover/>     
        </div>
    )
}