import React from 'react'
import { NavLink } from 'react-router-dom'
import { ArrowRightIcon } from '@heroicons/react/24/solid'

export default function Header() {
  const activeLink = "text-gray-500 ";
  return (
    <div className='w-screen px-7 py-4 cursor-pointer '>
      <div className=' flex items-center justify-between  shadow-2xl rounded-full w-full px-8 py-3 '>

        <div className='flex items-center gap-8'>
          <img src="/img/offzoneLogo.jpg" alt="" className='h-12' />
          <div className='flex items-center gap-2'>
            <div className='cursor-pointer bg-gray-100 text-blue-300 rounded-full px-2 py-1'>En</div>
            <div className='cursor-pointer hover:bg-gray-100 hover:text-blue-300 rounded-full  px-2 py-1'>Fr</div>
          </div>
        </div>

        <div className='flex items-center gap-8 pr-9 font-medium'>
          <NavLink>
            Home
          </NavLink>
          <NavLink>
            Members
          </NavLink>
          <NavLink>
            Partners
          </NavLink>       
          <NavLink 
              to="/SignUp"
                className={({ isActive }) =>
                isActive ? activeLink  : ""
                }
          >
            Registration
          </NavLink>    
          <NavLink
               to="/SignIn"
                className={({ isActive }) =>
                isActive ? activeLink  : ""
                } 
          >
          Login
          </NavLink>   
            <NavLink className="flex items-center justify-center gap-1 text-blue-500">
            <span className='text-lg font-semibold'>Contact</span> 
            <ArrowRightIcon className='w-4 h-4' />
          </NavLink>
        </div>



      </div>


    </div>
  )
}
