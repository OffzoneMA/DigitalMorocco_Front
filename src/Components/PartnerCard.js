import React from 'react'
import { CheckBadgeIcon} from '@heroicons/react/24/solid'
import { NavLink } from 'react-router-dom'


export default function PartnerCard({partner,index}) {
  return (
    <NavLink
      to={"/Partners/" + index}
    >
    <div className=' flex flex-col rounded-lg border w-72  px-5 py-6'>
        <div className='flex justify-end'>
              <CheckBadgeIcon className='h-6 w-6 text-green-800' />
        </div>
        <div className='flex justify-center items-center'>
              <img src={partner.img} className='w-48 h-36 object-center object-contain' />
        </div>
          <h3 className='text-lg text-slate-950 font-semibold min-h-[60px]'>{partner.name}</h3>
          <br/>
          <div className=' flex items-center justify-between '>
            <div className='bg-gold px-4 py-1 uppercase font-semibold tracking-wider rounded-md'>{partner.badge}</div>
              <div>{partner.country}</div>

          </div>
    </div>
    </NavLink>
  )
}
