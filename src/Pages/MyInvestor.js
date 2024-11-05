import React, { useState, useEffect } from "react";
import axios from "axios";
import { Text } from "../Components/Text";
import TablePagination from "../Components/TablePagination";
import Loading from "../Components/Loading";
import { useNavigate } from "react-router-dom/dist/umd/react-router-dom.development";
import { FiDelete } from "react-icons/fi";
import { BiFilterAlt } from "react-icons/bi";
import MultipleSelect from "../Components/MultipleSelect";
import SimpleSelect from "../Components/SimpleSelect";
import { Country } from "country-state-city";
import {companyType} from "../data/companyType";
import PageHeader from "../Components/PageHeader";
import TableTitle from "../Components/TableTitle";
import SearchInput from "../Components/SeachInput";
import { FaUsers } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import Loader from "../Components/Loader";
import { useGetDistinctInvestorFieldValuesQuery , useGetInvestorsForMemberQuery } from "../Services/Member.Service";
import userdefaultProfile from '../Media/User.png';
import { useTranslation } from "react-i18next";

const MyInvestors = () => {
  const { t } = useTranslation();
  const [investors, setInvestors] = useState([]);
  const [filteredInvestors, setFilteredInvestors] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const userData = JSON.parse(sessionStorage.getItem("userData"));
  const userId = userData?._id;
  const [noInvestors, setNoInvestors] = useState(false);
  const [cur, setCur] = useState(1);
  const itemsPerPage = 8;
  const itemsToShow = 4;
  const[totalPages  , setTotalPages] = useState(0);
  const navigate = useNavigate();
  const [filter , setFilter] = useState(false);
  const [filterApply , setFilterApply] = useState(false);
  const [keywords, setKeywords] = useState('');
  const [investmentType, setInvestmentType] = useState([]);
  const [location, setLocation] = useState('');
  const [industries, setIndustries] = useState([]);
  const dataCountries = Country.getAllCountries();
  const queryParams = { page: cur, pageSize: itemsPerPage };

  if (filterApply) {
    queryParams.type = investmentType.length > 0 ? investmentType.join(',') : undefined;
    queryParams.location = location || undefined;
    queryParams.industries = industries.length > 0 ? industries.join(',') : undefined;
  }
  const { data, error, isFetching: loading , refetch } = useGetInvestorsForMemberQuery(queryParams);
  const { data : locations0, isLoading:locationLoading } = useGetDistinctInvestorFieldValuesQuery('location');
  const { data : locations1 } = useGetDistinctInvestorFieldValuesQuery('country');
  const { data : industriesData, isLoading:industryLoading } = useGetDistinctInvestorFieldValuesQuery('PreferredInvestmentIndustry');
  const { data : investorTypes, isLoading:typeLoading } = useGetDistinctInvestorFieldValuesQuery('type');

  useEffect(() => {
    if (data) {
      setInvestors(data?.investors?.investors);
      setTotalPages(data?.investors?.totalPages);
      setFilteredInvestors(data?.investors?.investors);
      // setNoInvestors(filteredInvestors?.length === 0);
    }
  }, [data]);

  const locations = locations0 || locations1;

  useEffect(() => {
    refetch();
  }, [cur, itemsPerPage , filterApply]); 

  const filteredData = filteredInvestors?.filter(item => {
    const keywordMatch = item?.name?.toLowerCase().includes(keywords.toLowerCase());  
    return keywordMatch;
  });

  const clearFilter = () => {
    setFilter(false); 
    setFilterApply(false);
    setIndustries([]);
    setInvestmentType([]);
    setLocation('');
  }

  const pageData = filteredData;

  function handlePageChange(page) {
    if (page >= 1 && page <= totalPages) {
      setCur(page);
    }
  }

  return (
    
    <div className="bg-white-A700 flex flex-col gap-8 h-full min-h-screen overflow-auto items-start justify-start pb-14 pt-8 rounded-tl-[40px] w-full">
        <div className="flex flex-col items-start justify-start sm:px-5 px-8 w-full">
          <div className="border-b border-gray-201 border-solid flex flex-col md:flex-row gap-5 items-start justify-start pb-6 w-full">
            <div className="flex flex-1 flex-col font-DmSans h-full items-start justify-start w-full">
              <PageHeader
                >
                {t("sidebar.investor.main")}
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
                  {t('investor.myInvestors')}
                </TableTitle>
                <div className="md:flex md:flex-1 md:flex-wrap md:flex-row grid grid-cols-2 grid-flow-row auto-cols-min gap-3 items-center md:justify-end md:ml-auto w-auto">
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
                    <MultipleSelect className="min-w-[170px]" id='investor' options={investorTypes?.distinctValues || []}  searchLabel={t('common.searchType')} setSelectedOptionVal={setInvestmentType} 
                    placeholder={t('common.typeofInvestment')}
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
                    <SimpleSelect className="min-w-[100px] max-w-[200px] " id='country' options={locations?.distinctValues || []}  searchLabel={t('common.searchLocation')} setSelectedOptionVal={setLocation} 
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
                    <MultipleSelect className="min-w-[170px]" id='investor' options={industriesData?.distinctValues || []}  searchLabel={t('common.searchIndustry')} setSelectedOptionVal={setIndustries} 
                    placeholder={t('common.selectIndustries')}
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
                (
                <button
                  className="bg-blue-A400 hover:bg-[#235DBD] active:bg-[#224a94] text-white-A700 flex flex-row items-center justify-center cursorpointer px-[12px] py-[7px] h-[37px] text-sm font-dm-sans-medium rounded-md"
                  onClick={() => setFilterApply(true)}
                  type="button"
              >
                  {/* <BiFilterAlt size={18} className="mr-2" /> */}
                  <span className="font-dm-sans-medium text-sm leading-[18.23px] text-white-A700" style={{ whiteSpace: 'nowrap' }}>
                      {t("common.applyFilters")}
                  </span>
              </button>              
                  ):
                (
                <button
                  className={`col-end-3 ${pageData?.length === 0 ? 'bg-[#e5e5e6] text-[#a7a6a8] cursor-not-allowed' : 'hover:bg-[#235DBD] active:bg-[#224a94] bg-blue-A400 text-white-A700'} col-span-1 font-DmSans flex flex-row items-center justify-center cursorpointer px-[12px] py-[7px] h-[37px] text-sm font-dm-sans-medium rounded-md`}
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
                    className="text-[#15143966] hover:text-[#1514397e] flex flex-row gap-[4px] items-center p-[2px] h-[38px] max-w-[75px] border-b border-solid border-[#15143966] cursorpointer"
                    onClick={clearFilter}
                    type="button"
                >
                    <svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12.75 4.75L8.25 9.25M8.25 4.75L12.75 9.25M2.04 7.72L5.28 12.04C5.544 12.392 5.676 12.568 5.84329 12.6949C5.99145 12.8074 6.15924 12.8913 6.33808 12.9423C6.54 13 6.76 13 7.2 13H12.9C14.1601 13 14.7902 13 15.2715 12.7548C15.6948 12.539 16.039 12.1948 16.2548 11.7715C16.5 11.2902 16.5 10.6601 16.5 9.4V4.6C16.5 3.33988 16.5 2.70982 16.2548 2.22852C16.039 1.80516 15.6948 1.46095 15.2715 1.24524C14.7902 1 14.1601 1 12.9 1H7.2C6.76 1 6.54 1 6.33808 1.05767C6.15924 1.10874 5.99145 1.19264 5.84329 1.30506C5.676 1.432 5.544 1.608 5.28 1.96L2.04 6.28C1.84635 6.53819 1.74953 6.66729 1.71221 6.80907C1.67926 6.93423 1.67926 7.06577 1.71221 7.19093C1.74953 7.33271 1.84635 7.46181 2.04 7.72Z" stroke="#151439" stroke-opacity="0.4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span className="text-base font-dm-sans-regular leading-[26px]">{t('common.clear')}</span>
                  </button>
                  )}
                </div>
              </div>
              <div className="relative flex flex-col w-full">
              <div className={`bg-white-A700 flex flex-col md:gap-5 flex-1 items-start justify-start ${(pageData?.length > 0  && !loading)? 'border-b border-gray-201' : 'rounded-b-[8px]'} w-full pb-4 min-h-[330px] overflow-x-auto`} 
              style={{
                  scrollbarWidth: 'none', 
                  msOverflowStyle: 'none',
                }}>
                <table className=" w-full">
                  <thead>
                  <tr className="bg-white-A700 text-sm leading-[26px] font-DmSans font-medium h-[44px]">
                    <th scope="col" className="px-[18px] py-3 text-left text-[#344054] font-DmSans font-medium">{t('investor.investorName')}</th>
                    <th scope="col" className="px-[18px] py-3 text-left text-[#344054] font-DmSans font-medium">{t('investor.type')}</th>
                    <th scope="col" className="px-[18px] py-3 text-left text-[#344054] font-DmSans font-medium">{t('investor.fundingRound')}</th>
                    <th scope="col" className="px-[18px] py-3 text-left text-[#344054] font-DmSans font-medium">{t('investor.location')}</th>
                    <th scope="col" className="px-[18px] py-3 text-left text-[#344054] font-DmSans font-medium">{t('investor.preferredInvestmentIndustry')}</th>
                  </tr>
                  </thead>
                  {(!loading && pageData?.length > 0) ? 
                  <tbody className="items-center w-full ">
                  {
                  pageData.map((item, index) => (
                    <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-50' : ''} hover:bg-blue-50 cursorpointer w-full`} onClick={()=> navigate(`/MyInvestorDetails/${item?._id}` , { state: {investor: item}})}>
                    <td className="w-auto text-gray-900_01 font-dm-sans-regular text-sm leading-6">
                        <div className="relative flex">
                          <div className="px-[18px] py-4 flex items-center gap-3" >
                            {item?.image ? (
                              <img src={item?.image} className="rounded-full h-8 w-8" alt="Profile" />
                            ) : (
                              <div className="flex items-center justify-center rounded-full h-9 w-9 bg-[#EDF7FF] p-2">
                                <img src={userdefaultProfile} alt="" className="" />
                              </div>
                            )}                              
                            <span className="capitalize" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item?.name}</span>
                          </div>
                        </div>
                    </td>
                      <td className="px-[18px] py-4 text-gray500 font-DmSans text-left text-sm font-normal leading-6" 
                      style={{ whiteSpace: 'nowrap' }}>{item.type}</td>
                      <td className="px-[18px] py-4 text-left text-gray500 font-dm-sans-regular text-sm leading-6">{item?.fundingRound || "-"}</td>
                      <td className="px-[18px] py-4 text-gray500 font-dm-sans-regular text-sm leading-6" 
                      style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item?.location || item?.country || "-"}</td>
                      <td className="px-[18px] py-4 text-gray500 font-dm-sans-regular text-sm leading-6 max-w-[230px] lg:max-w-[250px]"
                        style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {Array.isArray(item?.PreferredInvestmentIndustry) ? item.PreferredInvestmentIndustry.join(', ') : ''}
                        </td>
                    </tr>
                  ))
                  }
                </tbody>
                :""}
                </table>
                { loading ? (
                     <div className="flex flex-col items-center text-blue_gray-800_01 gap-[16px] min-h-[330px] w-full py-28 rounded-b-[8px]">
                     <Loader />
                 </div> ) : (pageData && pageData?.length === 0 && !loading) && (
                  <div className="flex flex-col items-center text-blue_gray-800_01 gap-[16px] min-h-[330px] w-full py-28 rounded-b-[8px]">
                    <div >
                      <svg width="30" height="32" viewBox="0 0 30 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 10L3.14018 17.0318C2.61697 17.6596 2.35536 17.9736 2.35137 18.2387C2.34789 18.4692 2.4506 18.6885 2.62988 18.8333C2.83612 19 3.24476 19 4.06205 19H15L13.5 31L21 22M20.4751 13H25.938C26.7552 13 27.1639 13 27.3701 13.1667C27.5494 13.3115 27.6521 13.5308 27.6486 13.7613C27.6446 14.0264 27.383 14.3404 26.8598 14.9682L24.8254 17.4096M12.8591 5.36897L16.4999 1L15.6004 8.19657M28.5 29.5L1.5 2.5" stroke="#667085" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div className="font-dm-sans-medium text-sm leading-6 text-gray700 w-auto">
                      <span>{t("common.noMatchingData")}</span>
                    </div>
                  </div>
                )                 
                }
              </div>
              {(pageData?.length>0 && !loading) && (
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
    </div>
  );
};

export default MyInvestors;
