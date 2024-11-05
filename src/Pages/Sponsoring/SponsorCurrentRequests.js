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
import {  useGetDistinctValuesQuery } from "../../Services/Event.Service";
import ticketEmptyImg from '../../Media/ticket_empty.svg';
import format from "date-fns/format";
import DownloadTicket1 from "../../Components/DownloadTicket1";
import { PDFDownloadLink } from '@react-pdf/renderer';
import ReactDOM from 'react-dom';
import userDefaultProfil from '../../Media/User1.png'
import CustomCalendar from "../../Components/CustomCalendar";
import SendSponsoringModal from "../../Components/SendSponsoringModal";
import { PiCheckBold } from "react-icons/pi";
import { RiCloseLine } from "react-icons/ri";
import ApproveSponsoringRequestModal from "../../Components/ApproveSponsoringRequestModal";
import RejectSponsoringRequestModal from '../../Components/RejectSponsoringRequestModal';
import { useApproveSponsorMutation , useRejectSponsorMutation , useGetSponsorsByPartnerQuery , useGetDistinctEventFieldsByPartnerQuery} from "../../Services/Sponsor.Service";
import { parseDateString } from "../../data/helper";
import { FiSend } from "react-icons/fi";
import { useTranslation } from "react-i18next";

const SponsorCurrentRequests = () => {
  const { t } = useTranslation();
  const currentLanguage = localStorage.getItem('language') || 'en'; 
    const navigate = useNavigate();
    const [approveSponsor] = useApproveSponsorMutation();
    const [rejectSponsor] = useRejectSponsorMutation();
    const [field, setField] = useState('physicalLocation');
    const [eventStatus, setStatus] = useState([]);
    const { data: distinctValues , isLoading: distinctsValueLoading } = useGetDistinctEventFieldsByPartnerQuery({field , eventStatus});
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

    const queryParams = { page: cur, pageSize: itemsPerPage , requestType: ['Received'], status: ['Pending'] };

    if (filterApply) {
      queryParams.location = location || undefined;
      queryParams.exactDate = selectedDate !== '' ? parseDateString(selectedDate) : '';
      // queryParams.requestType =  types;
    }
    const {data : currentRequests , error: currentRequestsError , isFetching: isLoading , refetch } = useGetSponsorsByPartnerQuery(queryParams);


    useEffect(() => {
      refetch();
    }, [cur , refetch , filterApply]);
  
    useEffect(() => {
      setTotalPages(currentRequests?.totalPages);
    }, [currentRequests]);

    function handlePageChange(page) {
      if (page >= 1 && page <= totalPages) {
        setCur(page);
      }
    }

    const clearFilter = () => {
      setFilter(false); 
      setFilterApply(false);
      setLocation('');
      setSelectedDate('');
      setTypes([]);
    }

    const filteredData = currentRequests?.data?.filter(item => {
      const keywordMatch = item?.eventId?.title?.toLowerCase().includes(keywords.toLowerCase());

      return keywordMatch;
    });

    const pageData = filteredData;

    const formatDate = (date) => {
      const dateValues = new Date(date);
      const options = { year: 'numeric', month: 'long', day: 'numeric' , timeZone: 'UTC', };
      return dateValues.toLocaleDateString('en-US', options);
  };

  const openModal = (data) => {
    setIsModalOpen(true);
    setRowData(data);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    
  };

  const openApproveModal = (data) => {
    setIsApproveModalOpen(true);
    setRowData(data);
  };
  
  const closeApproveModal = () => {
      setIsApproveModalOpen(false);
      // setRowData(null);
  };

  const openRejectModal = (data) => {
      setIsRejectModalOpen(true);
      setRowData(data);
  };
  
  const closeRejectModal = () => {
      setIsRejectModalOpen(false);
      // setRowData(null);
  };

  const handleApprove = async (data) => {
    try {
        await approveSponsor({
            sponsorId: rowData?._id,
            data,
        }).unwrap();
        refetch();
        console.log('Sponsor approved successfully!');
    } catch (error) {
        console.error('Failed to approve Sponsor:', error);
    }
  };

const handleReject = async (data) => {
    try {
        await rejectSponsor({
            sponsorId: rowData?._id,
            data,
        }).unwrap();
        refetch();
        console.log('Sponsor rejected successfully!');
    } catch (error) {
        console.error('Failed to reject Sponsor:', error);
    }
};


    return (
      <>
        <div className="bg-white-A700 flex flex-col gap-8 h-full min-h-screen overflow-auto items-start justify-start pb-14 pt-8 rounded-tl-[40px] w-full">
            <div className="flex flex-col items-start justify-start sm:px-5 px-8 w-full">
              <div className="border-b border-gray-201 border-solid flex flex-col md:flex-row gap-5 items-start justify-start pb-6 w-full">
                <div className="flex flex-1 flex-col font-DmSans h-full items-start justify-start w-full">
                  <PageHeader
                    >
                    {t("sidebar.sponsoring.currentRequests")}
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
                      <MultipleSelect className="min-w-[170px] max-w-[200px]" id='typeOfRequest' options={["Received" , "Sent"]}  searchLabel={t('common.searchType')} setSelectedOptionVal={setTypes} 
                      placeholder={t('common.typeRequest')} searchable={false} 
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
                  <div className={`bg-white-A700 flex flex-col md:gap-5 flex-1 items-start justify-start ${(pageData?.length > 0 && !isLoading) ? 'border-b border-gray-201' : 'rounded-b-[8px]'} w-full pb-4 min-h-[330px] overflow-x-auto`} 
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
                      <th scope="col" className="px-[18px] py-3 text-left text-[#344054] font-DmSans font-medium">{t('eventListSponsoring.location')}</th>
                      <th scope="col" className="px-[18px] py-3 text-left text-[#344054] font-DmSans font-medium">{t('eventListSponsoring.requests')}</th>
                      <th scope="col" className="px-[18px] py-3 text-left text-[#344054] font-DmSans font-medium">{t('eventListSponsoring.decisionStatus')}</th>
                    </tr>
                    </thead>
                    {(pageData?.length > 0 && !isLoading) ?
                      <tbody className="items-center w-full ">
                    {
                        (pageData.map((item, index) => (
                      <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-50' : ''} hover:bg-blue-50 w-full`} onClick={()=> navigate(`/SponsorCurrentRequestDetails/${item?._id}` , { state: { sponsorevent: item } })}>
                        <td className="w-auto text-gray-801 font-dm-sans-regular text-sm leading-6">
                            <div className="px-[18px] py-4 flex items-center gap-3" >
                                <img src={item?.eventId?.headerImage} className="rounded-md h-[60px] w-[70px] bg-gray-300"/>
                                <span className="line-clamp-3" style={{ maxWidth:"400px" , overflow:"hidden"}}>{item?.eventId?.title}</span>
                            </div>
                        </td>
                        <td className="px-[18px] py-4 text-gray-801 font-dm-sans-regular text-sm leading-6" 
                        style={{ whiteSpace: 'nowrap' }}>
                          <div className="flex items-center gap-3" >
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
                        <td className="px-[18px] py-4 text-gray-801 font-dm-sans-regular text-sm leading-6" 
                        style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: '' }}>{item?.eventId?.physicalLocation || 'Virtual'}</td>
                        <td className="px-[18px] py-4 text-gray-801 font-dm-sans-regular text-sm leading-6"
                          >
                            {item?.requestType?.toLowerCase() === 'sent' ? 
                            <div className="px-2.5 h-[34px] py-2 rounded-[50px] border border-[#ff9123] min-w-[97px] justify-center items-center gap-1 inline-flex">
                              <FiSend size={12} className="text-[#ff9123]" />
                              <div className="text-[#ff9123] text-sm font-normal font-manrope leading-[18.20px] tracking-tight">{t(item?.requestType)}</div>
                            </div>:
                            <div className="px-2.5 h-[34px] py-2 rounded-[50px] border border-[#ae65e6] min-w-[97px] justify-center items-center gap-1 inline-flex">
                              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M10.3536 2.64645C10.5488 2.84171 10.5488 3.15829 10.3536 3.35355L4.85355 8.85355C4.65829 9.04882 4.34171 9.04882 4.14645 8.85355L1.64645 6.35355C1.45118 6.15829 1.45118 5.84171 1.64645 5.64645C1.84171 5.45118 2.15829 5.45118 2.35355 5.64645L4.5 7.79289L9.64645 2.64645C9.84171 2.45118 10.1583 2.45118 10.3536 2.64645Z" fill="#AF66E7"/>
                              </svg>
                                <div className="text-[#af66e7] text-sm font-normal font-manrope leading-[18.20px] tracking-tight">{t(item?.requestType)}</div>
                            </div>
                            }
                        </td>
                        <td className="px-[18px] py-4 text-blue_gray-601 font-dm-sans-regular text-sm leading-6">
                          {item?.status?.toLowerCase() === "pending" && <div className="flex flex-row space-x-4 items-center">
                            <div className="relative group">
                              <div className={`w-[38px] h-8 px-1 py-1 ${item?.status?.toLowerCase() === 'approved'? 'bg-[#00CDAE]': 'bg-[#aeb6c5]'} hover:bg-[#00CDAE] rounded-md justify-center items-center gap-2 flex`} 
                              onClick={(e) => {
                                e.stopPropagation();
                                openApproveModal(item);
                              }}>
                                  <PiCheckBold size={21} className="text-white-A700"/>
                              </div>
                              <div className="absolute top-[100%] right-0 transform hidden group-hover:flex flex-col items-end z-10">
                                <div className="mb-px mr-[12px]">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="13" height="7" viewBox="0 0 13 7" fill="none">
                                    <path d="M0.8547 5.26895L5.81768 0.63683C6.20189 0.278237 6.79811 0.278237 7.18232 0.636829L12.1453 5.26894C12.8088 5.88823 12.3706 7 11.463 7H1.53702C0.629399 7 0.191179 5.88823 0.8547 5.26895Z" fill="#2C3563"/>
                                  </svg>
                                </div>
                                <div className="bg-[#334081] min-w-[92px] h-[30px] rounded-[6px] px-[18px] py-[3px] flex items-center">
                                  <div className="grow shrink basis-0 text-center text-white-A700 text-sm font-dm-sans-regular leading-relaxed">{t("common.approve")}</div>
                                </div>
                              </div>
                            </div>
                            <div className="relative group">
                              <div className={`w-[38px] h-8 px-1 py-1 ${item?.status?.toLowerCase() === 'rejected'? 'bg-[#EF4352]': 'bg-[#aeb6c5]'} hover:bg-[#EF4352] rounded-md justify-center items-center gap-2 flex`} 
                              onClick={(e) => {
                                e.stopPropagation();
                                openRejectModal(item);
                              }}>
                                  <RiCloseLine size={21} className="text-white-A700"/>
                              </div>
                              <div className="absolute top-[100%] right-0 transform hidden group-hover:flex flex-col items-end z-10">
                                <div className="mb-px mr-[12px]">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="13" height="7" viewBox="0 0 13 7" fill="none">
                                    <path d="M0.8547 5.26895L5.81768 0.63683C6.20189 0.278237 6.79811 0.278237 7.18232 0.636829L12.1453 5.26894C12.8088 5.88823 12.3706 7 11.463 7H1.53702C0.629399 7 0.191179 5.88823 0.8547 5.26895Z" fill="#2C3563"/>
                                  </svg>
                                </div>
                                <div className="bg-[#334081] min-w-[92px] h-[30px] rounded-[6px] px-[18px] py-[3px] flex items-center">
                                  <div className="grow shrink basis-0 text-center text-white-A700 text-sm font-dm-sans-regular leading-relaxed">{t("common.reject")}</div>
                                </div>
                              </div>
                            </div>
                          </div>}
                          {item?.status?.toLowerCase() === "approved" && 
                            <div className="w-[97px] h-[34px] px-2.5 py-0.5 bg-[#ebfdf2] rounded-2xl justify-center items-center inline-flex">
                              <div className="text-center text-[#027947] text-[13px] font-normal font-['DM Sans'] leading-normal">{t(item?.status)}</div>
                            </div>}
                            {item?.status?.toLowerCase() === "rejected" && 
                              <div className="w-[97px] h-[34px] px-2.5 py-0.5 bg-[#fee7e6] rounded-2xl justify-center items-center inline-flex">
                                <div className="text-center text-[#f04437] text-[13px] font-normal font-['DM Sans'] leading-normal">{t(item?.status)}</div>
                              </div>}
                        </td>
                      </tr>
                    ))) }
                    </tbody>
                    :
                    "" 
                     }
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
                      <span>{t("common.noSponsorCurrentRequests")}</span>
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
        <ApproveSponsoringRequestModal isOpen={isApproveModalOpen} onRequestClose={closeApproveModal} rowData={rowData} methode={handleApprove}/>
        <RejectSponsoringRequestModal isOpen={isRejectModalOpen} onRequestClose={closeRejectModal} rowData={rowData} methode={handleReject} />
      </>
    );
}

export default SponsorCurrentRequests;
