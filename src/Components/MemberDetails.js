import { XMarkIcon } from '@heroicons/react/24/solid';
import React from 'react';
export default function MemberDetails({teamMember,onClose}){
    return(
        <div className="relative px-5 py-10 md:px-10 lg:px-20 xl:px-60 xl:py-40 2xl:px-40 3xl:px-80">
        <div className=" absolute px-5 py-10 md:px-10 lg:px-20 xl:px-60 xl:py-40 -top-4 -right-4 2xl:px-40 3xl:px-80 2xl:-top-8 2xl:-right-8">
        <XMarkIcon className="h-4 w-4 2xl:h-10 2xl:w-10 text-[#F2F4F7] cursor-pointer hover:h-5 hover:w-5 hover:text-black 2xl:hover:h-11 2xl:hover:w-11 "  onClick={onClose} />
        </div>
        <div className="flex flex-col md:flex-row items-center gap-2 justify-center  md:items-stretch bg-[#F2F4F7]  ">
            
            <div className="">
                <img src={teamMember?.img} alt="" className=" md:max-w-xs md:h-full h-[240px] object-cover 2xl:max-w-sm"/>
            </div>
            <div className="flex flex-col items-start justify-start space-y-1 md:space-y-2 md:pt-20 md:px-5 lg:pt-20 px-2  lg:px-16 ">
                <p className="text-color2 text-center md:text-left text-sm font-bold uppercase 2xl:text-xl">{teamMember?.role}</p>
                <h2 className="text-gray700 font-bold text-xl text-left 2xl:text-3xl">{teamMember?.name}</h2>
                <p className=":text-left text-gray700 text-medium font-bold tracking-wide leading-relaxed pb-6 2xl:text-2xl 2xl:leading-loose">{teamMember?.desc1}</p>
                <p className="text-left text-gray700 text-sm  font-sm whitespace-break-spaces leading-relaxed 2xl:text-xl 2xl:leading-loose">{teamMember?.desc2}</p>
                <p className="text-left text-gray700 text-sm font-sm whitespace-break-spaces leading-relaxed 2xl:text-xl 2xl:leading-loose">{teamMember?.desc3}</p>
            </div>

        </div>
        </div>
    )
}