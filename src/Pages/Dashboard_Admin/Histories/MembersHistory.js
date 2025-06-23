import React, { useState  , useEffect} from "react";
import { Text } from "../../../Components/Text";
import PageHeader from "../../../Components/common/PageHeader";
import SearchInput from "../../../Components/common/SeachInput";
import lineImage from '../../../Media/img_line.svg';
import { useGetMemberActivityHistoriesQuery , useGetHistoryUsersQuery } from "../../../Services/Histoty.Service";
import Loader from "../../../Components/Loader";
import userdefaultProfile from '../../../Media/User.png';
import { useTranslation } from "react-i18next";
import CustomCalendar from "../../../Components/common/CustomCalendar";
import MultipleSelect from "../../../Components/common/MultipleSelect";
import { BiFilterAlt } from "react-icons/bi";
import { parseDateStringValue } from "../../../data/helper";
import HelmetWrapper from "../../../Components/common/HelmetWrapper";
import { Trans } from "react-i18next";

const MembersHistory = () => {
    const { t } = useTranslation();
    const { data: users, isLoading: isLoadingUsers } = useGetHistoryUsersQuery('member');
    const [filter , setFilter] = useState(false);
    const [filterApply , setFilterApply] = useState(false);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [localSelectedUsers, setLocalSelectedUsers] = useState([]);
    const [localSelectedDate, setLocalSelectedDate] = useState('');
    const queryParams = {};

    if (filterApply) {
      queryParams.date = selectedDate?.trim() ? parseDateStringValue(selectedDate) : null;
      queryParams.userIds = selectedUsers?.map((user) => user._id);
    }
    const { data, error, isFetching: isLoading , refetch } = useGetMemberActivityHistoriesQuery(queryParams);

    const HistoryData = data;

    const currentLanguage = localStorage.getItem('language') || 'en'; 

    function formatTimestamp(timestamp) {
        const date = new Date(timestamp);
        const options = {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            hour12: currentLanguage === 'en' // 12-hour format for English, 24-hour for French
        };

        const locale = currentLanguage === 'fr' ? 'fr-FR' : 'en-US';

        // Format and capitalize the month for French
        let formattedDate = date.toLocaleString(locale, options);
        if (currentLanguage === 'fr') {
        // Extracting day, month, and year by splitting
        const [day, month, year, time] = formattedDate.split(/,?\s+/);
        const capitalizedMonth = month.charAt(0).toUpperCase() + month.slice(1);

        // Reassemble with the capitalized month
        formattedDate = `${day} ${capitalizedMonth} ${year}, ${time}`;
        }

        return formattedDate?.replace('.' , '');
    }

    useEffect(() => {
        refetch();
    }, [filterApply , refetch]);
    

    const handleResetFilters = () => {
        // Réinitialiser les filtres locaux
        setLocalSelectedUsers([]);
        setLocalSelectedDate('');
        
        // Réinitialiser les filtres globaux
        setSelectedUsers([]);
        setSelectedDate('');
        setFilterApply(false);
        
        // Optionnel : forcer un refetch des données
        refetch();
      };

    useEffect(() => {
    if (filterApply) {
      const isAllFiltersEmpty =
        localSelectedUsers?.length === 0 &&
        !localSelectedDate?.trim() 
  
      if (isAllFiltersEmpty) {
        handleResetFilters();
      }
    }
    }, [localSelectedDate , localSelectedUsers , filterApply]);

    const handleApplyFilters = () => {
        setSelectedUsers(localSelectedUsers);
        setSelectedDate(localSelectedDate);
        setFilterApply(true);
      };

      console.log(filterApply)

    return (
      <>
        <HelmetWrapper
          title={t('helmet.adminHistory.members.title')}
          description={t('helmet.adminHistory.members.description')}
          keywords={t('helmet.adminHistory.members.keywords')}
          canonical={`${process.env.REACT_APP_URL}/MembersHistory`}
        />
        <section className="bg-white-A700 flex flex-col gap-8 h-full min-h-screen overflow-auto items-start justify-start pb-14 pt-8 rounded-tl-[40px] w-full">
            <div className="flex flex-col items-start justify-start sm:px-5 px-8 w-full">
              <div className="border-b border-gray-201 border-solid flex flex-col md:flex-row gap-5 items-start justify-start pb-6 w-full">
                <div className="flex flex-1 flex-col font-DmSans h-full items-start justify-start w-full">
                  <PageHeader
                    >
                    {t("sidebar.adminHistory.main")}
                  </PageHeader>
                </div>
                <SearchInput className={'w-[240px]'}/>
              </div>
              <div className="flex flex-col items-start justify-start w-full py-6">
                <div className="flex flex-col items-start gap-5 w-full">
                  <div className="flex flex-1flex-wrap flex-row grid-flow-row auto-cols-min gap-3 items-center justify-end ml-auto w-auto">
                    {filter && 
                    (<>
                    <CustomCalendar
                        className={'min-w-[150px]'} 
                        inputPlaceholder={'Date'} 
                        showIcon={false}
                        onChangeDate={(date) => setLocalSelectedDate(date)}
                      />
                    <MultipleSelect className="min-w-[170px] max-w-[200px]" id='investor' options={users || []}  searchLabel={t('common.searchIndustry')} setSelectedOptionVal={setLocalSelectedUsers} 
                        placeholder={t('common.selectIndustries')} valuekey="name" optionkey="_id"
                        content={
                        ( option) =>{ return (
                            <div className="flex  py-2 items-center  w-full">
                                <Text
                                className="text-gray-801 text-left text-base font-dm-sans-regular leading-5 w-auto"
                                >
                                {t(`${option?.name}`)}
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
                    className={`col-end-3 ${(HistoryData?.length === 0 ) ? 'bg-[#e5e5e6] text-[#a7a6a8] cursor-not-allowed' : 'hover:bg-[#235DBD] active:bg-[#224a94] bg-blue-A400 text-white-A700'} col-span-1 font-DmSans flex flex-row items-center justify-center cursorpointer px-[12px] py-[7px] h-[37px] text-sm font-dm-sans-medium rounded-md`}
                    onClick={() => setFilter(true)}
                    type="button"
                    disabled={HistoryData?.length === 0 }
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
                        <path d="M12.75 4.75L8.25 9.25M8.25 4.75L12.75 9.25M2.04 7.72L5.28 12.04C5.544 12.392 5.676 12.568 5.84329 12.6949C5.99145 12.8074 6.15924 12.8913 6.33808 12.9423C6.54 13 6.76 13 7.2 13H12.9C14.1601 13 14.7902 13 15.2715 12.7548C15.6948 12.539 16.039 12.1948 16.2548 11.7715C16.5 11.2902 16.5 10.6601 16.5 9.4V4.6C16.5 3.33988 16.5 2.70982 16.2548 2.22852C16.039 1.80516 15.6948 1.46095 15.2715 1.24524C14.7902 1 14.1601 1 12.9 1H7.2C6.76 1 6.54 1 6.33808 1.05767C6.15924 1.10874 5.99145 1.19264 5.84329 1.30506C5.676 1.432 5.544 1.608 5.28 1.96L2.04 6.28C1.84635 6.53819 1.74953 6.66729 1.71221 6.80907C1.67926 6.93423 1.67926 7.06577 1.71221 7.19093C1.74953 7.33271 1.84635 7.46181 2.04 7.72Z" stroke="#151439" strokeOpacity="0.4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span className="text-base font-dm-sans-regular leading-[26px]">{t('common.clear')}</span>
                    </button>
                    )}
                  </div>
                  {HistoryData?.length > 0 ?
                  <div className="flex flex-col items-start w-full">
                    {HistoryData.map((item, index) => (
                        <div key={index} className="flex flex-row gap-4 md:h-auto w-full">
                            <div className="flex flex-col items-start w-[100px] pt-1 ">
                                <Text
                                className={`text-gray500 text-right text-sm font-normal leading-6 `}
                                >
                                {formatTimestamp(item.timestamp)}
                                </Text>
                            </div>
                            <div className="flex flex-1 flex-row gap-4">
                                <img
                                    className="h-full"
                                    src={lineImage}
                                    alt="line"
                                />
                                <div className="flex flex-col w-full items-start gap-4 pt-1">
                                    <Text
                                    className={`font-dm-sans-medium text-sm leading-6 text-gray700`}
                                    >
                                    {/* {historyEventMessages[item?.eventType]}{` `} 
                                    {item?.eventData?.targetName && <span className="text-blue-A400">{item?.eventType === "subscription_renew" ? "" : item?.eventData?.targetName} {` `}</span>} */}

                                    {item?.eventType !== "purchase_credits" && (
                                      <>
                                      {t(`historyEventMessages.${item?.eventType}`)} <span className="text-blue-A400">{item?.eventType === "subscription_renew" ? "" : item?.eventData?.targetName === "Standard In" ? "Standard" : item?.eventData?.targetName}</span>
                                      </>
                                    )}
                                    {item?.eventType === "purchase_credits" && (
                                      <>
                                      <Trans
                                        i18nKey={`historyEventMessages.${item?.eventType}`}
                                        values={{ number: item?.eventData?.targetName }}
                                        components={{
                                          strong: <span style={{ color: '#2575F0', fontWeight: 'normal' }} />, // ou className="text-blue-500 font-bold"
                                        }}
                                      />
                                      </>
                                    )}
                                    </Text>
                                    <div className="flex flex-row w-full items-center gap-4">
                                    {item?.user?.image ? (
                                    <img src={item?.user?.image} className="rounded-full h-8 w-8 " alt="" />
                                    ) : (
                                    <div className="flex items-center justify-center rounded-full h-9 w-9 bg-[#EDF7FF] p-2">
                                        <img src={userdefaultProfile} alt="" className="" />
                                    </div> 
                                    )}
                                    <Text
                                        className={`font-dm-sans-regular capitalize-first text-sm leading-6 text-gray500`}
                                    >
                                        {item?.user?.displayName}
                                    </Text>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                    }
                  </div>
                  :
                isLoading ? (<div className="flex flex-col items-center text-blue_gray-601 py-40 w-full h-full">
                  <Loader/>
                </div>)
                :
                (<div className="flex flex-col items-center h-screen w-full py-28 gap-[32px]">
                    {/* <PiClockClockwise  size={40} className="transform  scale-y-[-1] text-gray500" /> */}
                    <img
                      src={`images/img_clock_rewind.svg`} className="w-[30px] h-[27px]" 
                      alt="img"
                    />
                    <Text
                      className="font-dm-sans-regular  max-w-[380px] text-sm leading-6 text-gray700 text-center w-auto"
                      size=""
                    >
                      {t("history.emptyMsg")} <br/> {t('history.emptyMsg1')}
                    </Text>
                </div>)
                  }
                </div>    
              </div>
            </div>
        </section>
      </>
    );
}

export default MembersHistory;
