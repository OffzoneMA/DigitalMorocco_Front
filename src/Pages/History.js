import { Text } from "../Components/Text";
import { historyData } from "../data/tablesData";
import PageHeader from "../Components/PageHeader";
import SearchInput from "../Components/SeachInput";
import lineImage from '../Media/img_line.svg';


const History = () => {
  const HistoryData = historyData;

    return (
        <div className="bg-white-A700 flex flex-col gap-8 h-full min-h-screen items-start justify-start pb-8 pt-8 rounded-tl-[40px]  w-full">
            <div className="flex flex-col items-start justify-start sm:px-5 px-8 w-full">
              <div className="border-b border-indigo-50 border-solid flex flex-col md:flex-row gap-5 items-start justify-start pb-6 w-full">
                <div className="flex flex-1 flex-col font-DmSans h-full items-start justify-start w-full">
                  <PageHeader
                    >
                    History
                  </PageHeader>
                </div>
                <SearchInput className={'min-w-[25%]'}/>
              </div>
              <div className="flex flex-col items-start justify-start w-full py-6">
              {HistoryData?.length > 0 ? 
                (HistoryData.map((item, index) => (
                    <div key={index} className="flex flex-row gap-4 md:h-auto w-full">
                      <div className="flex flex-col items-start w-[100px] pt-1 ">
                        <Text
                          className={`text-gray500 text-right text-sm font-normal leading-6 `}
                        >
                          {item.date}
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
                              className={`font-DmSans text-sm font-normal leading-6 text-gray700`}
                            >
                              {item.action}{` `} <span className="text-blue-501">{item.actionTitle}</span>{` `}{item.actionTitle2? item.actionTitle2:""}
                            </Text>
                            <div className="flex flex-row w-full items-center gap-4">
                                <img
                                className="h-8 w-8 rounded-full"
                                src={item.image}
                                alt="line"
                              />
                              <Text
                                className={`font-DmSans text-sm font-normal leading-6 text-gray500`}
                              >
                                {item.name}
                              </Text>
                            </div>
                          </div>
                      </div>
                    </div>
                ))
                )
                :
                <div className="flex flex-col items-center h-screen w-full py-28 gap-3">
                    {/* <PiClockClockwise  size={40} className="transform  scale-y-[-1] text-gray500" /> */}
                    <img
                      src={`images/img_clock_rewind.svg`}
                      alt="img"
                    />
                    <Text
                      className="font-DmSans text-sm font-normal leading-6 text-gray700 text-center w-auto py-4"
                      size=""
                    >
                      It looks like you haven't taken any actions yet. <br/> Your activity history will appear here, showcasing <br/>your interactions and key moments.
                    </Text>
                </div>
              }      
              </div>
            </div>
        </div>
    )
}

export default History;