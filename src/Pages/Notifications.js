import { Text } from "../Components/Text";
import { PiClockClockwise } from "react-icons/pi";
import { historyData } from "../data/tablesData";

const Notifications = () => {
  const NotificationsData = historyData;

    return (
        <div className="bg-white-A700 flex flex-col gap-8 h-full min-h-screen items-start justify-start pb-8 pt-8 rounded-tl-[40px]  w-full">
            <div className="flex flex-col items-start justify-start sm:px-5 px-8 w-full">
              <div className="border-b border-indigo-50 border-solid flex flex-col md:flex-row gap-5 items-start justify-start pb-6 w-full">
                <div className="flex flex-1 flex-col font-dmsans h-full items-start justify-start w-full">
                  <Text
                    className="text-3xl font-bold leading-11 text-gray-900 w-full"
                    size="txtDmSansBold32"
                  >
                    Notification
                  </Text>
                </div>
                <div className="flex md:w-[25%] w-full rounded-md p-2 border border-solid">
                  <img
                    className="cursor-pointer h-[18px] mr-1.5 my-px"
                    src="images/img_search_blue_gray_700_01.svg"
                    alt="search"
                  />
                  <input
                    className={`!placeholder:text-blue_gray-300 !text-blue_gray-300 font-manrope p-0 text-left text-sm tracking-[0.14px] w-full bg-transparent border-0`}
                    type="text"
                    name="search"
                    placeholder="Search..."
                  />
                </div>
              </div>
              <div className="flex flex-col items-start justify-start w-full pb-6">
              {NotificationsData?.length > 0 ? 
                (NotificationsData.map((item, index) => (
                    <div key={index} className="flex flex-col gap-1 py-4  w-full border-b border-gray-201">
                        <Text
                            className={`font-DmSans text-sm font-bold leading-6 text-gray-801`}
                        >
                            {item.action}{` `} <span className="text-blue-501">{item.actionTitle}</span>{` `}{item.actionTitle2? item.actionTitle2:""}
                        </Text>
                        <Text
                          className={`text-blue_gray-301 text-left text-sm font-normal leading-6 `}
                        >
                          {item.date}
                        </Text>
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
                      It looks like you haven't received any notifications yet. <br/> Your activity history will appear here, showcasing <br/>your interactions and key moments.
                    </Text>
                </div>
              }      
              </div>
            </div>
        </div>
    )
}

export default Notifications;