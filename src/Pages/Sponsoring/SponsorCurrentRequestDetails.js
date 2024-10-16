import React, { useState , useEffect} from "react";
import { useSelector } from "react-redux";
import { HiOutlineSpeakerphone } from "react-icons/hi";
import { MdOutlineDateRange } from "react-icons/md";
import { BiMap } from "react-icons/bi";
import { PiTagBold } from "react-icons/pi";
import{Text } from "../../Components/Text";
import { IoMdTime } from "react-icons/io";
import { TbCopy } from "react-icons/tb";
import { BiMessageAltError } from "react-icons/bi";
import { BiPurchaseTagAlt } from "react-icons/bi";
import { useLocation  , useNavigate } from "react-router-dom";
import PageHeader from "../../Components/PageHeader";
import SearchInput from "../../Components/SeachInput";
import { format, parse } from 'date-fns';
import { fr , enUS } from 'date-fns/locale';
import { useGetEventByIdQuery } from "../../Services/Event.Service";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AiOutlineLoading } from "react-icons/ai";
import Loader from "../../Components/Loader";
import userDefaultProfil from '../../Media/User1.png';
import SendSponsoringModal from "../../Components/SendSponsoringModal";
import { FiSend } from "react-icons/fi";
import { PiCheckBold } from "react-icons/pi";
import { RiCloseLine } from "react-icons/ri";
import ApproveSponsoringRequestModal from "../../Components/ApproveSponsoringRequestModal";
import RejectSponsoringRequestModal from '../../Components/RejectSponsoringRequestModal';
import { useGetSponsorByIdQuery , useApproveSponsorMutation , useRejectSponsorMutation } from "../../Services/Sponsor.Service";

const SponsorCurrentRequestDetails = () => {
    const userData = JSON.parse(sessionStorage.getItem("userData"));
    const location = useLocation();
    const [approveSponsor] = useApproveSponsorMutation();
    const [rejectSponsor] = useRejectSponsorMutation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const past = location.state ? location.state.past : false;
    const [bying , setBying] = useState(false);
    const { id } = useParams();
    const eventFromState = location.state ? location.state.event : null;
    const navigate = useNavigate();
    const { data: eventFromApi, error, isLoading  , refetch} = useGetSponsorByIdQuery(id);
    const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
    const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
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
    const attendance = [
      {image:"/images/img_avatar_1.png"}, 
      {image:"/images/img_avatar_2.png"}, 
      {image:"/images/img_avatar_3.png"}, 
      {image:"/images/img_avatar_4.png"}, 
      {image:"/images/img_avatar_5.png"}, 
      {image:"/images/img_avatar_12.png"},
      {image:"/images/img_avatar_7.png"}, 
      {image:"/images/img_avatar_8.png"}, 
      {image:"/images/img_avatar_9.png"}, 
      {image:"/images/img_avatar_10.png"}, 
      {image:"/images/img_avatar_11.png"}, 
      {image:"/images/img_avatar_12.png"}, 
    ];

    const formattedTime = (time, language) => {
      const parsedTime = parse(time, 'h:mm a', new Date());
      // if (language === 'fr-FR') {
      //   return format(parsedTime, 'H', { locale: fr }) + 'h';
      // }
      return format(parsedTime, 'h a', { locale: enUS }).toLowerCase();
    };

    function formatEventDate(startDate, endDate) {
    
      if (!startDate || !endDate ) {
          return 'Coming Soon';
      }
      else {

          const startDateTime = new Date(startDate);
          const endDateTime = new Date(endDate);

          if (startDateTime.getDate() === endDateTime.getDate() && startDateTime.getMonth() === endDateTime.getMonth() && startDateTime.getFullYear() === endDateTime.getFullYear()) {
              const formattedDate = format(startDateTime, 'EEEE, MMMM d, yyyy', { locale: enUS });
              return `${formattedDate}`;
          } else {
              const formattedStartDate = format(startDateTime,'EEE, MMM d, yyyy', { locale: enUS });
              return `${formattedStartDate}`;
          }

          }
  }

  function formatEventTime(startDate, endDate, startTime, endTime) {
  
      if (!startDate || !endDate || !startTime || !endTime || startTime=='' || endTime=='' ) {
          return '24 hours a day, 7 days a week';
      }
      else {
          const formattedStartTimev = formattedTime(startTime, '');
          const formattedEndTimev = formattedTime(endTime, '');

          const startDateTime = new Date(startDate);
          const endDateTime = new Date(endDate);

          if (startDateTime.getDate() === endDateTime.getDate() && startDateTime.getMonth() === endDateTime.getMonth() && startDateTime.getFullYear() === endDateTime.getFullYear()) {
              const gmtOffset = startDateTime.getTimezoneOffset() / 60; 

              console.log(gmtOffset)
              const gmt = gmtOffset >= 0 ? `+${gmtOffset}` : gmtOffset.toString(); 
              // if(language =='fr-FR') {
              //     return `De ${formattedStartTimev} à ${formattedEndTimev} GMT${gmt}`
              // }
              return `${formattedStartTimev} - ${formattedEndTimev} ${gmt}`;
          } else {
              
              const parsedTime = parse(startTime, 'h:mm a', new Date());
              // if (language === 'fr-FR') {
              //   return format(parsedTime, 'H:mm', { locale: fr }).replace(':', 'h');
              // }
              return format(parsedTime, 'h:mm a', { locale: enUS }).toUpperCase();            }

      }
  }

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

  const openApproveModal = () => {
    setIsApproveModalOpen(true);
  };
  
  const closeApproveModal = () => {
      setIsApproveModalOpen(false);
      // setRowData(null);
  };

  const openRejectModal = () => {
      setIsRejectModalOpen(true);
  };
  
  const closeRejectModal = () => {
      setIsRejectModalOpen(false);
      // setRowData(null);
  };

  const handleApprove = async (data) => {
    try {
        await approveSponsor({
            sponsorId: event?._id,
            data,
        }).unwrap();
        refetch();
        console.log('Sponsor approved successfully!');
    } catch (error) {
        console.error('Failed to approve Sponsor:', error);
    }
  };

const handleReject = async (data) => {
    try {
        await rejectSponsor({
            sponsorId: event?._id,
            data,
        }).unwrap();
        refetch();
        console.log('Sponsor rejected successfully!');
    } catch (error) {
        console.error('Failed to reject Sponsor:', error);
    }
};

    return (
        <>
        <div className="bg-white-A700 flex flex-col gap-8 h-full min-h-screen overflow-auto items-start justify-start pb-14 pt-8 rounded-tl-[40px] w-full">
        {isLoading ?
            <div className="flex flex-col items-center text-blue_gray-800_01 gap-[16px] h-screen w-full py-28 rounded-b-[8px]">
              <Loader />
            </div> 
            : 
            <div className="flex flex-col items-start justify-start sm:px-5 px-8 w-full">
              <div className="border-b border-gray-201 border-solid flex flex-col md:flex-row gap-5 items-start justify-start pb-6 w-full">
                <div className="flex flex-1 flex-col  h-full items-start justify-start w-full">
                  <PageHeader
                    >
                    {event?.eventId?.status == 'past' ? 'Past Event' : 'Current Request'}
                  </PageHeader>
                </div>
                <SearchInput className={'w-[240px]'}/>
              </div>
              <div className="flex flex-col items-start justify-start w-full">
                  <div className="flex flex-col md:flex-row gap-3 w-full bg-white-A700 border-b border-gray-201 pt-6 pb-9">
                    <img
                      src={event?.eventId?.headerImage}
                      alt="vector_three"
                      className="w-full md:h-[180px] md:w-[240px] rounded-[12px]"
                    />
                    <div className="flex flex-col gap-3 flex-1">
                        <div className="flex flex-row justify-between items-start gap-3 w-full">
                            <Text
                                className=" text-[24px] font-dm-sans-bold leading-7 text-left text-blue_gray-903 w-full"
                                >
                                { event?.eventId?.title || 'Monthly #FirstFridayFair Business, Data & Technology Virtual Event'}
                            </Text>
                            <div className="flex item-center gap-[18px]">
                                {event?.requestType?.toLowerCase() === 'sent' ? 
                                <div className="w-[97px] gap-[4px] h-[38px] px-2.5 py-2 rounded-[50px] border border-[#ff9123] justify-center items-center gap-1 inline-flex">
                                    <FiSend size={12} className="text-[#ff9123]" />
                                    <div className="text-[#ff9123] text-sm font-dm-sans-regular leading-[18.20px] tracking-tight">Sent</div>
                                </div>
                                :
                                <div className="h-[38px] gap-[4px] px-2.5 py-2 rounded-[50px] border border-[#af66e7] justify-center items-center gap-1 inline-flex">
                                    <PiCheckBold size={12} className={`text-[#af66e7]`} />
                                    <div className="text-[#af66e7] text-sm font-dm-sans-regular leading-[18.20px] tracking-tight">Received</div>
                                </div>}
                                {event?.status?.toLowerCase() !== 'pending' ? 
                                (<>
                                {event?.status?.toLowerCase() === 'approved' && <div className="h-[38px] px-3 py-2 bg-[#00cdae] rounded-[200px] justify-center items-center gap-3 inline-flex">
                                    <div className="justify-center items-center gap-2 flex">
                                        <div className="text-white-A700 text-sm font-dm-sans-medium ">Approved</div>
                                    </div>
                                </div>} 
                                {event?.status?.toLowerCase() === 'rejected' && <div className="h-[38px] px-3 py-2 bg-[#ef4352] rounded-[200px] justify-center items-center gap-3 inline-flex">
                                    <div className="justify-center items-center gap-2 flex">
                                        <div className="text-white-A700 text-sm font-dm-sans-medium">Rejected</div>
                                    </div>
                                </div>}
                                </>) :
                                (<>
                                <button 
                                className={`h-[38px] px-3 py-2.5 bg-[#00cdae] hover:bg-greenbtnhoverbg active:bg-greenbtnhoverbg rounded-md justify-center items-center gap-2 flex cursorpointer`} 
                                onClick={openApproveModal} >
                                    <PiCheckBold size={21} className="text-white-A700"/>
                                    <div className="text-white-A700 text-sm font-dm-sans-medium">Approve</div>
                                </button>
                                <button 
                                className={`h-[38px] px-3 py-2.5 bg-[#ef4352] hover:bg-[#F02A3C] active:bg-[#F02A3C] rounded-md justify-center items-center gap-2 flex cursorpointer`} 
                                onClick={openRejectModal}>
                                    <RiCloseLine size={21} className="text-white-A700"/>
                                    <div className="text-white-A700 text-sm font-dm-sans-medium">Reject</div>
                                </button>
                                </>)}
                            </div>
                        </div>
                      <div className="flex flex-row gap-3 items-center text-left">
                          <MdOutlineDateRange  size={18} className="text-teal-A300"/>
                          <Text
                          className="text-gray-801  text-base font-dm-sans-medium leading-6"
                          >
                          {formatEventDate(event?.eventId?.startDate , event?.eventId?.endDate)}
                          </Text>
                      </div>
                      <div className="flex flex-row gap-3 items-center  text-left">
                          <IoMdTime  size={18} className="text-teal-A300"/>
                          <Text
                          className="text-gray-801  text-base font-dm-sans-medium leading-6"
                          >
                          {formatEventTime(event?.eventId?.startDate , event?.eventId?.endDate , event?.eventId?.startTime? event?.eventId?.startTime : '', event?.eventId?.endTime? event?.eventId?.endTime : '')}
                          </Text>
                      </div>
                      <div className="flex flex-row gap-3 items-center text-left">
                          <BiMap  size={18} className="text-teal-A300"/>
                          <Text
                          className="text-gray-801  text-base font-dm-sans-medium leading-6"
                          >
                          {event?.eventId?.physicalLocation || "Online Only"}
                          </Text>
                      </div>
                        <div className="flex flex-row gap-3 items-center  text-left">
                          <PiTagBold    size={18} className="text-teal-A300"/>
                          <Text
                          className="text-gray-801  text-base font-dm-sans-medium leading-6"
                          >
                          {event?.eventId?.price !== undefined && event?.eventId?.price !== null ? 
                            (event.eventId?.price === 0 ? 'Free' : `$ ${(event.eventId?.price).toFixed(2)}`) : 
                            'Free'}
                          </Text>
                      </div>                  
                    </div>
                  </div> 
                  <div className="flex flex-col gap-6 pt-9 w-full border-b border-gray-201 pb-8">
                    <Text className=" text-[22px] font-dm-sans-medium leading-8 text-left text-blue_gray-903">
                        Overview
                    </Text>
                    <div className="flex flex-col gap-7 w-full">
                        <div className="flex flex-col md:flex-row justify-between items-start gap-7 w-full">
                            <div className="flex flex-col justify-center items-start w-full md:w-[50%] gap-2.5">
                              <div className="flex flex-row gap-3 items-center">
                                <HiOutlineSpeakerphone size={20} className="text-teal-A700"/>
                                <Text  className=" text-xs font-dm-sans-bold leading-4 tracking-widest text-left text-blue_gray-301 uppercase">
                                Organized by
                                </Text>
                              </div>
                              <div className="relative">
                                <Text className=" text-base font-dm-sans-regular leading-relaxed text-left text-gray700 pl-8">
                                {event?.eventId?.organizedBy || 'North Africa Dreamin'}
                                </Text>
                              </div>
                            </div>
                            <div className="flex flex-col justify-center items-start flex-1 gap-2.5">
                              <div className="flex flex-row gap-3 items-center">
                                <BiMap  size={20} className="text-teal-A700"/>
                                <Text  className=" text-xs font-dm-sans-bold leading-4 tracking-widest text-left text-blue_gray-301 uppercase">
                                Location
                                </Text>
                              </div>
                              <div className="relative">
                                <Text className=" text-base font-dm-sans-regular leading-relaxed text-left text-gray700 pl-8">
                                { event?.eventId?.physicalLocation || 'Online Only'}
                                </Text>
                              </div>
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row justify-between items-start gap-7 w-full">
                            <div className="flex flex-col justify-center items-start w-full md:w-[50%] gap-2.5">
                              <div className="flex flex-row gap-3 items-center">
                                <MdOutlineDateRange  size={20} className="text-teal-A700"/>
                                <Text  className=" text-xs font-dm-sans-bold leading-4 tracking-widest text-left text-blue_gray-301 uppercase">
                                Start Date
                                </Text>
                              </div>
                              <Text className=" text-base font-dm-sans-regular leading-relaxed text-left text-gray700 pl-8">
                              {event?.eventId?.startDate ? format(event?.eventId?.startDate, 'EEE, MMM d , yyyy', { locale: enUS }) : 'Coming Soon'} {event?.eventId?.startTime || ''}
                              </Text>
                            </div>
                            <div className="flex flex-col justify-center items-start flex-1 gap-2.5">
                              <div className="flex flex-row gap-3 items-center">
                                <MdOutlineDateRange   size={20} className="text-teal-A700"/>
                                <Text  className=" text-xs font-dm-sans-bold leading-4 tracking-widest text-left text-blue_gray-301 uppercase">
                                End Date
                                </Text>
                              </div>
                              <div className="relative">
                                <Text className=" text-base font-dm-sans-regular leading-relaxed text-left text-gray700 pl-8">
                                {event?.eventId?.endDate 
                                  ? format(new Date(event?.eventId?.endDate), 'EEE, MMM d, yyyy', { locale: enUS })
                                  : event?.eventId?.startDate 
                                    ? format(new Date(event?.eventId?.startDate), 'EEE, MMM d, yyyy', { locale: enUS })
                                    : 'Coming Soon'} {event?.eventId?.endTime || ''}
                                </Text>
                              </div>
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row justify-between items-start gap-7 w-full">
                            <div className="flex flex-col justify-center items-start w-full md:w-[50%] gap-2.5">
                              <div className="flex flex-row gap-3 items-center">
                                <BiPurchaseTagAlt    size={20} className="text-teal-A700"/>
                                <Text  className=" text-xs font-dm-sans-bold leading-4 tracking-widest text-left text-blue_gray-301 uppercase">
                                Industry
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
                                Event Type
                                </Text>
                              </div>
                              <div className="relative flex flex-row gap-3 items-center">
                                <Text className=" text-base font-dm-sans-regular leading-relaxed text-left text-gray700 pl-8">
                                { event?.eventId?.category || 'Meetup, Networking, Conference'}
                                </Text>
                              </div>
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row justify-between items-start gap-7 w-full">
                            <div className="flex flex-col justify-center items-start w-full w-full gap-2.5">
                              <div className="flex flex-row gap-3 items-center">
                              <BiMessageAltError size={20} className="text-teal-A700 transform scale-x-[-1]" />
                                <Text  className=" text-xs font-dm-sans-bold leading-4 tracking-widest text-left text-blue_gray-301 uppercase">
                                Description
                                </Text>
                              </div>
                              <div className=" text-base font-dm-sans-regular leading-relaxed text-left text-gray700 pl-8">
                                {event?.eventId?.description.split('\n').map((line , index) =>
                                  <p key={index} className="mb-4">{line}</p>
                                ) }
                              </div>
                            </div>
                        </div>
                        {(event?.eventId?.status == 'past' && event?.eventId?.attendeesUsers?.length > 0) &&
                        <div className="flex flex-col md:flex-row justify-between items-start gap-7 w-full">
                        <div className="flex flex-col justify-center items-start w-full w-full gap-2.5">
                          <div className="flex flex-row gap-3 items-center">
                          <BiMessageAltError size={20} className="text-teal-A700 transform scale-x-[-1]" />
                            <Text  className=" text-xs font-dm-sans-bold leading-4 tracking-widest text-left text-blue_gray-301 uppercase">
                            Attendance
                            </Text>
                          </div>
                          <div className="flex flex-row gap-3 w-full items-center pl-8">
                          {event?.eventId?.attendeesUsers?.length > 0 && (
                            <>
                              {event?.eventId?.attendeesUsers?.slice(0, 10).map((item, index) => (
                                <img 
                                  key={index}
                                  src={item?.eventId?.userId?.image || userDefaultProfil}
                                  alt="vector_three"
                                  className="rounded-full w-12 h-12"
                                />
                              ))}
                              {event?.eventId?.attendeesUsers?.length > 10 && (
                                <Text className="text-gray700  text-lg font-bold leading-26 tracking-wide text-left">
                                  + {event?.eventId?.attendeesUsers?.length - 10}
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
                    Sponsor
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
        <ApproveSponsoringRequestModal isOpen={isApproveModalOpen} onRequestClose={closeApproveModal} rowData={event} methode={handleApprove}/>
        <RejectSponsoringRequestModal isOpen={isRejectModalOpen} onRequestClose={closeRejectModal} rowData={event} methode={handleReject} />
        </>
    );
}

export default SponsorCurrentRequestDetails;
