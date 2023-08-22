import React from 'react';

export default function WhyJoinUs(){
    return(
        <div className="flex flex-col md:flex-row-reverse items-center justify-center md:items-start md:justify-start md:h-screen bg-[#F2F4F7]  ">
           <div className="pb-4 sm:pb-0 ">
                <img src="/img/Frame.png" alt="" className='max-w-sm lg:max-w-lg  sm:object-cover sm:h-[400px]  md:h-screen h-[300px] 2xl:max-w-screen-4xl object-left' />
            </div>
           <div className="">

            <div className="flex flex-col items-center justify-center md:items-start md:justify-start py-8 3xl:px-40 3xl:py-30 xl:px-20  md:px-10 md:py-10 lg:py-20 lg:pl-20 lg:pr-10 xl:mx-16 xl:space-y-2 sm:p-2 ">
                <h1 className="font-bold text-xs text-gray700 tracking-wider py-3 md:py-2 lg:py-3 3xl:text-5xl 2xl:text-3xl" >WHY JOIN US?</h1>
                <h1 className="font-bold text-2xl sm:text-3xl lg:text-4xl  3xl:text-6xl 2xl:text-4xl text-gray700 leading-normal text-center md:text-left ">Discover a dynamic and innovative business networking platform</h1>
                <p className="font-semibold text-medium sm:text-lg lg:text-xl 3xl:text-5xl 2xl:text-3xl text-gray700 leading-normal text-center tracking-wide  md:text-left lg:py-6 md:py-2  ">Digital Morocco is dedicated to fostering meaningful connections and driving business success.</p>
                
                <ul className="list-disc font-medium text-sm  3xl:text-4xl 2xl:text-2xl list-outside  text-gray700 xl:py-3 lg:py-3 md:py-0 tracking-wide  3xl:space-y-6   text-left pl-5 xl:space-y-3 leading-normal ">
                    <li>You will increase your visibility among professionals who share your vision and values.</li>
                    <li>Being part of a business network is an effective way to expand your contacts.</li>
                    <li>Participate in regular events and networking opportunities with professionals.</li>
                    <li>Boost your business through word-of-mouth and business referrals within a global network.</li>

                </ul>
                
            </div>
            </div> 
           
        </div>
)
}