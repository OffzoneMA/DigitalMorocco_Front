import React from 'react';
import { NavLink } from 'react-router-dom';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/solid';


export default function PartnerCard({ partner }) {
  return (
    <NavLink /*to={"/Partners/" + index}*/>
      <div className=' transition-all ease-in-out duration-300 hover:scale-105 hover:shadow-2xl flex flex-col rounded-xl border-2 border-[#EBEAED] bg-[#FCFCFD] w-72 px-5 mb-4 mx-2 py-2 my-2 '>
      <div className='flex justify-center items-center mb-1 '>
          <img src={partner?.logo} className='w-52 h-36 object-center object-contain' alt='' />
      </div>
      <div className='my-1 text-center mb-2'>
        <h3 className='text-lg text-bleu2 font-semibold min-h-[40px]'>{partner?.cmpanyName}</h3>
        <h3 className='text-base text-gray-500 font-medium min-h-[40px] mt-2'>{partner?.desc}</h3>
      </div>
      <div className='flex items-center justify-between mt-2'>
        <div
            onClick={(e) => e.stopPropagation()}
         className='flex items-center my-1'>
            <a href={partner?.website.startsWith("http") ? partner?.website : "//" + partner?.website} target='_blank' className='text-blue-500 hover:underline font-medium tracking-wider'>
            Visit Website
          </a>
          <ArrowTopRightOnSquareIcon className='text-blue-500 h-5 w-8 ml-1 icon-bold' />
        </div>
      </div>
    </div>
  </NavLink>
  
  );
}

