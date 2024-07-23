import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import{ Text } from "../Components/Text";
import { BiFilterAlt } from "react-icons/bi";
import { useSearchParams , useNavigate} from "react-router-dom";
import { FiDelete } from "react-icons/fi";
import { BsEyeSlash } from "react-icons/bs";
import { TiFlashOutline } from "react-icons/ti";
import TablePagination from "../Components/TablePagination";
import {companyType} from "../data/companyType";
import SimpleSelect from "../Components/SimpleSelect";
import MultipleSelect from "../Components/MultipleSelect";
import { Country } from "country-state-city";
import { InvestorsData } from "../data/tablesData";
import PageHeader from "../Components/PageHeader";
import TableTitle from "../Components/TableTitle";
import SearchInput from "../Components/SeachInput";

import axios from 'axios';
import Loading from "../Components/Loading";
import { FaUsers } from "react-icons/fa";

const Investors = () => {
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth) 
  const [filter , setFilter] = useState(false);
  const [filterApply , setFilterApply] = useState(false);
  const [keywords, setKeywords] = useState('');
  const [investmentType, setInvestmentType] = useState([]);
  const [location, setLocation] = useState('');
  const [industries, setIndustries] = useState([]);
  const dataCountries = Country.getAllCountries();
  const [isSubscribe , setIsSubscribe] = useState(false);
  const [profilVerified , setProfilVerified] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [cur, setCur] = useState(1);
  const itemsPerPage = 8;
  const itemsToShow = 4;
  const [totalPages , setTotalPages] = useState(0);
  const [investors, setInvestors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = sessionStorage.getItem("userToken");
    const fetchInvestorRequests = async () => {
      try {
        const token = sessionStorage.getItem("userToken");
        const response = await axios.get(`http://localhost:5000/investors?page=${cur}&pageSize=${itemsPerPage}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
      });
        setInvestors(response.data.investors);
        setTotalPages(response.data?.totalPages)
        setLoading(false);
      } catch (error) {
        console.error('Error fetching investor requests:', error);
        setLoading(false);
      }
    };

    const checkSubscriptionStatus = async () => {
      try {
          const userData = JSON.parse(sessionStorage.getItem("userData"));
          const userId = userData._id;
          const response = await axios.get(`http://localhost:5000/members/check-subscription-status/${userId}`, {
              headers: { Authorization: `Bearer ${token}` },
          });
          setIsSubscribe(response.data.result);
      } catch (error) {
          console.error('Error checking subscription status:', error);
      }
  };
    checkSubscriptionStatus();
    fetchInvestorRequests();
    
  },[cur, itemsPerPage]);

  const data = isSubscribe?  investors : InvestorsData;

  const filteredData = isSubscribe? data.filter(item => {
    const keywordMatch = item.owner?.displayName.toLowerCase().includes(keywords.toLowerCase());
  
    if (filterApply && isSubscribe) {
      const typeMatch = investmentType.length === 0 || investmentType.includes(item.Type);
  
      const locationMatch = !location || item.Location.toLowerCase().includes(location["name"].toLowerCase());
  
      const industryMatch = industries.length === 0 || industries.some(ind => item.PreferredInvestmentIndustry.includes(ind));
  
      return keywordMatch && typeMatch && locationMatch && industryMatch;
    }
  
    return keywordMatch;
  }) : data;

  const clearFilter = () => {
    setFilter(false); 
    setFilterApply(false);
    setIndustries([]);
    setInvestmentType([]);
    setLocation('');
  }
  

  // const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const getPageData = () => {
    const startIndex = (cur - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredData.slice(startIndex, endIndex);
  };

  const pageData = filteredData;

  function handlePageChange(page) {
    if (page >= 1 && page <= totalPages) {
      setCur(page);
    }
  }

  const invTypedata = [
    'Venture Capital',
    'Angel',
    'Accelerator',
    'Angel Club',
    'Family Business'
  ];

  const companySectorData = companyType.map(
    item => ({ label: item, value: item })
  );
  
    return (
    <div className="bg-white-A700 flex flex-col gap-8 h-full min-h-screen items-start justify-start pb-8 pt-8 rounded-tl-[40px]  w-full">
        <div className="flex flex-col items-start justify-start sm:px-5 px-8 w-full">
          <div className="border-b border-indigo-50 border-solid flex flex-col md:flex-row gap-5 items-start justify-start pb-6 w-full">
            <div className="flex flex-1 flex-col font-DmSans h-full items-start justify-start w-full">
              <PageHeader
                >
                Investor
              </PageHeader>
            </div>
            <SearchInput className={'min-w-[25%]'}/>
          </div>
        </div>
        <div className="flex flex-col items-start justify-start w-full">
          <div className="flex flex-col items-start justify-start sm:px-5 px-8 w-full">
            <div className="w-full bg-white-A700 border border-gray-200 rounded-lg shadow  dark:border-gray-300">
              <div className="flex flex-col gap-5 md:flex-row items-center text-gray-500 border-b border-gray-200 rounded-t-lg bg-white-A700 dark:border-gray-300 dark:text-gray-400  py-4 px-5">
                <TableTitle
                  style={{whiteSpace:"nowrap"}}
                  >
                  Investors List
                </TableTitle>
                <div className="md:flex md:flex-1 md:flex-wrap md:flex-row grid grid-cols-2 grid-flow-row auto-cols-min gap-3 w-auto items-center md:justify-end md:ml-auto w-auto">
                  {filter && 
                (
                    <>
                    <div className="flex rounded-md p-2 border border-solid min-w-[70px]">
                      <input
                        className={`!placeholder:text-blue_gray-300 !text-gray700 font-manrope p-0 text-left text-sm tracking-[0.14px] w-full bg-transparent border-0`}
                        type="text"
                        name="search"
                        placeholder="Keywords"
                        value={keywords}
                        onChange={e => setKeywords(e.target.value)}
                      />
                    </div>
                    <MultipleSelect className="min-w-[170px]" id='investor' options={invTypedata} onSelect={""} searchLabel='Search Type' setSelectedOptionVal={setInvestmentType} 
                    placeholder="Type of Investment"
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
                    <SimpleSelect className="min-w-[100px] max-w-[200px] " id='country' options={dataCountries} onSelect={""} searchLabel='Select Country' setSelectedOptionVal={setLocation} 
                    placeholder="Location" valuekey="name"
                    content={
                      ( option) =>{ return (
                        <div className="flex  py-2 items-center  w-full">
                            <Text
                              className="text-gray-801 text-left text-base font-DmSans font-normal leading-5 w-auto"
                              >
                               {option.name}
                            </Text>
                           </div>
                        );
                      }
                    }/>
                    <MultipleSelect className="min-w-[170px]" id='investor' options={companyType} onSelect={""} searchLabel='Search Industrie' setSelectedOptionVal={setIndustries} 
                    placeholder="Select Industries"
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
                (
                <button
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
                (
                <button
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
              <div className="relative flex flex-col w-full">
              <div className="bg-white-A700  border-b border-gray-200 flex flex-col md:gap-5 flex-1 items-start justify-start w-full overflow-x-auto">
                <table className=" w-full">
                  <thead>
                  <tr className="bg-white-A700 text-sm leading-6">
                    <th className="p-3 text-left text-gray700 font-medium">Investor Name</th>
                    <th className="p-3 text-left text-gray700 font-medium">Type</th>
                    <th className="p-3 text-center text-gray700 font-medium">Number of Investment</th>
                    <th className="p-3 text-center text-gray700 font-medium">Number of Exits</th>
                    <th className="p-3 text-left text-gray700 font-medium">Location</th>
                    <th className="p-3 text-left text-gray700 font-medium">Preferred Investment Industry</th>
                  </tr>
                  </thead><tbody className="items-center w-full ">
                  { loading ? (
                     <div className="flex items-center justify-center w-full h-full">
                     <Loading />
                 </div> ) : pageData.length === 0 ? (
                  <div style={{
                    height: "300px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    marginRight: "-800px",
                  }}>
                    <div >
                      <FaUsers size={18} className="mr-2 w-4 h-4" style={{ color: "#98a2b3" }} />
                    </div>
                    <div>
                      <span>No investors</span>
                    </div>
                  </div>
                )                 
                 : ( pageData.map((item, index) => (
                    <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-50' : ''} hover:bg-blue-50 cursor-pointer w-full`} onClick={()=> navigate(`/InvestorDetails/${item?._id}`)}>
                    <td className="w-auto text-gray-900_01 font-DmSans text-sm font-normal leading-6">
                        <div className="relative flex">
                        <div className="py-3 px-3 flex items-center" >
                            <img src={item.image} className="rounded-full h-8 w-8  mr-2"/>
                            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{isSubscribe? item.owner?.displayName : item.InvestorName}</span>
                        </div>
                        {profilVerified && (
                          <div className="overlay-content-invPro w-full flex">
                          </div>
                        )}
                        </div>
                    </td>
                      <td className="py-3 px-3 text-gray500 font-DmSans text-center text-sm font-normal leading-6" 
                      style={{ whiteSpace: 'nowrap' }}>{item.type}</td>
                      <td className="py-3 px-3 text-center text-gray500 font-DmSans text-sm font-normal leading-6">{item.numberOfInvestment}</td>
                      <td className="py-3 px-3 text-center text-gray500 font-DmSans text-sm font-normal leading-6">{item.numberOfExits}</td>
                      <td className="py-3 px-3 text-gray500 font-DmSans text-sm font-normal leading-6" 
                      style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.location}</td>
                      <td className="py-3 px-3 text-gray500 font-DmSans text-sm font-normal leading-6 max-w-[230px] lg:max-w-[250px]"
                        style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {item.PreferredInvestmentIndustry}
                      </td>

                    </tr>
                  ))
                ) 
                }
                  
                </tbody>
                </table>
                {!isSubscribe &&
                (
                  <div className="overlay-content-inv w-full flex flex-col top-12 px-8 ">
                  <BsEyeSlash size={35} className="text-gray500 "/>
                  <Text
                    className="font-DmSans text-[22px] font-medium leading-8 text-gray-900_01 w-auto pt-4"
                    size=""
                  >
                    View all 261,765 Investors
                  </Text>
                  <Text
                    className="font-DmSans text-sm font-medium leading-[26px] text-gray-900_01 w-auto pt-3 pb-8"
                    size=""
                  >
                    Upgrade to <a className="text-blue-500" href="/DigitalMoroccoPro">Digital Morocco Pro</a>,  and get access all search results, save to custom lists and get connected with investors
                  </Text>
                  <button
                    className="bg-blue-A400 text-white-A700 flex flex-row items-center p-2 rounded-md cursor-pointer"
                    onClick={() => navigate('/ChoosePlan')}
                    type="button"
                  >
                    <TiFlashOutline size={25} className="mr-2" />
                    <span className="text-sm font-DmSans font-medium leading-[18.23px] text-white-A700">Upgrade Membership</span>
                  </button>

                </div>
                )}
              </div>
              {pageData?.length>0 && (
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
    )
}
export default Investors;