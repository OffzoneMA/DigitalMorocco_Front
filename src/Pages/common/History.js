import { Text } from "../../Components/Text";
import PageHeader from "../../Components/common/PageHeader";
import SearchInput from "../../Components/common/SeachInput";
import lineImage from '../../Media/img_line.svg';
import { useGetActivityHistoriesQuery } from "../../Services/Histoty.Service";
import Loader from "../../Components/Loader";
import userdefaultProfile from '../../Media/User.png';
import { useTranslation } from "react-i18next";
import HelmetWrapper from "../../Components/common/HelmetWrapper";

const History = () => {
  const { t } = useTranslation();
  const { data, error, isLoading } = useGetActivityHistoriesQuery();
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


    return (
      <>
        <HelmetWrapper
          title={t('helmet.history.title')}
          description={t('helmet.history.description')}
          keywords={t('helmet.history.keywords')}
          canonical={`${process.env.REACT_APP_URL}/History`}
        />
        <div className="bg-white-A700 flex flex-col gap-8 h-full min-h-screen overflow-auto items-start justify-start pb-14 pt-8 rounded-tl-[40px] w-full">
            <div className="flex flex-col items-start justify-start sm:px-5 px-8 w-full">
              <div className="border-b border-gray-201 border-solid flex flex-col md:flex-row gap-5 items-start justify-start pb-6 w-full">
                <div className="flex flex-1 flex-col font-DmSans h-full items-start justify-start w-full">
                  <PageHeader
                    >
                    {t("sidebar.history")}
                  </PageHeader>
                </div>
                <SearchInput className={'w-[240px]'}/>
              </div>
              <div className="flex flex-col items-start justify-start w-full py-6">
              {HistoryData?.length > 0 ? 
                (HistoryData.map((item, index) => (
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

                              {t(`historyEventMessages.${item?.eventType}`)} <span className="text-blue-A400">{item?.eventType === "subscription_renew" ? "" : item?.eventData?.targetName === "Standard In" ? "Standard" : item?.eventData?.targetName}</span>
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
                )
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
                </div>)}    
              </div>
            </div>
        </div>
      </>
    )
}

export default History;