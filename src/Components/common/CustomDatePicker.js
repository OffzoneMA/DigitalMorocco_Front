import React ,{useState , useEffect , useRef} from "react";
import DatePicker from "tailwind-datepicker-react";
import { MdOutlineDateRange } from "react-icons/md";
import { FiChevronRight } from "react-icons/fi";
import { FiChevronLeft } from "react-icons/fi";


const CustomDatePicker = ({setValue , className , onChangeDate}) => {
    const userLanguage = navigator.language.split('-')[0];
    const [show, setShow] = useState(false);
    const [selectedDate, setSelectedDate] = useState();
    const parentRef = useRef(null);
    const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: '100%' });

	const handleChange = (selectedDate) => {
        const formattedDate = new Intl.DateTimeFormat('en-GB').format(selectedDate);
        setSelectedDate(formattedDate);
        onChangeDate(formattedDate);
    }

	const handleClose = (state) => {
		setShow(state)
	}

    function getWeekdayLocale(localeName = userLanguage || 'en', weekday = 'short') {
        const format = new Intl.DateTimeFormat(localeName, { weekday }).format;
        return [...Array(7).keys()]
          .map((day) => format(new Date(Date.UTC(2021, 1, day + 1))))
          .map(day => day.charAt(0).toUpperCase() + day.slice(1)); 
    }

    const buttonSelector = '.custom-picker > div:first-child > div:first-child >div:first-child > button:nth-child(2)';

    const updateButtonText = () => {
        const button = document.querySelector(buttonSelector);
        if (button) {
            const text = button.textContent;
            button.textContent = text.split(" ")[0];
        }
    };

    useEffect(() => {
        updateButtonText();

        const observer = new MutationObserver(updateButtonText);
        const targetNode = document.querySelector('.custom-picker');

        if (targetNode) {
            observer.observe(targetNode, { childList: true, subtree: true });
        }

        return () => {
            if (targetNode) {
                observer.disconnect();
            }
        };
    }, []);


    const calculateDropdownPosition = () => {
          const rect = parentRef.current.getBoundingClientRect();
          const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
          setDropdownPosition({
            top: rect.bottom + scrollTop,
            right: rect.right,
            width: `${rect.width}px`
          });
        
      };

      useEffect(() => {
        if (show) {
          calculateDropdownPosition();
        }
      }, [show]);
    
    const options = {
        autoHide: true,
        todayBtn: false,
        clearBtn: false,
        clearBtnText: "",
        maxDate: new Date("2030-01-01"),
        minDate: new Date("1950-01-01"),
        
        theme: {
            background: "bg-white-A700 !font-normal",
            todayBtn: "",
            clearBtn: "",
            icons: "",
            text: "!text-[13px] !font-normal !text-gray-701 ",
            disabledText: "!text-[13px] !font-normal !text-gray-301",
            input: "",
            inputIcon: "",
            selected: "bg-col1 !text-white-A700",
        },
        icons: {
            // () => ReactElement | JSX.Element
            prev: () => <FiChevronLeft style={{color:"#A9ACB0"}} />,
            next: () => <FiChevronRight style={{color:"#A9ACB0"}} />,
        },
        datepickerClassNames: `custom-picker w-[292px] top-[${dropdownPosition.top}] right-0 `,
        defaultDate: new Date(),
        language: userLanguage || "en",
        disabledDates: [],
        weekDays: getWeekdayLocale().map(day => day.charAt(0)),
        inputNameProp: "date",
        inputIdProp: "date",
        inputPlaceholderProp: "Select Date",
        inputDateFormatProp: {
            day: "numeric",
            month: "long",
            year: "numeric"
        },
        formatMatcher: 'basic'
    }
    
    return (
        <div ref={parentRef}  className={`relative ${className}`} >
            <DatePicker  options={options} onChange={handleChange} show={show} setShow={handleClose}>
                <div className={`flex w-full rounded-md p-2 border border-solid `} onFocus={()=>setShow(true)}>
                    <input
                        type="text"
                        className={`!placeholder:text-blue_gray-301 !text-gray700 font-manrope font-normal leading-18 tracking-wide p-0 text-left text-sm w-full bg-transparent border-0`}
                        name={`due-date`}
                        placeholder="Due Date"
                        value={selectedDate}
                        readOnly
                    //   onChange={e => handleMilestoneChange(e, milestone.id, 'dueDate')}
                    />
                    <MdOutlineDateRange size={20} className={` text-blue_gray-301`}/>
                </div> 
            </DatePicker>
        </div>
    )
}
export default CustomDatePicker;