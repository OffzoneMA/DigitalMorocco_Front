import React, { useState, useRef, useEffect } from 'react';
import { BiChevronDown, BiChevronUp } from 'react-icons/bi';
import { IoSearch } from 'react-icons/io5';
import ReactDOM from 'react-dom';
import { useTranslation } from 'react-i18next';

const SimpleSelectWithGroup = ({
  groupedOptions = {},
  onSelect,
  valuekey = '',
  placeholder = '',
  searchable = true,
  searchLabel = 'Search',
  setSelectedOptionVal,
  selectedOptionsDfault = '',
  content,
  itemClassName = '',
  className = '',
  required = false,
}) => {
  const { t } = useTranslation();
  const currentLanguage = localStorage.getItem('language') || 'en';
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [searchValue, setSearchValue] = useState('');
  const dropdownRef = useRef(null);
  const parentRef = useRef(null);

  useEffect(() => {
    if (selectedOption === null) {
      setSelectedOption(selectedOptionsDfault);
    }
  }, [selectedOption, selectedOptionsDfault]);

  const [dropdownPosition, setDropdownPosition] = useState({
    top: null,
    left: null,
    width: '100%',
  });
  const [dropdownDirection, setDropdownDirection] = useState('down');

  const toggleDropdown = (event) => {
    event.stopPropagation();
    const newIsOpen = !isOpen;

    if (newIsOpen) {
      calculateDropdownPosition();
    }

    setIsOpen(newIsOpen);
  };

  const handleClickOutside = (event) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target) &&
      !parentRef.current.contains(event.target)
    ) {
      setIsOpen(false);
    }
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setSelectedOptionVal(option);
    setIsOpen(false);
  };

  const calculateDropdownPosition = () => {
    if (dropdownRef.current && parentRef.current) {
      const rect = parentRef.current.getBoundingClientRect();
      const dropdownHeight = dropdownRef.current.offsetHeight;
      const windowHeight = window.innerHeight;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      const spaceBelow = windowHeight - rect.bottom;
      const spaceAbove = rect.top;

      if (spaceBelow < dropdownHeight && spaceAbove > dropdownHeight) {
        setDropdownDirection('up');
        setDropdownPosition({
          top: rect.top + scrollTop - dropdownHeight,
          left: rect.left,
          width: `${rect.width}px`,
        });
      } else {
        setDropdownDirection('down');
        setDropdownPosition({
          top: rect.bottom + scrollTop,
          left: rect.left,
          width: `${rect.width}px`,
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

  // Group filtering based on search
  const filteredGroupedData = Object.entries(groupedOptions).reduce((acc, [ group, options ]) => {
    console.log(group, options)
    const filteredOptions = options?.options?.filter((option) => {
      const valueToCheck = typeof option === 'string' ? option : option[valuekey] || '';
      return valueToCheck.toLowerCase().includes(searchValue.toLowerCase());
    });

    if (filteredOptions?.length > 0) {
      acc[options?.group] = filteredOptions; 
    }

    return acc;
  }, {});

  return (
    <div className={`relative flex flex-col md:flex-1 w-full ${className}`}>
      <div
        ref={parentRef}
        className={`flex md:flex-1 w-full items-center rounded-[6px] px-[12px] py-[9px] h-[40px] border ${
          isOpen && !required
            ? 'border-focusColor shadow-inputBs'
            : 'border-[#D0D5DD]'
        } cursor-pointer-green ${required ? 'border-errorColor shadow-inputBsError' : ''}`}
        onClick={toggleDropdown}
      >
        <input
          className={`!placeholder:text-blue_gray-301 pr-1 !text-gray700 font-manrope font-normal cursor-pointer-green leading-18 tracking-wide p-0 text-left text-sm w-full bg-transparent border-0`}
          name="target"
          type="text"
          placeholder={placeholder}
          value={valuekey ? t(selectedOption?.[valuekey]) : selectedOption ? t(selectedOption) : ''}
          readOnly
          style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}
        />
        {isOpen ? <BiChevronUp size={18} className="text-blue_gray-301" /> : <BiChevronDown size={18} className="text-blue_gray-301" />}
      </div>
      {isOpen &&
        ReactDOM.createPortal(
          <div
            ref={dropdownRef}
            className={`absolute w-full py-2 bg-white-A700 rounded-[6px] border border-gray-201 shadow-lg overflow-y-auto max-h-[310px] z-10 ${
              dropdownDirection === 'up' ? 'mb-3' : 'mt-1'
            }`}
            role="menu"
            style={dropdownPosition}
          >
            {searchable && (
              <div className="flex w-full px-3">
                <div className="flex w-full rounded-md py-1.5 px-2 border border-solid">
                  <input
                    className={`!placeholder:text-blue_gray-301 !text-gray700 font-manrope text-left text-xs tracking-[0.14px] w-full bg-transparent border-0`}
                    type="text"
                    name="search"
                    placeholder={searchLabel}
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                  />
                  <IoSearch size={18} className="text-[#98A2B3] z-20 hover:text-gray-500" />
                </div>
              </div>
            )}
            <div className="py-2">
              {Object.entries(filteredGroupedData).map(([group, options]) => (
                <div key={group}>
                  <div className="font-dm-sans-bold px-3 py-1 text-gray-700">{t(`${group}`)}</div>
                  {options.map((option, idx) => (
                    <div
                      key={idx}
                      className={`flex items-center w-full pl-6 pr-3 text-left cursor-pointer-green ${
                        (selectedOption === option || JSON.stringify(selectedOption) === JSON.stringify(option)) ? 'select-color-text text-[#35D8BF]' : ''
                      } hover-select-color hover:text-[#35D8BF] ${itemClassName}`}
                      onClick={() => handleOptionClick(option)}
                    >
                      {content(option)}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>,
          document.body
        )}
    </div>
  );
};

export default SimpleSelectWithGroup;
