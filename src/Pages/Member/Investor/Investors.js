import React, { useState, useEffect , useRef , useCallback } from "react";
import { useSelector } from "react-redux";
import{ Text } from "../../../Components/Text";
import { BiFilterAlt } from "react-icons/bi";
import { useSearchParams , useNavigate , useLocation} from "react-router-dom";
import { BsEyeSlash } from "react-icons/bs";
import { TiFlashOutline } from "react-icons/ti";
import TablePagination from "../../../Components/common/TablePagination";
import SimpleSelect from "../../../Components/common/SimpleSelect";
import MultipleSelect from "../../../Components/common/MultipleSelect";
import { Country } from "country-state-city";
import { InvestorsData } from "../../../data/tablesData";
import PageHeader from "../../../Components/common/PageHeader";
import TableTitle from "../../../Components/common/TableTitle";
import SearchInput from "../../../Components/common/SeachInput";
import Loader from "../../../Components/Loader";
import { useGetDistinctValuesQuery , useGetInvestorsListForMemberQuery} from "../../../Services/Investor.Service";
import userdefaultProfile from '../../../Media/User.png';
import { useCheckSubscriptionStatusQuery } from "../../../Services/Subscription.Service";
import { useTranslation } from "react-i18next";
import { useGetUserDetailsQuery } from "../../../Services/Auth";
import CommonModal from "../../../Components/common/CommonModal";
import HelmetWrapper from "../../../Components/common/HelmetWrapper";

