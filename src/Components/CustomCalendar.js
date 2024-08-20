import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import React, {useEffect, useRef, useState} from "react";
import {MdOutlineDateRange} from "react-icons/md";


const CustomCalendar = ({className , onChangeDate , inputPlaceholder , defaultValue}) => {
    const formatDefaultValut = (defaultValue) => {
        if(defaultValue) {
            return new Intl.DateTimeFormat('en-GB').format(defaultValue);
        }
    }

    const [show, setShow] = useState(false);
    const [selectedDate, setSelectedDate] = useState(defaultValue);
    const [valueDate, setValueDate] = useState(formatDefaultValut(defaultValue));
    const dropdownRef = useRef(null);
    const parentRef = useRef(null);
    const userLanguage = navigator.language.split('-')[0];
    const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: '100%' });
    const [dropdownDirection, setDropdownDirection] = useState('down');


    const handleChange = (selectedDate) => {
        const formattedDate = new Intl.DateTimeFormat('en-GB').format(selectedDate);
        setSelectedDate(selectedDate);
        setValueDate(formattedDate);
        onChangeDate(formattedDate);
        setShow(false)
    }

    const formatWeekday = (locale, date) => {
        const weekday = new Intl.DateTimeFormat(locale, { weekday: 'short' }).format(date);
        return weekday.charAt(0).toUpperCase();
    };

    const calculateDropdownPosition = () => {
      const rect = parentRef.current.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  
      const dropdownHeight = dropdownRef.current ? dropdownRef.current.offsetHeight : 0;
      const windowHeight = window.innerHeight;
  
      // Calculate available space above and below the dropdown trigger
      const spaceBelow = windowHeight - rect.bottom;
      const spaceAbove = rect.top;
  
      const right = window.innerWidth - rect.left - rect.width;
  
      let topPosition;
  
      if (spaceBelow < dropdownHeight && spaceAbove > dropdownHeight) {
          // If there is not enough space below but enough space above, position it upwards
          setDropdownPosition({
            bottom: '100%',
            right: 0,
            width: `292px`
        });
      } else {
          // Otherwise, position it downwards
          setDropdownPosition({
            top: '100%',
            right: 0,
            width: `292px`
        });
      }
  
  };
  

    const formatMonthYear = (date, locale) => {
        const month = date.toLocaleString(locale, { month: 'long' });
        const year = date.getFullYear();
        return `${month}`;
    };
    

    useEffect(() => {
      // Ajustez la position et la largeur du dropdown lorsqu'il est ouvert
      if (show) {
        calculateDropdownPosition();
      }
    }, [show]);

    const toggleDropdown = (event) => {
      event.stopPropagation(); 
      setShow(prevState => !prevState);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target) && !parentRef.current.contains(event.target)) {
          setShow(false);
        }
      };
    
      useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }, []);

    return(
        <div className={`relative ${className}`} >
                <div ref={parentRef} className={`flex w-full rounded-md px-[12px] py-[10px] h-[40px] border border-solid `} onClick={toggleDropdown}>
                    <input
                        type="text"
                        className={`!placeholder:text-blue_gray-300 !text-gray700 font-manrope font-normal leading-18 tracking-wide p-0 text-left text-sm w-full bg-transparent border-0`}
                        name={`due-date`}
                        placeholder={inputPlaceholder || "Due Date"}
                        value={valueDate}
                        readOnly
                    //   onChange={e => handleMilestoneChange(e, milestone.id, 'dueDate')}
                    />
                    <MdOutlineDateRange size={20} className={` text-blue_gray-300`}/>
                </div> 
                {show &&
                 <div ref={dropdownRef} className={`absolute  !z-50 `} role="menu" style={dropdownPosition}>
                    <Calendar className={`!bg-white-A700 rounded-[6px] border !border-gray-101 !shadow-lg !w-[292px] text-gray-701 !font-DmSans`} onChange={handleChange} value={selectedDate} formatWeekday={(locale, date) => formatWeekday(locale, date)} 
                    next2Label={null} prev2Label={null} locale={userLanguage || 'en'} navigationLabel={({ date, label, locale }) => (
                        <span 
                            className="react-calendar__navigation__label__labelText react-calendar__navigation__label__labelText--from" 
                            data-text={formatMonthYear(date, locale)}
                        >
                            {formatMonthYear(date, locale)}
                        </span>
                    )}
                      />
                  </div> 
                }
        </div>
    )
}

export default CustomCalendar;