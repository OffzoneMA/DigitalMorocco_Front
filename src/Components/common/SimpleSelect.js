import React, { useState , useRef , useEffect , useMemo} from 'react';
import { BiChevronDown , BiChevronUp} from 'react-icons/bi';
import { IoSearch } from "react-icons/io5";
import ReactDOM from 'react-dom';
import { useTranslation } from 'react-i18next';

const SimpleSelect = ({ options =[], onSelect = () => {} ,valuekey='',placeholder='' , searchable = true, 
searchLabel='Search', setSelectedOptionVal , selectedOptionsDfault='' ,content , itemClassName='',
className='' ,required = false, sortable = true }) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const dropdownRef = useRef(null);
  const parentRef = useRef(null);
  
  // Sort options based on translated values using useMemo to optimize performance
  const currentLanguage = (localStorage.getItem('language') || 'en').toLowerCase();

  // Liste des langues valides que vous voulez supporter
  const validLanguages = ['en', 'fr', 'es', 'de', 'it', 'zh', 'ja']; 

  const normalizedLanguage = validLanguages.includes(currentLanguage) ? currentLanguage : 'en';

  const sortedOptions = useMemo(() => {
    if (!sortable) return options;

    return [...options].sort((a, b) => {
      const aValue = typeof a === 'string' ? t(a) : t(a[valuekey]);
      const bValue = typeof b === 'string' ? t(b) : t(b[valuekey]);

      // Vérifiez si a ou b est "Other" ou "Autre"
      const isAOther = aValue?.toLowerCase() === 'other' || aValue?.toLowerCase() === 'autre';
      const isBOther = bValue?.toLowerCase() === 'other' || bValue?.toLowerCase() === 'autre';

      if (isAOther && !isBOther) return 1; // Place "Other/Autre" après les autres
      if (!isAOther && isBOther) return -1; // Place les autres avant "Other/Autre"

      // Utilisez localeCompare pour le tri normal avec une langue normalisée
      return aValue?.localeCompare(bValue, normalizedLanguage, {
        sensitivity: 'base',
        ignorePunctuation: true
      });
    });
  }, [options, t, valuekey, normalizedLanguage]);

  useEffect(() => {
    if(selectedOption === null) {
        setSelectedOption(selectedOptionsDfault);
    }
  }, [selectedOption , selectedOptionsDfault]);

  const [dropdownPosition, setDropdownPosition] = useState({ top: null, left: null, width: '100%' });
  const [dropdownDirection, setDropdownDirection] = useState('down');

  const toggleDropdown = (event) => {
    event.stopPropagation(); // Stop event propagation to prevent handleClickOutside from being triggered
    const newIsOpen = !isOpen;

    if (newIsOpen) {
      // Calculate dropdown position first
      calculateDropdownPosition();
    }

    setIsOpen(newIsOpen); // Then set the dropdown state
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target) && !parentRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setSelectedOptionVal(option);
    onSelect(option);
    setIsOpen(false);
  };

   // Update filteredData to use sortedOptions instead of options
   const filteredData = sortedOptions?.filter(investor => {
    if (!searchValue?.trim()) return true;
  
    const normalizedSearch = searchValue
      .toLowerCase()
      .normalize("NFD")
      .replace(/\p{Diacritic}/gu, "")
      .trim();
  
    if (typeof investor === 'string') {
      const translatedValue = t(`${investor}`);
      const normalizedTranslation = translatedValue
        .toLowerCase()
        .normalize("NFD")
        .replace(/\p{Diacritic}/gu, "");
      return normalizedTranslation.includes(normalizedSearch);
    }
  
    if (investor && typeof investor === 'object') {
      const value = investor[valuekey];
      
      if (value) {
        const translatedValue = t(`${value}`);
        const normalizedValue = translatedValue
          .toLowerCase()
          .normalize("NFD")
          .replace(/\p{Diacritic}/gu, "");
        return normalizedValue.includes(normalizedSearch);
      }
    }
  
    return false;
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

  const handleClear = (e) => {
    e.stopPropagation(); // Prevent dropdown from opening when clicking clear
    setSelectedOption(null);
    setSelectedOptionVal(null);
    onSelect(null);
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

  return (
    <div className={`relative flex flex-col md:flex-1 w-full ${className}`}>
      <div ref={parentRef}
        className={`flex md:flex-1 w-full items-center rounded-[6px] px-[12px] py-[9px] h-[40px] border ${(isOpen && !required) ? 'border-focusColor shadow-inputBs' : 'border-[#D0D5DD]'} cursorpointer-green ${required ? 'border-errorColor shadow-inputBsError focus:border-errorColor' : ''}`}
        onClick={toggleDropdown}
      >
        <input
          className={`!placeholder:text-blue_gray-301 pr-1 !text-gray700 font-manrope font-normal cursorpointer-green leading-18 tracking-wide p-0 text-left text-sm w-full bg-transparent border-0`}
          name="target"
          type="text"
          placeholder={placeholder}
          value={valuekey ? t(selectedOption?.[valuekey]) : selectedOption ? t(selectedOption) : ""}
          readOnly
          style={{overflow:'hidden' , textOverflow:'ellipsis'}}
        />
        <div className='flex items-center justify-center gap-2'>
          {selectedOption ? 
          (<button type='button' 
            onClick={handleClear}
            className='btn_delete_selected w-[18px] h-[18px] text-[#A9ACB0] hover:text-[#EC7373] flex items-center justify-center cursorpointer'>
            <svg className='cursorpointer' width="10" height="10" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.5 1.5L1.5 10.5M1.5 1.5L10.5 10.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>)
          :
          isOpen ? <BiChevronUp size={18} className='text-blue_gray-301' /> : <BiChevronDown size={18} className='text-blue_gray-301' />
          }
        </div>
      </div>
      {isOpen && (
         ReactDOM.createPortal(
        <div ref={dropdownRef} className={`absolute w-full py-2 bg-white-A700 rounded-[6px] border border-gray-201 shadow-lg overflow-y-auto max-h-[310px] z-10 ${dropdownDirection === 'up' ? 'mb-3' : 'mt-1'}`} role="menu" 
        style={dropdownPosition}>
            {searchable && (
            <div className='flex w-full px-3'>
              <div className="flex w-full rounded-md py-1.5 px-2 border border-solid">
                <input
                  className={`!placeholder:text-blue_gray-301 !text-gray700 font-manrope text-left text-xs tracking-[0.14px] w-full bg-transparent border-0`}
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
          <div className="py-2">
            {filteredData.map((option, index) => (
              <div
                key={index}
                className={`flex items-center w-full px-3 text-left cursorpointer-green ${(selectedOption === option || JSON.stringify(selectedOption) === JSON.stringify(option) ) ? 'select-color-text text-[#35D8BF]' : ''} hover-select-color hover:text-[#35D8BF] ${itemClassName}`}
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
