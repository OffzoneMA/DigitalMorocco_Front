import { MdOutlineDateRange } from "react-icons/md";
import { FiChevronRight } from "react-icons/fi";
import { FiChevronLeft } from "react-icons/fi";

function getWeekdayLocale(localeName = userLanguage || 'en', weekday = 'short') {
    const format = new Intl.DateTimeFormat(localeName, { weekday }).format;
    return [...Array(7).keys()]
      .map((day) => format(new Date(Date.UTC(2021, 1, day + 1))))
      .map(day => day.charAt(0).toUpperCase() + day.slice(1)); 
}

const userLanguage = navigator.language.split('-')[0];


export const dateOptions = {
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
    datepickerClassNames: `custom-picker w-[292px] top-8  right-0 `,
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