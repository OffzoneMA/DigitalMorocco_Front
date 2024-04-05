import React, { useState } from 'react';
import { BiChevronDown } from 'react-icons/bi';
import { IoSearch } from "react-icons/io5";


const SimpleSelect = ({ options, onSelect ,valuekey='',placeholder='' , searchable = true, searchLabel='Search', setSelectedOptionVal ,content , itemClassName='',className='' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [searchValue, setSearchValue] = useState("");

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setSelectedOptionVal(option);
    setIsOpen(false);
  };

  const filteredData = options.filter(investor => {
    if (typeof investor === 'string') {
      return investor.toLowerCase().includes(searchValue.toLowerCase());
    }
  
    const valueToCheck = investor[valuekey] ? investor[valuekey].toLowerCase() : "";
    return valueToCheck.includes(searchValue.toLowerCase());
  });
  


  return (
    <div className={`relative flex flex-col md:flex-1 w-full ${className}`}>
      <div
        className="flex md:flex-1 w-full items-center rounded-md p-2 border border-solid cursor-pointer"
        onClick={toggleDropdown}
      >
        <input
          className={`!placeholder:text-blue_gray-300 pr-1 !text-gray700 font-manrope font-normal cursor-pointer leading-18 tracking-wide p-0 text-left text-sm w-full bg-transparent border-0`}
          name="target"
          type="text"
          placeholder={placeholder}
          value={valuekey ? selectedOption[valuekey] : selectedOption? selectedOption: ""}
          readOnly
          style={{overflow:'hidden' , textOverflow:'ellipsis'}}
        />
        <BiChevronDown size={18} className='text-blue_gray-301' />
      </div>
      {isOpen && (
        <div className="absolute  top-9 origin-top-right left-0 w-full  mt-1 py-2 bg-white-A700 rounded-[6px] border border-gray-201 shadow-lg overflow-y-auto max-h-[340px] z-10" role="menu">
            {searchable && (
            <div className='flex w-full px-3'>
              <div className="flex w-full rounded-md py-1.5 px-2 border border-solid">
                <input
                  className={`!placeholder:text-blue_gray-300 !text-gray700 font-manrope text-left text-xs tracking-[0.14px] w-full bg-transparent border-0`}
                  type="text"
                  name="search"
                  placeholder={searchLabel}
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                />
                <IoSearch size={18} className="text-gray-400 z-20 hover:text-gray-500"/>
              </div>
            </div>
         )}
          <div className="py-2">
            {filteredData.map((option, index) => (
              <div
                key={index}
                className={`flex items-center w-full px-3 text-left cursor-pointer hover:bg-gray-100 ${itemClassName}`}
                onClick={() => handleOptionClick(option)}
              >
                {content(option)}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SimpleSelect;
