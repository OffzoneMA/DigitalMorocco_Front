import React, { useState , useEffect} from "react";
import { useSelector } from "react-redux";
import { HiOutlineSpeakerphone } from "react-icons/hi";
import { MdOutlineDateRange } from "react-icons/md";
import { BiMap } from "react-icons/bi";
import { PiTagBold } from "react-icons/pi";
import{Text } from "../../../Components/Text";
import { IoMdTime } from "react-icons/io";
import { TbCopy } from "react-icons/tb";
import { BiMessageAltError } from "react-icons/bi";
import { BiPurchaseTagAlt } from "react-icons/bi";
import { useLocation  , useNavigate } from "react-router-dom";
import PageHeader from "../../../Components/common/PageHeader";
import SearchInput from "../../../Components/common/SeachInput";
import { format, parse } from 'date-fns';
import { fr , enUS } from 'date-fns/locale';
import { useGetEventByIdQuery } from "../../../Services/Event.Service";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AiOutlineLoading } from "react-icons/ai";
import Loader from "../../../Components/Loader";
import userDefaultProfil from '../../../Media/User1.png';
import SendSponsoringModal from "../../../Components/Modals/Sponsoring/SendSponsoringModal";
import { useTranslation } from "react-i18next";
import { formatEventStartEndDate , formatEventTime , formatPrice , formatEventDate } from "../../../data/helper";

