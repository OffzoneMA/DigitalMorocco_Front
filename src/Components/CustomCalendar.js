import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import React ,{useState , useEffect , useRef} from "react";
import { MdOutlineDateRange } from "react-icons/md";
import { FiChevronRight } from "react-icons/fi";
import { FiChevronLeft } from "react-icons/fi";
import ReactDOM from 'react-dom';


const CustomCalendar = ({className , onChangeDate , inputPlaceholder , defaultValue}) => {
    const formatDefaultValut = (defaultValue) => {
        if(defaultValue) {
            const formattedDate = new Intl.DateTimeFormat('en-GB').format(defaultValue);
            return formattedDate;
        }
    }

    const [show, setShow] = useState(false);
    const [selectedDate, setSelectedDate] = useState(defaultValue);
    const [valueDate, setValueDate] = useState(formatDefaultValut(defaultValue));
    const dropdownRef = useRef(null);
    const parentRef = useRef(null);
    const userLanguage = navigator.language.split('-')[0];
    const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: '100%' });

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
        
        const right = window.innerWidth - rect.left - rect.width;
    
        setDropdownPosition({
          top: rect.bottom + scrollTop,
          right: right,
          width: `292px`
        });
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
        console.log(dropdownPosition)
      }
    }, [show]);

    return(
        <div ref={parentRef}  className={`relative ${className}`} >
                <div className={`flex w-full rounded-md p-2 border border-solid `} onFocus={()=>setShow(true)}>
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
                ReactDOM.createPortal(
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
                  </div> ,
                  document.body
                )
                }
        </div>
    )
}

export default CustomCalendar;