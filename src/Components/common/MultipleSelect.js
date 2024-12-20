import React, { useState , useRef , useEffect } from 'react';
import { BiChevronDown , BiChevronUp } from 'react-icons/bi';
import { IoSearch } from "react-icons/io5";
import ReactDOM from 'react-dom';
import { useTranslation } from 'react-i18next';

const MultipleSelect = ({ options =[], onSelect = () => {}, valuekey='',optionkey='',placeholder='', searchable = true, searchLabel='Search' , setSelectedOptionVal , selectedOptionsDfault = [] , content , itemClassName='' , className=''}) => {
  const {t} = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState(selectedOptionsDfault);
  const [searchValue, setSearchValue] = useState("");
  const dropdownRef = useRef(null);
  const parentRef = useRef(null);
  const [dropdownPosition, setDropdownPosition] = useState({ top: null, left: null, width: '100%' });
  const [dropdownDirection, setDropdownDirection] = useState('down');


  useEffect(() => {
    // Only set selectedOptions if it hasn't been initialized yet
    if (selectedOptions.length === 0 && selectedOptionsDfault.length > 0) {
        setSelectedOptions(selectedOptionsDfault);
    }
}, [selectedOptionsDfault, selectedOptions]);

  
  const toggleDropdown = (event) => {
    event.stopPropagation(); // Stop event propagation to prevent handleClickOutside from being triggered
    setIsOpen(prevState => !prevState);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target) && !parentRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };
  
  const handleOptionClick = (option) => {
    if(optionkey) {
      const optionValue = option?.[optionkey];
      if (selectedOptions.some(selectedOption => selectedOption?.[optionkey] === optionValue)) {
        setSelectedOptions(selectedOptions.filter((item) => item?.[optionkey] !== optionValue));
        setSelectedOptionVal(selectedOptions.filter((item) => item?.[optionkey] !== optionValue));
      } else {
        setSelectedOptions([...selectedOptions, option]);
        setSelectedOptionVal([...selectedOptions, option]);
      }
    } else {
      if (selectedOptions.some(selectedOption => selectedOption === option)) {
        setSelectedOptions(selectedOptions.filter((item) => item !== option));
        setSelectedOptionVal(selectedOptions.filter((item) => item !== option));
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
  
  const filteredData = options?.filter(investor => {
    if (typeof investor === 'string') {
      return investor?.toLowerCase().includes(searchValue.toLowerCase());
    }
  
    const valueToCheck = investor[valuekey] ? investor[valuekey].toLowerCase() : "";
    return valueToCheck.includes(searchValue.toLowerCase());
  });

  const calculateDropdownPosition = () => {
    if (dropdownRef.current && parentRef.current) {
      const rect = parentRef.current.getBoundingClientRect();
      const dropdownHeight = dropdownRef.current.offsetHeight;
      const windowHeight = window.innerHeight;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      // Calculate available space above and below the dropdown trigger
      const spaceBelow = windowHeight - rect.bottom;
      const spaceAbove = rect.top;

      if (spaceBelow < dropdownHeight && spaceAbove > dropdownHeight) {
        // If there is not enough space below but enough space above, open upwards
        setDropdownDirection('up');
        setDropdownPosition({
          top: rect.top + scrollTop - dropdownHeight,
          left: rect.left,
          width: `${rect.width}px`
        });
      } else {
        // Otherwise, open downwards
        setDropdownDirection('down');
        setDropdownPosition({
          top: rect.bottom + scrollTop,
          left: rect.left,
          width: `${rect.width}px`
        });
      }
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      window.addEventListener('scroll', calculateDropdownPosition, true);
      window.addEventListener('resize', calculateDropdownPosition);
      calculateDropdownPosition();
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('scroll', calculateDropdownPosition, true);
      window.removeEventListener('resize', calculateDropdownPosition);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('scroll', calculateDropdownPosition, true);
      window.removeEventListener('resize', calculateDropdownPosition);
    };
  }, [isOpen]);


  const isSelected = (option) => {
    if (optionkey) {
      const optionValue = option?.[optionkey];
      const selectedOptionValues = selectedOptions?.map(selectedOption => selectedOption?.[optionkey]);
      return selectedOptionValues.includes(optionValue);
    } else {
      return selectedOptions.includes(option);
    }
  };
  

  return (
    <div id='drop_root' className={`relative flex flex-col md:flex-1 w-full ${className}`}>
      <div ref={parentRef}
        className={`flex md:flex-1 w-full items-center rounded-md px-[12px] py-[9px] h-[40px] border ${isOpen ? 'border-focusColor shadow-inputBs' : 'border-[#D0D5DD]'} cursorpointer-green`}
        onClick={toggleDropdown}
      >
        <input
          className={`!placeholder:text-blue_gray-301 pr-1 !text-gray700 cursorpointer-green font-manrope font-normal leading-18 tracking-wide p-0 text-left text-sm w-full bg-transparent border-0`}
          name="target"
          type="text"
          placeholder={placeholder}
          value={selectedOptions.map(option => option?.[valuekey] ? option[valuekey] : t(option)).join(', ')}
          readOnly
          style={{overflow:'hidden' , textOverflow:'ellipsis'}}
        />
        {isOpen ? <BiChevronUp size={18} className='text-blue_gray-301' /> : <BiChevronDown size={18} className='text-blue_gray-301' />}
        </div>
      {isOpen && 
       ReactDOM.createPortal(
        <div ref={dropdownRef} className={`absolute  w-full py-2 bg-white-A700 rounded-[6px] border border-gray-201 shadow-lg overflow-y-auto max-h-[340px] z-50 ${dropdownDirection === 'up' ? 'mb-3' : 'mt-1'}`} role="menu" 
        style={dropdownPosition}>
         {searchable && (
          <div className='flex w-full px-3'>
            <div className="flex w-full rounded-md py-1.5 px-2 border border-solid">
              <input
                className={`!placeholder:text-blue_gray-301  !text-gray700 font-manrope text-left text-xs tracking-[0.14px] w-full bg-transparent border-0`}
                type="text"
                name="search"
                placeholder={searchLabel}
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
              <IoSearch size={18} className="text-[#98A2B3] z-20 hover:text-gray-500"/>
            </div>
          </div>
         )}
          <div className="py-1">
            {filteredData?.map((option, index) => (
              <div
                key={index}
                className={`flex items-center justify-start px-3 cursorpointer-green hover:bg-gray-100 `}
                onClick={() => {
                      handleOptionClick(option);
                  }}
              >
                <div className={`flex items-center space-x-3 w-full text-left ${itemClassName}`} >
                  <label htmlFor={`check_${index}`} className="cursorpointer-green relative inline-flex items-center">
                    <input
                        id={`check_${index}`}
                        type="checkbox"
                        checked={isSelected(option)}
                        onChange={()=> handleOptionClick(option)}
                        className="peer appearance-none w-[16px] h-[16px] bg-gray-300 text-blue-600 checked:bg-green-A200 border-gray-201 rounded-[4.5px] focus:ring-blue-500"
                    />
                    <svg
                      width="11"
                      height="8"
                      viewBox="0 0 11 7"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="absolute left-[50%] top-[50%] transform -translate-x-1/2 -translate-y-1/2 transition opacity-0 peer-checked:opacity-100 text-blue_gray-903"
                    >
                      <path
                        d="M1.5 3.5L4.14706 6L9.5 1"
                        stroke="#1E0E62"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
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
