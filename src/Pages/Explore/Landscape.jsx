import React from 'react';
export default function Landscape(){
    return(
        <div className="space-y-8 py-5">
            <div className="">
                <h2 className="text-center text-bleu2 font-bold text-2xl md:text-4xl">Navigating the Business Landscape</h2>
            </div>
            <div className="lg:px-40 xl:px-72 3xl:px-80 ">
                <p className="text-center text-color2 text-base font-semibold opacity-70 text-center md:mx-20  3xl:leading-loose 3xl:text-2xl 2xl:text-xl 2xl:leading-relaxed">At Digital Morocco, we believe that growth and innovation are the pillars of success in today's competitive business landscape. Our platform is designed to provide you with the tools, resources, and connections you need to foster both.</p>
            </div>
            <div className="flex flex-col md:grid md:grid-cols-2 lg:grid lg:grid-cols-3 justify-center items-center gap-5 lg:px-40 xl:px-60 3xl:px-80">
                <div className="flex flex-col items-center justify-center space-y-2">
                    <img src="/img/BusinessMind.png" alt="" className="h-24 2xl:h-32"/>
                    <h2 className="text-center font-medium text-medium	text-[#151439CC] opacity-80 3xl:text-2xl 2xl:text-xl ">Empowering Your Growth</h2>
                    <p className="text-center font-normal text-sm	text-color2 opacity-60 3xl:opacity-80 3xl:text-2xl 2xl:text-xl 2xl:leading-relaxed 3xl:leading-loose">With a dynamic community of startups, companies, investors, and experts, you'll find endless opportunities for collaboration, partnerships, and expansion.</p>
                </div>
                <div className="flex flex-col items-center justify-center space-y-2">
                    <img src="/img/Partners.png" alt="" className="h-24 2xl:h-32"/>
                    <h2 className="text-center font-medium text-medium	text-[#151439CC] opacity-80 3xl:text-2xl 2xl:text-xl">Collaboration that Counts</h2>
                    <p className="text-center font-normal text-sm	text-color2 opacity-60 3xl:opacity-80 3xl:text-2xl 2xl:text-xl 2xl:leading-relaxed 3xl:leading-loose">The magic happens when minds come together. Digital Morocco provides a collaborative space where ideas are born</p>
                </div>
                <div className="flex flex-col items-center justify-center space-y-2 2xl:h-32 md:col-span-2 lg:col-auto">
                    <img src="/img/Montain.png" alt="" className="h-24"/>
                    <h2 className="text-center font-medium text-medium	text-[#151439CC] opacity-80 3xl:text-2xl 2xl:text-xl">Your Path to Success</h2>
                    <p className="text-center font-normal text-sm	text-color2 opacity-60 3xl:opacity-80 3xl:text-2xl 2xl:text-xl 2xl:leading-relaxed 3xl:leading-loose md:mx-60 lg:mx-0">Success isn't a destination; it's a journey. With Digital Morocco as your partner, you'll navigate this journey with confidence.</p>
                </div>
            </div>
        </div>
    )
}