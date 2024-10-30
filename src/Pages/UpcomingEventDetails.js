import React, { useState , useEffect} from "react";
import { useSelector } from "react-redux";
import { HiOutlineSpeakerphone } from "react-icons/hi";
import { MdOutlineDateRange } from "react-icons/md";
import { BiMap } from "react-icons/bi";
import { PiTagBold } from "react-icons/pi";
import{Text } from "../Components/Text";
import { IoMdTime } from "react-icons/io";
import { TbCopy } from "react-icons/tb";
import { BiMessageAltError } from "react-icons/bi";
import { BiPurchaseTagAlt } from "react-icons/bi";
import { useLocation  , useNavigate } from "react-router-dom";
import PageHeader from "../Components/PageHeader";
import SearchInput from "../Components/SeachInput";
import { format, parse  , isValid  } from 'date-fns';
import { fr , enUS } from 'date-fns/locale';
import { useGetEventByIdQuery } from "../Services/Event.Service";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AiOutlineLoading } from "react-icons/ai";
import Loader from "../Components/Loader";
import userDefaultProfil from '../Media/User1.png';
import { useTranslation } from "react-i18next";
import { formatPrice } from "../data/helper";


const UpcomingEventDetails = () => {
  const { t } = useTranslation();
  const userData = JSON.parse(sessionStorage.getItem("userData"));
  const location = useLocation();
  const past = location.state ? location.state.past : false;
  const [bying , setBying] = useState(false);
  const { id } = useParams();
  const eventFromState = location.state ? location.state.event : null;
  const navigate = useNavigate();
  const { data: eventFromApi, error, isLoading } = useGetEventByIdQuery(id, {
    skip: !!eventFromState,
  });

  const event = eventFromState || eventFromApi;

  const currentLanguage = localStorage.getItem('language') || 'en'; 

    function formatText(text) {
        const paragraphs = text.split('.').map((paragraph, index) => (
          <p key={index} className="mb-4">{paragraph.trim()}</p>
        ));
      
        return (
          <Text className=" text-base font-dm-sans-regular leading-relaxed text-left text-gray700 pl-8">
            {paragraphs}
          </Text>
        );
      }

    const descp = `Dreamin, a Salesforce conference led by the community for the community!Join us in Casablanca to boost your knowledge with international experts and meet the main Salesforce players in Morocco, Africa, and Europe, and North America.
    Dreamin, a taste of Dreamforce in the heart of Africa.
    Not able to attend Dreamforce? No problem!Thanks to North Africa Dreamin, we bring a little of the Ohana spirit to Casablanca for a whole day, This will be an opportunity for Salesforce professionals to gather and share their knowledge,You will be able to follow different sessions to train you and to stock up on knowledge: whether you are rather click or rather code, you will certainly find the theme that suits your goal.
    The North Africa Dreamin team is made up of volunteers from the Moroccan Trailblazers community whose common vision could be summed up in one word: sharing.
    Our goal is to make available to the community all the resources needed to optimally improve the skills on Salesforce technology, by mobilizing international names, Our mission is also to contribute to the expansion of this community by developing relationships between the different actors in the Salesforce ecosystem.
    And more broadly, we want to improve the awareness and adoption of Salesforce in Morocco and Africa because we are convinced of its advantages in terms of CRM, marketing tools and other innovative technologies`; 

    const sponsors = [
      {logo:"/images/spon_logo0.svg"}, 
      {logo:"/images/spon_logo1.svg"}, 
      {logo:"/images/spon_logo2.svg"}, 
      {logo:"/images/spon_logo3.svg"}, 
      {logo:"/images/spon_logo4.svg"}, 
      {logo:"/images/spon_logo5.svg"}, 
      {logo:"/images/spon_logo6.svg"}, 
      {logo:"/images/spon_logo7.svg"}, 
      {logo:"/images/spon_logo8.svg"}, 
      {logo:"/images/spon_logo9.svg"}, 
    ];

  function capitalizeAndClean(dateString) {
    return dateString.charAt(0).toUpperCase() + dateString.slice(1);
  }

  function formatEventDate(startDate, endDate) {
    const locale = currentLanguage === 'fr' ? fr : enUS;

    if (!startDate || !endDate) {
        return t("event.comingSoon");
    } else {
        const startDateTime = new Date(startDate);
        const endDateTime = new Date(endDate);

        // Check if the start and end dates are the same
        if (startDateTime.getDate() === endDateTime.getDate() &&
            startDateTime.getMonth() === endDateTime.getMonth() &&
            startDateTime.getFullYear() === endDateTime.getFullYear()) {
            const formattedDate = format(startDateTime, currentLanguage === 'fr' ? 'EEEE d MMMM yyyy' : 'EEEE, MMMM d, yyyy', { locale });
            return capitalizeAndClean(formattedDate);
        } else {
            const formattedStartDate = format(startDateTime, currentLanguage === 'fr' ? 'EEE d MMMM yyyy' : 'EEE, MMM d, yyyy', { locale });
            return capitalizeAndClean(formattedStartDate)?.replace('.', '');
        }
    }
  }


  function formatEventTime(startDate, endDate, startTime, endTime) {
    const locale = currentLanguage === 'fr' ? fr : enUS;

    if (!startDate || !endDate || !startTime || !endTime || startTime === '' || endTime === '') {
        return currentLanguage === 'fr' ? '24 heures par jour, 7 jours par semaine' : '24 hours a day, 7 days a week';
    } else {
        const startDateTime = new Date(startDate);
        const endDateTime = new Date(endDate);

        // Check if the start and end dates are the same
        if (startDateTime.getDate() === endDateTime.getDate() &&
            startDateTime.getMonth() === endDateTime.getMonth() &&
            startDateTime.getFullYear() === endDateTime.getFullYear()) {
            const gmtOffset = -startDateTime.getTimezoneOffset() / 60; // GMT offset in hours
            const gmt = `GMT${gmtOffset >= 0 ? `+${gmtOffset}` : gmtOffset}`; // Format GMT offset

            const formattedStartTime = format(parse(startTime, 'h:mm a', new Date()), currentLanguage === 'fr' ? 'H:mm' : 'h:mm a', { locale });
            const formattedEndTime = format(parse(endTime, 'h:mm a', new Date()), currentLanguage === 'fr' ? 'H:mm' : 'h:mm a', { locale });

            return currentLanguage === 'fr'
                ? `De ${formattedStartTime.replace(':', 'h')} à ${formattedEndTime.replace(':', 'h')} ${gmt}` // French format with 'h'
                : `${formattedStartTime} - ${formattedEndTime} ${gmt}`; // English format
        } else {
            const parsedTime = parse(startTime, 'h:mm a', new Date());
            const formattedParsedTime = format(parsedTime, currentLanguage === 'fr' ? 'H:mm' : 'h:mm a', { locale });

            return currentLanguage === 'fr'
                ? formattedParsedTime.replace(':', 'h').toUpperCase() // For French format: replace ':' with 'h'
                : formattedParsedTime.toUpperCase(); // For English format
        }
    }
  }

  const formatEventStartEndDate = () => {
    const currentLocale = currentLanguage === 'fr' ? fr : enUS;

    const startDate = event?.startDate ? new Date(event.startDate) : null;
    const endDate = event?.endDate ? new Date(event.endDate) : null;

    const startTime = event?.startTime; // Assuming startTime is in format 'hh:mm AM/PM'
    const endTime = event?.endTime; // Assuming endTime is in format 'hh:mm AM/PM'

    // Format the start date
    const formattedStartDate = startDate && isValid(startDate)
        ? format(startDate, currentLanguage === 'fr' ? 'eee dd MMM yyyy' : 'eee, MMM d, yyyy', { locale: currentLocale })
        : t("event.comingSoon");

    // Format the end date
    const formattedEndDate = endDate && isValid(endDate)
        ? format(endDate, currentLanguage === 'fr' ? 'eee dd MMM yyyy' : 'eee, MMM d, yyyy', { locale: currentLocale })
        : startDate && isValid(startDate)
            ? format(startDate, currentLanguage === 'fr' ? 'eee dd MMM yyyy' : 'eee, MMM d, yyyy', { locale: currentLocale })
            : t("event.comingSoon");

    // Function to format time from 'hh:mm AM/PM'
    const formatTimeFromString = (time) => {
        if (!time) return ''; // If no time is provided, return an empty string

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

        // Create a new Date object for formatting the time
        const date = new Date(startDate); // Use startDate or endDate as needed
        date.setHours(hours, minutes); // Set the hours and minutes

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
    return {
      formattedStart: currentLanguage === 'fr' 
          ? `${capitalizeFirstLetter(formattedStartDate.replace('.', ''))?.replace('.', '')} à ${formatTimeFromString(startTime)}`
          : `${capitalizeFirstLetter(formattedStartDate.replace('.', ''))?.replace('.', '')} ${formatTimeFromString(startTime)}`,
      
      formattedEnd: currentLanguage === 'fr' 
          ? `${capitalizeFirstLetter(formattedEndDate.replace('.', ''))?.replace('.', '')} à ${formatTimeFromString(endTime)}`
          : `${capitalizeFirstLetter(formattedEndDate.replace('.', ''))?.replace('.', '')} ${formatTimeFromString(endTime)}`,
  };
};

  const handleAddAttendee = async () => {
    try {
      setBying(true)
      const response = await axios.post(`${process.env.REACT_APP_baseURL}/events/${id}/attendeesuser`, {
        userId: userData?._id, 
        role: userData?.role
      });
        setBying(false);
        setTimeout(() => {
          navigate("/Participate");
        }, 2000);
    } catch (error) {
        setBying(false);
        console.log(error.response?.data?.message || 'Error adding attendee');
    }
};

    return (
    <div className="bg-white-A700 flex flex-col gap-8 h-full min-h-screen overflow-auto items-start justify-start pb-14 pt-8 rounded-tl-[40px] w-full">
    {isLoading ?
        <div className="flex flex-col items-center text-blue_gray-800_01 gap-[16px] h-full w-full py-28 rounded-b-[8px]">
          <Loader />
        </div> 
        : 
        <div className="flex flex-col items-start justify-start sm:px-5 px-8 w-full">
          <div className="border-b border-gray-201 border-solid flex flex-col md:flex-row gap-5 items-start justify-start pb-6 w-full">
            <div className="flex flex-1 flex-col  h-full items-start justify-start w-full">
              <PageHeader
                >
                {event?.status == 'past' ? t('event.pastEvent') : t('event.upcomingEvent')}
              </PageHeader>
            </div>
            <SearchInput className={'w-[240px]'}/>
          </div>
          <div className="flex flex-col items-start justify-start w-full">
              <div className="flex flex-col md:flex-row gap-3 w-full bg-white-A700 border-b border-gray-201 pt-6 pb-9">
                <img
                  src={event?.headerImage}
                  alt="vector_three"
                  className="w-full md:h-[180px] md:w-[240px] rounded-[12px]"
                />
                <div className="flex flex-col gap-3 flex-1">
                    <div className="flex flex-row justify-between items-start gap-3 w-full">
                        <Text
                            className="h-[40px] text-[24px] font-dm-sans-bold leading-7 text-left text-blue_gray-903 w-full"
                            >
                            { event?.title || 'Monthly #FirstFridayFair Business, Data & Technology Virtual Event'}
                        </Text>
                        {((event?.status === 'upcoming' && !event?.userParticipated) ) &&
                        <button
                        onClick={handleAddAttendee}
                          className={`${bying ? 'bg-[#235DBD]' : 'bg-blue-A400'} hover:bg-[#235DBD] active:bg-[#224a94] text-white-A700 flex flex-row h-[38px] items-center justify-center px-4 py-2 rounded-md min-w-[101px] cursorpointer`}
                          type="button"
                          >
                          {bying ?  
                          <div className="flex items-center justify-center gap-6"> Sending... 
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M10.4995 13.5002L20.9995 3.00017M10.6271 13.8282L13.2552 20.5862C13.4867 21.1816 13.6025 21.4793 13.7693 21.5662C13.9139 21.6415 14.0862 21.6416 14.2308 21.5664C14.3977 21.4797 14.5139 21.1822 14.7461 20.5871L21.3364 3.69937C21.5461 3.16219 21.6509 2.8936 21.5935 2.72197C21.5437 2.57292 21.4268 2.45596 21.2777 2.40616C21.1061 2.34883 20.8375 2.45364 20.3003 2.66327L3.41258 9.25361C2.8175 9.48584 2.51997 9.60195 2.43326 9.76886C2.35809 9.91354 2.35819 10.0858 2.43353 10.2304C2.52043 10.3972 2.81811 10.513 3.41345 10.7445L10.1715 13.3726C10.2923 13.4196 10.3527 13.4431 10.4036 13.4794C10.4487 13.5115 10.4881 13.551 10.5203 13.5961C10.5566 13.647 10.5801 13.7074 10.6271 13.8282Z" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </div>   :
                          <span style={{ whiteSpace: 'nowrap' }} className="text-sm  font-dm-sans-medium leading-[18.23px]">
                          {t('event.eventDetails.buy')}
                          </span>
                          }
                        </button>
                     }
                    </div>
                  <div className="flex flex-row gap-3 items-center text-left">
                      <MdOutlineDateRange  size={18} className="text-teal-A300"/>
                      <Text
                      className="text-gray-801  text-base font-dm-sans-medium leading-6"
                      >
                      {formatEventDate(event?.startDate , event?.endDate)}
                      </Text>
                  </div>
                  <div className="flex flex-row gap-3 items-center  text-left">
                      <IoMdTime  size={18} className="text-teal-A300"/>
                      <Text
                      className="text-gray-801  text-base font-dm-sans-medium leading-6"
                      >
                      {formatEventTime(event?.startDate , event?.endDate , event?.startTime? event?.startTime : '', event?.endTime? event?.endTime : '')}
                      </Text>
                  </div>
                  <div className="flex flex-row gap-3 items-center text-left">
                      <BiMap  size={18} className="text-teal-A300"/>
                      <Text
                      className="text-gray-801  text-base font-dm-sans-medium leading-6"
                      >
                      {event?.physicalLocation || "Online Only"}
                      </Text>
                  </div>
                  {event?.userParticipated ? (
                    <div className="bg-blue-503 text-white-A700 flex flex-row justify-start w-28 items-center px-4 py-1 cursorpointer rounded-full">
                    <button
                      style={{whiteSpace:'nowrap'}}
                        type="button"
                        className="text-base text-light_blue-51"
                    >
                      {t('event.eventDetails.participate')}
                      </button>
                  </div>
                  ) : 
                  ( 
                    <div className="flex flex-row gap-3 items-center  text-left">
                      <PiTagBold    size={18} className="text-teal-A300"/>
                      <Text
                      className="text-gray-801  text-base font-dm-sans-medium leading-6"
                      >
                      {formatPrice(event?.price , currentLanguage)}
                      </Text>
                  </div>
                  )}
                  
                </div>
              </div> 
              <div className="flex flex-col gap-6 pt-9 w-full border-b border-gray-201 pb-8">
                <Text className=" text-[22px] font-dm-sans-medium leading-8 text-left text-blue_gray-903">
                {t('event.eventDetails.overview')}
                </Text>
                <div className="flex flex-col gap-7 w-full">
                    <div className="flex flex-col md:flex-row justify-between items-start gap-7 w-full">
                        <div className="flex flex-col justify-center items-start w-full md:w-[50%] gap-2.5">
                          <div className="flex flex-row gap-3 items-center">
                            <HiOutlineSpeakerphone size={20} className="text-teal-A700"/>
                            <Text  className=" text-xs font-dm-sans-bold leading-4 tracking-widest text-left text-blue_gray-301 uppercase">
                            {t('event.eventDetails.organizedBy')}
                            </Text>
                          </div>
                          <div className="relative">
                            <Text className=" text-base font-dm-sans-regular leading-relaxed text-left text-gray700 pl-8">
                            {event?.organizedBy || 'North Africa Dreamin'}
                            </Text>
                          </div>
                        </div>
                        <div className="flex flex-col justify-center items-start flex-1 gap-2.5">
                          <div className="flex flex-row gap-3 items-center">
                            <BiMap  size={20} className="text-teal-A700"/>
                            <Text  className=" text-xs font-dm-sans-bold leading-4 tracking-widest text-left text-blue_gray-301 uppercase">
                            {t('event.eventDetails.location')}
                            </Text>
                          </div>
                          <div className="relative">
                            <Text className=" text-base font-dm-sans-regular leading-relaxed text-left text-gray700 pl-8">
                            { event?.physicalLocation || 'Online Only'}
                            </Text>
                          </div>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row justify-between items-start gap-7 w-full">
                        <div className="flex flex-col justify-center items-start w-full md:w-[50%] gap-2.5">
                          <div className="flex flex-row gap-3 items-center">
                            <MdOutlineDateRange  size={20} className="text-teal-A700"/>
                            <Text  className=" text-xs font-dm-sans-bold leading-4 tracking-widest text-left text-blue_gray-301 uppercase">
                            {t('event.eventDetails.startDate')}
                            </Text>
                          </div>
                          <Text className=" text-base font-dm-sans-regular leading-relaxed text-left text-gray700 pl-8">
                          {formatEventStartEndDate()?.formattedStart}
                          </Text>
                        </div>
                        <div className="flex flex-col justify-center items-start flex-1 gap-2.5">
                          <div className="flex flex-row gap-3 items-center">
                            <MdOutlineDateRange   size={20} className="text-teal-A700"/>
                            <Text  className=" text-xs font-dm-sans-bold leading-4 tracking-widest text-left text-blue_gray-301 uppercase">
                            {t('event.eventDetails.endDate')}
                            </Text>
                          </div>
                          <div className="relative">
                            <Text className=" text-base font-dm-sans-regular leading-relaxed text-left text-gray700 pl-8">
                            {formatEventStartEndDate()?.formattedEnd}
                            </Text>
                          </div>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row justify-between items-start gap-7 w-full">
                        <div className="flex flex-col justify-center items-start w-full md:w-[50%] gap-2.5">
                          <div className="flex flex-row gap-3 items-center">
                            <BiPurchaseTagAlt    size={20} className="text-teal-A700"/>
                            <Text  className=" text-xs font-dm-sans-bold leading-4 tracking-widest text-left text-blue_gray-301 uppercase">
                            {t('event.eventDetails.industry')}
                            </Text>
                          </div>
                          <Text className=" text-base font-dm-sans-regular leading-relaxed text-left text-gray700 pl-8">
                          Artificial Intelligence (AI), Finance, FinTech, Salesforce
                          </Text>
                        </div>
                        <div className="flex flex-col justify-center items-start flex-1 gap-2.5">
                          <div className="flex flex-row gap-3 items-center">
                            <TbCopy   size={20} className="text-teal-A700"/>
                            <Text  className=" text-xs font-dm-sans-bold leading-4 tracking-widest text-left text-blue_gray-301 uppercase">
                            {t('event.eventDetails.eventType')}
                            </Text>
                          </div>
                          <div className="relative flex flex-row gap-3 items-center">
                            <Text className=" text-base font-dm-sans-regular leading-relaxed text-left text-gray700 pl-8">
                            { event?.category || 'Meetup, Networking, Conference'}
                            </Text>
                          </div>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row justify-between items-start gap-7 w-full">
                        <div className="flex flex-col justify-center items-start w-full w-full gap-2.5">
                          <div className="flex flex-row gap-3 items-center">
                          <BiMessageAltError size={20} className="text-teal-A700 transform scale-x-[-1]" />
                            <Text  className=" text-xs font-dm-sans-bold leading-4 tracking-widest text-left text-blue_gray-301 uppercase">
                            {t('event.eventDetails.description')}
                            </Text>
                          </div>
                          <div className=" text-base font-dm-sans-regular leading-relaxed text-left text-gray700 pl-8">
                            {event?.description.split('\n').map((line , index) =>
                              <p key={index} className="mb-4">{line}</p>
                            ) }
                          </div>
                        </div>
                    </div>
                    {(event?.status == 'past' && event?.attendeesUsers?.length > 0) &&
                    <div className="flex flex-col md:flex-row justify-between items-start gap-7 w-full">
                    <div className="flex flex-col justify-center items-start w-full w-full gap-2.5">
                      <div className="flex flex-row gap-3 items-center">
                      <BiMessageAltError size={20} className="text-teal-A700 transform scale-x-[-1]" />
                        <Text  className=" text-xs font-dm-sans-bold leading-4 tracking-widest text-left text-blue_gray-301 uppercase">
                        {t('event.eventDetails.attendance')}
                        </Text>
                      </div>
                      <div className="flex flex-row gap-3 w-full items-center pl-8">
                      {event?.attendeesUsers?.length > 0 && (
                        <>
                          {event?.attendeesUsers?.slice(0, 10).map((item, index) => (
                            <img 
                              key={index}
                              src={item?.userId?.image || userDefaultProfil}
                              alt="vector_three"
                              className="rounded-full w-12 h-12"
                            />
                          ))}
                          {event?.attendeesUsers?.length > 10 && (
                            <Text className="text-gray700  text-lg font-bold leading-26 tracking-wide text-left">
                              + {event?.attendeesUsers?.length - 10}
                            </Text>
                          )}
                        </>
                      )}
                      </div>
                    </div>
                </div>
                    }
                </div>
              </div> 
              <div className="flex flex-col gap-6 pt-9 w-full pb-8">
                <Text className=" text-lg font-semibold leading-8 text-left text-blue_gray-903">
                {t('event.eventDetails.sponsor')}
                </Text>
                <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-10 w-full items-center">
                  {sponsors?.length > 0 && (
                    sponsors.map((item, index) => (
                      <img key={index}
                    src={item?.logo}
                    alt="vector_three"
                      />
                    ))
                  )}
                </div>
              </div>  
          </div>
        </div>
    }
    </div>
    )
}
export default UpcomingEventDetails;