import React, { useState , useRef , useEffect } from 'react';
import { BiChevronDown } from 'react-icons/bi';
import { IoIosCheckmark } from 'react-icons/io';
import { IoSearch } from "react-icons/io5";
import ReactDOM from 'react-dom';


const MultipleSelect = ({ options, onSelect, valuekey='',optionkey='',placeholder='', searchable = true, searchLabel='Search' , setSelectedOptionVal , content , itemClassName='' , className=''}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    if (isOpen) {
      setTimeout(() => {
        setIsOpen(false); // Ferme le dropdown après un court délai
      }, 0);
    } else {
      setIsOpen(true); // Ouvre le dropdown
    }
  };
  
  
  
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target) && isOpen) {
      setIsOpen(false); // Ferme le dropdown seulement si il est ouvert
    }
  };
  

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // const handleOptionClick = (option) => {
  //   if (selectedOptions.some(selectedOption => selectedOption.id === option.id)) {
  //       setSelectedOptions(selectedOptions.filter((item) => item.id !== option.id));
  //       setSelectedOptionVal(selectedOptions.filter((item) => item.id !== option.id));
  //       console.log(selectedOptions)
        
  //     } else {
  //       setSelectedOptions([...selectedOptions, option]);
  //       setSelectedOptionVal([...selectedOptions, option]);
  //     }
  // };

  const handleOptionClick = (option) => {
    if(optionkey) {
      const optionValue = option[optionkey];
      if (selectedOptions.some(selectedOption => selectedOption[optionkey] === optionValue)) {
        setSelectedOptions(selectedOptions.filter((item) => item[optionkey] !== optionValue));
        setSelectedOptionVal(selectedOptions.filter((item) => item[optionkey] !== optionValue));
        console.log(selectedOptions);
      } else {
        setSelectedOptions([...selectedOptions, option]);
        setSelectedOptionVal([...selectedOptions, option]);
      }
    } else {
      if (selectedOptions.some(selectedOption => selectedOption === option)) {
        setSelectedOptions(selectedOptions.filter((item) => item !== option));
        setSelectedOptionVal(selectedOptions.filter((item) => item !== option));
        console.log(selectedOptions);
      } else {
        setSelectedOptions([...selectedOptions, option]);
        setSelectedOptionVal([...selectedOptions, option]);
      }
    }
    
  };
  const handleOptionClickById = (optionId) => {
    if (selectedOptions.some(selectedOption => selectedOption.id === optionId)) {
      setSelectedOptions(prevOptions => prevOptions.filter(option => option.id !== optionId));
      setSelectedOptionVal(prevOptions => prevOptions.filter(option => option.id !== optionId));
    } else {
      const option = options.find(option => option.id === optionId);
      setSelectedOptions(prevOptions => [...prevOptions, option]);
      setSelectedOptionVal(prevOptions => [...prevOptions, option]);
    }
  };
  
  const filteredData = options.filter(investor => {
    if (typeof investor === 'string') {
      return investor.toLowerCase().includes(searchValue.toLowerCase());
    }
  
    const valueToCheck = investor[valuekey] ? investor[valuekey].toLowerCase() : "";
    return valueToCheck.includes(searchValue.toLowerCase());
  });
  
  const parentRef = useRef(null);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: '100%' });


  // useEffect(() => {
  //   // Ajustez la position et la largeur du dropdown lorsqu'il est ouvert
  //   if (isOpen && dropdownRef.current) {
  //     const rect = parentRef.current.getBoundingClientRect();
  //     dropdownRef.current.style.top = `${rect.bottom}px`;
  //     dropdownRef.current.style.left = `${rect.left}px`;
  //     dropdownRef.current.style.width = `${rect.width}px`;
  //   }
  // }, [isOpen]);

  const calculateDropdownPosition = () => {
    if (dropdownRef.current) {
      const rect = parentRef.current.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setDropdownPosition({
        top: rect.bottom + scrollTop,
        left: rect.left,
        width: `${rect.width}px`
      });
    }
  };

  useEffect(() => {
    // Ajustez la position et la largeur du dropdown lorsqu'il est ouvert
    if (isOpen) {
      calculateDropdownPosition();
    }
  }, [isOpen]);

  // const isSelected = (option) => {
  //   return selectedOptions.some(selectedOption => selectedOption.id === option.id);
  // };  

  const isSelected = (option) => {
    if(optionkey) {
      const optionValue = option[optionkey];
      return selectedOptions.some(selectedOption => selectedOption[optionkey] === optionValue);
    }
  else{
    return selectedOptions.some(selectedOption => selectedOption === option);
  }
  };

  return (
    <div id='drop_root' className={`relative flex flex-col md:flex-1 w-full ${className}`}>
      <div ref={parentRef}
        className="flex md:flex-1 w-full items-center rounded-md p-2 border border-solid cursor-pointer"
        onClick={toggleDropdown}
      >
        <input
          className={`!placeholder:text-blue_gray-300 pr-1 !text-gray700 cursor-pointer font-manrope font-normal leading-18 tracking-wide p-0 text-left text-sm w-full bg-transparent border-0`}
          name="target"
          type="text"
          placeholder={placeholder}
          value={selectedOptions.map(option => option[valuekey] ? option[valuekey] : option).join(', ')}
          readOnly
          style={{overflow:'hidden' , textOverflow:'ellipsis'}}
        />
        <BiChevronDown size={18} className='text-blue_gray-301'/>
      </div>
      {isOpen && 
       ReactDOM.createPortal(
        <div ref={dropdownRef} className="absolute  w-full  mt-1 py-2 bg-white-A700 rounded-[6px] border border-gray-201 shadow-lg overflow-y-auto max-h-[340px] z-50" role="menu" 
        style={dropdownPosition}>
         {searchable && (
          <div className='flex w-full px-3'>
            <div className="flex w-full rounded-md py-1.5 px-2 border border-solid">
              <input
                className={`!placeholder:text-blue_gray-300  !text-gray700 font-manrope text-left text-xs tracking-[0.14px] w-full bg-transparent border-0`}
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
          <div className="py-1">
            {filteredData.map((option, index) => (
              <div
                key={index}
                className={`flex items-center justify-start px-3 cursor-pointer hover:bg-gray-100 `}
                onClick={() => {
                      handleOptionClick(option);
                  }}
              >
                <div className={`flex items-center space-x-3 w-full text-left ${itemClassName}`} >
                  <label htmlFor={`check_${index}`} className="cursor-pointer relative inline-flex items-center">
                    <input
                        id={`check_${index}`}
                        type="checkbox"
                        checked={isSelected(option)}
                        onChange={()=> handleOptionClick(option)}
                        className="peer appearance-none w-[16px] h-[16px] bg-gray-300 text-blue-600 checked:bg-green-A200 border-gray-300 rounded-[4.5px] focus:ring-blue-500"
                    />
                    <IoIosCheckmark
                        size={19}
                        fontWeight={500}
                        className="absolute left-0 top-0 transition opacity-0 peer-checked:opacity-100 text-blue_gray-903"
                        style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
                    />
                    </label>
                  <div onClick={() => {
                      handleOptionClick(option);
                  }}>
                    {content(option)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>,
          document.body    
          )}
    </div>
  );
};

export default MultipleSelect;
