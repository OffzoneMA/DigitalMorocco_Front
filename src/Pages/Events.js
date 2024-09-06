import React, { useState , useRef , useEffect} from "react";
import{Text } from "../Components/Text";
import { BiFilterAlt } from "react-icons/bi";
import { useSearchParams , useNavigate} from "react-router-dom";
import { BsThreeDots } from "react-icons/bs";
import { FiDelete } from "react-icons/fi";
import { HiOutlineQrcode } from "react-icons/hi";
import { FiDownload } from "react-icons/fi";
import TablePagination from "../Components/TablePagination";
import SimpleSelect from "../Components/SimpleSelect";
import MultipleSelect from "../Components/MultipleSelect";
import ViewTicketModal from "../Components/ViewTicketModal";
import PageHeader from "../Components/PageHeader";
import TableTitle from "../Components/TableTitle";
import SearchInput from "../Components/SeachInput";
import Loader from "../Components/Loader";
import { useGetEventsForUserQuery , useGetDistinctValuesByUserQuery} from "../Services/Event.Service";
import ticketEmptyImg from '../Media/ticket_empty.svg';
import format from "date-fns/format";
import DownloadTicket1 from "../Components/DownloadTicket1";
import { PDFDownloadLink } from '@react-pdf/renderer';
import ReactDOM from 'react-dom';

