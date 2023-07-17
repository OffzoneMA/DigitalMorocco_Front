import React from 'react'
import PartnerCard from '../Components/PartnerCard'
import { partenaires } from '../data/data'
import { ChevronUpDownIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid'



export default function Partners() {
  return (
    <div className='flex justify-around relative'>
      <div className='w-[700px] h-screen sticky left-0 top-0  px-12 pt-7'>
        <div className='text-5xl font-semibold'>
          Partners 
        </div>
        <div>

        <div className='space-y-6'>

          <div className='text-2xl font-semibold pt-16'>
            Select Country
          </div>

            <div className='relative group cursor-pointer   '>
            <div className='bg-gray-200 flex justify-between items-center px-4 py-2 rounded-lg '>
              <span>All</span>
              <ChevronUpDownIcon className='h-6 w-6' />
            </div>
              <div className=' absolute hidden group-hover:inline transition ease-in-out duration-300 top-full bg-white  left-0 right-0 rounded-md '>
              <ul className='space-y-1 divide-y-2'>
                  <li className='px-4 py-1 cursor-pointer transition ease-in-out duration-300 hover:opacity-50 hover:bg-black/20 '>Morocco</li>
                  <li className='px-4 py-1 cursor-pointer transition ease-in-out duration-300 hover:opacity-50 hover:bg-black/20'>France</li>
                  <li className='px-4 py-1 cursor-pointer transition ease-in-out duration-300 hover:opacity-50 hover:bg-black/20'>Italy</li>
                  <li className='px-4 py-1 cursor-pointer transition ease-in-out duration-300 hover:opacity-50 hover:bg-black/20'>Germany</li>
                  <li className='px-4 py-1 cursor-pointer transition ease-in-out duration-300 hover:opacity-50 hover:bg-black/20'>Spain</li>
              </ul>
            </div>
          </div>

            <div className='space-x-2'>
              <input type="checkbox" />
              <label className='text-lg text-gray-700 '>Certified Only</label>
            </div>

            <div className='text-2xl font-semibold pt-7'>
              Partner Type
            </div>

            <div className='space-y-2'> 
            <div className='space-x-2'>
              <input type="checkbox" />
              <label className='text-lg text-gray-700 '>Gold</label>
            </div>
            <div className='space-x-2'>
              <input type="checkbox" />
              <label className='text-lg text-gray-700 '>Silver</label>
            </div>
            <div className='space-x-2'>
              <input type="checkbox" />
              <label className='text-lg text-gray-700 '>Bronze</label>
            </div>
            </div>
          </div>
        </div>
      </div>
    <div className='px-14 py-5 '>

      <br/>

      <div className='flex justify-end  pb-16 '>
  
          <div className='   bg-gray-200  p-3  rounded-xl flex items-center   '>
          <MagnifyingGlassIcon className="h-5 w-5 text-black " />
          <input
            type="text"
            placeholder="Search ... "
              className="  outline-none text-black m-0 border-0 focus:ring-0 px-2 pr-1 bg-gray-200 w-full"
          />

        </div>
        </div>
      <div className='flex gap-5  flex-wrap justify-between '>
        {
          partenaires.map((el, i) => (
            <PartnerCard partner={el} index={i} />
          ))
        }
      </div>
       
     
    </div>
    </div>
  )
}
