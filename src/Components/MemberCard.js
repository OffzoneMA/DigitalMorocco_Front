import React from 'react'
import { NavLink } from 'react-router-dom';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/solid';

export default function MemberCard({ member }) {
        return (
            <NavLink
            className={''}
            /*to={"/Member/" + member?._id}*/>
                <div className=' transition-all ease-in-out duration-300 hover:scale-105 hover:shadow-2xl flex flex-col rounded-xl border-2 border-[#EBEAED] bg-[#FCFCFD] w-72 px-5 mb-4 mx-2 py-2 my-2 '>
                    <div className='flex justify-center items-center mb-1 '>
                        <img src={member?.logo} className='w-52 h-36 object-center object-contain' alt='' />
                    </div>
                    <div className='my-1 text-center mb-2 grid grid-cols-2 gap-2'>
                        <h3 className='text-lg text-bleu2 font-semibold min-h-[40px] col-span-1 whitespace-nowrap overflow-hidden overflow-ellipsis'>{member?.companyName}</h3>
                        <div className="border-2 border-blue-400 bg-blue-100 text-blue-400 p-2 rounded-3xl col-span-1">
                        {member?.companyType}
                        </div>
                    </div>
                    <div className='my-1 text-center mb-2'>
                        <p className='text-base text-gray-500 font-medium h-[100px] text-ellipsis overflow-hidden'>

                            {member?.desc ? member?.desc : "Elevating online shopping with AI-driven recommendations and effortless browsingElevating online shopping with AI-driven recommendations and effortless browsingElevating online shopping with AI-driven recommendations and effortless browsingElevating online shopping with AI-driven recommendations and effortless browsing."}
                            </p>
                    </div>
                    <div className='flex items-center justify-between mt-2'
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className='flex items-center my-1'>
                            <a 
                            rel='noopener noreferrer'
                             href={member?.website.startsWith("http") ? member?.website : "//" + member?.website} target='_blank' className='text-blue-500 hover:underline font-medium tracking-wider'>
                                Visit Website
                            </a>
                            <ArrowTopRightOnSquareIcon className='text-blue-500 h-5 w-8 ml-1 icon-bold' />
                        </div>
                    </div>
                </div>
            </NavLink>
        );
    }