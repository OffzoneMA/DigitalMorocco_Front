import { Text } from "../../Components/Text";
import React , {useEffect} from "react";
import PageHeader from "../../Components/common/PageHeader";
import SearchInput from "../../Components/common/SeachInput";
import { useGetNotificationSummaryQuery , useMarkNotificationsAsReadMutation} from "../../Services/Notification.Service";
import Loader from "../../Components/Loader";
import { formatDate } from "../../data/helper";
import { useTranslation } from "react-i18next";

const Notifications = () => {
  const {t} = useTranslation();
  const { data: notifications, error, isLoading , refetch } = useGetNotificationSummaryQuery();
  const [markNotificationsAsRead] = useMarkNotificationsAsReadMutation();

const NotificationsData = notifications?.notifications;

useEffect(() => {
  if (NotificationsData?.length > 0) {
    const unreadNotifications = NotificationsData?.filter(notification => !notification?.read);

    if (unreadNotifications.length > 0) {
      const timer = setTimeout(() => {
        const notificationIds = unreadNotifications.map(notification => notification?._id); 
        markNotificationsAsRead(notificationIds);
        refetch();
      }, 5000); // 5 secondes
            
      return () => clearTimeout(timer); // Nettoyer le timer si le composant est démonté
    }
  }
}, [notifications?.notifications, markNotificationsAsRead]);


    return (
        <div className="bg-white-A700 flex flex-col gap-8 h-full min-h-screen overflow-auto items-start justify-start pb-14 pt-8 rounded-tl-[40px] w-full">
            <div className="flex flex-col items-start justify-start sm:px-5 px-8 w-full">
              <div className="border-b border-gray-201 border-solid flex flex-col md:flex-row gap-5 items-start justify-start pb-6 w-full">
                <div className="flex flex-1 flex-col font-DmSans h-full items-start justify-start w-full">
                  <PageHeader
                    >
                    Notification
                  </PageHeader>
                </div>
                <SearchInput className={'w-[240px]'}/>
              </div>
              <div className="flex flex-col items-start justify-start w-full pb-6">
              {NotificationsData?.length > 0 ? 
                (NotificationsData.map((item, index) => (
                    <div key={index} className="flex flex-col gap-1 py-4  w-full border-b border-gray-201">
                        <Text
                            className={`${item?.read  ? 'text-[#667084] font-dm-sans-medium' : 'text-gray-801 font-dm-sans-bold'} text-sm leading-6`}
                        >
                            {t(item?.message)}{` `} <span className="text-blue-501 capitalize">{item?.referenceName}</span>{` `}{t(item.message2)} <span className="text-blue-501 capitalize">{item?.referenceName2}</span>
                        </Text>
                        <Text
                          className={`text-blue_gray-301 text-left text-sm font-normal leading-6 `}
                        >
                          {formatDate(item?.createdAt)}
                        </Text>
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
                      className="font-dm-sans-regular text-sm leading-6 text-gray700 text-center w-auto"
                      size=""
                    >
                      {t("It looks like you haven't taken any actions yet.")} <br/> {t("Your activity history will appear here, showcasing")} <br/>{t("your interactions and key moments.")}
                    </Text>
                </div>)} 
              </div>
            </div>
        </div>
    )
}

export default Notifications;