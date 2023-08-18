import React from 'react';

export default function WhyJoinUs(){
    return(
        <div className="flex flex-col sm:flex-col md:flex-row xl:flex-row lg:flex-row items-center justify-center md:items-start md:justify-start md:h-screen lg:h-screen xl:h-screen bg-[#F2F4F7]">
           <div>
            <div className="flex flex-col items-center justify-center md:items-start md:justify-start py-8 xl:pl-40 xl:pr-30 xl:py-20  md:px-10 md:py-10 lg:py-20 lg:pl-20 lg:pr-10 xl:mx-16 xl:space-y-2 sm:p-2">
                <h1 className="font-bold text-xs text-gray700 tracking-wider py-3 md:py-2 lg:py-3 xl:py-3" >WHY JOIN US?</h1>
                <h1 className="font-bold text-2xl sm:text-3xl md:text-3xl lg:text-4xl xl:text-4xl text-gray700 leading-normal text-center md:text-left lg:text-left xl:text-left">Discover a dynamic and innovative business networking platform</h1>
                <p className="font-semibold text-medium sm:text-lg md:text-lg lg:text-xl xl:text-xl text-gray700 leading-normal text-center tracking-wide md:text-left xl:text-left lg:text-left xl:py-6 lg:py-6 md:py-2  ">Digital Morocco is dedicated to fostering meaningful connections and driving business success.</p>
                
                <ul className="list-disc font-medium text-sm text-gray700 xl:py-3 lg:py-3 md:py-0 tracking-wide leading-loose pl-5 text-left">
                    <li>You will increase your visibility among professionals who share your vision and values.</li>
                    <li>Being part of a business network is an effective way to expand your contacts.</li>
                    <li>Participate in regular events and networking opportunities with professionals.</li>
                    <li>Boost your business through word-of-mouth and business referrals within a global network.</li>

                </ul>
                
            </div>
            </div> 
            <div className="pb-4 sm:pb-0 md:pb-0 lg:pb-0 xl:pb-0">
                <img src="/img/Frame.png" alt="" className='max-w-sm lg:max-w-lg xl:max-w-lg md:max-w-sm sm:max-w-sm xl:object-cover lg:object-cover md:object-cover sm:object-cover sm:h-[400px]  md:h-screen h-[300px] lg:h-screen xl:h-screen' />
            </div>
        </div>
)
}