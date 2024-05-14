import React, { useState , useRef , useEffect} from "react";
import { useSelector } from "react-redux";
import{Text } from "../Components/Text";
import { BiFilterAlt } from "react-icons/bi";
import { useSearchParams , useNavigate} from "react-router-dom";
import { TbTicketOff } from "react-icons/tb";
import { BsThreeDots } from "react-icons/bs";
import { FiDelete } from "react-icons/fi";
import { HiOutlineQrcode } from "react-icons/hi";
import { FiDownload } from "react-icons/fi";
import TablePagination from "../Components/TablePagination";
import SimpleSelect from "../Components/SimpleSelect";
import MultipleSelect from "../Components/MultipleSelect";
import ViewTicketModal from "../Components/ViewTicketModal";
import DownloadTicket from "../Components/DownloadTicket";
import { eventData } from "../data/tablesData";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import ReactDOMServer from 'react-dom/server';
import PageHeader from "../Components/PageHeader";
import TableTitle from "../Components/TableTitle";
import SearchInput from "../Components/SeachInput";


const Events = () => {
  const navigate = useNavigate();
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


  const toggleDropdown = (index, event) => {
    event.stopPropagation();
    if (openDropdownIndexes.includes(index)) {
      setOpenDropdownIndexes(openDropdownIndexes.filter((i) => i !== index));
    } else {
      setOpenDropdownIndexes([...openDropdownIndexes, index]);
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

  const events = eventData;

  const filteredData = events.filter(item => {
    const keywordMatch = item.eventName.toLowerCase().includes(keywords.toLowerCase());
  
    if (filterApply) {
      const typeMatch = eventName.length === 0 || eventName.some(category => item.eventName.includes(category));
  
      const locationMatch = !location || item.location.toLowerCase().includes(location.toLowerCase());
  
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
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const getPageData = () => {
    const startIndex = (cur - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredData.slice(startIndex, endIndex);
  };

  const pageData = getPageData();

  function handlePageChange(page) {
    if (page >= 1 && page <= totalPages) {
      setCur(page);
    }
  }

  const locationsData = [
    "Virtual",
    "Casablanca",
    "Rabat",
    "Marrakech",
    "Agadir",
    "Tangier",
    "Fez",
    "Ouarzazate"
  ];

  const eventNameData = [
    "Data & Tech",
    "Women Who Network",
    "Workshop",
    "Big Investment",
    "North Africa Dreamin"
  ];

  const componentRef = useRef();

  const handleDownloadTicket = (rowData , index) => {
    setRowData(rowData);
    if (!componentRef.current) {
      console.error('Le composant ref est null');
      return;
    }
    const content = componentRef.current;

    const width = content.offsetWidth;
        const height = content.offsetHeight;
        const a4Width = 495;
      
        html2canvas(content, {width:width , height:height ,onclone: function (clonedDoc) {
          clonedDoc.getElementById('tickettodownload').style.visibility  = 'visible';
      }}).then((canvas) => {
          const imgData = canvas.toDataURL("image/png");
          const pdf = new jsPDF('p', 'pt', [a4Width , height]); 
          const qrCodeSvg = content.querySelector('svg');
          pdf.addImage(imgData, 'JPEG', 0, 0, a4Width, 410);
          pdf.save("download.pdf");
        });
  };

    return (
        <div className="bg-white-A700 flex flex-col gap-8 h-full min-h-screen items-start justify-start pb-8 pt-8 rounded-tl-[40px]  w-full">
            <div className="flex flex-col items-start justify-start sm:px-5 px-8 w-full">
              <div className="border-b border-indigo-50 border-solid flex flex-col md:flex-row gap-5 items-start justify-start pb-6 w-full">
                <div className="flex flex-1 flex-col font-DmSans h-full items-start justify-start w-full">
                  <PageHeader
                    >
                    Event Participate
                  </PageHeader>
                </div>
                <SearchInput className={'min-w-[25%]'}/>
              </div>
            </div>
            <div className="flex flex-col items-start justify-start w-full">
              <div className="flex flex-col items-start justify-start sm:px-5 px-8 w-full">
              { pageData?.length > 0 ?
                <div className="relative w-full bg-white-A700 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                  <div className="flex flex-row gap-4 items-center text-gray-500 border-b border-gray-200 rounded-t-lg bg-white-A700 dark:border-gray-700 dark:text-gray-400 dark:bg-gray-800 py-4 px-5">
                    <TableTitle
                      style={{whiteSpace:"nowrap"}}
                    >
                      Event
                    </TableTitle>
                    <div className=" grid-cols-auto-fit md:flex md:flex-1 md:flex-wrap md:flex-row grid grid-cols-2 gap-3 w-auto items-center justify-end ml-auto w-auto">
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
                        <MultipleSelect className="min-w-[180px] max-w-[400px] " id='investor' options={eventNameData} onSelect={""} searchLabel='Search Event' setSelectedOptionVal={seteventName} 
                          placeholder="Event Name"
                          content={
                            ( option) =>{ return (
                              <div className="flex  py-2 items-center  w-full">
                                  <Text
                                    className="text-gray-801 text-left text-base font-DmSans font-normal leading-5 w-auto"
                                    >
                                    {option}
                                  </Text>
                                </div>
                              );
                            }
                          }/>
                        <SimpleSelect className="min-w-[120px] max-w-[200px] " id='country' options={locationsData} onSelect={""} searchLabel='Search Location' setSelectedOptionVal={setLocation} 
                          placeholder="Location" 
                          content={
                            ( option) =>{ return (
                              <div className="flex  py-2 items-center  w-full">
                                  <Text
                                    className="text-gray-801 text-left text-base font-DmSans font-normal leading-5 w-auto"
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
                        className="bg-blue-A400 text-white-A700 flex flex-row items-center justify-center cursor-pointer p-[6px] h-[38px] rounded-md"
                        onClick={() => setFilterApply(true)}
                        type="button"
                    >
                        <BiFilterAlt size={18} className="mr-2" />
                        <span className="font-DmSans text-sm font-medium leading-[18.23px] text-white-A700" style={{ whiteSpace: 'nowrap' }}>
                            Apply Filters
                        </span>
                    </button>
                    ):
                      (<button
                        className="col-end-3 col-span-1 font-DmSans bg-blue-A400 text-white-A700 flex flex-row items-center justify-center cursor-pointer p-[6px] h-[38px] rounded-md"
                        onClick={() => setFilter(true)}
                        type="button"
                    >
                        <BiFilterAlt size={18} className="mr-2" />
                        <span className="font-DmSans text-sm font-medium leading-[18.23px] text-white-A700" style={{ whiteSpace: 'nowrap' }}>
                            Filters
                        </span>
                      </button>
                      )
                      }
                        {filterApply && (
                          <button
                          className="text-blue_gray-300 flex flex-row items-center p-[2px] h-[38px] max-w-[75px] border-b border-solid border-blue_gray-300 cursor-pointer"
                          onClick={clearFilter}
                          type="button"
                      >
                          <FiDelete size={18} className="mr-2" />
                          <span className="text-base font-DmSans font-normal leading-[26px] text-blue_gray-300">Clear</span>
                        </button>
                        )}
                      </div>
                  </div>
                  <div className="bg-white-A700  border-b border-gray-200 flex flex-col md:gap-5 flex-1 items-start justify-start w-full overflow-x-auto">
                  
                  <table className=" w-full">
                    <thead>
                    <tr className="bg-white-A700 text-sm leading-[26px] ">
                      <th className="p-3 text-left text-gray700 font-medium">Event Name</th>
                      <th className="p-3 text-left text-gray700 font-medium">Organize by</th>
                      <th className="p-3 text-left text-gray700 font-medium">Date</th>
                      <th className="p-3 text-left text-gray700 font-medium"></th>
                      <th className="p-3 text-left text-gray700 font-medium">Location</th>
                      <th className="p-3 text-left text-gray700 font-medium"></th>
                    </tr>
                    </thead>
                    
                    <tbody className="items-center w-full ">
                    {
                        (pageData.map((item, index) => (
                      <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-50' : ''}  w-full`} >
                      <td className="w-auto text-gray-801 font-DmSans text-sm font-normal leading-6">
                          <div className="py-3 px-3 flex items-center" >
                              <img src={item.image} className="rounded-md h-[60px] w-[70px] bg-gray-300 mr-3"/>
                              <span style={{ maxWidth:"260px" , overflow:"hidden"}}>{item.eventName}</span>
                          </div>
                      </td>
                        <td className="py-3 px-3 text-gray-801 font-DmSans text-sm font-normal leading-6" 
                        style={{ whiteSpace: 'nowrap' }}>
                          <div className="flex items-center" >
                              <img src={item.logo} className="rounded-full h-8 w-8 bg-gray-300 mr-2"/>
                              <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.organizer}</span>
                          </div>
                        </td>
                        <td className="py-3 px-3 text-gray-801 font-DmSans text-sm font-normal leading-6">{item.dateTime}</td>
                        <td className="py-3 px-3  text-gray-801 font-DmSans text-sm font-normal leading-6"
                         style={{whiteSpace:"nowrap"}}>
                          <div style={{whiteSpace:"nowrap"}} className={`flex flex-row space-x-2 items-center px-2 font-DmSans text-sm font-normal leading-6 text-white-A700 rounded-full ${
                          item.eventType === 'Past Event' ? 'bg-orange-501' :
                            item.eventType === 'Upcoming Event' ? 'bg-indigo-500' :
                              item.eventType === 'Ongoing Event' ? 'bg-green-501 ' : ''
                        } inline-flex`}>
                          {item.eventType}
                        </div>
                          </td>
                        <td className="py-3 px-3 text-gray-801 font-DmSans text-sm font-normal leading-6" 
                        style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.location}</td>
                        <td className="py-3 px-3 text-gray-801 font-DmSans text-sm font-normal leading-6"
                          >
                            <div ref={dropdownRef} className="relative">
                              <div className="dropdown">
                                <BsThreeDots className="mr-4"
                                  size={18} 
                                  onClick={(e) => toggleDropdown(index, e)} 
                                />
                                {isDropdownOpen(index) && (
                                  <div className="absolute top-5 px-3  right-0 z-10 px-4 py-6 shadow-sm md:shadow-lg bg-white-A700 w-40  fex flex-col rounded-md">
                                    <div className="flex flex-row gap-3 items-center cursor-pointer" onClick={() => openTicketModal(item)}>
                                      <HiOutlineQrcode size={18} className="text-blue-A400 transform scale-x-[-1]"/>
                                      <Text
                                        className="text-gray-801 font-DmSans text-sm font-normal leading-6"
                                      >
                                        View Ticket
                                      </Text>
                                    </div>
                                    <div className="flex flex-row gap-3 items-center pt-5 cursor-pointer" onClick={()=>handleDownloadTicket(item , index)}>
                                    <FiDownload size={18} className="text-blue-A400 "/>
                                      <Text
                                        className="text-gray-801 font-DmSans text-sm font-normal leading-6"
                                      >
                                        Download
                                      </Text>
                                    </div>
                                  </div>
                                )}
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
                : 
                  <div className="flex flex-col items-center h-screen w-full py-28 gap-5">
                    <TbTicketOff  size={40} className="rotate-[180deg] text-gray500" />
                    <Text
                      className="font-DmSans text-sm font-normal leading-6 text-gray700 w-auto py-4"
                      size=""
                    >
                      It seems like you haven't taken part in any events yet
                    </Text>
                    <div className="bg-blue-A400 text-white-A700 flex flex-row items-center px-3 py-2 rounded-md ">
                        <button
                            type="button"
                            className=" font-DmSans text-sm font-medium leading-[18.23px] text-white-A700"
                            style={{whiteSpace:'nowrap'}}
                        >
                          Browse Upcoming Event
                        </button>
                  </div>
                  </div>
              }
              </div>
            </div>

            <ViewTicketModal isOpen={isTicketModalOpen}
                      onRequestClose={closeTicketModal}
                      rowData={ticketDataRow}/>
            <div id='tickettodownload' style={{ visibility: "hidden" }}>
              <DownloadTicket
                ref={componentRef}
                rowData={rowData}
              />
            </div>
        </div>
    )
}

export default Events;