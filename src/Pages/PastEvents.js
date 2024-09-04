import React, { useState  ,useEffect} from "react";
import { useSearchParams } from "react-router-dom";
import{Text } from "../Components/Text";
import { TbTicketOff } from "react-icons/tb";
import { MdOutlineDateRange } from "react-icons/md";
import { BiMap } from "react-icons/bi";
import Pagination from "../Components/Pagination";
import { useNavigate } from "react-router-dom";
import PageHeader from "../Components/PageHeader";
import SearchInput from "../Components/SeachInput";
import { useGetEventsQuery , useGetAllPastEventsUserParticipateQuery } from "../Services/Event.Service";
import Loader from "../Components/Loader";
import { enUS } from "date-fns/locale";
import { format, parse } from 'date-fns';


const PastEvents = () => {
  const navigate = useNavigate();
  const {data : eventsDT , error, isLoading , refetch } = useGetAllPastEventsUserParticipateQuery();

  const itemsPerPage = 5;
    const [searchParams, setSearchParams] = useSearchParams();
    const [currentPage, setCurrentPage] = useState(searchParams.get("page") || 1);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // const events =  eventsDT? eventsDT?.events.filter(event => event.status === 'past') : [];

  const events =  eventsDT? eventsDT : [];
  
  const totalPages = Math.ceil(events.length / itemsPerPage);

  const displayedEvents = events.slice(startIndex, endIndex);

  useEffect(() => {
    setCurrentPage(Number(searchParams.get("page")) || 1);
}, [searchParams]);

console.log(events)

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
              <div className="border-b border-gray-201 border-solid flex flex-col md:flex-row gap-5 items-start justify-start pb-6 w-full">
                <div className="flex flex-1 flex-col font-DmSans h-full items-start justify-start w-full">
                  <PageHeader
                    >
                    Past Event
                  </PageHeader>
                </div>
                <SearchInput className={'w-[240px]'}/>
              </div>
              <div className="flex flex-col items-start justify-start w-full">
                {displayedEvents?.length > 0 ? 
                (displayedEvents.map((item, index) => (
                  <div key={index} className="cursorpointer group flex flex-col md:flex-row gap-3 w-full bg-white-A700 border-b border-gray-201 py-6" 
                  onClick={()=> navigate(`/PastEventDetails/${item?._id}` , { state: { event: item } })}>
                    <img
                      src={item.headerImage}
                      alt="vector_three"
                      loading="lazy"
                      className="w-full md:h-[140px] md:w-[170px] rounded-[12px]"
                    />
                    <div className="flex flex-col flex-1 gap-3">
                      <Text
                      className="font-DmSans text-lg font-medium leading-7 text-left text-blue_gray-903 w-full group-hover:text-[#00CDAE]"
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
                      {item.userParticipated && (
                        <button
                        className="bg-blue-503 text-white-A700 flex flex-row justify-start w-28 items-center px-4 py-1 rounded-full"
                        type="button"
                      >
                        <span style={{ whiteSpace: 'nowrap' }} className="text-base text-light_blue-51">Participate</span>
                      </button>
                      )} 
                    </div>
                  </div>
                ))
                )
                :
                <>
                {isLoading ? (
                <div className="flex flex-col items-center text-blue_gray-800_01 gap-[16px] min-h-[330px] w-full py-28">
                  <Loader />
                  </div>
                ) : (
                  !events?.length > 0 && (
                  <div className="flex flex-col items-center h-screen  w-full py-28 gap-4">
                    <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5.5 11.5L8.5 8.5M8.5 8.5L11.5 11.5M8.5 8.5V15.25M14.5 12.0571C15.4161 11.3005 16 10.156 16 8.875C16 6.59683 14.1532 4.75 11.875 4.75C11.7111 4.75 11.5578 4.6645 11.4746 4.5233C10.4965 2.86363 8.69082 1.75 6.625 1.75C3.5184 1.75 1 4.2684 1 7.375C1 8.92458 1.62659 10.3278 2.64021 11.3451" stroke="#2575F0" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <Text
                      className="font-dm-sans-medium text-sm leading-[26px] text-gray700 w-auto py-4"
                      size=""
                    >
                      No Past Event Founded 
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
              </div>)}
            </div>
        </div>
    )
}
export default PastEvents;
