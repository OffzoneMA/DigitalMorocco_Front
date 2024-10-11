import React, { useState , useRef , useEffect} from "react";
import{Text } from "../../Components/Text";
import { BiFilterAlt } from "react-icons/bi";
import { useSearchParams , useNavigate} from "react-router-dom";
import { BsThreeDots } from "react-icons/bs";
import { FiDelete } from "react-icons/fi";
import { HiOutlineQrcode } from "react-icons/hi";
import { FiDownload } from "react-icons/fi";
import TablePagination from "../../Components/TablePagination";
import SimpleSelect from "../../Components/SimpleSelect";
import MultipleSelect from "../../Components/MultipleSelect";
import ViewTicketModal from "../../Components/ViewTicketModal";
import PageHeader from "../../Components/PageHeader";
import TableTitle from "../../Components/TableTitle";
import SearchInput from "../../Components/SeachInput";
import Loader from "../../Components/Loader";
import { useGetDistinctValuesQuery , useGetAllUpcomingEventsUserParticipateQuery } from "../../Services/Event.Service";
import ticketEmptyImg from '../../Media/ticket_empty.svg';
import format from "date-fns/format";
import DownloadTicket1 from "../../Components/DownloadTicket1";
import { PDFDownloadLink } from '@react-pdf/renderer';
import ReactDOM from 'react-dom';
import userDefaultProfil from '../../Media/User1.png'
import CustomCalendar from "../../Components/CustomCalendar";
import SendSponsoringModal from "../../Components/SendSponsoringModal";
import { parseDateString } from "../../data/helper";