const Events = () => {
  const navigate = useNavigate();
  const field = 'physicalLocation';
  const {data : eventsParticipate , error , isLoading , refetch } = useGetEventsForUserQuery();
  const { data: distinctValues , isLoading: distinctsValueLoading } = useGetDistinctValuesByUserQuery({field });
  const [filter , setFilter] = useState(false);
  const [filterApply , setFilterApply] = useState(false);
  const [keywords, setKeywords] = useState('');
  const [eventName, seteventName] = useState([]);
  const [location, setLocation] = useState('');
  const [isSubscribe , setIsSubscribe] = useState(false);
  const [profilVerified , setProfilVerified] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [cur, setCur] = useState(1);
  const [rowData , setRowData] = useState(null);
  const [downloadFile , setDownloadFile] = useState(false);
  const itemsPerPage = 8;
  const itemsToShow = 4;
  const [activeDropdown, setActiveDropdown] = useState(-1);
  const dropdownRef = useRef(null);
  const [openDropdownIndexes, setOpenDropdownIndexes] = useState([]);
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);
  const [ticketDataRow , setTicketDataRow] = useState(null);

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

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setActiveDropdown(null);
      setDownloadFile(false)
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const openTicketModal = (rowData) => {
    setIsTicketModalOpen(true);
    setTicketDataRow(rowData);
  };

  const closeTicketModal = () => {
    setIsTicketModalOpen(false);
    setDownloadFile(false);
  };

  const events = eventsParticipate;

  const filteredData = events?.filter(item => {
    const keywordMatch = item.title.toLowerCase().includes(keywords.toLowerCase());
  
    if (filterApply) {
      const typeMatch = eventName.length === 0 || eventName.some(category => item.title.includes(category));
  
      const locationMatch = !location || item.physicalLocation.toLowerCase().includes(location.toLowerCase());
  
      return keywordMatch && typeMatch && locationMatch;
    }
  
    return keywordMatch;
  });
  

  const clearFilter = () => {
    setFilter(false); 
    setFilterApply(false);
    seteventName([]);
    setLocation('');
  }
  const totalPages = Math.ceil(filteredData?.length / itemsPerPage);

  const getPageData = () => {
    const startIndex = (cur - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredData?.slice(startIndex, endIndex);
  };

  const pageData = getPageData();

  function handlePageChange(page) {
    if (page >= 1 && page <= totalPages) {
      setCur(page);
    }
  }

  const eventNameData = [
    "Data & Tech",
    "Women Who Network",
    "Workshop",
    "Big Investment",
    "North Africa Dreamin"
  ];


  const renderDropdown = (index , item) => {
    const triggerElement = document.getElementById(`dropdown-trigger-${index}`);
    const triggerRect = triggerElement.getBoundingClientRect();
  
    return ReactDOM.createPortal(
      <div className="absolute top-[calc(100%)] right-0 z-50" style={{ top: `${triggerRect.bottom}px`, right: `${30}px` }}>
        <div className="mt-4 px-3 py-6 shadow-sm md:shadow-lg bg-white-A700 w-40  fex flex-col rounded-md">
          <div className="flex flex-row gap-3 items-center cursorpointer-green hover:text-[#35D8BF]" onClick={() => openTicketModal(item)}>
            <HiOutlineQrcode size={18} className="text-blue-A400 transform scale-x-[-1]"/>
            <Text
              className="text-gray-801 font-dm-sans-regular text-sm leading-6 hover:text-[#35D8BF] "
            >
              View Ticket
            </Text>
          </div>
          <PDFDownloadLink document={<DownloadTicket1 title={item?.title} date={item?.startDate ? `${format(new Date(item.startDate), 'E, MMM d, yyyy')}${item.startTime ? `  ${item?.startTime || ''}` : ''}` : 'Coming Soon'} TicketCode='OpenMic' name='Ichane Roukéya' ticketNumber={2}/>} fileName="ticket.pdf">
              {({ blob, url, loading, error }) => ( 
              loading ? 
              <div className="flex flex-row gap-3 items-center pt-5 cursorpointer-green hover:text-[#35D8BF]">
                <FiDownload size={18} className="text-blue-A400 "/>
                  <Text
                    className="text-gray-801 font-dm-sans-regular text-sm leading-6 hover:text-[#35D8BF]"
                  >
                    Download
                  </Text>
              </div>
              :
              <div className="flex flex-row gap-3 items-center pt-5 cursorpointer-green hover:text-[#35D8BF]" >
                <FiDownload size={18} className="text-blue-A400 "/>
                  <Text
                    className="text-gray-801 font-dm-sans-regular text-sm leading-6 hover:text-[#35D8BF]"
                  >
                    Download
                  </Text>
              </div>
              )}
          </PDFDownloadLink>
        </div>
      </div>,
      document.getElementById('root')
    );
  }

    return (
        <div className="bg-white-A700 flex flex-col gap-8 h-full min-h-screen items-start justify-start pb-8 pt-8 rounded-tl-[40px]  w-full">
            <div className="flex flex-col items-start justify-start sm:px-5 px-8 w-full">
              <div className="border-b border-gray-201 border-solid flex flex-col md:flex-row gap-5 items-start justify-start pb-6 w-full">
                <div className="flex flex-1 flex-col font-DmSans h-full items-start justify-start w-full">
                  <PageHeader
                    >
                    Event Participate
                  </PageHeader>
                </div>
                <SearchInput className={'w-[240px]'}/>
              </div>
            </div>
            <div className="flex flex-col items-start justify-start w-full">
              <div className="flex flex-col items-start justify-start sm:px-5 px-8 w-full">
              { pageData?.length > 0 ?
                <div className="relative w-full bg-white-A700 border border-gray-201 rounded-[8px] shadow-tablesbs ">
                  <div className="flex flex-row gap-4 items-center text-gray-500 border-b border-gray-201 rounded-t-lg bg-white-A700 py-[19.5px] px-5">
                    <TableTitle
                      style={{whiteSpace:"nowrap"}}
                    >
                      Event
                    </TableTitle>
                    <div className=" grid-cols-auto-fit md:flex md:flex-1 md:flex-wrap md:flex-row grid grid-cols-2 gap-3 w-auto items-center justify-end ml-auto">
                      {filter && 
                    (
                        <>
                        <div className="flex rounded-md p-2 border border-solid min-w-[160px] w-[25%] ">
                          <input
                            className={`!placeholder:text-blue_gray-300 !text-gray700 font-manrope p-0 text-left text-sm tracking-[0.14px] w-full bg-transparent border-0`}
                            type="text"
                            name="search"
                            placeholder="Keywords"
                            value={keywords}
                            onChange={e => setKeywords(e.target.value)}
                          />
                        </div>
                        <MultipleSelect className="min-w-[180px] max-w-[350px] " id='investor' options={eventNameData} onSelect={""} searchLabel='Search Event' setSelectedOptionVal={seteventName} 
                          placeholder="Event Name"
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
                        <SimpleSelect className="min-w-[120px] max-w-[300px] " id='country' options={distinctValues} onSelect={""} searchLabel='Search Location' setSelectedOptionVal={setLocation} 
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
                          className="text-blue_gray-300 flex flex-row items-center p-[2px] h-[38px] max-w-[75px] border-b border-solid border-blue_gray-300 cursorpointer-green"
                          onClick={clearFilter}
                          type="button"
                      >
                          <FiDelete size={18} className="mr-2" />
                          <span className="text-base font-dm-sans-regular leading-[26px] text-blue_gray-300">Clear</span>
                        </button>
                        )}
                      </div>
                  </div>
                  <div className="bg-white-A700 border-b border-gray-201 flex flex-col md:gap-5 flex-1 items-start justify-start w-full pb-4 min-h-[330px] overflow-x-auto" 
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
                      <th scope="col" className="px-[18px] py-3 text-left text-[#344054] font-DmSans font-medium"></th>
                      <th scope="col" className="px-[18px] py-3 text-left text-[#344054] font-DmSans font-medium">Location</th>
                      <th scope="col" className="px-[18px] py-3 text-left text-[#344054] font-DmSans font-medium"></th>
                    </tr>
                    </thead>
                    
                    <tbody className="items-center w-full ">
                    {
                        (pageData.map((item, index) => (
                      <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-50' : ''} hover:bg-blue-50 w-full`} >
                      <td className="w-auto text-gray-801 font-dm-sans-regular text-sm leading-6">
                          <div className="px-[18px] py-4 flex items-center" >
                              <img src={item.headerImage} className="rounded-md h-[60px] w-[70px] bg-gray-300 mr-3"/>
                              <span style={{ maxWidth:"260px" , overflow:"hidden"}}>{item.title}</span>
                          </div>
                      </td>
                        <td className="px-[18px] py-4 text-gray-801 font-dm-sans-regular text-sm leading-6" 
                        style={{ whiteSpace: 'nowrap' }}>
                          <div className="flex items-center" >
                              <img src={item.organizerLogo} className="rounded-full h-8 w-8 bg-gray-300 mr-2"/>
                              <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.organizername}</span>
                          </div>
                        </td>
                        <td className="px-[18px] py-4 text-gray-801 font-dm-sans-regular text-sm leading-6">
                          {item.startDate ? `${format(new Date(item.startDate), 'MMM d, yyyy')} ${item?.startTime?.toLowerCase()}` : 'Coming Soon'}
                        </td>                        
                        <td className="px-[18px] py-4  text-gray-801 font-dm-sans-regular text-sm leading-6"
                         style={{whiteSpace:"nowrap"}}>
                          <div style={{whiteSpace:"nowrap" , textDecoration: 'capitalize'}} className={`flex flex-row space-x-2 items-center px-2 capitalize font-dm-sans-regular text-sm leading-6 text-white-A700 rounded-full ${
                          item.status?.toLowerCase() === 'past' ? 'bg-[#F4A118]' :
                            item.status?.toLowerCase() === 'upcoming' ? 'bg-[#6172F3]' :
                              item.status?.toLowerCase() === 'ongoing' ? 'bg-[#12B76A] ' : ''
                        } inline-flex`}>
                          {`${item.status} Event` }
                        </div>
                          </td>
                        <td className="px-[18px] py-4 text-gray-801 font-dm-sans-regular text-sm leading-6" 
                        style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item?.physicalLocation || 'Virtual'}</td>
                        <td className="px-[18px] py-4 text-gray-801 font-dm-sans-regular text-sm leading-6"
                          >
                            <div ref={dropdownRef} className="relative" onMouseEnter={(e) => toggleDropdown(index, e)} onMouseLeave={(e) => toggleDropdownClose(index, e)} >
                              <div className="dropdown relative">
                                <BsThreeDots className="mr-4 relative"
                                id={`dropdown-trigger-${index}`}
                                  size={18} 
                                  onClick={(e) =>toggleDropdownClick(index, e) }
                                />
                                {/* {isDropdownOpen(index) && (
                                  
                                  ReactDOM.createPortal(
                                  <div className="absolute top-[100%] right-0 z-50">
                                    <div className="mt-4 px-3 px-4 py-6 shadow-sm md:shadow-lg bg-white-A700 w-40  fex flex-col rounded-md">
                                      <div className="flex flex-row gap-3 items-center cursorpointer-green" onClick={() => openTicketModal(item)}>
                                        <HiOutlineQrcode size={18} className="text-blue-A400 transform scale-x-[-1]"/>
                                        <Text
                                          className="text-gray-801 font-dm-sans-regular text-sm leading-6"
                                        >
                                          View Ticket
                                        </Text>
                                      </div>
                                      <PDFDownloadLink document={<DownloadTicket1 title={item?.title} date={item?.startDate ? `${format(new Date(item.startDate), 'E, MMM d, yyyy')}${item.startTime ? `  ${item?.startTime || ''}` : ''}` : 'Coming Soon'} TicketCode='OpenMic' name='Ichane Roukéya' ticketNumber={2}/>} fileName="ticket.pdf">
                                          {({ blob, url, loading, error }) => ( 
                                          loading ? 
                                          <div className="flex flex-row gap-3 items-center pt-5 cursorpointer-green">
                                            <FiDownload size={18} className="text-blue-A400 "/>
                                              <Text
                                                className="text-gray-801 font-dm-sans-regular text-sm leading-6"
                                              >
                                                Download
                                              </Text>
                                          </div>
                                          :
                                          <div className="flex flex-row gap-3 items-center pt-5 cursorpointer-green" >
                                            <FiDownload size={18} className="text-blue-A400 "/>
                                              <Text
                                                className="text-gray-801 font-dm-sans-regular text-sm leading-6"
                                              >
                                                Download
                                              </Text>
                                          </div>
                                          )}
                                      </PDFDownloadLink>
                                    </div>
                                  </div>,
                                  document.getElementById('root')
                                )
                                )} */}
                                {isDropdownOpen(index) && renderDropdown(index , item)}
                              </div>
                            </div>
                        </td>

                      </tr>
                    ))) }
                    </tbody>
                  </table>
                  </div>
                    <div className='w-full flex items-center p-4'>
                    <TablePagination
                      currentPage={cur}
                      totalPages={totalPages}
                      onPageChange={handlePageChange}
                      itemsToShow={itemsToShow}
                    />              
                  </div>
                </div>
                : (
                  isLoading ? 
                  <div className="flex flex-col items-center text-blue_gray-800_01 gap-[16px] min-h-[330px] w-full py-28 rounded-b-[8px]">
                    <Loader />
                  </div>
                  :
                  <div className="flex flex-col items-center h-screen w-full py-28 gap-[16px] ">
                    <img src={ticketEmptyImg} />
                    <Text
                      className="font-dm-sans-medium text-sm leading-6 text-gray700 w-auto pb-4"
                      size=""
                    >
                      It seems like you haven't taken part in any events yet
                    </Text>
                    <div className="bg-blue-A400 hover:bg-[#235DBD] active:bg-[#224a94] text-white-A700 flex flex-row items-center px-3 py-2 rounded-md ">
                        <button
                            type="button"
                            onClick={() => navigate('/UpcomingEvent')}
                            className=" font-dm-sans-medium text-sm leading-[18.23px] text-white-A700 cursorpointer-green"
                            style={{whiteSpace:'nowrap'}}
                        >
                          Browse Upcoming Event
                        </button>
                    </div>
                  </div>
                )
              }
              </div>
            </div>

            <ViewTicketModal isOpen={isTicketModalOpen}
                      onRequestClose={closeTicketModal}
                      rowData={ticketDataRow}/>
        </div>
    )
}

export default Events;