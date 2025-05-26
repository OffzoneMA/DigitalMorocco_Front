import React from "react";
import { default as ModalProvider } from "react-modal";
import { Text } from "./Text";
import { IoCloseOutline } from "react-icons/io5";
import { MdOutlineDateRange } from "react-icons/md";
import { BiMap } from "react-icons/bi";
import { PiTagBold } from "react-icons/pi";
import QRCode from "react-qr-code";
import { useTranslation } from "react-i18next";
import { formatPrice } from "../data/helper";
import { fr , enUS } from 'date-fns/locale';
import { format , isValid} from 'date-fns';


const ViewTicketModal = (props) => {
    const { t } = useTranslation();
    const currentLanguage = localStorage.getItem('language') || 'en'; 
    const rowData = props?.rowData? props.rowData : null;

    const formatEventStartDate = () => {
        const currentLocale = currentLanguage === 'fr' ? fr : enUS;
        const startDate = rowData?.startDate ? new Date(rowData?.startDate) : null;
        const startTime = rowData?.startTime; 

        if(startDate || !isValid(startDate)) {
            return t("event.comingSoon");
        }else{
        // Assuming startTime is in format 'hh:mm AM/PM'
    
        // Format the start date
        const formattedStartDate = startDate && isValid(startDate)
            ? format(startDate, currentLanguage === 'fr' ? 'eee dd MMM yyyy' : 'eee, MMM d, yyyy', { locale: currentLocale })
            : t("event.comingSoon");
    
        // Format the time correctly for both languages
        const formatTime = (time) => {
            if (!time) return ''; // If no time is provided, return an empty string
    
            // Create a new Date object using startDate
            const date = new Date(startDate);
            
            // Parse the time and set hours and minutes
            const [timePart, modifier] = time.split(' '); // Split the time and AM/PM part
            let [hours, minutes] = timePart.split(':').map(Number); // Split the time into hours and minutes
            
            // Convert to 24-hour format if it's PM and hours are not 12
            if (modifier === 'PM' && hours < 12) {
                hours += 12;
            }
            // Handle the case for 12 AM
            if (modifier === 'AM' && hours === 12) {
                hours = 0;
            }
    
            // Set the hours and minutes to the date object
            date.setHours(hours, minutes);
    
            const timeOptions = {
                hour: '2-digit',
                minute: '2-digit',
                hour12: currentLanguage === 'en', // Use 12-hour format for English
                hourCycle: 'h11' // Set to 12-hour format for en-US
            };
    
            let formattedTime = date.toLocaleTimeString(currentLanguage === 'fr' ? 'fr-FR' : 'en-US', timeOptions);
            if (currentLanguage === 'fr') {
                formattedTime = formattedTime.replace(':', 'H'); // Change ':' to 'H' for French
            }
    
            return formattedTime;
        };
    
        // Capitalize the first letter of the formatted date for French
        const capitalizeFirstLetter = (str) => str.charAt(0).toUpperCase() + str.slice(1);
    
        // Construct the final output with the correct formatting
        return currentLanguage === 'fr' 
        ? `${capitalizeFirstLetter(formattedStartDate.replace('.', ''))?.replace('.', '')} à ${formatTime(startTime)}`
        : `${capitalizeFirstLetter(formattedStartDate.replace('.', ''))?.replace('.', '')} ${formatTime(startTime)}`;
        }
        
    };

    
    return (
        <ModalProvider
          appElement={document.getElementById("root")}
          className="m-auto w-[95%] md:w-[100%] max-w-[640px]"
          overlayClassName="bg-blue_gray-900_c1 fixed flex h-full inset-y-[0] w-full"
          {...props}
        >
          <div className="max-h-[97vh] w-full md:w-full">
            <div className="bg-white-A700 border border-gray-500_33 max-h-[97vh] overflow-y-auto border-solid flex flex-col gap-6 items-center justify-start max-w-screen-sm  rounded-[10px] w-full">
                <div className="h-36 pb-6 w-full flex flex-row items-start rounded-t-[10px]" style={{backgroundImage: `url(${rowData?.headerImage})`, backgroundSize: '100%', backgroundRepeat: 'no-repeat'}}>
                    <div className="hover:bg-gray-201 w-auto rounded-full p-1 justify-end ml-auto" onClick={props.onRequestClose}>
                        <IoCloseOutline  className='text-white-A700'
                                        size={20}
                        />
                    </div>
                </div>
                <div className="flex flex-col w-full px-3 gap-3">
                    <Text
                    className="font-dm-sans-medium text-lg leading-7 text-center text-blue_gray-900_03 w-full"
                    >
                        {rowData?.title}
                    </Text>
                    <div className="flex flex-row gap-3 items-center justify-center">
                        <MdOutlineDateRange  size={20} className="text-teal-A300"/>
                        <Text
                        className="text-blue_gray-601 font-dm-sans-regular text-base leading-6"
                        >
                        {formatEventStartDate()}
                        {/* {rowData?.startDate ? `${format(new Date(rowData.startDate), 'MMM d, yyyy')} • ${rowData?.startTime?.toLowerCase()}` : 'Coming Soon'} */}
                        {/* Fri, Sep 1, 2023<span style={{ marginRight: '10px', marginLeft: '10px' }}>•</span>11:00 AM */}
                        </Text>
                    </div>
                    <div className="flex flex-row gap-3 items-center justify-center">
                        <BiMap  size={22} className="text-teal-A300"/>
                        <Text
                        className="text-blue_gray-601 font-dm-sans-regular text-base leading-6"
                        >
                        {rowData?.physicalLocation || 'Virtual Event [Online Only]'}
                        </Text>
                    </div>
                    <div className="flex flex-row gap-3 items-center justify-center">
                        <PiTagBold    size={20} className="text-teal-A300"/>
                        <Text
                        className="text-blue_gray-601 font-dm-sans-regular text-base leading-6"
                        >
                        {formatPrice(rowData?.price , currentLanguage) }
                        </Text>
                    </div>
                    <div className="flex flex-row py-3 items-center justify-center">
                        <QRCode size={170} value={rowData?.title | ''}></QRCode>
                    </div>
                    <div className="flex flex-row px-12 items-center justify-center">
                        <Text className="text-blue_gray-601 font-DmSans text-center text-xs font-normal leading-[19.2px]">
                            {t('event.termsConditionsStart')}
                            <a className="text-blue-A400" href={`https://digitalmorocco.net/terms?lang=${currentLanguage}`}>{t('event.termsConditionsLink')}</a> {t('event.termsConditionsEnd')}
                        </Text>
                    </div>
                    <div className="flex flex-row px-12 pb-5 items-center justify-center">
                        <Text className="text-blue_gray-601 font-DmSans text-center text-xs font-normal leading-[19.2px]">
                            {t('event.needAssistanceStart')}
                            <span className="text-blue-A400">{t('event.supportEmail')}</span>.
                        </Text>
                    </div>
                </div>
            </div>
          </div>
        </ModalProvider>
    )
}
export default ViewTicketModal;