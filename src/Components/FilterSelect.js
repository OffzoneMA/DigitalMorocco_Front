import React from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/solid';

export default function FilterSelect({ title, options, selectedOptions, onChange }) {
 

  const handleItemClick = (item) => {
    const updatedOptions = [...selectedOptions];
    if (updatedOptions.includes(item)) {
      updatedOptions.splice(updatedOptions.indexOf(item), 1);
    } else {
      updatedOptions.push(item);
    }
    onChange(updatedOptions);
  };



  return (
    <div className='group relative w-full md:w-fit   font-semibold   cursor-pointer flex items-center justify-center gap-3 px-4 py-2 rounded-full border-2 border-blue-400 text-blue-400 hover:shadow-xl'>
    Filter By {title}
      <ChevronDownIcon
        className={'h-6 w-6 text-gray-400 transition-all duration-300 ease-out group-hover:-rotate-6'}
      />
      
      <div className=' hidden group-hover:inline absolute top-[100%] h-56 left-0 w-full z-[3] '>
        <div className='bg-white flex flex-col gap-4 px-4 py-4 rounded-3xl border-2 border-blue-400  mt-4 w-full '>

          {options.map((item) => (
            <div key={item}>
              <input
                type="checkbox" 
                className="cursor-pointer w-4 h-4 rounded-md bg-gray-200 checked:accent-[#25DAC5]"
                id={item}
                name={item}
                checked={selectedOptions.includes(item)}
                onChange={() => handleItemClick(item)}

              />
              <label htmlFor={item} className='text-lg p-2 font-semibold text-black'>
                {item}
              </label>
              
            </div>
          ))}

        </div>
    
      
    </div>
    </div>
    
  );
}
