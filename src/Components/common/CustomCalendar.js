import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import React, { useEffect, useRef, useState } from "react";
import { MdOutlineDateRange } from "react-icons/md";
import { IoCloseCircle } from "react-icons/io5"; // Importez une icône de suppression
import ReactDOM from 'react-dom';
import { useTranslation } from "react-i18next";

const CustomCalendar = ({ className, onChangeDate, inputPlaceholder, defaultValue, required = false, showIcon = true }) => {
  const { t } = useTranslation();
  
  const formatDefaultValue = (defaultValue) => {
    if (defaultValue) {
      return new Intl.DateTimeFormat('en-GB').format(defaultValue);
    }
  };

  const [show, setShow] = useState(false);
  const [selectedDate, setSelectedDate] = useState(defaultValue);
  const [valueDate, setValueDate] = useState(formatDefaultValue(defaultValue));
  const dropdownRef = useRef(null);
  const parentRef = useRef(null);
  const userLanguage = localStorage.getItem('language') || 'en';
  const [dropdownPosition, setDropdownPosition] = useState({ top: null, left: null, width: '100%' });
  const [dropdownDirection, setDropdownDirection] = useState('down');

  const handleChange = (selectedDate) => {
    const formattedDate = new Intl.DateTimeFormat('en-GB').format(selectedDate);
    setSelectedDate(selectedDate);
    setValueDate(formattedDate);
    onChangeDate(formattedDate);
    setShow(false);
  };

  const handleClearDate = () => {
    setSelectedDate('');
    setValueDate('');
    onChangeDate(null);
  };

  const formatWeekday = (locale, date) => {
    const weekday = new Intl.DateTimeFormat(locale, { weekday: 'short' }).format(date);
    return weekday.charAt(0).toUpperCase();
  };

  const calculateDropdownPosition = () => {
    if (dropdownRef.current && parentRef.current) {
      const rect = parentRef.current.getBoundingClientRect();
      const dropdownHeight = dropdownRef.current.offsetHeight;
      const windowHeight = window.innerHeight;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const right = window.innerWidth - rect.left - rect.width;

      const spaceBelow = windowHeight - rect.bottom;
      const spaceAbove = rect.top;

      if (spaceBelow < dropdownHeight && spaceAbove > dropdownHeight) {
        setDropdownDirection('up');
        setDropdownPosition({
          top: rect.top + scrollTop - dropdownHeight,
          right: `${right}px`,
          width: `${292}px`
        });
      } else {
        setDropdownDirection('down');
        setDropdownPosition({
          top: rect.bottom + scrollTop,
          right: `${right}px`,
          width: `${292}px`
        });
      }
    }
  };

  const formatMonthYear = (date, locale) => {
    const month = date.toLocaleString(locale, { month: 'long' });
    const year = date.getFullYear();
    return `${month}`;
  };

  useEffect(() => {
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

  return (
    <div className={`relative ${className}`}>
      <div ref={parentRef} className={`flex md:flex-1 w-full items-center rounded-[6px] px-[12px] py-[10px] h-[40px] border ${(show && !required) ? 'border-focusColor shadow-inputBs' : 'border-[#D0D5DD]'} cursor-pointer ${required ? 'border-errorColor shadow-inputBsError focus:border-errorColor' : ''}`} onClick={toggleDropdown}>
        <input
          type="text"
          className="!placeholder:text-blue_gray-301 !text-gray700 font-manrope font-normal leading-18 tracking-wide p-0 text-left text-sm w-full bg-transparent border-0"
          name="due-date"
          placeholder={t(inputPlaceholder) || t("Due Date")}
          value={valueDate}
          readOnly
        />
        {showIcon && <MdOutlineDateRange size={20} className="text-blue_gray-301" />}
        {valueDate && (
          <IoCloseCircle
            size={20}
            className="text-red-500 cursor-pointer ml-2"
            onClick={(e) => {
              e.stopPropagation();
              handleClearDate();
            }}
          />
        )}
      </div>
      {show && 
        ReactDOM.createPortal(
          <div ref={dropdownRef} className={`absolute !z-10 ${dropdownDirection === 'up' ? 'mb-3' : 'mt-1'} py-1`} role="menu" style={dropdownPosition}>
            <Calendar
              className="!bg-white-A700 rounded-[6px] border !border-gray-101 !shadow-lg !w-[292px] text-gray-701 !font-DmSans"
              onChange={handleChange}
              value={selectedDate}
              formatWeekday={(locale, date) => formatWeekday(locale, date)}
              next2Label={null}
              prev2Label={null}
              locale={userLanguage || 'en'}
              navigationLabel={({ date, label, locale }) => (
                <span
                  className="react-calendar__navigation__label__labelText react-calendar__navigation__label__labelText--from"
                  data-text={formatMonthYear(date, locale)}
                >
                  {formatMonthYear(date, locale)}
                </span>
              )}
            />
          </div>,
          document.body
        )
      }
    </div>
  );
};

export default CustomCalendar;
