import React, { useState  ,useEffect} from "react";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import{Text } from "../Components/Text";
import { TbTicketOff } from "react-icons/tb";
import { MdOutlineDateRange } from "react-icons/md";
import { BiMap } from "react-icons/bi";
import { PiTagBold } from "react-icons/pi";
import Pagination from "../Components/Pagination";
import { PastEvents as PastEventsData } from "../data/tablesData";
import { useNavigate } from "react-router-dom";

const PastEvents = () => {
  const navigate = useNavigate();
  const itemsPerPage = 5;
    const [searchParams, setSearchParams] = useSearchParams();
    const [currentPage, setCurrentPage] = useState(searchParams.get("page") || 1);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const events = PastEventsData; 
  
  const totalPages = Math.ceil(events.length / itemsPerPage);

  const displayedEvents = events.slice(startIndex, endIndex);

  useEffect(() => {
    setCurrentPage(Number(searchParams.get("page")) || 1);
}, [searchParams]);

    return (
        <div className="bg-white-A700 flex flex-col gap-8 h-full min-h-screen items-start justify-start pb-8 pt-8 rounded-tl-[40px]  w-full">
            <div className="flex flex-col items-start justify-start sm:px-5 px-8 w-full">
              <div className="border-b border-indigo-50 border-solid flex flex-col md:flex-row gap-5 items-start justify-start pb-6 w-full">
                <div className="flex flex-1 flex-col font-dmsans h-full items-start justify-start w-full">
                  <Text
                    className="text-3xl font-bold leading-11 text-gray-900 w-full"
                    size="txtDmSansBold32"
                  >
                    Past Event
                  </Text>
                </div>
                <div className="flex md:w-[25%] w-full rounded-md p-2 border border-solid">
                  <img
                    className="cursor-pointer h-[18px] mr-1.5 my-px"
                    src="images/img_search_blue_gray_700_01.svg"
                    alt="search"
                  />
                  <input
                    className={`!placeholder:text-blue_gray-300 !text-blue_gray-300 font-manrope p-0 text-left text-sm tracking-[0.14px] w-full bg-transparent border-0`}
                    type="text"
                    name="search"
                    placeholder="Search..."
                  />
                </div>
              </div>
              <div className="flex flex-col items-start justify-start w-full">
                {displayedEvents?.length > 0 ? 
                (displayedEvents.map((item, index) => (
                  <div key={index} className="flex flex-col md:flex-row gap-3 w-full bg-white-A700 border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700 py-6 cursor-pointer" 
                  onClick={()=> navigate('/UpcomingEventDetails' , { state: { past: true } })}>
                    <img
                      src={item.image}
                      alt="vector_three"
                      className="w-full md:h-[140px] md:w-[170px] rounded-[12px]"
                    />
                    <div className="flex flex-col flex-1 gap-3">
                      <Text
                      className="font-DmSans text-lg font-medium leading-7 text-left text-blue_gray-903 w-full"
                      >
                        {item.name}
                      </Text>
                      <div className="flex flex-row gap-3 items-center text-left">
                          <MdOutlineDateRange  size={18} className="text-blue_gray-301"/>
                          <Text
                          className="text-blue_gray-601 font-DmSans text-base font-normal leading-6"
                          >
                          {/* {rowData?.dateTime} */}
                          {item.date}<span style={{ marginRight: '10px', marginLeft: '10px' }}>•</span>{item.time}
                          </Text>
                      </div>
                      <div className="flex flex-row gap-3 items-center text-left">
                          <BiMap  size={18} className="text-blue_gray-301"/>
                          <Text
                          className="text-blue_gray-601 font-DmSans text-base font-normal leading-6"
                          >
                          {item.location}
                          </Text>
                      </div>
                      {item.canParticipate && (
                        <div className="bg-blue-503 text-white-A700 flex flex-row justify-start w-28 items-center px-4 py-1 rounded-full">
                        <button
                          style={{whiteSpace:'nowrap'}}
                            type="button"
                            className="text-base text-light_blue-51"
                        >
                          Participate
                          </button>
                      </div>
                      )} 
                    </div>
                  </div>
                ))
                )
                :
                <div className="flex flex-col items-center h-screen  w-full py-28 gap-5">
                    <TbTicketOff  size={40} className="rotate-[180deg] text-gray500" />
                    <Text
                      className="font-DmSans text-sm font-normal leading-6 text-gray700 w-auto py-4"
                      size=""
                    >
                      No Upcoming Event 
                    </Text>
                  </div>
              }                
              </div>
              <div className=" w-full flex items-center py-3">
              <Pagination nbrPages={totalPages} />
              </div>
            </div>
        </div>
    )
}
export default PastEvents;