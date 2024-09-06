import React, { useState , useEffect} from "react";
import { useSelector } from "react-redux";
import { TbTicketOff } from "react-icons/tb";
import{Text } from "../Components/Text";
import { MdOutlineDateRange } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { BiMap } from "react-icons/bi";
import { PiTagBold } from "react-icons/pi";
import Pagination from "../Components/Pagination";
import {  useSearchParams } from 'react-router-dom';
import PageHeader from "../Components/PageHeader";
import SearchInput from "../Components/SeachInput";
import {useGetEventsQuery} from '../Services/Event.Service';
import fileSearchImg from '../Media/file-search.svg';
import { format, parse } from 'date-fns';
import { fr , enUS } from 'date-fns/locale';
import Loader from "../Components/Loader";

const UpcomingEvents = () => {
  const navigate = useNavigate();
  const {data : eventsDT , error, isLoading , refetch } = useGetEventsQuery();
  const itemsPerPage = 5;
    const [searchParams, setSearchParams] = useSearchParams();
    const [currentPage, setCurrentPage] = useState(searchParams.get("page") || 1);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const events =  eventsDT ? eventsDT?.events.filter(event => event.status === 'upcoming') : [];

  const totalPages = Math.ceil(events.length / itemsPerPage);

  const displayedEvents = events.slice(startIndex, endIndex);

  useEffect(() => {
    setCurrentPage(Number(searchParams.get("page")) || 1);
}, [searchParams]);

function parseTime(time) {
  let parsedTime;
  try {
    parsedTime = parse(time, 'hh:mm a', new Date());
  } catch (error) {
    parsedTime = parse(time, 'h:mm a', new Date());
  }
  return parsedTime;
}

function formatEventDateTime(startDate, endDate, startTime, endTime) {
  if (!startDate || !endDate || !startTime || !endTime || startTime === '' || endTime === '') {
    return 'Coming Soon';
  }

  try {
    const parsedStartTime = parseTime(startTime);
    const parsedEndTime = parseTime(endTime);

    const formattedStartTime = format(parsedStartTime, 'ha', { locale: enUS }).toLowerCase();
    const formattedEndTime = format(parsedEndTime, 'ha', { locale: enUS }).toLowerCase();

    const startDateTime = new Date(startDate);
    const endDateTime = new Date(endDate);

    if (startDateTime.getDate() === endDateTime.getDate() && startDateTime.getMonth() === endDateTime.getMonth() && startDateTime.getFullYear() === endDateTime.getFullYear()) {
      const formattedDate = format(startDateTime, 'EEEE, MMMM d', { locale: enUS });
      const gmtOffset = startDateTime.getTimezoneOffset() / 60; // Obtenez l'offset en heures
      const gmt = gmtOffset >= 0 ? `+${gmtOffset}` : gmtOffset.toString(); 
      return `${formattedDate}\u00A0\u00A0 • \u00A0\u00A0${formattedStartTime} - ${formattedEndTime}`;
    } else {
      const formattedStartDate = format(startDateTime, 'EEE, MMM d, yyyy', { locale: enUS });
      return `${formattedStartDate}\u00A0\u00A0 • \u00A0\u00A0${startTime.toUpperCase()}`;
    }
  } catch (error) {
    console.error('Error formatting date/time:', error);
    return 'Invalid Date/Time';
  }
}
  
    return (
        <div className="bg-white-A700 flex flex-col gap-8 h-full min-h-screen items-start justify-start pb-8 pt-8 rounded-tl-[40px]  w-full">
            <div className="flex flex-col items-start justify-start sm:px-5 px-8 w-full">
              <div className="border-b border-gray-201 border-solid flex flex-col md:flex-row gap-5 items-start justify-start pb-6 w-full">
                <div className="flex flex-1 flex-col font-DmSans h-full items-start justify-start w-full">
                  <PageHeader
                    >
                    Upcoming Event
                  </PageHeader>
                </div>
                <SearchInput className={'w-[240px]'}/>
              </div>
              <div className="flex flex-col items-start justify-start w-full min-h-[440px] ">
                {displayedEvents?.length > 0 ? 
                (displayedEvents.map((item, index) => (
                  <div key={index} className="cursorpointer group flex flex-col md:flex-row gap-3 w-full bg-white-A700 border-b border-gray-201 py-6 " 
                  onClick={()=> navigate(`/UpcomingEventDetails/${item?._id}` , { state: { event: item } })}>
                    <img
                      src={item.headerImage}
                      alt="vector_three"
                      loading="lazy"
                      className="w-full md:h-[140px] md:w-[170px] rounded-[12px]"
                    />
                    <div className="flex flex-col flex-1 gap-3">
                      <Text
                      className="font-DmSans text-lg font-medium leading-7 text-left text-blue_gray-903 w-full group-hover:text-[#00CDAE] "
                      >
                        {item.title}
                      </Text>
                      <div className="flex flex-row gap-3 items-center text-left">
                          <MdOutlineDateRange  size={18} className="text-blue_gray-301"/>
                          <Text
                          className="text-blue_gray-601 font-dm-sans-regular text-base leading-6"
                          >
                          {formatEventDateTime(item?.startDate , item?.endDate , item?.startTime? item?.startTime : '', item?.endTime? item?.endTime : '')}
                          </Text>
                      </div>
                      <div className="flex flex-row gap-3 items-center text-left">
                          <BiMap  size={18} className="text-blue_gray-301"/>
                          <Text
                          className="text-blue_gray-601 font-dm-sans-regular text-base leading-6"
                          >
                          {item.locationType == "online" ? 'Virtual Only' : item.physicalLocation }
                          </Text>
                      </div>
                      <div className="flex flex-row gap-3 items-center text-left">
                          <PiTagBold    size={18} className="text-blue_gray-301"/>
                          <Text
                          className="text-blue_gray-601 font-dm-sans-regular text-base leading-6"
                          >
                          {item.price == 0? 'Free' : `From $ ${(item.price).toFixed(2)}`}
                          </Text>
                      </div>
                    </div>
                  </div>
                ))
                )
                :
                <>
                {isLoading ? (
                <div className="flex flex-col items-center text-blue_gray-800_01 gap-[16px] min-h-[330px] w-full py-28 rounded-b-[8px]">
                  <Loader />
                  </div>
                ) : (
                  !events?.length > 0 && (
                  <div className="flex flex-col items-center h-screen  w-full py-28 gap-4">
                    <svg width="32" height="30" viewBox="0 0 32 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M28.5 28.5L1.5 1.5M27 27H5.8C4.11984 27 3.27976 27 2.63803 26.673C2.07354 26.3854 1.6146 25.9265 1.32698 25.362C1 24.7202 1 23.8802 1 22.2V20.25C3.89949 20.25 6.25 17.8995 6.25 15C6.25 12.1005 3.89949 9.75 1 9.75V7.8C1 6.11984 1 5.27976 1.32698 4.63803C1.6146 4.07354 2 3.5 3 3M13 5V3M13 3H11.5M13 3H26.2C27.8802 3 28.7202 3 29.362 3.32698C29.9265 3.6146 30.3854 4.07354 30.673 4.63803C31 5.27976 31 6.11984 31 7.8V9.75C28.1005 9.75 25.75 12.1005 25.75 15C25.75 17.8995 28.1005 20.25 31 20.25V22.5M13 15.75V14.25M13 22.5V21" stroke="#667085" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <Text
                      className="font-dm-sans-medium text-sm leading-[26px] text-gray700 w-auto"
                      size=""
                    >
                      No Upcoming Event 
                    </Text>
                  </div>
                  )
                )}
                </>
              }                
              </div>
              {(!isLoading && events?.length > 0) && (
              <div className=" w-full flex items-center py-3">
              <Pagination nbrPages={totalPages} />
              </div>
              )}
            </div>
        </div>
    )
}

export default UpcomingEvents;