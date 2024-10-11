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
import { companyType } from "../../data/companyType";
import { BsDot } from "react-icons/bs";
import { useGetAllConatctReqQuery  , useGetDistinctProjectFieldsQuery} from "../../Services/Investor.Service";
import { useApproveRequestMutation , useRejectRequestMutation } from "../../Services/ContactRequest.Service";


const MyInvestment = () => {
    const [filter , setFilter] = useState(false);
    const [filterApply , setFilterApply] = useState(false);
    const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
    const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
    const [rowData , setRowData] = useState(null);
    const [keywords, setKeywords] = useState('');
    const [investorRequests, setInvestorRequests] = useState([]);
    const [targetFund, setTargetFund] = useState('');
    const [location, setLocation] = useState('');
    const [industries, setIndustries] = useState([])
    const [cur, setCur] = useState(1);
    const itemsPerPage = 8;
    const itemsToShow = 4;
    const navigate = useNavigate();
    const [totalPages , setTotalPages] = useState(0);
    const queryParams = { page: cur, pageSize: itemsPerPage , status: "Approved" };

    if (filterApply) {
      queryParams.projectStatus = industries;
      queryParams.funding = targetFund;
      queryParams.projectStage = location;
    }
    const { data: myInvestments, error, isFetching: loading , refetch} = useGetAllConatctReqQuery(queryParams);
    const { data : sectorData, isLoading:locationLoading } = useGetDistinctProjectFieldsQuery({field: "status" , status: "Approved" });
    const { data : fundingData, isLoading:industryLoading } = useGetDistinctProjectFieldsQuery({field: "funding", status: "Approved" });
    const { data : locationData, isLoading:typeLoading } = useGetDistinctProjectFieldsQuery({field: "stage" , status: "Approved"});


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
      refetch();
    }, [cur , itemsPerPage , refetch , filterApply]);

    useEffect(() => {
      setTotalPages(myInvestments?.totalPages);
    }, [myInvestments]);

    const sectorValues = sectorData?.distinctValues || [];
    const fundingValues = fundingData?.distinctValues || [];
    const locationValues = locationData?.distinctValues || [];

    const pageData = myInvestments?.ContactsHistory ||  [];

    const filteredData = pageData?.filter(item => {
      const keywordMatch = item?.project?.name.toLowerCase().includes(keywords.toLowerCase());

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
                  My Investments
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
                    <SimpleSelect className="min-w-[170px]" id='targetFund' options={fundingValues} onSelect={""} searchLabel='Search Target Fund' setSelectedOptionVal={setTargetFund} 
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
                    <SimpleSelect className="min-w-[100px] max-w-[200px] " id='stage' options={locationValues} onSelect={""} searchLabel='Search Stage' setSelectedOptionVal={setLocation} 
                    placeholder="Stage" 
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
                    <MultipleSelect className="min-w-[170px] max-w-[200px]" id='status' options={sectorValues} onSelect={""} searchLabel='Search Status' setSelectedOptionVal={setIndustries} 
                    placeholder="Select Status"
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
              <div className={`bg-white-A700 flex flex-col md:gap-5 flex-1 items-start justify-start ${(filteredData?.length > 0 && !loading) ? 'border-b border-gray-201' : 'rounded-b-[8px]'} w-full pb-4 min-h-[330px] overflow-x-auto`} 
                style={{
                  scrollbarWidth: 'none', 
                  msOverflowStyle: 'none',
                }}>
                <table className=" w-full" >
                  <thead>
                    <tr className="bg-white-A700 text-sm leading-[26px] font-DmSans font-medium h-[44px] ">
                        <th scope="col" className="px-[18px] py-3 text-left text-[#344054] font-DmSans font-medium">Project Name</th>
                        <th scope="col" className="px-[18px] py-3 text-left text-[#344054] font-DmSans font-medium">Target Fund</th>
                        <th scope="col" className="px-[18px] py-3 text-left text-[#344054] font-DmSans font-medium">Raised</th>
                        <th scope="col" className="px-[18px] py-3 text-left text-[#344054] font-DmSans font-medium">Stage</th>
                        <th scope="col" className="px-[18px] py-3 text-left text-[#344054] font-DmSans font-medium">Milestone</th>
                        <th scope="col" className="px-[18px] py-3 text-left text-[#344054] font-DmSans font-medium">Status</th>
                    </tr>
                  </thead>
                  {(!loading && filteredData?.length > 0) ? 
                    <tbody className="items-center w-full ">
                    {
                      filteredData.map((item, index) => (
                      <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-50' : ''} hover:bg-blue-50 w-full`} onClick={()=> navigate(`/InvestmentDetails/${item?._id}` , { state: {contactRequest: item}})}>
                        <td className="w-auto text-gray-900_01 font-dm-sans-regular text-sm leading-6">
                          <div className="relative flex">
                            <div className="px-[18px] py-4 flex items-center" >
                              {item?.logo ? (
                                <img src={item?.project?.logo} className="rounded-full h-8 w-8 mr-2" alt="Profile" />
                              ) : (
                                <FaRProject className="h-8 w-8 mr-2 text-light_blue-200" /> 
                              )}                              
                              <span className="capitalize" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item?.project?.name}</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-[18px] py-4 text-blue_gray-601 font-dm-sans-regular text-sm leading-6">{`${item?.project?.currency || 'USD'} ${item?.project?.funding?.toLocaleString('en-US')}`}</td>
                        <td className="px-[18px] py-4 text-blue_gray-601 font-dm-sans-regular text-sm leading-6">{`${item?.project?.currency || 'USD'} ${item?.project?.totalRaised?.toLocaleString('en-US') || 0}`}</td>
                        <td className="px-[18px] py-4 text-blue_gray-601 font-dm-sans-regular text-sm leading-6">{item?.project?.stage}</td>
                        <td className="px-[18px] py-4 text-blue_gray-601 font-dm-sans-regular text-sm leading-6">{item?.project?.milestones?.[0]?.name}</td>
                        <td className="px-[18px] py-4 text-blue_gray-601 font-dm-sans-regular text-sm leading-6">
                            <div className={`items-center text-center h-[22px] pr-2 font-inter text-xs font-medium leading-[18px] rounded-full ${
                            item?.project?.status === 'Active' ? 'bg-green-100 text-green-700' :
                                item?.project?.status === 'In Progress' ? 'bg-light_blue-100 text-blue-501' :
                                item?.project?.status === 'Stand by' ? 'bg-gray-201 text-blue_gray-700' : ''
                            } inline-flex`}  style={{whiteSpace:'nowrap'}}>
                            <BsDot  size={28} className=""/>
                            {item?.project?.status}
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
                        <path d="M9 10L3.14018 17.0318C2.61697 17.6596 2.35536 17.9736 2.35137 18.2387C2.34789 18.4692 2.4506 18.6885 2.62988 18.8333C2.83612 19 3.24476 19 4.06205 19H15L13.5 31L21 22M20.4751 13H25.938C26.7552 13 27.1639 13 27.3701 13.1667C27.5494 13.3115 27.6521 13.5308 27.6486 13.7613C27.6446 14.0264 27.383 14.3404 26.8598 14.9682L24.8254 17.4096M12.8591 5.36897L16.4999 1L15.6004 8.19657M28.5 29.5L1.5 2.5" stroke="#667085" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div className="font-dm-sans-medium text-sm leading-6 text-gray700 w-auto">
                      <span>No matching data identified</span>
                    </div>
                  </div>
                )}
              </div>
              {(filteredData?.length>0 && !loading) && (
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

export default MyInvestment;
