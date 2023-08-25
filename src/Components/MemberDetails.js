import { XMarkIcon } from '@heroicons/react/24/solid';
import React from 'react';
export default function MemberDetails({teamMember,onClose}){
    return(
        <div className="relative px-60 md:py-40 py-60r">
        <div className=" absolute  px-60 py-40 -top-4 -right-4">
        <XMarkIcon className="h-4 w-4 text-[#F2F4F7] cursor-pointer hover:h-5 hover:w-5 hover:text-black"  onClick={onClose} />
        </div>
        <div className="flex flex-col md:flex-row items-center gap-2 justify-center md:items-start md:justify-start md:items-stretch bg-[#F2F4F7]  ">
            
            <div className="">
                <img src={teamMember?.img} alt="" className=" max-w-xs h-full  object-cover "/>
            </div>
            <div className="flex flex-col  items-center justify-center md:items-start md:justify-start space-y-2 pt-20 px-16">
                <p className="text-color2 text-center md:text-left text-sm font-bold uppercase">{teamMember?.role}</p>
                <h2 className="text-gray700 font-bold text-xl text-center md:text-left">{teamMember?.name}</h2>
                <p className="text-center md:text-left text-gray700 text-medium font-bold tracking-wide leading-relaxed pb-6">{teamMember?.desc1}</p>
                <p className="text-center md:text-left text-gray700 text-sm  font-sm whitespace-break-spaces leading-relaxed">{teamMember?.desc2}</p>
                <p className="text-center md:text-left text-gray700 text-sm font-sm whitespace-break-spaces leading-relaxed">{teamMember?.desc3}</p>
            </div>

        </div>
        </div>
    )
}