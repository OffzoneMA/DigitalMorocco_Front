import React, { useState , useRef , useEffect} from "react";
import{Text } from "../../../Components/Text";
import { BiFilterAlt } from "react-icons/bi";
import { useSearchParams , useNavigate} from "react-router-dom";
import { BsThreeDots } from "react-icons/bs";
import { FiDelete } from "react-icons/fi";
import { HiOutlineQrcode } from "react-icons/hi";
import { FiDownload } from "react-icons/fi";
import TablePagination from "../../../Components/common/TablePagination";
import SimpleSelect from "../../../Components/common/SimpleSelect";
import MultipleSelect from "../../../Components/common/MultipleSelect";
import ViewTicketModal from "../../../Components/ViewTicketModal";
import PageHeader from "../../../Components/common/PageHeader";
import TableTitle from "../../../Components/common/TableTitle";
import SearchInput from "../../../Components/common/SeachInput";
import Loader from "../../../Components/Loader";
import { useGetDistinctValuesByUserQuery } from "../../../Services/Event.Service";
import ticketEmptyImg from '../../../Media/ticket_empty.svg';
import format from "date-fns/format";
import DownloadTicket1 from "../../../Components/DownloadTicket1";
import { PDFDownloadLink } from '@react-pdf/renderer';
import ReactDOM from 'react-dom';
import userDefaultProfil from '../../../Media/User1.png'
import CustomCalendar from "../../../Components/common/CustomCalendar";
import ApproveSponsoringRequestModal from "../../../Components/Modals/Sponsoring/ApproveSponsoringRequestModal";
import RejectSponsoringRequestModal from '../../../Components/Modals/Sponsoring/RejectSponsoringRequestModal';
import { useGetApprovedSponsorsForPartnerQuery , useGetDistinctEventFieldsByPartnerQuery } from "../../../Services/Sponsor.Service";
import { parseDateString } from "../../../data/helper";
import { useTranslation } from "react-i18next";