const Investors = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const locationP = useLocation();
  const { userInfo } = useSelector((state) => state.auth) 
  const {data: userDetails , error: userDetailsError , isLoading: userDetailsLoading , refetch : refetchUser} = useGetUserDetailsQuery();
  const [showPopup, setShowPopup] = useState(false);
  const [showDraftPopup, setShowDraftPopup] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showContactPopup, setShowContactPopup] = useState(false);
  const [selectedInvestor , setSelectedInvestor] = useState(null);
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
  const pageFromUrl = parseInt(searchParams.get('page')) || 1;
  const itemsPerPage = 8;
  const itemsToShow = 4;
  const [totalPages , setTotalPages] = useState(0);
  const [investors, setInvestors] = useState(null);
  const [localInvestmentType, setLocalInvestmentType] = useState([]);
  const [localLocation, setLocalLocation] = useState('');
  const [localIndustries, setLocalIndustries] = useState([]);
  const [localKeywords, setLocalKeywords] = useState('');
  const queryParams = { page: cur, pageSize: itemsPerPage };

    if (filterApply) {
      queryParams.type = investmentType.length > 0 ? investmentType.join(',') : undefined;
      queryParams.location = location || undefined;
      queryParams.industries = industries.length > 0 ? industries.join(',') : undefined;
      queryParams.keywords = keywords || undefined;
    }
  const { data: investorData, error: investorsError, isFetching: loading , refetch } = useGetInvestorsListForMemberQuery(queryParams);
  const { data : locationData, isLoading:locationLoading } = useGetDistinctValuesQuery('location');
  const { data : industryData, isLoading:industryLoading } = useGetDistinctValuesQuery('PreferredInvestmentIndustry');
  const { data : typeData, isLoading:typeLoading } = useGetDistinctValuesQuery('type');

  const { data: subscriptionData, error: subscriptionError , isFetching: subscriptionLoading } = useCheckSubscriptionStatusQuery();

  useEffect(() => {
    if (userDetails && userDetails?.projectCount === 0) {
        setShowPopup(true);
    }
}, [userDetails])

  useEffect(() => {
    const pageFromUrl = parseInt(searchParams.get('page')) || 1;
    setCur(pageFromUrl);
  }, [searchParams]);

  useEffect(() => {
    if (investorData) {
      setInvestors(investorData.investors);
      setTotalPages(investorData.totalPages);
      setCur(investorData?.currentPage); 
      setSearchParams({ page: `${investorData?.currentPage}` }); 
    }
  }, [investorData]);
  
  // useEffect(() => {
  //   // Check if investor data is loaded and subscription status is available
  //   if (investorData && investors?.length > 0 && subscriptionData && !subscriptionLoading && !loading && !userDetailsLoading) {
  //     const hasDraftRequest = investorData?.hasDraftRequest;
  //     const isSubscribed = subscriptionData !== null && subscriptionData !== undefined; 

  //     // Show popup if there is a draft request and the user is subscribed
  //     if (hasDraftRequest && isSubscribed) {
  //       setShowDraftPopup(true);
  //     }
  //   }
  // }, [investorData, subscriptionData , loading , subscriptionLoading , userDetailsLoading]);

  const hasClosedPopupRef = useRef(false);
  const hasCheckedNavigationRef = useRef(false);

  const checkDisplayConditions = useCallback(() => {
    return (
      investorData &&
      investors?.length > 0 &&
      subscriptionData &&
      !subscriptionLoading &&
      !loading &&
      !userDetailsLoading &&
      investorData?.hasDraftRequest &&
      (subscriptionData !== null && subscriptionData !== undefined)
    );
  }, [
    investorData,
    investors,
    subscriptionData,
    subscriptionLoading,
    loading,
    userDetailsLoading
  ]);

  // Et ton useEffect qui gère le popup reste tel quel dans Investors.js
  useEffect(() => {
    const previousPath = sessionStorage.getItem('previousPageVisited');
    const cameFromDetails = previousPath?.includes('InvestorDetails');
    
    if (checkDisplayConditions() && !hasClosedPopupRef.current && !cameFromDetails) {
      setShowDraftPopup(true);
    }
  }, [checkDisplayConditions]);

  useEffect(() => {
    // if(filterApply && investorData?.currentPage !== cur) {
      refetch();
    // }
  }, [cur, investorData?.currentPage , filterApply , refetch]);

  const checkDisplaySoonConditions = useCallback(() => {
    return (
      investorData &&
      investors?.length > 0 &&
      subscriptionData &&
      !subscriptionLoading &&
      !loading &&
      !userDetailsLoading &&
      (subscriptionData !== null && subscriptionData !== undefined)
    );
  }, [
    investorData,
    investors,
    subscriptionData,
    subscriptionLoading,
    loading,
    userDetailsLoading
  ]);

  useEffect(() => {
    if (checkDisplaySoonConditions()) {
      setIsModalOpen(true);
    }
  }, [checkDisplaySoonConditions]);

  useEffect(() => {
    if (subscriptionData !== undefined) {
      setIsSubscribe(subscriptionData !== null);
    }
  }, [subscriptionData]);

  const handleResetFilters = () => {
    // Réinitialiser les filtres locaux
    setLocalInvestmentType([]);
    setLocalLocation('');
    setLocalIndustries([]);
    setLocalKeywords('');
    
    // Réinitialiser les filtres globaux
    setInvestmentType([]);
    setLocation('');
    setIndustries([]);
    setKeywords('');
    setFilterApply(false);
    
    // Optionnel : forcer un refetch des données
    refetch();
  };

  useEffect(() => {
    if (filterApply) {
      const isAllFiltersEmpty =
        localInvestmentType.length === 0 &&
        !localLocation?.trim() &&
        localIndustries?.length === 0 &&
        !localKeywords?.trim();
  
      if (isAllFiltersEmpty) {
        handleResetFilters();
      }
    }
  }, [localInvestmentType , localLocation , localIndustries , localKeywords , filterApply]);

  const data = (isSubscribe && !loading && !subscriptionLoading && !userDetailsLoading && userDetails?.projectCount !== 0) ?  investors : InvestorsData;

  const filteredData = (isSubscribe && (!loading && !subscriptionLoading && !userDetailsLoading && filterApply))
    ? data?.filter(item => {
        // Si pas de mot-clé de recherche, retourner tous les résultats
        if (!keywords?.trim()) return true;

        // Normaliser le mot-clé de recherche
        const normalizedKeyword = keywords
          .toLowerCase()
          .normalize("NFD")
          .replace(/\p{Diacritic}/gu, "")
          .trim();

        // Vérifier si l'item correspond au nom
        if (item?.name) {
          const normalizedName = item.name
            .toLowerCase()
            .normalize("NFD")
            .replace(/\p{Diacritic}/gu, "");
          if (normalizedName.includes(normalizedKeyword)) return true;
        }

        // Vérifier si l'item correspond au type d'investisseur
        if (item?.type) {
          const translatedType = t(`${item.type}`); 
          const normalizedType = translatedType
            .toLowerCase()
            .normalize("NFD")
            .replace(/\p{Diacritic}/gu, "");
          if (normalizedType.includes(normalizedKeyword)) return true;
        }

        // Vérifier si l'item correspond à la localisation
        if (item?.location) {
          const translatedLocation = t(`${item.location}`);
          const normalizedLocation = translatedLocation
            .toLowerCase()
            .normalize("NFD")
            .replace(/\p{Diacritic}/gu, "");
          if (normalizedLocation.includes(normalizedKeyword)) return true;
        }

        // Vérifier si l'item correspond à un élément de PreferredInvestmentIndustry
        if (Array.isArray(item?.PreferredInvestmentIndustry)) { // Vérification si c'est un tableau
          const industriesMatch = item.PreferredInvestmentIndustry.some(industry => {
            const translatedIndustry = t(industry);
            const normalizedIndustry = translatedIndustry
              .toLowerCase()
              .normalize("NFD")
              .replace(/\p{Diacritic}/gu, "");
            return normalizedIndustry.includes(normalizedKeyword);
          });
          if (industriesMatch) return true;
        }

        // Vérifier si le mot-clé correspond au Nombre d'investissements
        if (item?.numberOfInvestment && !isNaN(Number(normalizedKeyword))) {
          if (item.numberOfInvestment === Number(normalizedKeyword)) return true;
        }

        // Vérifier si le mot-clé correspond au Nombre de sorties
        if (item?.numberOfExits && !isNaN(Number(normalizedKeyword))) {
          if (item.numberOfExits === Number(normalizedKeyword)) return true;
        }

        return false; // Si aucune des conditions n'est remplie, exclure l'item
      })
    : data;

  // Fonction pour appliquer les filtres
  const handleApplyFilters = () => {
    setInvestmentType(localInvestmentType);
    setLocation(localLocation);
    setIndustries(localIndustries);
    setKeywords(localKeywords);
    setFilterApply(true);
  };

  // Fonction pour supprimer les filtres
  const clearFilter = () => {
    setFilter(false); 
    setFilterApply(false);
    setIndustries([]);
    setInvestmentType([]);
    setLocation('');
    setKeywords('');

    setLocalInvestmentType([]);
    setLocalLocation('');
    setLocalIndustries([]);
    setLocalKeywords('');
  }

  // const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const pageData = filteredData;

  function handlePageChange(page) {
    if (page >= 1 && page <= totalPages) {
      setCur(page);
    }
  }

  const handleInvestorClick = (investor) => {
    setSelectedInvestor(investor);
    
    if (investor.hasDraftContactRequest) {
      setShowContactPopup(true);
    }
    navigate(`/InvestorDetails/${investor?._id}`, { state: {investor: investor}});
  };

  const closeContactPopup = () => {
    setShowContactPopup(false);
  }

  const closePopup = () => {
    setShowPopup(false)
  }

  const closeDraftPopup = () => {
    setShowDraftPopup(false)
    hasClosedPopupRef.current = true;  
  }

    return (
    <>
    <HelmetWrapper
      title={t('helmet.investors.list.title')}
      description={t('helmet.investors.list.description')}
      keywords={t('helmet.investors.list.keywords')}
      canonical={`${process.env.REACT_APP_URL}/Investors`}
    />
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
                  {t('investors.title')}
                </TableTitle>
                <div className="md:flex md:flex-1 md:flex-wrap md:flex-row grid grid-cols-2 grid-flow-row auto-cols-min gap-3 w-auto items-center md:justify-end md:ml-auto w-auto">
                  {filter && 
                (
                    <>
                    {/* <div className="flex min-w-[70px]">
                      <input
                        className={`!placeholder:text-blue_gray-301 !text-gray700 font-manrope text-left text-sm tracking-[0.14px] rounded-[6px] px-[12px] py-[10px] h-[40px] border border-[#D0D5DD] focus:border-focusColor focus:shadow-inputBs w-full`}
                        type="text"
                        name="search"
                        placeholder={t("common.keywords")}
                        value={localKeywords}
                        onChange={e => setLocalKeywords(e.target.value)}
                      />
                    </div> */}
                    <MultipleSelect className="min-w-[170px] max-w-[250px]" id='investor' options={typeData}  searchLabel={t('common.searchType')} setSelectedOptionVal={setLocalInvestmentType} 
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
                    <SimpleSelect className="min-w-[100px] max-w-[220px] " id='country' options={locationData}  searchLabel={t('common.searchLocation')} setSelectedOptionVal={setLocalLocation} 
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
                    <MultipleSelect className="min-w-[170px] max-w-[300px]" id='investor' options={industryData}  searchLabel={t('common.searchIndustry')} setSelectedOptionVal={setLocalIndustries} 
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
                  onClick={() => handleApplyFilters()}
                  type="button"
              >
                  <BiFilterAlt size={21} className="mr-2" />
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
                  disabled={pageData?.length === 0 || !isSubscribe}
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
                      onClick={() => {
                        setFilter(false);
                        handleResetFilters();
                      }}
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
               <div className={`bg-white-A700 flex flex-col md:gap-5 flex-1 items-start justify-start ${(pageData?.length > 0 && !(loading || subscriptionLoading || userDetailsLoading)) ? 'border-b border-gray-201' : 'rounded-b-[8px]'} w-full pb-4 min-h-[330px] overflow-x-auto`} 
                style={{
                  scrollbarWidth: 'none', 
                  msOverflowStyle: 'none',
                }}>
                <table className=" w-full">
                  <thead>
                  <tr className="bg-white-A700 text-sm leading-[26px] font-DmSans font-medium h-[44px]">
                    <th scope="col" className="px-[18px] py-3 text-left text-[#344054] font-DmSans font-medium">{t('investors.investorName')}</th>
                    <th scope="col" className="px-[18px] py-3 text-left text-[#344054] font-DmSans font-medium">{t('investors.type')}</th>
                    <th scope="col" className="px-[18px] py-3 text-center text-[#344054] font-DmSans font-medium">{t('investors.numberOfInvestments')}</th>
                    <th scope="col" className="px-[18px] py-3 text-center text-[#344054] font-DmSans font-medium">{t('investors.numberOfExits')}</th>
                    <th scope="col" className="px-[18px] py-3 text-left text-[#344054] font-DmSans font-medium">{t('investors.location')}</th>
                    <th scope="col" className="px-[18px] py-3 text-left text-[#344054] font-DmSans font-medium">{t('investors.preferredInvestmentIndustry')}</th>
                  </tr>
                  </thead>
                  {(!loading && !subscriptionLoading && pageData?.length > 0 && !userDetailsLoading) ? 
                  <tbody className="items-center w-full ">
                  {pageData.map((item, index) => (
                    <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-50' : ''} hover:bg-blue-50 cursorpointer w-full`} onClick={()=> handleInvestorClick(item)}>
                    <td className="w-auto text-gray-900_01 font-dm-sans-regular text-sm leading-6">
                        <div className="relative flex">
                          <div className="px-[18px] py-4 flex items-center gap-3" >
                            {item?.image ? (
                              <img src={item.image} className="rounded-full h-8 w-8"  />
                            ) : (
                              <div className="flex items-center justify-center rounded-full h-9 w-9 bg-[#EDF7FF] p-2">
                                <img src={userdefaultProfile} alt="" className="" />
                              </div>
                            )}
                              <span className="capitalize" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                              {( !item?.hasAcceptedContactRequest) ? 'Digital Morocco Partner' : item?.name}
                              </span>
                          </div>
                          {(!item?.hasAcceptedContactRequest) && (
                            <div className="overlay-content-invPro w-full flex">
                            </div>
                          )}
                        </div>
                    </td>
                      <td className="px-[18px] py-4 text-gray500 font-DmSans text-left text-sm font-normal leading-6" 
                      style={{ whiteSpace: 'nowrap' }}>{t(`${item.type}`)}</td>
                      <td className="px-[18px] py-4 text-center text-gray500 font-dm-sans-regular text-sm leading-6">{item.numberOfInvestment}</td>
                      <td className="px-[18px] py-4 text-center text-gray500 font-dm-sans-regular text-sm leading-6">{item.numberOfExits}</td>
                      <td className="px-[18px] py-4 text-gray500 font-dm-sans-regular text-sm leading-6" 
                      style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{t(`${item.location}`)}</td>
                      <td className="px-[18px] py-4 text-gray500 font-dm-sans-regular text-sm leading-6 max-w-[230px] lg:max-w-[250px]"
                        style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {Array.isArray(item?.PreferredInvestmentIndustry)
                          ? item.PreferredInvestmentIndustry
                              .map(industry => t(industry)) // Traduire chaque élément
                              .join(', ')
                          : ''
                        }
                        </td>

                    </tr>
                  ))
                  }
                </tbody>
                :
                null}
                </table>
                { (loading || subscriptionLoading || userDetailsLoading) ? (
                  <div className="flex flex-col items-center text-blue_gray-800_01 gap-[16px] min-h-[330px] w-full py-28 rounded-b-[8px]">
                     <Loader />
                 </div> ) : 
                 (pageData?.length === 0 && !loading && !subscriptionLoading && !userDetailsLoading ) && (
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
                {(!loading && !subscriptionLoading && !userDetailsLoading) && (
                  (isSubscribe && userDetails?.projectCount === 0) || 
                  (!isSubscribe) ? (
                    <div className="overlay-content-inv w-full flex flex-col top-12 px-8 ">
                      <BsEyeSlash size={35} className="text-gray500 "/>
                      <Text
                        className="font-dm-sans-medium text-[22px] leading-8 text-gray-900_01 w-auto pt-4"
                        size=""
                      >
                        {t('investors.viewAllInvestors', { count: (261765).toLocaleString('fr-FR').replace(/\s/g, '\u00A0') })} 
                      </Text>
                      <Text
                        className="font-dm-sans-medium text-sm leading-[26px] text-gray-900_01 w-auto pt-3 pb-8"
                        size=""
                      >
                        {t('investors.upgradeMessage')} <a className="text-blue-500" href="/src/Pages/common/Subscription/ChoosePlan">{t('investors.digitalMoroccoPro1')}</a> {t('investors.upgradeMessage2')}
                      </Text>
                      <Text
                        className="text-[#f04437]/60 text-sm font-semibold font-DMSans leading-relaxed pb-8"
                        size=""
                      >
                        {t('investors.notice')}
                      </Text>
                      <button
                        className="flex items-center justify-center gap-[12px] bg-blue-A400 hover:bg-[#235DBD] active:bg-[#224a94] text-white-A700 flex flex-row items-center px-[12px] py-[8px] h-[37px] rounded-md cursorpointer"
                        onClick={() => navigate('/ChoosePlan')}
                        type="button"
                      >
                        <TiFlashOutline size={25} className="" />
                        <span className="text-sm font-dm-sans-medium leading-[18.23px] text-white-A700">{t("dashboard.upgradeMembership")}</span>
                      </button>
                    </div>
                  ) : null
                )}
               </div>
              {(pageData?.length>0 && !loading && !subscriptionLoading && !userDetailsLoading) && (
                <div className='w-full flex items-center p-4'>
                <TablePagination
                  totalPages={totalPages}
                  // onPageChange={handlePageChange}
                  itemsToShow={itemsToShow}
                />              
              </div>
              )}
              </div>
            </div>
          </div>
        </div>
    </div>
    {/* <CommonModal isOpen={showPopup}
      title={t('Action Required: Create Project')}
      content={
        <div className="flex flex-col gap-5 items-center justify-start py-5 w-full">
          <div className="self-stretch text-center text-[#1d1c21] text-base font-dm-sans-regular leading-relaxed">
          {t("To gain access to the list of investors, please add a project by clicking the button below or by navigating to the 'Projects' tab.")}</div>
          <div className="self-stretch justify-center items-center pt-4 gap-[18px] inline-flex">
              <button className="px-5 h-11 py-[12px] bg-[#e4e6eb] rounded-md justify-center items-center gap-[18px] flex cursorpointer hover:bg-[#D0D5DD] active:bg-light_blue-100" 
              onClick={() => navigate("/Dashboard")}>
                <div className="text-[#475466] text-base font-dm-sans-medium">{t('Back to Dashboard')}</div>
              </button>
              <button className="h-11 px-5 py-[12px] bg-[#2575f0] rounded-md justify-center items-center gap-[18px] flex cursorpointer hover:bg-[#235DBD] active:bg-[#224a94]" 
              onClick={() => navigate("/CreateProject")}>
                <div className="text-white-A700 text-base font-dm-sans-medium">{t('Create Project')}</div>
              </button>
          </div>
        </div>
      }/> */}
    {/* <CommonModal isOpen={showDraftPopup}
      onRequestClose={closeDraftPopup} title={t('Action Required: Contact Request')}
      content={
        <div className="flex flex-col gap-5 items-center justify-start py-5 w-full">
          <div className="self-stretch flex flex-col text-center text-[#1d1c21] text-base font-dm-sans-regular leading-relaxed">
          {t("You already have a contact request in progress.")} 
          <span className="pt-2" >{t('Would you like to validate it?')}</span>
          </div>
          <div className="self-stretch justify-center items-center pt-4 gap-[18px] inline-flex">
              <button className="px-5 h-11 py-[12px] bg-[#e4e6eb] rounded-md justify-center items-center gap-[18px] flex cursorpointer hover:bg-[#D0D5DD] active:bg-light_blue-100" 
              onClick={() => setShowDraftPopup(false)}>
                <div className="text-[#475466] text-base font-dm-sans-medium">{t('Continue Navigation')}</div>
              </button>
              <button className="h-11 px-5 py-[12px] bg-[#2575f0] rounded-md justify-center items-center gap-[18px] flex cursorpointer hover:bg-[#235DBD] active:bg-[#224a94]" 
              onClick={() => navigate(`/InvestorDetails/${investorData?.mostRecentDraftInvestorId}` , { state: {investor: selectedInvestor}})}>
                <div className="text-white-A700 text-base font-dm-sans-medium">{t('Go to Contact Request')}</div>
              </button>
          </div>
        </div>
      }/> */}
    {/* <CommonModal isOpen={showContactPopup}
      onRequestClose={closeContactPopup} title={t('Action Required: Contact Request')}
      content={
        <div className="flex flex-col gap-5 items-center justify-start py-5 w-full">
          <div className="self-stretch flex flex-col text-center text-[#1d1c21] text-base font-dm-sans-regular leading-relaxed">
          {t("You already have a contact request in progress with this investor.")} 
          <span className="pt-2" >{t('Would you like to validate it?')}</span>
          </div>
          <div className="self-stretch justify-center items-center pt-4 gap-[18px] inline-flex">
              <button className="px-5 h-11 py-[12px] bg-[#e4e6eb] rounded-md justify-center items-center gap-[18px] flex cursorpointer hover:bg-[#D0D5DD] active:bg-light_blue-100" 
              onClick={() => setShowContactPopup(false)}>
                <div className="text-[#475466] text-base font-dm-sans-medium">{t('Continue Navigation')}</div>
              </button>
              <button className="h-11 px-5 py-[12px] bg-[#2575f0] rounded-md justify-center items-center gap-[18px] flex cursorpointer hover:bg-[#235DBD] active:bg-[#224a94]" 
              onClick={() => navigate(`/InvestorDetails/${selectedInvestor?._id}` , { state: {investor: selectedInvestor}})}>
                <div className="text-white-A700 text-base font-dm-sans-medium">{t('Go to Contact Request')}</div>
              </button>
          </div>
        </div>
      }/> */}
      <CommonModal isOpen={isModalOpen}
        onRequestClose={''} title={t('Information: Feature Unavailable')} showCloseBtn = {true}
        content={
          <div className="flex flex-col gap-5 items-center justify-start py-5 w-full">
            <div className="text-center">
              <span className="text-[#1d1c21] text-base font-dm-sans-regular leading-relaxed">{t("This feature")}</span><span className="text-[#2575f0] text-base font-dm-sans-regular leading-relaxed"> {t('is not yet available.')}</span>
              <br/>
              <span className="leading-[3rem]"></span>
              <span className="text-[#1d1c21] text-base font-dm-sans-regular leading-relaxed">{t("Please check back later for updates!")}</span>
            </div>
            <div className="self-stretch justify-center items-center pt-4 gap-[18px] inline-flex">
            <button className="w-[195px] h-11 px-5 py-[18px] bg-[#2575f0] rounded-md justify-center items-center gap-[18px] inline-flex cursorpointer hover:bg-[#235DBD] active:bg-[#235DBD]}"
                onClick={() => navigate('/Dashboard')}>
                    <div className="text-white-A700 text-base font-dm-sans-medium">{t('Ok')}</div>
                </button>
            </div>
          </div>
        }/>
    </>
    )
}
export default Investors;