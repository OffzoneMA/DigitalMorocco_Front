import React from 'react';

export default function TeamMemberCard( {teamMember,onClick}){

    return(
                <div onClick={onClick} className="space-y-2 cursor-pointer ">
                    <img src={teamMember?.img} alt="" className="rounded-lg h-[240px] "/>
                    <h2 className="text-color1 text-center font-semibold text-lg ">{teamMember?.name}</h2>
                    <p className="text-color2 text-center font-medium text-medium">{teamMember?.role}</p>
                </div>

    );
}