import React from 'react';
export default function OurActivities(){
    return(
        <div className="flex flex-col items-center justify-center md:items-start md:justify-start ">
            <div className="flex-flex-col m-6 items-center justify-center md:items-start md:justify-start space-y-3">
                <h1 className="text-center text-[#1E0E62] font-bold text-4xl">Our Activities</h1>
                <p className="xl:mx-60 lg:mx-40 md:mx-20 text-center text-[#15143966] font-semibold text-lg xl:text-xl lg:text-xl">Digital Morocco is dedicated to fostering meaningful connections and driving business success. We accomplish this through a range of engaging activities, including professional events such as conferences and training sessions.</p>
            </div>
            <div className="flex flex-col lg:grid md:grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 items-center justify-center md:items-start md:justify-start gap-14 xl:px-60 lg:px-40 md:px-20 py-8 ">
                <div className="flex flex-col rounded-lg border max-w-[457px] max-h-[468px] xl:h-[400px] lg:h-[380px] md:h-[360px]">
                    <div className='flex justify-center items-center'>
                        <img src="/img/Mask1.png" className='rounded-t object-center object-cover' />
                    </div>
                    <div className="space-y-3 px-5 py-5" >
                        <h1 className="text-lg font-semibold text-[#1E0E62]">Conferences and Seminars</h1>
                        <p className="text-left text-sm font-normal text-[#15143966]">Whether you are a speaker or a participant, our conferences will bring positive value to your business. You'll gain insights into the market and discover potential partners.</p>
                    </div>
                </div>

                <div className="flex flex-col rounded-lg border max-w-[457px] max-h-[468px] xl:h-[400px] lg:h-[380px] md:h-[360px]">
                    <div className='flex justify-center items-center'>
                        <img src="/img/Mask2.png" className='rounded-t object-center object-cover' />
                    </div>
                    <div className="space-y-3 px-5 py-5" >
                        <h1 className="text-lg font-semibold text-[#1E0E62]">Business Meetings</h1>
                        <p className="text-left text-sm font-normal text-[#15143966]">An innovative model of rapid, energetic, and friendly meetings. It provides opportunities to network with entrepreneurs, potential clients, or partners.</p>
                    </div>
                </div>

                <div className="flex flex-col rounded-lg max-w-[457px] max-h-[468px] xl:h-[400px] lg:h-[380px] md:h-[360px] border">
                    <div className='flex justify-center items-center'>
                        <img src="/img/Mask3.png" className='rounded-t object-center object-cover' />
                    </div>
                    <div className="space-y-3 px-5 py-5" >
                        <h1 className="text-lg font-semibold text-[#1E0E62]">Training</h1>
                        <p className="text-left text-sm font-normal text-[#15143966]">A potential strategy for acquiring new clients. Our programs are increasingly appealing to startups and businesses.</p>
                    </div>
                </div>

                <div className="flex flex-col rounded-lg max-w-[457px] max-h-[468px] xl:h-[400px] lg:h-[380px] md:h-[360px] border">
                    <div className='flex justify-center items-center'>
                        <img src="/img/Mask4.png" className='rounded-t object-center object-cover' />
                    </div>
                    <div className="space-y-3 px-5 py-5" >
                        <h1 className="text-lg font-semibold text-[#1E0E62]">Support and Guidance</h1>
                        <p className="text-left text-sm font-normal text-[#15143966]">Unleashing the potential of your company and setting it on a path of sustainable growth.</p>
                    </div>
                </div>
            </div>
        </div>
)
}