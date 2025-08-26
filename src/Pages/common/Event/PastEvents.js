import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { MdOutlineDateRange } from "react-icons/md";
import { BiMap } from "react-icons/bi";
import Pagination from "../../../Components/common/Pagination";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../../Components/common/PageHeader";
import SearchInput from "../../../Components/common/SeachInput";
import { useGetAllPastEventsUserParticipateQuery } from "../../../Services/Event.Service";
import Loader from "../../../Components/Loader";
import { useTranslation } from "react-i18next";
import { formatEventDateTime } from "../../../data/helper";
import HelmetWrapper from "../../../Components/common/HelmetWrapper";
import { useGetUserDetailsQuery } from "../../../Services/Auth";

const PastEvents = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { data: userDetails } = useGetUserDetailsQuery();
  const itemsPerPage = 5;
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(searchParams.get("page") || 1);
  const [totalPages, setTotalPages] = useState(0);
  const { data: eventsDT , isLoading, refetch } = useGetAllPastEventsUserParticipateQuery({ page: currentPage, pageSize: itemsPerPage });

  // const displayedEvents = eventsDT?.events;

  const displayedEvents = userDetails?.email?.toLowerCase() === 'contact.vfhl@gmail.com' ? eventsDT?.events : [];

  useEffect(() => {
    setCurrentPage(Number(searchParams.get("page")) || 1);
  }, [searchParams]);

  useEffect(() => {
    refetch();
  }, [currentPage, refetch]);

  useEffect(() => {
    setTotalPages(eventsDT?.totalPages);
  }, [eventsDT]);

  const currentLanguage = localStorage.getItem('language') || 'en';


  return (
    <>
      <HelmetWrapper
        title={t('helmet.events.past.title')}
        description={t('helmet.events.past.description')}
        keywords={t('helmet.events.past.keywords')}
        canonical={`${process.env.REACT_APP_URL}/PastEvent`}
      />
      <section className="bg-white-A700 flex flex-col gap-8 h-full min-h-screen overflow-auto items-start justify-start pb-14 pt-8 rounded-tl-[40px] w-full">
        <div className="flex flex-col items-start justify-start sm:px-5 px-8 w-full">
          <div className="border-b border-gray-201 border-solid flex flex-col md:flex-row gap-5 items-start justify-start pb-6 w-full">
            <div className="flex flex-1 flex-col font-DmSans h-full items-start justify-start w-full">
              <PageHeader
              >
                {t('event.pastEvent')}
              </PageHeader>
            </div>
            <SearchInput className={'w-[240px]'} />
          </div>
          <div className="flex flex-col items-start justify-start w-full min-h-[440px]">
            {displayedEvents?.length > 0 ?
              (displayedEvents.map((item, index) => (
                <div key={index} className="cursorpointer group flex flex-col md:flex-row gap-3 w-full bg-white-A700 border-b border-gray-201 py-6"
                  onClick={() => navigate(`/PastEventDetails/${item?._id}`, { state: { event: item } })}>
                  <img
                    src={item?.headerImage}
                    alt="vector_three"
                    loading="lazy"
                    className="w-full md:h-[140px] md:w-[170px] rounded-[12px]"
                  />
                  <div className="flex flex-col flex-1 gap-3">
                    <h2
                      className="font-dm-sans-medium text-lg leading-7 text-left text-blue_gray-903 w-full group-hover:text-[#00CDAE]"
                    >
                      {item?.title}
                    </h2>
                    <div className="flex flex-row gap-3 items-center text-left">
                      <MdOutlineDateRange size={18} className="text-blue_gray-301" />
                      <time
                        dateTime={formatEventDateTime(item?.startDate, item?.endDate, item?.startTime ? item?.startTime : '', item?.endTime ? item?.endTime : '', t)}
                        className="text-blue_gray-601 font-dm-sans-regular text-base leading-6"
                      >
                        {formatEventDateTime(item?.startDate, item?.endDate, item?.startTime ? item?.startTime : '', item?.endTime ? item?.endTime : '', t)}
                      </time>
                    </div>
                    <div className="flex flex-row gap-3 items-center text-left">
                      <BiMap size={18} className="text-blue_gray-301" />
                      <p
                        className="text-blue_gray-601 font-dm-sans-regular text-base leading-6"
                      >
                        {item?.locationType === "online" ? 'Virtual Only' : item.physicalLocation}
                      </p>
                    </div>
                    {item?.userParticipated && (
                      <button
                        className="bg-blue-503 text-white-A700 flex flex-row justify-center w-auto max-w-28 h-[28px] items-center px-4 py-1 rounded-full"
                        type="button"
                      >
                        <span style={{ whiteSpace: 'nowrap' }} className="text-base text-light_blue-51">{t('event.eventDetails.participate')}</span>
                      </button>
                    )}
                  </div>
                </div>
              ))
              )
              :
              <>
                {isLoading ? (
                  <div className="flex flex-col items-center text-blue_gray-800_01 gap-[16px] min-h-[330px] h-full w-full py-28 rounded-b-[8px]">
                    <Loader />
                  </div>
                ) : (
                  !displayedEvents?.length > 0 && (
                    <div className="flex flex-col items-center h-full w-full py-40 gap-4">
                      <svg width="32" height="30" viewBox="0 0 32 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M28.5 28.5L1.5 1.5M27 27H5.8C4.11984 27 3.27976 27 2.63803 26.673C2.07354 26.3854 1.6146 25.9265 1.32698 25.362C1 24.7202 1 23.8802 1 22.2V20.25C3.89949 20.25 6.25 17.8995 6.25 15C6.25 12.1005 3.89949 9.75 1 9.75V7.8C1 6.11984 1 5.27976 1.32698 4.63803C1.6146 4.07354 2 3.5 3 3M13 5V3M13 3H11.5M13 3H26.2C27.8802 3 28.7202 3 29.362 3.32698C29.9265 3.6146 30.3854 4.07354 30.673 4.63803C31 5.27976 31 6.11984 31 7.8V9.75C28.1005 9.75 25.75 12.1005 25.75 15C25.75 17.8995 28.1005 20.25 31 20.25V22.5M13 15.75V14.25M13 22.5V21" stroke="#667085" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <p
                        className="font-dm-sans-medium text-sm leading-[26px] text-gray700 w-auto"
                      >
                        {t('event.noPastEvent')}
                      </p>
                    </div>
                  )
                )}
              </>
            }
          </div>
          {(!isLoading && displayedEvents?.length > 0) && (
            <div className=" w-full flex items-center py-3">
              <Pagination nbrPages={totalPages} />
            </div>)}
        </div>
      </section>
    </>
  )
}
export default PastEvents;
