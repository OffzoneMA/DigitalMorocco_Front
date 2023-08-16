import React from 'react';

export default function WhyJoinUs(){
    return(
        <div className="w-[1440px] h-[720px] py-0 pl-[233px] bg-[#F2F4F7] grid grid-cols-2  ">
            <div>
            <div className="w-[552px] h-[720px] -mx-28 my-20 -px-8">
                <h1 className="font-bold text-xs text-gray700 tracking-wider py-3 " >WHY JOIN US?</h1>
                <h1 className="font-bold text-4xl text-gray700 leading-normal ">Discover a dynamic and innovative business networking platform</h1>
                <p className="font-semibold text-xl text-gray700 leading-normal  tracking-wide py-6 ">Digital Morocco is dedicated to fostering meaningful connections and driving business success.</p>
                
                <ul className="list-disc h-[231px] font-medium text-sm/[16px] text-gray700 py-5 tracking-wide leading-loose pl-[30px] pr-[30px]">
                    <li>You will increase your visibility among professionals who share your vision and values.</li>
                    <li>Being part of a business network is an effective way to expand your contacts.</li>
                    <li>Participate in regular events and networking opportunities with professionals.</li>
                    <li>Boost your business through word-of-mouth and business referrals within a global network.</li>

                </ul>
                
            </div>
            </div>
            <div className="">
                <img src="/img/Frame.png" alt="" className='w-[535px] h-[720px]' />
            </div>
        </div>
)
}