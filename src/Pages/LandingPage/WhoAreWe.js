import React from 'react';
export default function WhoAreWe(){
    return(
        
        
        <div className="flex flex-col md:grid md:grid-cols-3 py-5 gap-4 md:gap-6 md:px-20 md:py-10 lg:px-40 lg:py-20 xl:px-60">
            <div className=""><p></p></div>
            <div className="col-span-2 space-y-4">
                <p className="md:text-left text-center font-bold text-xs  3xl:text-3xl 2xl:text-2xl text-gray700 tracking-wider">WHO ARE WE ?</p>
                <p className="md:text-left text-center md:text-medium 3xl:text-3xl 2xl:text-2xl text-lg xl:text-medium text-gray700 font-medium 3xl:leading-relaxed">Digital Morocco is a community of businesses, institutions, investors, and local and international experts in the digital field, working to develop skills and technologies and to qualify startups and digital projects to meet the challenges of the market and changes in the business environment in Morocco and around the world.</p>
            </div>
            <div>
                <p className="md:text-left text-center font-bold text-xs 3xl:text-3xl 2xl:text-2xl leading-6 text-gray700 tracking-wider " >OUR MISSION</p>
            </div>
            <div  className="col-span-2 space-y-4">
                <p className="md:text-left text-center text-gray500 text-opacity-70 font-medium text-sm 3xl:text-3xl 2xl:text-2xl xl:text-medium leading-normal 3xl:leading-relaxed ">To help professionals in the digital field grow their businesses. Digitalization is now everywhere, making our mission even more important and essential than ever.</p>
                <hr className=" w-full border-1  " />
            </div>
            <div>
                <p className="md:text-left text-center font-bold text-xs leading-6 text-gray700 tracking-wider 3xl:text-3xl 2xl:text-2xl" >OUR APPROACH</p>
            </div>
            <div className="col-span-2 space-y-4">
                <p className=" md:text-left text-center text-gray500 text-opacity-70 3xl:text-3xl 2xl:text-2xl font-medium text-sm leading-normal xl:text-medium 3xl:leading-relaxed ">Unity is strength, which is why we offer our members the opportunity to collaborate and progress together.</p>
                <hr className=" w-full border-1 " />
            </div>
            <div>
                <p className="md:text-left text-center font-bold text-xs leading-6 text-gray700 tracking-wider 3xl:text-3xl 2xl:text-2xl " >OUR SPIRIT</p>
            </div>
            <div className="col-span-2 space-y-4">
                <p className="md:text-left text-center text-gray500 text-opacity-70 font-medium text-sm leading-normal 3xl:text-3xl 2xl:text-2xl xl:text-medium 3xl:leading-relaxed ">Happy Business! Let's be demanding, efficient, reliable, and not take ourselves too seriously. Enjoying working as a team makes every experience and encounter effective AND fun.</p>  
                <hr className=" w-full border-1  " />
            </div>
            <div>
                <p className="md:text-left text-center font-bold text-xs leading-6 text-gray700 tracking-wider 3xl:text-3xl 2xl:text-2xl" >OUR MOTTO</p>
            </div>
            <div className="col-span-2 space-y-4">
                <p className="md:text-left text-center text-gray500  text-opacity-70 font-medium text-sm leading-normal 3xl:text-3xl 2xl:text-2xl xl:text-medium 3xl:leading-relaxed ">Mutual Aid Giving and receiving. Helping others and receiving their help. It is noble and highly efficient.</p> 
                <hr className=" w-full border-1  " />
            </div>
        </div>
        
        
        
        
)
}
{/* <p className="md:text-left text-center font-bold text-xs  3xl:text-3xl 2xl:text-2xl text-gray700 tracking-wider">WHO ARE WE ?</p>
                <p className="md:text-left text-center md:text-medium 3xl:text-3xl 2xl:text-2xl 2xl:max-w-screen-lg 3xl:max-w-screen-xl text-lg xl:text-medium text-gray700 font-medium 3xl:leading-relaxed">Digital Morocco is a community of businesses, institutions, investors, and local and international experts in the digital field, working to develop skills and technologies and to qualify startups and digital projects to meet the challenges of the market and changes in the business environment in Morocco and around the world.</p>
            
        </div>
            <div className="flex flex-col items-center justify-center md:justify-start md:items-start space-y-4 3xl:space-y-10 md:mx-40 lg:mx-20 xl:px-80 xl:py-20">
                <div className="flex flex-col md:flex-row 2xl:flex-col items-center justify-center md:justify-start md:items-start 2xl:space-y-6 ">
                    <p className=" basis-1/4 md:text-left text-center font-bold text-xs 3xl:text-3xl 2xl:text-2xl leading-6 text-gray700 tracking-wider " >OUR MISSION</p>
                    <p className=" basis-1/2 md:text-left text-center text-gray500 text-opacity-70 font-medium text-sm 3xl:text-3xl 2xl:text-2xl 3xl:max-w-screen-xl 2xl:max-w-screen-lg xl:text-medium leading-normal 3xl:leading-relaxed">To help professionals in the digital field grow their businesses. Digitalization is now everywhere, making our mission even more important and essential than ever.</p>
                </div>
                <hr className=" w-1/2 border-1 my-3  lg:mx-56  xl:m-auto " />
                
                <div className="flex flex-col md:flex-row 2xl:flex-col items-center  justify-center md:justify-start md:items-start 2xl:space-y-6">
                    <p className=" basis-1/4  md:text-left text-center font-bold text-xs leading-6 text-gray700 tracking-wider 3xl:text-3xl 2xl:text-2xl" >OUR APPROACH</p>
                    <p className=" basis-1/2  md:text-left text-center text-gray500 text-opacity-70 3xl:text-3xl 2xl:text-2xl font-medium text-sm leading-normal 3xl:max-w-screen-xl 2xl:max-w-screen-lg xl:text-medium 3xl:leading-relaxed">Unity is strength, which is why we offer our members the opportunity to collaborate and progress together.</p>
                </div>
                <hr className=' w-1/2 border-1 my-3 lg:mx-56  xl:m-auto ' />
                <div className="flex flex-col md:flex-row 2xl:flex-col items-center justify-center md:justify-start md:items-start 2xl:space-y-6">
                    <p className=" basis-1/4 md:text-left text-center font-bold text-xs leading-6 text-gray700 tracking-wider 3xl:text-3xl 2xl:text-2xl " >OUR SPIRIT</p>
                    <p className=" basis-1/2  md:text-left text-center text-gray500 text-opacity-70 font-medium text-sm leading-normal 3xl:text-3xl 2xl:text-2xl 3xl:max-w-screen-xl 2xl:max-w-screen-lg xl:text-medium 3xl:leading-relaxed">Happy Business! Let's be demanding, efficient, reliable, and not take ourselves too seriously. Enjoying working as a team makes every experience and encounter effective AND fun.</p>  
                </div>
                <hr className='w-1/2 border-1 my-3 lg:mx-56  xl:m-auto ' />
                <div className="flex flex-col md:flex-row 2xl:flex-col items-center justify-center md:justify-start md:items-start 2xl:space-y-6">
                    <p className=" basis-1/4 md:text-left text-center font-bold text-xs leading-6 text-gray700 tracking-wider 3xl:text-3xl 2xl:text-2xl" >OUR MOTTO</p>
                    <p className=" basis-1/2  md:text-left text-center text-gray500  text-opacity-70 font-medium text-sm leading-normal 3xl:text-3xl 2xl:text-2xl 3xl:max-w-screen-xl 2xl:max-w-screen-lg xl:text-medium 3xl:leading-relaxed">Mutual Aid Giving and receiving. Helping others and receiving their help. It is noble and highly efficient.</p> 
                </div>
                <hr className='w-1/2 border-1 my-3 lg:mx-56  xl:m-auto ' />
            </div>  */}