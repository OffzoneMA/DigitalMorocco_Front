import React from 'react'
import { ChevronDownIcon} from '@heroicons/react/24/solid';

export default function FilterSelect({title,setItems,items}) {
  return (
          <div className='group relative w-fit z-[2]   font-semibold   cursor-pointer flex items-center justify-center gap-3 px-4 py-2 rounded-full border-2 border-blue-400 text-blue-400'>
            Filter By {title}
              <ChevronDownIcon  className='h-6 w-6 text-gray-400 transition-all duration-300 ease-out group-hover:rotate-180'/>
          <div className=' hidden group-hover:inline absolute top-[100%] h-56 left-0 w-full '>
              <div className='bg-white flex flex-col gap-4 px-4 py-4 rounded-xl border border-blue-400  mt-4 w-full'>
              <div>
                  <input type="checkbox" name='Healthcare' placeholder='Healthcare'  />
                  <label htmlFor='Healthcare' className='text-lg p-2 font-semibold'>Healthcare</label>
              </div>
                  <div>
                      <input type="checkbox" name='Healthcare' placeholder='Healthcare' />
                      <label htmlFor='Healthcare' className='text-lg p-2 font-semibold'>Healthcare</label>
                  </div>
                  <div>
                      <input type="checkbox" name='Healthcare' placeholder='Healthcare' />
                      <label htmlFor='Healthcare' className='text-lg p-2 font-semibold'>Healthcare</label>
                  </div>
              </div> 
              </div>
        </div>
  )
}
