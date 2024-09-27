import React, { useState, useEffect } from "react";
import PageHeader from '../../Components/PageHeader';
import SearchInput from '../../Components/SeachInput';
import { useSelector } from "react-redux";
import{ Text } from "../../Components/Text";
import { BiFilterAlt } from "react-icons/bi";
import { useSearchParams , useNavigate} from "react-router-dom";
import { FiDelete } from "react-icons/fi";
import { BsEyeSlash } from "react-icons/bs";
import { TiFlashOutline } from "react-icons/ti";
import TablePagination from "../../Components/TablePagination";
import SimpleSelect from "../../Components/SimpleSelect";
import MultipleSelect from "../../Components/MultipleSelect";
import { Country } from "country-state-city";
import TableTitle from "../../Components/TableTitle";
import Loader from "../../Components/Loader";
import axios from 'axios';
import { FaUsers } from "react-icons/fa";
import { FaRProject } from "react-icons/fa6";
import { PiCheckBold } from "react-icons/pi";
import { RiCloseLine } from "react-icons/ri";
import ApproveContactRequestModal from "../../Components/ApproveContactRequestModal";
import RejectContactRequestModal from "../../Components/RejectContactRequestModal";
import { companyType } from "../../data/companyType";
import { BsDot } from "react-icons/bs";

