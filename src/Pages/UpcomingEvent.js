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

function formatEventDateTime(startDate, endDate, startTime, endTime) {
    
  if (!startDate || !endDate || !startTime || !endTime || startTime=='' || endTime=='' ) {
      return 'Coming Soon';
  }
  else {
      const formattedStartTimev = format(parse(startTime, 'h:mm a', new Date()), 'ha', { locale: enUS }).toLowerCase();
      const formattedEndTimev = format(parse(endTime, 'h:mm a', new Date()), 'ha', { locale: enUS }).toLowerCase();

      const startDateTime = new Date(startDate);
      const endDateTime = new Date(endDate);

      if (startDateTime.getDate() === endDateTime.getDate() && startDateTime.getMonth() === endDateTime.getMonth() && startDateTime.getFullYear() === endDateTime.getFullYear()) {
          const formattedDate = format(startDateTime, 'EEEE, MMMM d', { locale: enUS });
          const gmtOffset = startDateTime.getUTCHours(); 
          const gmt = gmtOffset >= 0 ? `+${gmtOffset}` : gmtOffset.toString(); 
          return `${formattedDate}\u00A0\u00A0 • \u00A0\u00A0${formattedStartTimev} - ${formattedEndTimev} ${gmt}`;
      } else {
          const formattedStartDate = format(startDateTime, 'EEE, MMM d, yyyy', { locale: enUS });
          return `${formattedStartDate}\u00A0\u00A0 • \u00A0\u00A0${startTime.toUpperCase()}`;
      }

          }
}
  
    return (
        <div className="bg-white-A700 flex flex-col gap-8 h-full min-h-screen items-start justify-start pb-8 pt-8 rounded-tl-[40px]  w-full">
            <div className="flex flex-col items-start justify-start sm:px-5 px-8 w-full">
              <div className="border-b border-indigo-50 border-solid flex flex-col md:flex-row gap-5 items-start justify-start pb-6 w-full">
                <div className="flex flex-1 flex-col font-DmSans h-full items-start justify-start w-full">
                  <PageHeader
                    >
                    Upcoming Event
                  </PageHeader>
                </div>
                <SearchInput className={'min-w-[25%]'}/>
              </div>
              <div className="flex flex-col items-start justify-start w-full">
                {displayedEvents?.length > 0 ? 
                (displayedEvents.map((item, index) => (
                  <div key={index} className="flex flex-col md:flex-row gap-3 w-full bg-white-A700 border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700 py-6 cursorpointer-green" 
                  onClick={()=> navigate(`/UpcomingEventDetails/${item?._id}` , { state: { event: item } })}>
                    <img
                      src={item.headerImage}
                      alt="vector_three"
                      loading="lazy"
                      className="w-full md:h-[140px] md:w-[170px] rounded-[12px]"
                    />
                    <div className="flex flex-col flex-1 gap-3">
                      <Text
                      className="font-DmSans text-lg font-medium leading-7 text-left text-blue_gray-903 w-full"
                      >
                        {item.title}
                      </Text>
                      <div className="flex flex-row gap-3 items-center text-left">
                          <MdOutlineDateRange  size={18} className="text-blue_gray-301"/>
                          <Text
                          className="text-blue_gray-601 font-DmSans text-base font-normal leading-6"
                          >
                          {formatEventDateTime(item?.startDate , item?.endDate , item?.startTime? item?.startTime : '', item?.endTime? item?.endTime : '')}
                          </Text>
                      </div>
                      <div className="flex flex-row gap-3 items-center text-left">
                          <BiMap  size={18} className="text-blue_gray-301"/>
                          <Text
                          className="text-blue_gray-601 font-DmSans text-base font-normal leading-6"
                          >
                          {item.locationType == "online" ? 'Virtual Only' : item.physicalLocation }
                          </Text>
                      </div>
                      <div className="flex flex-row gap-3 items-center text-left">
                          <PiTagBold    size={18} className="text-blue_gray-301"/>
                          <Text
                          className="text-blue_gray-601 font-DmSans text-base font-normal leading-6"
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
                <div className="flex flex-col items-center text-blue_gray-601 w-full py-28">
                  <Loader />
                  </div>
                ) : (
                  !events?.length > 0 && (
                  <div className="flex flex-col items-center h-screen  w-full py-28 gap-5">
                    <TbTicketOff  size={40} className="rotate-[180deg] text-gray500" />
                    <Text
                      className="font-DmSans text-sm font-normal leading-[26px] text-gray700 w-auto py-4"
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
              <div className=" w-full flex items-center py-3">
              <Pagination nbrPages={totalPages} />
              </div>
            </div>
        </div>
    )
}

export default UpcomingEvents;