const SponsorEventDetails = () => {
  const { t } = useTranslation();
  const currentLanguage = localStorage.getItem('language') || 'en'; 
    const userData = JSON.parse(sessionStorage.getItem("userData"));
    const location = useLocation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const past = location.state ? location.state.past : false;
    const [bying , setBying] = useState(false);
    const { id } = useParams();
    const eventFromState = location.state ? location.state.event : null;
    const navigate = useNavigate();
    const { data: eventFromApi, error, isLoading } = useGetEventByIdQuery(id, {
        skip: !!eventFromState,
    });

    const event = eventFromState || eventFromApi;

    function formatText(text) {
        const paragraphs = text.split('.').map((paragraph, index) => (
          <p key={index} className="mb-4">{paragraph.trim()}</p>
        ));
      
        return (
          <Text className=" text-base font-dm-sans-regular leading-relaxed text-left text-gray700 pl-8">
            {paragraphs}
          </Text>
        );
      }

    const descp = `Dreamin, a Salesforce conference led by the community for the community!Join us in Casablanca to boost your knowledge with international experts and meet the main Salesforce players in Morocco, Africa, and Europe, and North America.
    Dreamin, a taste of Dreamforce in the heart of Africa.
    Not able to attend Dreamforce? No problem!Thanks to North Africa Dreamin, we bring a little of the Ohana spirit to Casablanca for a whole day, This will be an opportunity for Salesforce professionals to gather and share their knowledge,You will be able to follow different sessions to train you and to stock up on knowledge: whether you are rather click or rather code, you will certainly find the theme that suits your goal.
    The North Africa Dreamin team is made up of volunteers from the Moroccan Trailblazers community whose common vision could be summed up in one word: sharing.
    Our goal is to make available to the community all the resources needed to optimally improve the skills on Salesforce technology, by mobilizing international names, Our mission is also to contribute to the expansion of this community by developing relationships between the different actors in the Salesforce ecosystem.
    And more broadly, we want to improve the awareness and adoption of Salesforce in Morocco and Africa because we are convinced of its advantages in terms of CRM, marketing tools and other innovative technologies`; 

    const sponsors = [
      {logo:"/images/spon_logo0.svg"}, 
      {logo:"/images/spon_logo1.svg"}, 
      {logo:"/images/spon_logo2.svg"}, 
      {logo:"/images/spon_logo3.svg"}, 
      {logo:"/images/spon_logo4.svg"}, 
      {logo:"/images/spon_logo5.svg"}, 
      {logo:"/images/spon_logo6.svg"}, 
      {logo:"/images/spon_logo7.svg"}, 
      {logo:"/images/spon_logo8.svg"}, 
      {logo:"/images/spon_logo9.svg"}, 
    ];

  const handleAddAttendee = async () => {
    try {
      setBying(true)
      const response = await axios.post(`${process.env.REACT_APP_baseURL}/events/${id}/attendeesuser`, {
        userId: userData?._id, 
        role: userData?.role
      });
        setBying(false);
        setTimeout(() => {
          navigate("/Participate");
        }, 2000);
    } catch (error) {
        setBying(false);
        console.log(error.response?.data?.message || 'Error adding attendee');
    }
};

const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

    return (
        <>
        <div className="bg-white-A700 flex flex-col gap-8 h-full min-h-screen overflow-auto items-start justify-start pb-14 pt-8 rounded-tl-[40px] w-full">
        {isLoading ?
            <div className="flex flex-col items-center text-blue_gray-800_01 gap-[16px] h-full w-full py-28 rounded-b-[8px]">
              <Loader />
            </div> 
            : 
            <div className="flex flex-col items-start justify-start sm:px-5 px-8 w-full">
              <div className="border-b border-gray-201 border-solid flex flex-col md:flex-row gap-5 items-start justify-start pb-6 w-full">
                <div className="flex flex-1 flex-col  h-full items-start justify-start w-full">
                  <PageHeader
                    >
                    {event?.status == 'past' ? t("event.pastEvent") : t("event.upcomingEvent")}
                  </PageHeader>
                </div>
                <SearchInput className={'w-[240px]'}/>
              </div>
              <div className="flex flex-col items-start justify-start w-full">
                  <div className="flex flex-col md:flex-row gap-3 w-full bg-white-A700 border-b border-gray-201 pt-6 pb-9">
                    <img
                      src={event?.headerImage}
                      alt="vector_three"
                      className="w-full md:h-[180px] md:w-[240px] rounded-[12px]"
                    />
                    <div className="flex flex-col gap-3 flex-1">
                        <div className="flex flex-row justify-between items-start gap-3 w-full">
                            <Text
                                className=" text-[24px] font-dm-sans-bold leading-7 text-left text-blue_gray-903 w-full"
                                >
                                { event?.title || 'Monthly #FirstFridayFair Business, Data & Technology Virtual Event'}
                            </Text>
                            <button
                            onClick={openModal}
                              className="bg-blue-A400 hover:bg-[#235DBD] active:bg-[#224a94] text-white-A700 flex flex-row h-[38px] items-center justify-center px-4 py-2 rounded-md min-w-[101px] cursorpointer"
                              type="button"
                              >
                              {bying ? <AiOutlineLoading size={22} className="animate-spin disabled !cursor-not-allowed" /> :
                              <span style={{ whiteSpace: 'nowrap' }} className="text-sm  font-dm-sans-medium leading-[18.23px]">
                              {t('Sponsorship')}
                              </span>
                              }
                            </button>
                        </div>
                      <div className="flex flex-row gap-3 items-center text-left">
                          <MdOutlineDateRange  size={18} className="text-teal-A300"/>
                          <Text
                          className="text-gray-801  text-base font-dm-sans-medium leading-6"
                          >
                          {formatEventDate(event?.startDate , event?.endDate , t)}
                          </Text>
                      </div>
                      <div className="flex flex-row gap-3 items-center  text-left">
                          <IoMdTime  size={18} className="text-teal-A300"/>
                          <Text
                          className="text-gray-801  text-base font-dm-sans-medium leading-6"
                          >
                          {formatEventTime(event?.startDate , event?.endDate , event?.startTime? event?.startTime : '', event?.endTime? event?.endTime : '')}
                          </Text>
                      </div>
                      <div className="flex flex-row gap-3 items-center text-left">
                          <BiMap  size={18} className="text-teal-A300"/>
                          <Text
                          className="text-gray-801  text-base font-dm-sans-medium leading-6"
                          >
                          {event?.physicalLocation || "Online Only"}
                          </Text>
                      </div>
                        <div className="flex flex-row gap-3 items-center  text-left">
                          <PiTagBold    size={18} className="text-teal-A300"/>
                          <Text
                          className="text-gray-801  text-base font-dm-sans-medium leading-6"
                          >
                          {formatPrice(event?.price , currentLanguage) !== t('Free') ? t('From'): ''} {formatPrice(event?.price , currentLanguage)}
                          </Text>
                      </div>                  
                    </div>
                  </div> 
                  <div className="flex flex-col gap-6 pt-9 w-full border-b border-gray-201 pb-8">
                    <Text className=" text-[22px] font-dm-sans-medium leading-8 text-left text-blue_gray-903">
                        {t('event.eventDetails.overview')}
                    </Text>
                    <div className="flex flex-col gap-7 w-full">
                        <div className="flex flex-col md:flex-row justify-between items-start gap-7 w-full">
                            <div className="flex flex-col justify-center items-start w-full md:w-[50%] gap-2.5">
                              <div className="flex flex-row gap-3 items-center">
                                <HiOutlineSpeakerphone size={20} className="text-teal-A700"/>
                                <Text  className=" text-xs font-dm-sans-bold leading-4 tracking-widest text-left text-blue_gray-301 uppercase">
                                {t('event.eventDetails.organizedBy')}
                                </Text>
                              </div>
                              <div className="relative">
                                <Text className=" text-base font-dm-sans-regular leading-relaxed text-left text-gray700 pl-8">
                                {event?.organizedBy || 'North Africa Dreamin'}
                                </Text>
                              </div>
                            </div>
                            <div className="flex flex-col justify-center items-start flex-1 gap-2.5">
                              <div className="flex flex-row gap-3 items-center">
                                <BiMap  size={20} className="text-teal-A700"/>
                                <Text  className=" text-xs font-dm-sans-bold leading-4 tracking-widest text-left text-blue_gray-301 uppercase">
                                {t('event.eventDetails.location')}
                                </Text>
                              </div>
                              <div className="relative">
                                <Text className=" text-base font-dm-sans-regular leading-relaxed text-left text-gray700 pl-8">
                                { event?.physicalLocation || 'Online Only'}
                                </Text>
                              </div>
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row justify-between items-start gap-7 w-full">
                            <div className="flex flex-col justify-center items-start w-full md:w-[50%] gap-2.5">
                              <div className="flex flex-row gap-3 items-center">
                                <MdOutlineDateRange  size={20} className="text-teal-A700"/>
                                <Text  className=" text-xs font-dm-sans-bold leading-4 tracking-widest text-left text-blue_gray-301 uppercase">
                                {t('event.eventDetails.startDate')}
                                </Text>
                              </div>
                              <Text className=" text-base font-dm-sans-regular leading-relaxed text-left text-gray700 pl-8">
                              {formatEventStartEndDate(event , t)?.formattedStart}
                              </Text>
                            </div>
                            <div className="flex flex-col justify-center items-start flex-1 gap-2.5">
                              <div className="flex flex-row gap-3 items-center">
                                <MdOutlineDateRange   size={20} className="text-teal-A700"/>
                                <Text  className=" text-xs font-dm-sans-bold leading-4 tracking-widest text-left text-blue_gray-301 uppercase">
                                {t('event.eventDetails.endDate')}
                                </Text>
                              </div>
                              <div className="relative">
                                <Text className=" text-base font-dm-sans-regular leading-relaxed text-left text-gray700 pl-8">
                                {formatEventStartEndDate(event , t)?.formattedEnd}
                                </Text>
                              </div>
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row justify-between items-start gap-7 w-full">
                            <div className="flex flex-col justify-center items-start w-full md:w-[50%] gap-2.5">
                              <div className="flex flex-row gap-3 items-center">
                                <BiPurchaseTagAlt    size={20} className="text-teal-A700"/>
                                <Text  className=" text-xs font-dm-sans-bold leading-4 tracking-widest text-left text-blue_gray-301 uppercase">
                                {t('event.eventDetails.industry')}
                                </Text>
                              </div>
                              <Text className=" text-base font-dm-sans-regular leading-relaxed text-left text-gray700 pl-8">
                              Artificial Intelligence (AI), Finance, FinTech, Salesforce
                              </Text>
                            </div>
                            <div className="flex flex-col justify-center items-start flex-1 gap-2.5">
                              <div className="flex flex-row gap-3 items-center">
                                <TbCopy   size={20} className="text-teal-A700"/>
                                <Text  className=" text-xs font-dm-sans-bold leading-4 tracking-widest text-left text-blue_gray-301 uppercase">
                                {t('event.eventDetails.eventType')}
                                </Text>
                              </div>
                              <div className="relative flex flex-row gap-3 items-center">
                                <Text className=" text-base font-dm-sans-regular leading-relaxed text-left text-gray700 pl-8">
                                { event?.category || 'Meetup, Networking, Conference'}
                                </Text>
                              </div>
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row justify-between items-start gap-7 w-full">
                            <div className="flex flex-col justify-center items-start w-full w-full gap-2.5">
                              <div className="flex flex-row gap-3 items-center">
                              <BiMessageAltError size={20} className="text-teal-A700 transform scale-x-[-1]" />
                                <Text  className=" text-xs font-dm-sans-bold leading-4 tracking-widest text-left text-blue_gray-301 uppercase">
                                {t('event.eventDetails.description')}
                                </Text>
                              </div>
                              <div className=" text-base font-dm-sans-regular leading-relaxed text-left text-gray700 pl-8">
                                {event?.description.split('\n').map((line , index) =>
                                  <p key={index} className="mb-4">{line}</p>
                                ) }
                              </div>
                            </div>
                        </div>
                        {(event?.status == 'past' && event?.attendeesUsers?.length > 0) &&
                        <div className="flex flex-col md:flex-row justify-between items-start gap-7 w-full">
                        <div className="flex flex-col justify-center items-start w-full w-full gap-2.5">
                          <div className="flex flex-row gap-3 items-center">
                          <BiMessageAltError size={20} className="text-teal-A700 transform scale-x-[-1]" />
                            <Text  className=" text-xs font-dm-sans-bold leading-4 tracking-widest text-left text-blue_gray-301 uppercase">
                            {t('event.eventDetails.attendance')}
                            </Text>
                          </div>
                          <div className="flex flex-row gap-3 w-full items-center pl-8">
                          {event?.attendeesUsers?.length > 0 && (
                            <>
                              {event?.attendeesUsers?.slice(0, 10).map((item, index) => (
                                <img 
                                  key={index}
                                  src={item?.userId?.image || userDefaultProfil}
                                  alt="vector_three"
                                  className="rounded-full w-12 h-12"
                                />
                              ))}
                              {event?.attendeesUsers?.length > 10 && (
                                <Text className="text-gray700  text-lg font-bold leading-26 tracking-wide text-left">
                                  + {event?.attendeesUsers?.length - 10}
                                </Text>
                              )}
                            </>
                          )}
                          </div>
                        </div>
                    </div>
                        }
                    </div>
                  </div> 
                  <div className="flex flex-col gap-6 pt-9 w-full pb-8">
                    <Text className=" text-lg font-semibold leading-8 text-left text-blue_gray-903">
                    {t('event.eventDetails.sponsor')}
                    </Text>
                    <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-10 w-full items-center">
                      {sponsors?.length > 0 && (
                        sponsors.map((item, index) => (
                          <img key={index}
                        src={item?.logo}
                        alt="vector_three"
                          />
                        ))
                      )}
                    </div>
                  </div>  
              </div>
            </div>
        }
        </div>
        <SendSponsoringModal isOpen={isModalOpen} onRequestClose={closeModal}  rowData={event}/>
        </>
    )
}

export default SponsorEventDetails;