const PastSponsorEvent = () => {
  const { t } = useTranslation();
  const currentLanguage = localStorage.getItem('language') || 'en'; 
    const navigate = useNavigate();
    const [field, setField] = useState('physicalLocation');
    const [eventStatus, setStatus] = useState(['past']);
    const [sponsorStatus, setSponsorStatus] = useState(['Approved']);
    const { data: distinctValues , isLoading: distinctsValueLoading } = useGetDistinctEventFieldsByPartnerQuery({field , eventStatus , sponsorStatus});
    const [filter , setFilter] = useState(false);
    const [filterApply , setFilterApply] = useState(false);
    const [keywords, setKeywords] = useState('');
    const [location, setLocation] = useState('');
    const [isSubscribe , setIsSubscribe] = useState(false);
    const [profilVerified , setProfilVerified] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const [types, setTypes] = useState([]);
    const [cur, setCur] = useState(1);
    const [rowData , setRowData] = useState(null);
    const [downloadFile , setDownloadFile] = useState(false);
    const itemsPerPage = 8;
    const itemsToShow = 4;
    const [totalPages , setTotalPages] = useState(0);
    const [activeDropdown, setActiveDropdown] = useState(-1);
    const dropdownRef = useRef(null);
    const [openDropdownIndexes, setOpenDropdownIndexes] = useState([]);
    const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);
    const [ticketDataRow , setTicketDataRow] = useState(null);
    const [selectedDate , setSelectedDate] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
    const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);

    
    const queryParams = { page: cur, pageSize: itemsPerPage };

    if (filterApply) {
      queryParams.location = location || undefined;
      queryParams.exactDate = selectedDate !== '' ? parseDateString(selectedDate) : '';
      queryParams.sponsorshipType =  types;
    }
    const {data : events , error , isFetching: isLoading , refetch } = useGetApprovedSponsorsForPartnerQuery(queryParams);

    useEffect(() => {
      const pageFromUrl = parseInt(searchParams.get('page')) || 1;
      setCur(pageFromUrl);
    }, [searchParams]);
    
    useEffect(() => {
      // if(filterApply && events?.currentPage !== cur) {
        refetch();
      // }
    }, [cur, events?.currentPage , filterApply , refetch]);
  
    useEffect(() => {
      setTotalPages(events?.totalPages);
      setCur(events?.currentPage);
      setSearchParams({ page: `${events?.currentPage}` });
    }, [events]);

    function handlePageChange(page) {
      if (page >= 1 && page <= totalPages) {
        setCur(page);
      }
    }

    const clearFilter = () => {
      setFilter(false); 
      setFilterApply(false);
      setLocation('');
    }

    const filteredData = events?.data?.filter(item => {
      const keywordMatch = item?.eventId?.title?.toLowerCase().includes(keywords.toLowerCase());

      return keywordMatch;
    });

    const pageData = filteredData;

  const toggleDropdownClick = (index, event) => {
    event.stopPropagation();
    if (openDropdownIndexes.includes(index)) {
      setOpenDropdownIndexes(openDropdownIndexes.filter((i) => i !== index));
    } else {
      setOpenDropdownIndexes([...openDropdownIndexes, index]);
    }
  };

  const toggleDropdown = (index, event) => {
    event.stopPropagation();
    setOpenDropdownIndexes([...openDropdownIndexes, index]);
  };

  const toggleDropdownClose = (index, event) => {
    event.stopPropagation();
    if (openDropdownIndexes.includes(index)) {
      setOpenDropdownIndexes(openDropdownIndexes.filter((i) => i !== index));
    } 
  };

  const isDropdownOpen = (index) => {
    return openDropdownIndexes.includes(index);
  };

    const renderDropdown = (index , item) => {
        const triggerElement = document.getElementById(`dropdown-trigger-${index}`);
        const triggerRect = triggerElement.getBoundingClientRect();
    
        return ReactDOM.createPortal(
        <div className="absolute top-[calc(100%)] right-0 z-50" style={{ top: `${triggerRect.bottom}px`, right: `${30}px` }}>
            <div className="mt-4 px-3 py-6 shadow-sm md:shadow-lg bg-white-A700 min-w-40  fex flex-col rounded-md">
            <div className="flex flex-row gap-3 items-center cursorpointer hover:text-[#35D8BF]" onClick={()=> navigate(`/PastSponsorEventDetails/${item?._id}` , { state: { event: item } })}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.33317 1.51306V4.26676C9.33317 4.64012 9.33317 4.82681 9.40583 4.96942C9.46975 5.09486 9.57173 5.19684 9.69718 5.26076C9.83978 5.33342 10.0265 5.33342 10.3998 5.33342H13.1535M9.33317 11.3334H5.33317M10.6665 8.66671H5.33317M13.3332 6.65886V11.4667C13.3332 12.5868 13.3332 13.1469 13.1152 13.5747C12.9234 13.951 12.6175 14.257 12.2412 14.4487C11.8133 14.6667 11.2533 14.6667 10.1332 14.6667H5.8665C4.7464 14.6667 4.18635 14.6667 3.75852 14.4487C3.3822 14.257 3.07624 13.951 2.88449 13.5747C2.6665 13.1469 2.6665 12.5868 2.6665 11.4667V4.53337C2.6665 3.41327 2.6665 2.85322 2.88449 2.42539C3.07624 2.04907 3.3822 1.74311 3.75852 1.55136C4.18635 1.33337 4.7464 1.33337 5.8665 1.33337H8.00769C8.49687 1.33337 8.74146 1.33337 8.97163 1.38863C9.17571 1.43763 9.3708 1.51844 9.54974 1.62809C9.75157 1.75178 9.92453 1.92473 10.2704 2.27063L12.3959 4.39612C12.7418 4.74202 12.9148 4.91497 13.0385 5.1168C13.1481 5.29575 13.2289 5.49084 13.2779 5.69491C13.3332 5.92509 13.3332 6.16968 13.3332 6.65886Z" stroke="#2575F0" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <Text
                className="text-gray-801 font-dm-sans-regular text-sm leading-6 hover:text-[#35D8BF] "
                >
                {t('eventListSponsoring.view')}
                </Text>
            </div>
            <PDFDownloadLink document={<DownloadTicket1 title={item?.title} date={item?.startDate ? `${format(new Date(item.startDate), 'E, MMM d, yyyy')}${item.startTime ? `  ${item?.startTime || ''}` : ''}` : 'Coming Soon'} TicketCode='OpenMic' name='Ichane Roukéya' ticketNumber={2}/>} fileName="ticket.pdf">
                {({ blob, url, loading, error }) => ( 
                loading ? 
                <div className="flex flex-row gap-3 items-center pt-5 cursorpointer hover:text-[#35D8BF]">
                    <FiDownload size={18} className="text-blue-A400 "/>
                    <Text
                        className="text-gray-801 font-dm-sans-regular text-sm leading-6 hover:text-[#35D8BF]"
                    >
                        {t('eventListSponsoring.download')}
                    </Text>
                </div>
                :
                <div className="flex flex-row gap-3 items-center pt-5 cursorpointer hover:text-[#35D8BF]" >
                    <FiDownload size={18} className="text-blue-A400 "/>
                    <Text
                        className="text-gray-801 font-dm-sans-regular text-sm leading-6 hover:text-[#35D8BF]"
                    >
                        {t('eventListSponsoring.download')}
                    </Text>
                </div>
                )}
            </PDFDownloadLink>
            </div>
        </div>,
        document.getElementById('root')
        );
    }

    const sponsoringTypes = [
      "Financial",
      "Venue Partner",
      "Prize Sponsors",
       "Other",
    ];
    return (
        <>
        <div className="bg-white-A700 flex flex-col gap-8 h-full min-h-screen overflow-auto items-start justify-start pb-14 pt-8 rounded-tl-[40px] w-full">
            <div className="flex flex-col items-start justify-start sm:px-5 px-8 w-full">
              <div className="border-b border-gray-201 border-solid flex flex-col md:flex-row gap-5 items-start justify-start pb-6 w-full">
                <div className="flex flex-1 flex-col font-DmSans h-full items-start justify-start w-full">
                  <PageHeader
                    >
                    {t('sidebar.sponsoring.pastEventSponsor')}
                  </PageHeader>
                </div>
                <SearchInput className={'w-[240px]'}/>
              </div>
            </div>
            <div className="flex flex-col items-start justify-start w-full">
              <div className="flex flex-col items-start justify-start sm:px-5 px-8 w-full">
                <div className="relative w-full bg-white-A700 border border-gray-201 rounded-[8px] shadow-tablesbs ">
                  <div className="flex flex-row gap-4 items-center text-gray-500 border-b border-gray-201 rounded-t-lg bg-white-A700 py-[19.5px] px-5">
                    <TableTitle
                      style={{whiteSpace:"nowrap"}}
                    >
                      {t('eventListSponsoring.eventList')}
                    </TableTitle>
                    <div className=" grid-cols-auto-fit md:flex md:flex-1 md:flex-wrap md:flex-row grid grid-cols-2 gap-3 w-auto items-center justify-end ml-auto">
                      {filter && 
                    (
                        <>
                        <div className="flex min-w-[70px]">
                          <input
                            className={`!placeholder:text-blue_gray-301 !text-gray700 font-manrope text-left text-sm tracking-[0.14px] rounded-[6px] px-[12px] py-[10px] h-[40px] border border-[#D0D5DD] focus:border-focusColor focus:shadow-inputBs w-full`}
                            type="text"
                            name="search"
                            placeholder={t("common.keywords")}
                            value={keywords}
                            onChange={e => setKeywords(e.target.value)}
                          />
                        </div>
                        <CustomCalendar
                        className={'min-w-[120px]'} 
                        inputPlaceholder={'Date'} 
                        showIcon={false}
                        onChangeDate={(date) => setSelectedDate(date)}
                      />
                      <MultipleSelect className="min-w-[170px] max-w-[200px]" id='typeOfSponsoring' options={sponsoringTypes}  searchLabel={t('common.searchType')} setSelectedOptionVal={setTypes} 
                      placeholder={t('common.typeofInvestment')} searchable={false} 
                      content={
                        ( option) =>{ return (
                          <div className="flex  py-2 items-center  w-full">
                              <Text
                                className="text-gray-801 text-left text-base font-dm-sans-regular leading-5 w-auto"
                                >
                                {t(`${option}`)}
                              </Text>
                            </div>
                          );
                        }
                      }/>
                        <SimpleSelect className="min-w-[120px] max-w-[300px] " id='country' options={distinctValues?.data || []}  searchLabel={t('common.searchLocation')} setSelectedOptionVal={setLocation} 
                          placeholder={t("common.location")} 
                          content={
                            ( option) =>{ return (
                              <div className="flex  py-2 items-center  w-full">
                                  <Text
                                    className="text-gray-801 text-left text-base font-dm-sans-regular leading-5 w-auto"
                                    >
                                    {t(`${option}`)}
                                  </Text>
                                </div>
                              );
                            }
                          }/>           
                        </>
                    )}
                      {filter ?
                      (<button
                        className="bg-blue-A400 hover:bg-[#235DBD] active:bg-[#224a94] text-white-A700 flex flex-row items-center justify-center cursorpointer p-[6px] h-[37px] rounded-md"
                        onClick={() => setFilterApply(true)}
                        type="button"
                    >
                        <BiFilterAlt size={18} className="mr-2" />
                        <span className="font-dm-sans-medium text-sm leading-[18.23px] text-white-A700" style={{ whiteSpace: 'nowrap' }}>
                            {t("common.applyFilters")}
                        </span>
                    </button>
                    ):
                      (
                      <button
                        className={`col-end-3 ${pageData?.length === 0 ? 'bg-[#e5e5e6] text-[#a7a6a8] cursor-not-allowed' : 'hover:bg-[#235DBD] active:bg-[#224a94] bg-blue-A400 text-white-A700'} col-span-1 flex flex-row items-center justify-center cursorpointer px-[12px] py-[7px] h-[37px] text-sm font-dm-sans-medium rounded-md`}
                        onClick={() => setFilter(true)}
                        type="button"
                        disabled={pageData?.length === 0}
                      >
                        <BiFilterAlt size={18} className="mr-2" />
                        <span className="font-dm-sans-medium text-sm leading-[18.23px]" style={{ whiteSpace: 'nowrap' }}>
                            {t('common.filters')}
                        </span>
                      </button>
                      )
                      }
                        {filterApply && (
                          <button
                            className="text-[#15143966] hover:text-[#1514397e] flex flex-row gap-[4px] items-center p-[2px] h-[38px] max-w-[75px] border-b border-solid border-[#15143966] cursorpointer"
                            onClick={clearFilter}
                            type="button"
                            >
                            <svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.75 4.75L8.25 9.25M8.25 4.75L12.75 9.25M2.04 7.72L5.28 12.04C5.544 12.392 5.676 12.568 5.84329 12.6949C5.99145 12.8074 6.15924 12.8913 6.33808 12.9423C6.54 13 6.76 13 7.2 13H12.9C14.1601 13 14.7902 13 15.2715 12.7548C15.6948 12.539 16.039 12.1948 16.2548 11.7715C16.5 11.2902 16.5 10.6601 16.5 9.4V4.6C16.5 3.33988 16.5 2.70982 16.2548 2.22852C16.039 1.80516 15.6948 1.46095 15.2715 1.24524C14.7902 1 14.1601 1 12.9 1H7.2C6.76 1 6.54 1 6.33808 1.05767C6.15924 1.10874 5.99145 1.19264 5.84329 1.30506C5.676 1.432 5.544 1.608 5.28 1.96L2.04 6.28C1.84635 6.53819 1.74953 6.66729 1.71221 6.80907C1.67926 6.93423 1.67926 7.06577 1.71221 7.19093C1.74953 7.33271 1.84635 7.46181 2.04 7.72Z" stroke="#151439" stroke-opacity="0.4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            <span className="text-base font-dm-sans-regular leading-[26px]">{t('common.clear')}</span>
                          </button>
                        )}
                      </div>
                  </div>
                  <div className={`bg-white-A700 flex flex-col md:gap-5 flex-1 items-start justify-start ${(pageData?.length > 0  && !isLoading) ? 'border-b border-gray-201' : 'rounded-b-[8px]'} w-full pb-4 min-h-[330px] overflow-x-auto`} 
              style={{
                  scrollbarWidth: 'none', 
                  msOverflowStyle: 'none',
                }}>
                  
                  <table className=" w-full">
                    <thead>
                    <tr className="bg-white-A700 text-sm leading-[26px] font-DmSans font-medium h-[44px]">
                      <th scope="col" className="px-[18px] py-3 text-left text-[#344054] font-DmSans font-medium">{t('eventListSponsoring.eventName')}</th>
                      <th scope="col" className="px-[18px] py-3 text-left text-[#344054] font-DmSans font-medium">{t('eventListSponsoring.organizedBy')}</th>
                      <th scope="col" className="px-[18px] py-3 text-left text-[#344054] font-DmSans font-medium">{t('eventListSponsoring.date')}</th>
                      <th scope="col" className="px-[18px] py-3 text-left text-[#344054] font-DmSans font-medium">{t('eventListSponsoring.typeOfSponsoring')}</th>
                      <th scope="col" className="px-[18px] py-3 text-left text-[#344054] font-DmSans font-medium">{t('eventListSponsoring.location')}</th>
                      <th scope="col" className="px-[18px] py-3 text-left text-[#344054] font-DmSans font-medium"></th>
                    </tr>
                    </thead>
                    {(pageData?.length > 0 && !isLoading)  ? 
                    <tbody className="items-center w-full ">
                    {
                        (pageData.map((item, index) => (
                      <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-50' : ''} hover:bg-blue-50 w-full`} onClick={()=> navigate(`/PastSponsorEventDetails/${item?._id}` , { state: { event: item } })}>
                        <td className="w-auto text-gray-801 font-dm-sans-regular text-sm leading-6">
                            <div className="px-[18px] py-4 flex items-center" >
                                <img src={item?.eventId?.headerImage} className="rounded-md h-[60px] w-[70px] bg-gray-300 mr-3"/>
                                <span className="line-clamp-3" style={{ maxWidth:"400px" , overflow:"hidden"}}>{item?.eventId?.title}</span>
                            </div>
                        </td>
                        <td className="px-[18px] py-4 text-gray-801 font-dm-sans-regular text-sm leading-6" 
                        style={{ whiteSpace: 'nowrap' }}>
                          <div className="flex items-center gap-2" >
                          {item?.eventId?.organizerLogo ?
                            <img src={item?.eventId?.organizerLogo} className="rounded-full h-8 w-8 mr-2"/>
                              :
                            <img src={userDefaultProfil} className="rounded-full h-8 w-8 mr-2"/>
                          }
                              <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item?.eventId?.organizername || "-"}</span>
                          </div>
                        </td>
                        <td className="px-[18px] py-4 text-gray-801 font-dm-sans-regular text-sm leading-6 whitespace-nowrap">
                          {item?.dateCreated ? `${format(new Date(item.dateCreated), 'MMM d, yyyy')}` : 'Coming Soon'}
                        </td>
                        <td className="px-[18px] py-4 text-gray-801 font-dm-sans-regular text-sm leading-6">
                            {item?.sponsorshipType?.toLowerCase() === "financial" && 
                            <div className="px-[13px] h-[34px] whitespace-nowrap py-2 rounded-[50px] border border-[#6071f3] justify-center items-center gap-1 w-auto inline-flex">
                                <div className="text-[#444ce6] text-xs font-dm-sans-regular leading-none tracking-tight">{t(item?.sponsorshipType)}</div>
                            </div>}
                            {item?.sponsorshipType?.toLowerCase() === "prize sponsors" && 
                            <div className="h-[34px] px-[13px] whitespace-nowrap py-2 rounded-[50px] border border-[#ffc564] justify-center items-center gap-1 inline-flex">
                                <div className="text-[#e49614] text-xs font-dm-sans-regular leading-none tracking-tight">{t(item?.sponsorshipType)}</div>
                            </div>}
                            {item?.sponsorshipType?.toLowerCase() === "venue partner" && 
                            <div className="h-[34px] px-[13px] whitespace-nowrap py-2 rounded-[50px] border border-[#996fec] justify-center items-center gap-1 inline-flex">
                              <div className="text-[#7f4be7] text-xs font-dm-sans-regular leading-none tracking-tight">{t(item?.sponsorshipType)}</div>
                            </div>}
                            {item?.sponsorshipType?.toLowerCase() === "food sponsors" && 
                            <div className="h-[34px] px-[13px] whitespace-nowrap py-2 rounded-[50px] border border-[#24a561] justify-center items-center gap-1 inline-flex">
                              <div className="text-[#028942] text-xs font-dm-sans-regular leading-none tracking-tight">{t(item?.sponsorshipType)}</div>
                            </div>}
                        </td>                        
                        <td className="px-[18px] py-4 text-gray-801 font-dm-sans-regular text-sm leading-6" 
                        style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: '' }}>{item?.eventId?.physicalLocation || 'Virtual'}</td>
                        <td className="px-[18px] py-4 text-blue_gray-601 font-dm-sans-regular text-sm leading-6">
                        <div ref={dropdownRef} className="relative" onMouseEnter={(e) => toggleDropdown(index, e)} onMouseLeave={(e) => toggleDropdownClose(index, e)} >
                              <div className="dropdown relative">
                                <BsThreeDots className="mr-4 relative"
                                id={`dropdown-trigger-${index}`}
                                  size={18} 
                                  onClick={(e) =>toggleDropdownClick(index, e) }
                                />
                                {isDropdownOpen(index) && renderDropdown(index , item)}
                              </div>
                            </div>
                        </td>
                      </tr>
                    ))) }
                    </tbody> :
                    null}
                  </table>
                  { isLoading ? 
                  <div className="flex flex-col items-center text-blue_gray-800_01 gap-[16px] min-h-[330px] w-full py-28 rounded-b-[8px]">
                    <Loader />
                  </div>
                  :
                  pageData?.length === 0 && 
                  <div className="flex flex-col items-center h-screen w-full py-28 gap-[16px] ">
                    <img src={ticketEmptyImg} />
                    <div className="font-dm-sans-medium text-sm leading-6 text-gray700 w-auto">
                      <span>{t("common.noPastSponsorApproved")}</span>
                    </div>
                  </div>
                }
                  </div>
                  {(pageData?.length > 0 && !isLoading) && <div className='w-full flex items-center p-4'>
                    <TablePagination
                      currentPage={cur}
                      totalPages={totalPages}
                      //onPageChange={handlePageChange}
                      itemsToShow={itemsToShow}
                    />              
                  </div>}
                </div>
              </div>
            </div>
        </div>
      </>
    );
}

export default PastSponsorEvent;
