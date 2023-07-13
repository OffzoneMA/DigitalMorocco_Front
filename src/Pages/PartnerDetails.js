import React from 'react'
import {  useParams } from "react-router-dom";
import { partenaires } from '../data/data'
import { ArrowLeftIcon, ArrowTopRightOnSquareIcon, CheckBadgeIcon } from '@heroicons/react/24/solid'
import { NavLink } from 'react-router-dom'


export default function PartnerDetails() {
    const params = useParams();
    const partner = partenaires[params.partnerId]
  return (
    <div className='min-h-screen   '>
         <NavLink
              to={"/"}
              className="flex items-center text-gray-400 gap-1"
          >
              <ArrowLeftIcon className='h-4 w-4' />
              <span>Explore More Partners</span>
            </NavLink> 

          <div className='w-screen flex  gap-24 pt-40'>
            <div className='bg-gray-50 space-y-10 py-7 px-10 rounded-lg '>
                <h1 className='text-4xl font-semibold'>{partner.name}</h1>
                <p className='text-gray-600 text-lg'>{partner.desc}</p>
                <button className='px-6 py-3 bg-blue-500 text-white'>Contact now</button>
            </div>
              <div className=' mr-14 space-y-4'>
              <div className=' flex flex-col rounded-lg border  p-10 '>
                  <div className='flex justify-end'>
                      <CheckBadgeIcon className='h-9 w-9 text-green-800' />
                  </div>
                  <div className='flex justify-center items-center bg-slate-900 '>
                      <img src={partner.img} className='min-w-[200px] max-w-[250px] ' />
                  </div>
                 
              </div>
                <div className='space-y-3'>
                  <div className='bg-bronze w-full py-2 text-center rounded-lg text-lg'>
                      Certified Bronze Partner
                  </div>
                  <a href="/" className='flex items-center justify-center text-sm'>
                      <span>View Certificate</span>
                      <ArrowTopRightOnSquareIcon className='w-4 h-4' />
                  </a>

                </div>
              </div>
          </div>
    </div>
  )
}
