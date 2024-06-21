import React, { useState , useRef , useEffect} from 'react';
import { BiChevronDown } from 'react-icons/bi';
import { IoSearch } from "react-icons/io5";
import ReactDOM from 'react-dom';

const SimpleSelect = ({ options, onSelect ,valuekey='',placeholder='' , searchable = true, searchLabel='Search', setSelectedOptionVal , selectedOptionsDfault='' ,content , itemClassName='',className='' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [searchValue, setSearchValue] = useState("");
  const dropdownRef = useRef(null);
  const parentRef = useRef(null);

  useEffect(() => {
    setSelectedOption(selectedOptionsDfault);
  }, [selectedOptionsDfault]);


  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: '100%' });

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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

  return (
    <div className={`relative flex flex-col md:flex-1 w-full ${className}`}>
      <div ref={parentRef}
        className="flex md:flex-1 w-full items-center rounded-[6px] px-[12px] py-[10px] h-[40px] border border-[#D0D5DD] cursorpointer-green"
        onClick={toggleDropdown}
      >
        <input
          className={`!placeholder:text-blue_gray-300 pr-1 !text-gray700 font-manrope font-normal cursorpointer-green leading-18 tracking-wide p-0 text-left text-sm w-full bg-transparent border-0`}
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
         ReactDOM.createPortal(
        <div ref={dropdownRef} className="absolute w-full  mt-1 py-2 bg-white-A700 rounded-[6px] border border-gray-201 shadow-lg overflow-y-auto max-h-[310px] z-10" role="menu" 
        style={dropdownPosition}>
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
                className={`flex items-center w-full px-3 text-left cursorpointer-green hover-select-color hover:text-[#35D8BF] ${itemClassName}`}
                onClick={() => handleOptionClick(option)}
              >
                {content(option)}
              </div>
            ))}
          </div>
        </div>,
          document.body    
          )
      )}
    </div>
  );
};

export default SimpleSelect;