const UpcomingSponsorEvent = () => {
    const navigate = useNavigate();
    const field = 'physicalLocation';
    const { data: distinctValues, isLoading: distinctsValueLoading } = useGetDistinctValuesQuery({
      field,
      filters: { status: 'upcoming' }
    });
    const [filter , setFilter] = useState(false);
    const [filterApply , setFilterApply] = useState(false);
    const [keywords, setKeywords] = useState('');
    const [location, setLocation] = useState('');
    const [isSubscribe , setIsSubscribe] = useState(false);
    const [profilVerified , setProfilVerified] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const [eventName, seteventName] = useState([]);
    const [cur, setCur] = useState(1);
    const [rowData , setRowData] = useState(null);
    const [downloadFile , setDownloadFile] = useState(false);
    const itemsPerPage = 8;
    const itemsToShow = 4;
    const [totalPages , setTotalPages] = useState(0);
    const [selectedDate , setSelectedDate] = useState('');

    const queryParams = { page: cur, pageSize: itemsPerPage };

    if (filterApply) {
      queryParams.location = location || undefined;
      queryParams.startDate = parseDateString(selectedDate);
    }
    const {data : events , error , isFetching: isLoading , refetch } = useGetAllUpcomingEventsUserParticipateQuery(queryParams);
    const [activeDropdown, setActiveDropdown] = useState(-1);
    const dropdownRef = useRef(null);
    const [openDropdownIndexes, setOpenDropdownIndexes] = useState([]);
    const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);
    const [ticketDataRow , setTicketDataRow] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
      refetch();
    }, [cur , refetch , filterApply]);
  
    useEffect(() => {
      setTotalPages(events?.totalPages);
    }, [events]);

    function handlePageChange(page) {
      if (page >= 1 && page <= totalPages) {
        setCur(page);
      }
    }

    const clearFilter = () => {
      setFilter(false); 
      setFilterApply(false);
      seteventName([]);
      setLocation('');
    }

    const pageData = events?.events;

    const formatDate = (date) => {
      const dateValues = new Date(date);
      const options = { year: 'numeric', month: 'long', day: 'numeric' ,timeZone: 'UTC', };
      return dateValues.toLocaleDateString('en-US', options);
  };

  const openModal = (data) => {
    setIsModalOpen(true);
    setRowData(data);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    
  };

    return (
      <>
        <div className="bg-white-A700 flex flex-col gap-8 h-full min-h-screen overflow-auto items-start justify-start pb-14 pt-8 rounded-tl-[40px] w-full">
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
            </div>
            <div className="flex flex-col items-start justify-start w-full">
              <div className="flex flex-col items-start justify-start sm:px-5 px-8 w-full">
                <div className="relative w-full bg-white-A700 border border-gray-201 rounded-[8px] shadow-tablesbs ">
                  <div className="flex flex-row gap-4 items-center text-gray-500 border-b border-gray-201 rounded-t-lg bg-white-A700 py-[19.5px] px-5">
                    <TableTitle
                      style={{whiteSpace:"nowrap"}}
                    >
                      Event List
                    </TableTitle>
                    <div className=" grid-cols-auto-fit md:flex md:flex-1 md:flex-wrap md:flex-row grid grid-cols-2 gap-3 w-auto items-center justify-end ml-auto">
                      {filter && 
                    (
                        <>
                        <div className="flex rounded-md p-2 border border-solid min-w-[160px] w-[25%] ">
                          <input
                            className={`!placeholder:text-blue_gray-301 !text-gray700 font-manrope p-0 text-left text-sm tracking-[0.14px] w-full bg-transparent border-0`}
                            type="text"
                            name="search"
                            placeholder="Keywords"
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
                        <SimpleSelect className="min-w-[120px] max-w-[300px] " id='country' options={distinctValues?.distinctValues || []} onSelect={""} searchLabel='Search Location' setSelectedOptionVal={setLocation} 
                          placeholder="Location" 
                          content={
                            ( option) =>{ return (
                              <div className="flex  py-2 items-center  w-full">
                                  <Text
                                    className="text-gray-801 text-left text-base font-dm-sans-regular leading-5 w-auto"
                                    >
                                    {option}
                                  </Text>
                                </div>
                              );
                            }
                          }/>           
                        </>
                    )}
                      {filter ?
                      (<button
                        className="bg-blue-A400 hover:bg-[#235DBD] active:bg-[#224a94] text-white-A700 flex flex-row items-center justify-center cursorpointer-green p-[6px] h-[37px] rounded-md"
                        onClick={() => setFilterApply(true)}
                        type="button"
                    >
                        <BiFilterAlt size={18} className="mr-2" />
                        <span className="font-dm-sans-medium text-sm leading-[18.23px] text-white-A700" style={{ whiteSpace: 'nowrap' }}>
                            Apply Filters
                        </span>
                    </button>
                    ):
                      (
                      <button
                        className={`col-end-3 ${pageData?.length === 0 ? 'bg-[#e5e5e6] text-[#a7a6a8] cursor-not-allowed' : 'hover:bg-[#235DBD] active:bg-[#224a94] bg-blue-A400 text-white-A700'} col-span-1 font-DmSans flex flex-row items-center justify-center cursorpointer-green px-[12px] py-[7px] h-[37px] text-sm font-dm-sans-medium rounded-md`}
                        onClick={() => setFilter(true)}
                        type="button"
                        disabled={pageData?.length === 0}
                      >
                        <BiFilterAlt size={18} className="mr-2" />
                        <span className="font-dm-sans-medium text-sm leading-[18.23px]" style={{ whiteSpace: 'nowrap' }}>
                            Filters
                        </span>
                      </button>
                      )
                      }
                        {filterApply && (
                          <button
                          className="text-[#15143966] flex flex-row items-center p-[2px] h-[38px] max-w-[75px] border-b border-solid border-[#15143966] cursorpointer-green"
                          onClick={clearFilter}
                          type="button"
                      >
                          <FiDelete size={18} className="mr-2" />
                          <span className="text-base font-dm-sans-regular leading-[26px] text-[#15143966]">Clear</span>
                        </button>
                        )}
                      </div>
                  </div>
                  <div className={`bg-white-A700 flex flex-col md:gap-5 flex-1 items-start justify-start ${(pageData?.length > 0 || isLoading) ? 'border-b border-gray-201' : 'rounded-b-[8px]'} w-full pb-4 min-h-[330px] overflow-x-auto`} 
              style={{
                  scrollbarWidth: 'none', 
                  msOverflowStyle: 'none',
                }}>
                  
                  <table className=" w-full">
                    <thead>
                    <tr className="bg-white-A700 text-sm leading-[26px] font-DmSans font-medium h-[44px]">
                      <th scope="col" className="px-[18px] py-3 text-left text-[#344054] font-DmSans font-medium">Event Name</th>
                      <th scope="col" className="px-[18px] py-3 text-left text-[#344054] font-DmSans font-medium">Organize by</th>
                      <th scope="col" className="px-[18px] py-3 text-left text-[#344054] font-DmSans font-medium">Date</th>
                      <th scope="col" className="px-[18px] py-3 text-left text-[#344054] font-DmSans font-medium">Location</th>
                      <th scope="col" className="px-[18px] py-3 text-left text-[#344054] font-DmSans font-medium"></th>
                    </tr>
                    </thead>
                    {pageData?.length > 0 && !isLoading ? 
                      <tbody className="items-center w-full ">
                    {
                        (pageData?.map((item, index) => (
                      <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-50' : ''} hover:bg-blue-50 w-full`} onClick={()=> navigate(`/SponsorEventDetails/${item?._id}` , { state: { event: item } })}>
                        <td className="w-auto text-gray-801 font-dm-sans-regular text-sm leading-6">
                            <div className="px-[18px] py-4 flex items-center" >
                                <img src={item?.headerImage} className="rounded-md h-[60px] w-[70px] bg-gray-300 mr-3"/>
                                <span style={{ maxWidth:"260px" , overflow:"hidden"}}>{item.title}</span>
                            </div>
                        </td>
                        <td className="px-[18px] py-4 text-gray-801 font-dm-sans-regular text-sm leading-6" 
                        style={{ whiteSpace: 'nowrap' }}>
                          <div className="flex items-center gap-2" >
                          {item?.organizerLogo ?
                            <img src={item?.organizerLogo} className="rounded-full h-8 w-8 mr-2"/>
                              :
                            <img src={userDefaultProfil} className="rounded-full h-8 w-8 mr-2"/>
                          }
                              <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item?.organizername || "-"}</span>
                          </div>
                        </td>
                        <td className="px-[18px] py-4 text-gray-801 font-dm-sans-regular text-sm leading-6">
                          {item.startDate ? `${format(new Date(item.startDate), 'MMM d, yyyy')}` : 'Coming Soon'}
                        </td>                        
                        <td className="px-[18px] py-4 text-gray-801 font-dm-sans-regular text-sm leading-6" 
                        style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item?.physicalLocation || 'Virtual'}</td>
                        <td className="px-[18px] py-4 text-gray-801 font-dm-sans-regular text-sm leading-6"
                          >
                          <button 
                          onClick={(e) => {
                            e.stopPropagation();
                             openModal(item)
                             }}
                          className="flex h-[34px] px-3 py-2 bg-[#2575f0] hover:bg-[#235DBD] active:bg-[#224a94] rounded-[200px] justify-center items-center gap-3 text-white-A700 text-sm font-dm-sans-medium cursorpointer-green ">
                          Sponsorship
                          </button>
                            
                        </td>

                      </tr>
                    ))) }
                    </tbody>
                    :
                    ""}
                    
                  </table>
                  {
                  isLoading ? 
                  <div className="flex flex-col items-center text-blue_gray-800_01 gap-[16px] min-h-[330px] w-full py-28 rounded-b-[8px]">
                    <Loader />
                  </div>
                  :
                  (pageData?.length === 0  && 
                  <div className="flex flex-col items-center text-blue_gray-800_01 gap-[16px] min-h-[330px] w-full py-28 rounded-b-[8px]">
                    <div >
                    <img src={ticketEmptyImg} />
                    </div>
                    <div className="font-dm-sans-medium text-sm leading-6 text-gray700 w-auto">
                      <span>No Upcoming Event </span>
                    </div>
                  </div>
                  )
              }
                  </div>
                  {(pageData?.length > 0 && !isLoading) && <div className='w-full flex items-center p-4'>
                    <TablePagination
                      currentPage={cur}
                      totalPages={totalPages}
                      onPageChange={handlePageChange}
                      itemsToShow={itemsToShow}
                    />              
                  </div>}
                </div>
              </div>
            </div>
        </div>
        <SendSponsoringModal isOpen={isModalOpen} onRequestClose={closeModal} rowData={rowData} />
        </>
    );
}

export default UpcomingSponsorEvent;
