import React from "react";
const PageTitle = ({title,subtitle,text}) => {
    return (
     
        <div className="relative flex flex-col items-center justify-center py-8 w-screen h-[500px] ">
             <div className="absolute left-0 top-0 bg-[url('/public/img/Ornament.png')] bg-no-repeat bg-cover h-[388px] w-[500px] "></div>
             <h1 className="text-sm md:text-sm font-normal mb-2 md:mb-3 text-gray-400 text-center">
                {subtitle}
            </h1>
            <h1 className={`${text ? 'md:text-3xl text-left':'md:text-5xl text-center'} text-2xl  font-semibold mb-4 md:mb-8 text-bleu2  xl:px-72`}>
               {title}
            </h1>
            {text && <p className="text-base font-semibold text-gray-700 md:text-sm w-[618px]">
               {text}
    </p>}
           
  
        </div>
  
    );
};
export default PageTitle;