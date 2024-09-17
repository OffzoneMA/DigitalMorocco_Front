import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Text } from "../Components/Text";
import { BiFilterAlt } from "react-icons/bi";
import { useSearchParams, useNavigate } from "react-router-dom";
import { IoFlashOffOutline } from "react-icons/io5";
import { BsEyeSlash } from "react-icons/bs";
import { TiFlashOutline } from "react-icons/ti";
import TablePagination from "../Components/TablePagination";
import { FiDelete } from "react-icons/fi";
import SimpleSelect from "../Components/SimpleSelect";
import MultipleSelect from "../Components/MultipleSelect";
import { InvestorsRequestData } from "../data/tablesData";
import PageHeader from "../Components/PageHeader";
import TableTitle from "../Components/TableTitle";
import SearchInput from "../Components/SeachInput";

import axios from 'axios';
import Loading from "../Components/Loading";
import Loader from "../Components/Loader";

const InvestorRequestHistory = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filter, setFilter] = useState(false);
  const [filterApply, setFilterApply] = useState(false);
  const [keywords, setKeywords] = useState('');
  const [user, setUser] = useState([]);
  const [status, setStatus] = useState([]);
  const [cur, setCur] = useState(1);
  const itemsPerPage = 8;
  const itemsToShow = 4;
  const [investorRequests, setInvestorRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInvestorRequests = async () => {
      try {
        const token = sessionStorage.getItem("userToken");
        const response = await axios.get(`${process.env.REACT_APP_baseURL}/members/ContactRequest`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setInvestorRequests(response.data?.ContactsHistory);
        setLoading(false);
      } catch (error) {
        console.error('Error member contact requests history:', error);
        setLoading(false);
      }
    };

    fetchInvestorRequests();
  }, []);

  const getDistinctInvestorNamesAndStatuses = (data) => {
    const investorNames = [...new Set(data.map(item => item?.investor.name))];
    const statuses = [...new Set(data.map(item => item?.status))];
    return { investorNames, statuses };
}

 const { investorNames, statuses } = getDistinctInvestorNamesAndStatuses(investorRequests);

 const invNamedata = investorNames;
 const statusData = statuses;

  // const invNamedata = ['Venture Catalysts', 'XYZ Combinator', 'Misk500 Accelerator ', 'Brendan Wallace', 'Family Business'];
  // const statusData = ['In Progress', 'Approved', 'Rejected', 'Stand by'];

  const data = investorRequests;
  const filteredData = data?.filter(item => {
    const keywordMatch = item?.investor?.name.toLowerCase().includes(keywords.toLowerCase());
    if (filterApply) {
      const investorNameMatch = user.length === 0 || user.includes(item?.investor?.name);
      const statusMatch = status.length === 0 || status.includes(item?.status);
      return keywordMatch && investorNameMatch && statusMatch;
    }
    return keywordMatch;
  });

  const ClearFilter = () => {
    setFilter(false);
    setFilterApply(false);
    setStatus([]);
    setUser([]);
  };

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

  function formatDateWithoutComma(date) {
    const options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour12: true
    };

    const datePart = new Intl.DateTimeFormat('en-US', options).format(date);
    const timePart = date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });

    return `${datePart} ${timePart}`;
}

    return (
        <div className="bg-white-A700 flex flex-col gap-8 h-full min-h-screen overflow-auto items-start justify-start pb-14 pt-8 rounded-tl-[40px] w-full">
            <div className="flex flex-col items-start justify-start sm:px-5 px-8 w-full">
                <div className="border-b border-gray-201 border-solid flex flex-col md:flex-row gap-5 items-start justify-start pb-6 w-full">
                  <div className="flex flex-1 flex-col font-DmSans h-full items-start justify-start w-full">
                    <PageHeader
                      >
                      Investor
                    </PageHeader>
                  </div>
                  <SearchInput className={'w-[240px]'}/>
                </div>
            </div>
            <div className="flex flex-col items-start justify-start w-full">
              <div className="flex flex-col items-start justify-start sm:px-5 px-8 w-full">
                <div className="w-full bg-white-A700 border border-gray-201 rounded-[8px] shadow-tablesbs  ">
                  <div className="flex flex-row flex-wrap text-sm text-center text-gray-500   items-center border-b border-gray-201 rounded-t-lg bg-white-A700  py-[19.5px] px-5">
                    <TableTitle
                    style={{whiteSpace: 'nowrap'}}
                      >
                      Request History
                    </TableTitle>
                <div className=" grid-cols-auto-fit md:flex md:flex-1 md:flex-wrap md:flex-row grid grid-cols-2 xs:grid-cols-1 gap-3 w-auto items-center justify-end ml-auto w-auto">
                  {filter && 
                (
                    <>
                    <div className="flex rounded-md p-2 border border-solid min-w-[120px] ">
                      <input className={`!placeholder:text-blue_gray-301 !text-gray700 font-manrope p-0 text-left text-sm tracking-[0.14px] w-full bg-transparent border-0`} type="text" name="search" placeholder="Keywords" value={keywords} onChange={e => setKeywords(e.target.value)} />
                    </div>
                    <MultipleSelect className="min-w-[180px] max-w-[300px] " id='investor' options={invNamedata} onSelect={""} searchLabel='Search Investor' setSelectedOptionVal={setUser} placeholder="Investor Name" content={(option) => {
                      return (
                        <div className="flex py-2 items-center w-full">
                          <Text className="text-gray-801 text-left text-base font-dm-sans-regular leading-5 w-auto">{option}</Text>
                        </div>
                      );
                    }} />
                    <MultipleSelect className="min-w-[140px] max-w-[200px] " id='status' options={statusData} onSelect={""} searchLabel='Search Status' setSelectedOptionVal={setStatus} placeholder="Status" content={(option) => {
                      return (
                        <div className="flex py-2 items-center w-full">
                          <Text className="text-gray-801 text-left text-base font-dm-sans-regular leading-5 w-auto">{option}</Text>
                        </div>
                      );
                    }} />
                  </>
                )}
                {filter ? (
                  <div className="bg-blue-A400 hover:bg-[#235DBD] active:bg-[#224a94] text-white-A700 flex flex-row items-center cursorpointer-green px-[12px] py-[7px] h-[37px] text-sm font-dm-sans-medium rounded-md " onClick={() => setFilterApply(true)}>
                    {/* <BiFilterAlt size={18} className="mr-2" /> */}
                    <button type="button" className="text-base text-white-A700" style={{ whiteSpace: 'nowrap' }}>Apply Filters</button>
                  </div>
                ) : (
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
                )}
                {filterApply && (
                  <div className="text-[#15143966] flex flex-row items-center p-[2px] h-[38px] max-w-[75px] border-b border-solid border-[#15143966] cursorpointer-green" onClick={ClearFilter}>
                    <FiDelete size={18} className="mr-2" />
                    <Text className="text-base font-dm-sans-regular leading-[26px] text-[#15143966] " size="">Clear</Text>
                  </div>
                )}
              </div>
            </div>
            <div className={`bg-white-A700 flex flex-col md:gap-5 flex-1 items-start justify-start ${pageData?.length > 0 ? 'border-b border-gray-201' : 'rounded-b-[8px]'} w-full pb-4 min-h-[330px] overflow-x-auto`} 
              style={{
                  scrollbarWidth: 'none', 
                  msOverflowStyle: 'none',
                }}>
              <table className=" w-full">
                <thead>
                  <tr className="bg-white-A700 text-sm leading-[26px] font-DmSans font-medium h-[44px]">
                    <th scope="col" className="px-[18px] py-3 text-left text-[#344054] font-DmSans font-medium">Date</th>
                    <th scope="col" className="px-[18px] py-3 text-left text-[#344054] font-DmSans font-medium">Investor Name</th>
                    <th scope="col" className="px-[18px] py-3 text-left text-[#344054] font-DmSans font-medium">Communication Status</th>
                    <th scope="col" className="px-[18px] py-3 text-left text-[#344054] font-DmSans font-medium">Status</th>
                    <th scope="col" className="px-[18px] py-3 text-left text-[#344054] font-DmSans font-medium">Attachment</th>
                    <th scope="col" className="px-[18px] py-3 text-left text-[#344054] font-DmSans font-medium">Notes</th>
                  </tr>
                </thead>
                {(!loading && pageData?.length > 0) ?
                <tbody className="items-center w-full ">
                {             
                    pageData.map((item, index) => (
                      <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-50' : ''} hover:bg-blue-50 w-full`}>
                        <td className="px-[18px] py-4 w-auto text-gray500 font-dm-sans-regular text-sm leading-6" style={{ whiteSpace: 'nowrap' }}>
                          {formatDateWithoutComma(new Date(item.dateCreated))}</td>
                        <td className="px-[18px] py-4 text-gray-900_01 font-dm-sans-regular text-sm leading-6" style={{ whiteSpace: 'nowrap' }}>{item?.investor?.name}</td>
                        <td className="px-[18px] py-4 text-gray500 font-dm-sans-regular text-sm leading-6">{item.communicationStatus}</td>
                        <td className="px-[18px] py-4 text-gray500 font-dm-sans-regular text-sm leading-6">
                          <div style={{ whiteSpace: "nowrap" }} className={`flex flex-row space-x-2 items-center py-0.5 px-2 font-dm-sans-regular text-sm leading-6 rounded-full ${(item.status === 'Approved' || item.status === 'Accepted') ? 'bg-emerald-50 text-green-700' : item.status === 'In Progress' ? 'bg-blue-101 text-blue-600' : item.status === 'Rejected' ? 'bg-rose-100 text-red-500' : ''} inline-flex`}>{item.status}</div>
                        </td>
                        <td className="px-[18px] py-4 text-gray500 font-dm-sans-regular text-sm leading-6">{item?.attachment || "-"}</td>
                        <td className="px-[18px] py-4 text-gray500 font-dm-sans-regular text-sm leading-6">{item?.note || "-"}</td>
                      </tr>
                    ))
                 
               } </tbody>
               :
               ""}
              </table>
              {loading ? (
                     <div className="flex items-center justify-center w-full h-full py-40">
                     <Loader />
                 </div> ) : pageData.length === 0 && (
                  <div className="flex flex-col items-center text-gray700 w-full py-28">
                      <svg width="30" height="32" viewBox="0 0 30 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 10L3.14018 17.0318C2.61697 17.6596 2.35536 17.9736 2.35137 18.2387C2.34789 18.4692 2.4506 18.6885 2.62988 18.8333C2.83612 19 3.24476 19 4.06205 19H15L13.5 31L21 22M20.4751 13H25.938C26.7552 13 27.1639 13 27.3701 13.1667C27.5494 13.3115 27.6521 13.5308 27.6486 13.7613C27.6446 14.0264 27.383 14.3404 26.8598 14.9682L24.8254 17.4096M12.8591 5.36897L16.4999 1L15.6004 8.19657M28.5 29.5L1.5 2.5" stroke="#667085" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                  <Text className="font-dm-sans-medium text-sm leading-6 text-gray-900_01 w-auto py-4" size="">
                  No matching data identified</Text>
                </div>
                )                 
              }
            </div>
            {pageData?.length > 0 && (
              <div className='w-full flex items-center p-4'>
                <TablePagination currentPage={cur} totalPages={totalPages} onPageChange={handlePageChange} itemsToShow={itemsToShow} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestorRequestHistory;