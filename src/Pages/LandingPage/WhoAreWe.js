import React from 'react';
export default function WhoAreWe(){
    return(
        <div>
        <div className='flex items-center justify-center md:items-start md:justify-start py-8 sm:px-5 md:pl-10 lg:pl-40 space-y-6'>
            <div className="flex flex-col items-center justify-center  md:items-start md:justify-start md:mx-40 xl:mx-80 space-y-2">
                <p className="md:text-left text-center font-bold text-xs leading-6 text-gray700 tracking-wider">WHO ARE WE ?</p>
                <p className="md:text-left text-center md:text-medium text-lg text-gray700 font-medium ">Digital Morocco is a community of businesses, institutions, investors, and local and international experts in the digital field, working to develop skills and technologies and to qualify startups and digital projects to meet the challenges of the market and changes in the business environment in Morocco and around the world.</p>
            </div>
        </div>
            <div className="flex flex-col items-center justify-center md:items-start md:justify-start pb-8 lg:pl-40 md:pl-40 space-y-4">
                <div className="flex flex-col xl:flex-row md:flex-row items-center justify-center md:items-start md:justify-start w-full">
                    <p className="xl:pl-20 basis-1/4 md:text-left text-center font-bold text-xs leading-6 text-gray700 tracking-wider " >OUR MISSION</p>
                    <p className="xl:pl-5 basis-1/2 md:text-left text-center text-gray500 text-opacity-70 font-medium text-sm leading-normal">To help professionals in the digital field grow their businesses. Digitalization is now everywhere, making our mission even more important and essential than ever.</p>
                </div>
                <hr className=" w-[495px] border-1 my-3 xl:mx-80 lg:mx-56" />
                
                <div className="flex flex-col xl:flex-row md:flex-row items-center justify-center md:items-start md:justify-start w-full ">
                    <p className="xl:pl-20 basis-1/4 font-bold text-xs leading-6 text-gray700 tracking-wider " >OUR APPROACH</p>
                    <p className="xl:pl-5 basis-1/2 md:text-left text-center text-gray500 text-opacity-70 font-medium text-sm leading-normal ">Unity is strength, which is why we offer our members the opportunity to collaborate and progress together.</p>
                </div>
                <hr className=' w-[495px] border-1 my-3 xl:mx-80 lg:mx-56' />
                <div className="flex flex-col xl:flex-row md:flex-row  items-center justify-center md:items-start  md:justify-start w-full">
                    <p className="xl:pl-20 basis-1/4 font-bold text-xs leading-6 text-gray700 tracking-wider " >OUR SPIRIT</p>
                    <p className="xl:pl-5 basis-1/2 md:text-left text-center text-gray500 text-opacity-70 font-medium text-sm leading-normal ">Happy Business! Let's be demanding, efficient, reliable, and not take ourselves too seriously. Enjoying working as a team makes every experience and encounter effective AND fun.</p>  
                </div>
                <hr className='w-[495px] border-1 my-3 xl:mx-80 lg:mx-56' />
                <div className="flex flex-col xl:flex-row md:flex-row items-center justify-center md:items-start  md:justify-start w-full">
                    <p className="xl:pl-20 basis-1/4 font-bold text-xs leading-6 text-gray700 tracking-wider" >OUR MOTTO</p>
                    <p className="xl:pl-5 basis-1/2 md:text-left text-center text-gray500  text-opacity-70 font-medium text-sm leading-normal">Mutual Aid<br/>
                    Giving and receiving. Helping others and receiving their help. It is noble and highly efficient.</p> 
                </div>
                <hr className='w-[495px] border-1 my-3 xl:mx-80 lg:mx-56' />
            </div> 
            </div>
        
        
)
}