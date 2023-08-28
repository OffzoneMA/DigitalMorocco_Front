import React from 'react';

export default function TeamMemberCard( {teamMember,onClick}){

    return(
                <div onClick={onClick} className="space-y-2 cursor-pointer ">
                    <img src={teamMember?.img} alt="" className="rounded-lg h-[240px] 2xl:h-[300px] 3xl:h-[340px]"/>
                    <h2 className="text-color1 text-center font-semibold text-lg 2xl:text-2xl ">{teamMember?.name}</h2>
                    <p className="text-color2 text-center font-medium text-medium 2xl:text-xl ">{teamMember?.role}</p>
                </div>

    );
}