const InvestmentRequestHistory = () => {
    const [filter , setFilter] = useState(false);
    const [filterApply , setFilterApply] = useState(false);
    const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
    const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
    const [rowData , setRowData] = useState(null);
    const [keywords, setKeywords] = useState('');
    const [investorRequests, setInvestorRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [targetFund, setTargetFund] = useState('');
    const [location, setLocation] = useState('');
    const [industries, setIndustries] = useState([])
    const [cur, setCur] = useState(1);
    const itemsPerPage = 8;
    const itemsToShow = 4;
    const [totalPages , setTotalPages] = useState(0);

    function handlePageChange(page) {
      if (page >= 1 && page <= totalPages) {
        setCur(page);
      }
    }

    const clearFilter = () => {
        setFilter(false); 
        setFilterApply(false);
        setIndustries([]);
        setLocation('');
        setTargetFund('');
    }

    useEffect(() => {
      const fetchInvestorRequests = async () => {
        try {
          const token = sessionStorage.getItem("userToken");
          const response = await axios.get(`${process.env.REACT_APP_baseURL}/investors/ContactRequest`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setInvestorRequests(response.data?.ContactsHistory);
          setTotalPages(response?.data?.totalPages);
          setLoading(false);
        } catch (error) {
          console.error('Error member contact requests history:', error);
          setLoading(false);
        }
      };
  
      fetchInvestorRequests();
    }, []);

    const pageData = [
        {
          name: "Startup 1",
          date: new Date('2024-01-12T10:30:00'),
          funding: 5000000,
          totalRaised: 1560000,
          stage: "Angel Round",
          status: "In Progress",
        },
        {
          name: "Startup 2",
          date: new Date('2024-02-10T09:15:00'),
          funding: 3000000,
          totalRaised: 90000,
          stage: "Seed A",
          status: "Approved",
        },
        {
          name: "Startup 3",
          date: new Date('2024-03-05T12:45:00'),
          funding: 1500000,
          totalRaised: 0,
          stage: "Seed A",
          status: "In Progress",
        },
        {
          name: "Startup 4",
          date: new Date('2024-03-22T08:00:00'),
          funding: 2000000,
          totalRaised: 1000000,
          stage: "Series A",
          status: "Rejected",
        },
        {
          name: "Startup 5",
          date: new Date('2024-04-18T14:20:00'),
          funding: 4000000,
          totalRaised: 1200000,
          stage: "Angel Round",
          status: "Rejected",
        },
        {
          name: "Startup 6",
          date: new Date('2024-05-10T11:00:00'),
          funding: 3500000,
          totalRaised: 3000000,
          stage: "Series B",
          status: "Approved",
        },
        {
          name: "Startup 7",
          date: new Date('2024-06-12T09:45:00'),
          funding: 2500000,
          totalRaised: 500000,
          stage: "Seed A",
          status: "Rejected",
        },
        {
          name: "Startup 8",
          date: new Date('2024-07-15T16:30:00'),
          funding: 1500000,
          totalRaised: 1560000,
          stage: "Angel Round",
          status: "Approved",
        },
    ];
      
    const formatDate = (date) => {
        const options = { month: 'short', day: 'numeric', year: 'numeric' };
        const timeOptions = { hour: 'numeric', minute: 'numeric', hour12: true };
        return `${date.toLocaleDateString('en-US', options)} ${date.toLocaleTimeString('en-US', timeOptions)}`;
    };

    const uniqueFundingValues = [...new Set(pageData.map((item) => item.funding))];

    const uniqueLocationValues = [...new Set(pageData.map((item) => item.stage))];

    const filteredData = pageData.filter(item => {
      const keywordMatch = item?.name.toLowerCase().includes(keywords.toLowerCase());
    
      if (filterApply) {
        const matchesTargetFund = targetFund ? item.funding === Number(targetFund) : true; 
        const matchesLocation = location ? item.location === location : true;
        const matchesIndustries = industries.length > 0 ? industries.includes(item.stage) : true;
    
        return keywordMatch && matchesTargetFund && matchesLocation && matchesIndustries;
      }
    
      return keywordMatch;
    });

    return (
        <div className="bg-white-A700 flex flex-col gap-8 h-full min-h-screen overflow-auto items-start justify-start pb-14 pt-8 rounded-tl-[40px] w-full">
        <div className="flex flex-col items-start justify-start sm:px-5 px-8 w-full">
          <div className="border-b border-gray-201 border-solid flex flex-col md:flex-row gap-5 items-start justify-start pb-6 w-full">
            <div className="flex flex-1 flex-col font-DmSans h-full items-start justify-start w-full">
              <PageHeader
                >
                Investment
              </PageHeader>
            </div>
            <SearchInput className={'w-[240px]'}/>
          </div>
        </div>
        <div className="flex flex-col items-start justify-start w-full">
          <div className="flex flex-col items-start justify-start sm:px-5 px-8 w-full">
            <div className="w-full bg-white-A700 border border-gray-201 rounded-[8px] shadow-tablesbs  ">
              <div className="flex flex-row flex-wrap gap-3 items-center border-b border-gray-201 rounded-t-lg bg-white-A700  py-[19.5px] px-5">
                <TableTitle
                  style={{whiteSpace:"nowrap"}}
                  >
                 Request History
                </TableTitle>
                <div className="md:flex md:flex-1 md:flex-wrap md:flex-row grid grid-cols-2 grid-flow-row auto-cols-min gap-3 w-auto items-center md:justify-end md:ml-auto w-auto">
                  {filter && 
                (<>
                  <div className="flex min-w-[70px]">
                      <input
                        className={`!placeholder:text-blue_gray-301 !text-gray700 font-manrope text-left text-sm tracking-[0.14px] rounded-[6px] px-[12px] py-[10px] h-[40px] border border-[#D0D5DD] focus:border-focusColor focus:shadow-inputBs w-full`}
                        type="text"
                        name="search"
                        placeholder="Keywords"
                        value={keywords}
                        onChange={e => setKeywords(e.target.value)}
                      />
                    </div>
                    <SimpleSelect className="min-w-[170px]" id='targetFund' options={uniqueFundingValues} onSelect={""} searchLabel='Search Target Fund' setSelectedOptionVal={setTargetFund} 
                    placeholder="Target Fund"
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
                    <SimpleSelect className="min-w-[100px] max-w-[200px] " id='country' options={uniqueLocationValues} onSelect={""} searchLabel='Search Country' setSelectedOptionVal={setLocation} 
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
                    <MultipleSelect className="min-w-[170px] max-w-[200px]" id='investor' options={companyType} onSelect={""} searchLabel='Search Industry' setSelectedOptionVal={setIndustries} 
                    placeholder="Select Industry"
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
                (
                <button
                  className="bg-blue-A400 hover:bg-[#235DBD] active:bg-[#224a94] text-white-A700 flex flex-row items-center justify-center cursorpointer-green px-[12px] py-[7px] h-[37px] text-sm font-dm-sans-medium rounded-md"
                  onClick={() => setFilterApply(true)}
                  type="button"
                >
                  <BiFilterAlt size={21} className="mr-2" />
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
              <div className={`bg-white-A700 flex flex-col md:gap-5 flex-1 items-start justify-start ${pageData?.length > 0 ? 'border-b border-gray-201' : 'rounded-b-[8px]'} w-full pb-4 min-h-[330px] overflow-x-auto`} 
                style={{
                  scrollbarWidth: 'none', 
                  msOverflowStyle: 'none',
                }}>
                <table className=" w-full" >
                  <thead>
                    <tr className="bg-white-A700 text-sm leading-[26px] font-DmSans font-medium h-[44px] ">
                        <th scope="col" className="px-[18px] py-3 text-left text-[#344054] font-DmSans font-medium">Date</th>
                        <th scope="col" className="px-[18px] py-3 text-left text-[#344054] font-DmSans font-medium">Project Name</th>
                        <th scope="col" className="px-[18px] py-3 text-left text-[#344054] font-DmSans font-medium">Target Fund</th>
                        <th scope="col" className="px-[18px] py-3 text-left text-[#344054] font-DmSans font-medium">Raised</th>
                        <th scope="col" className="px-[18px] py-3 text-left text-[#344054] font-DmSans font-medium">Stage</th>
                        <th scope="col" className="px-[18px] py-3 text-left text-[#344054] font-DmSans font-medium">Status</th>
                    </tr>
                  </thead>
                  {(!loading && filteredData?.length > 0) ? 
                    <tbody className="items-center w-full ">
                    {
                      filteredData.map((item, index) => (
                      <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-50' : ''} hover:bg-blue-50 w-full`}>
                        <td className="px-[18px] py-4 text-blue_gray-601 font-dm-sans-regular text-sm leading-6">
                        {formatDate(item.date)}
                        </td>
                        <td className="px-[18px] py-4 text-blue_gray-601 font-dm-sans-regular text-sm leading-6">
                            <div className="flex items-center" >
                              {item?.logo ? (
                                <img src={item.logo} className="rounded-full h-8 w-8 mr-2" alt="Profile" />
                              ) : (
                                <FaRProject className="h-8 w-8 mr-2 text-light_blue-200" /> 
                              )}                              
                              <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item?.name}</span>
                            </div>
                        </td>
                        <td className="px-[18px] py-4 text-blue_gray-601 font-dm-sans-regular text-sm leading-6">{`${item?.currency || 'USD'} ${item?.funding?.toLocaleString('en-US')}`}</td>
                        <td className="px-[18px] py-4 text-blue_gray-601 font-dm-sans-regular text-sm leading-6">{`${item?.currency || 'USD'} ${item.totalRaised?.toLocaleString('en-US') || 0}`}</td>
                        <td className="px-[18px] py-4 text-blue_gray-601 font-dm-sans-regular text-sm leading-6">{item?.stage}</td>
                        <td className="px-[18px] py-4 text-blue_gray-601 font-dm-sans-regular text-sm leading-6">
                            <div style={{ whiteSpace: "nowrap" }} 
                                className={`flex flex-row space-x-2 items-center py-0.5 h-[28px] px-[10px] font-dm-sans-regular text-sm leading-6 rounded-full 
                                ${(item.status === 'Approved' || item.status === 'Accepted') ? 'bg-green-100 text-green-700' 
                                : item.status === 'In Progress' ? 'bg-blue-101 text-blue-600' 
                                : item.status === 'Rejected' ? 'bg-rose-100 text-red-500' : ''} inline-flex`}>
                                {item.status}
                          </div>
                        </td>
                      </tr>
                    ))}
                    </tbody> : 
                    ""}
                </table>
                { loading ? (
                 <div className="flex flex-col items-center text-blue_gray-800_01 gap-[16px] min-h-[330px] w-full py-28 rounded-b-[8px]">
                     <Loader />
                 </div> ) : filteredData?.length === 0 && (
                  <div className="flex flex-col items-center text-blue_gray-800_01 gap-[16px] min-h-[330px] w-full py-28 rounded-b-[8px]">
                    <div >
                      <svg width="30" height="32" viewBox="0 0 30 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 10L3.14018 17.0318C2.61697 17.6596 2.35536 17.9736 2.35137 18.2387C2.34789 18.4692 2.4506 18.6885 2.62988 18.8333C2.83612 19 3.24476 19 4.06205 19H15L13.5 31L21 22M20.4751 13H25.938C26.7552 13 27.1639 13 27.3701 13.1667C27.5494 13.3115 27.6521 13.5308 27.6486 13.7613C27.6446 14.0264 27.383 14.3404 26.8598 14.9682L24.8254 17.4096M12.8591 5.36897L16.4999 1L15.6004 8.19657M28.5 29.5L1.5 2.5" stroke="#667085" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                    </div>
                    <div className="font-dm-sans-medium text-sm leading-6 text-gray700 w-auto">
                      <span>No matching data identified</span>
                    </div>
                  </div>
                )}
              </div>
              {filteredData?.length>0 && (
                <div className='w-full flex items-center p-4'>
                <TablePagination
                  currentPage={cur}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                  itemsToShow={itemsToShow}
                />              
              </div>
              )}
            </div>
          </div>
        </div>
    </div>
    );
}

export default InvestmentRequestHistory;
