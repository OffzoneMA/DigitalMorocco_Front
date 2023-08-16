import React from 'react';
export default function OurActivities(){
    return(
        <div className="w-[1440px] h-[1432px] py-[100px] px-[233px]">
            <div className="w-[974px] h-[200px] px-[90px] py-0 space-y-3">
                <h1 className="text-center text-[#1E0E62] font-bold text-4xl">Our Activities</h1>
                <p className=" w-[794px] h-[128px] text-center text-[#15143966] font-semibold text-xl">Digital Morocco is dedicated to fostering meaningful connections and driving business success. We accomplish this through a range of engaging activities, including professional events such as conferences and training sessions.</p>
            </div>
            <div className="w-[974px] h-[970px] flex flex-wrap gap-14">
                <div className="w-[457px] h-[468px] flex flex-col rounded-lg border">
                    <div className='flex justify-center items-center'>
                        <img src="/img/Mask1.png" className='rounded-t w-[457px] h-[270px] object-center object-cover' />
                    </div>
                    <div className="w-[457px] h-[198px] space-y-3 px-5 py-5" >
                        <h1 className="text-lg font-semibold text-[#1E0E62]">Conferences and Seminars</h1>
                        <p className="w-[409px] h-[104px] text-left text-sm font-normal text-[#15143966]">Whether you are a speaker or a participant, our conferences will bring positive value to your business. You'll gain insights into the market and discover potential partners.</p>
                    </div>
                </div>

                <div className="w-[457px] h-[468px] flex flex-col rounded-lg border">
                    <div className='flex justify-center items-center'>
                        <img src="/img/Mask2.png" className='rounded-t w-[457px] h-[270px] object-center object-cover' />
                    </div>
                    <div className="w-[457px] h-[198px] space-y-3 px-5 py-5" >
                        <h1 className="text-lg font-semibold text-[#1E0E62]">Business Meetings</h1>
                        <p className="w-[409px] h-[104px] text-left text-sm font-normal text-[#15143966]">An innovative model of rapid, energetic, and friendly meetings. It provides opportunities to network with entrepreneurs, potential clients, or partners.</p>
                    </div>
                </div>

                <div className="w-[457px] h-[468px] flex flex-col rounded-lg border">
                    <div className='flex justify-center items-center'>
                        <img src="/img/Mask3.png" className='rounded-t w-[457px] h-[270px] object-center object-cover' />
                    </div>
                    <div className="w-[457px] h-[198px] space-y-3 px-5 py-5" >
                        <h1 className="text-lg font-semibold text-[#1E0E62]">Training</h1>
                        <p className="w-[409px] h-[104px] text-left text-sm font-normal text-[#15143966]">A potential strategy for acquiring new clients. Our programs are increasingly appealing to startups and businesses.</p>
                    </div>
                </div>

                <div className="w-[457px] h-[468px] flex flex-col rounded-lg border">
                    <div className='flex justify-center items-center'>
                        <img src="/img/Mask4.png" className='rounded-t w-[457px] h-[270px] object-center object-cover' />
                    </div>
                    <div className="w-[457px] h-[198px] space-y-3 px-5 py-5" >
                        <h1 className="text-lg font-semibold text-[#1E0E62]">Support and Guidance</h1>
                        <p className="w-[409px] h-[104px] text-left text-sm font-normal text-[#15143966]">Unleashing the potential of your company and setting it on a path of sustainable growth.</p>
                    </div>
                </div>
            </div>
        </div>
)
}