import React from 'react';
export default function OurActivities(){
    return(
        <div className="flex flex-col items-center justify-center md:items-start md:justify-start xl:items-center xl:justify-center p-5  ">
            <div className="flex-flex-col m-6 items-center justify-center md:items-start md:justify-start space-y-3  ">
                <h1 className="text-center text-[#1E0E62] font-bold text-4xl 3xl:text-5xl">Our Activities</h1>
                <p className=" 3xl:max-w-screen-2xl xl:mx-60 lg:mx-40 md:mx-20 text-center text-[#15143966] font-semibold text-lg xl:text-xl lg:text-xl 3xl:text-3xl">Digital Morocco is dedicated to fostering meaningful connections and driving business success. We accomplish this through a range of engaging activities, including professional events such as conferences and training sessions.</p>
            </div>
            <div className="flex flex-col px-4 lg:grid md:grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2  items-center justify-center md:items-start md:justify-start xl:items-center xl:justify-center gap-14 xl:px-46 lg:px-40 md:px-20 py-8 3xl:px-60 3xl:gap-36 md:items-stretch ">
                <div className="flex flex-col rounded-lg border ">
                    <div className='flex justify-center items-center'>
                        <img src="/img/Mask1.png" className='rounded-t object-center object-cover w-full  ' />
                    </div>
                    <div className="space-y-3 px-5 py-5 4xl:space-y-8 4xl:py-8 3xl:space-y-6 " >
                        <h1 className="text-lg 3xl:text-2xl font-semibold text-[#1E0E62]">Conferences and Seminars</h1>
                        <p className="text-left 3xl:text-2xl text-sm font-normal leading-normal text-[#15143966]">Whether you are a speaker or a participant, our conferences will bring positive value to your business. You'll gain insights into the market and discover potential partners.</p>
                    </div>
                </div>

                <div className="flex flex-col rounded-lg border ">
                    <div className='flex justify-center items-center'>
                        <img src="/img/Mask2.png" className='rounded-t object-center object-cover w-full ' />
                    </div>
                    <div className="space-y-3 px-5 py-5 3xl:space-y-6" >
                        <h1 className="text-lg 3xl:text-2xl font-semibold text-[#1E0E62]">Business Meetings</h1>
                        <p className="text-left 3xl:text-2xl leading-normal text-sm font-normal text-[#15143966]">An innovative model of rapid, energetic, and friendly meetings. It provides opportunities to network with entrepreneurs, potential clients, or partners.</p>
                    </div>
                </div>

                <div className="flex flex-col rounded-lg  border ">
                    <div className='flex justify-center items-center'>
                        <img src="/img/Mask3.png" className='rounded-t object-center object-cover w-full ' />
                    </div>
                    <div className="space-y-3 px-5 py-5 3xl:space-y-6" >
                        <h1 className="text-lg 3xl:text-2xl font-semibold text-[#1E0E62]">Training</h1>
                        <p className="text-left 3xl:text-2xl leading-normal text-sm font-normal text-[#15143966]">A potential strategy for acquiring new clients. Our programs are increasingly appealing to startups and businesses.</p>
                    </div>
                </div>

                <div className="flex flex-col rounded-lg  border ">
                    <div className='flex justify-center items-center'>
                        <img src="/img/Mask4.png" className='rounded-t object-center object-cover w-full ' />
                    </div>
                    <div className="space-y-3 px-5 py-5 3xl:space-y-6" >
                        <h1 className="text-lg 3xl:text-2xl font-semibold text-[#1E0E62]">Support and Guidance</h1>
                        <p className="text-left 3xl:text-2xl leading-normal text-sm font-normal text-[#15143966]">Unleashing the potential of your company and setting it on a path of sustainable growth.</p>
                    </div>
                </div>
            </div>
        </div>
)
}