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
import { LuDownload } from "react-icons/lu";


const SponsorRequestHistoryDetails = () => {
    const userData = JSON.parse(sessionStorage.getItem("userData"));
    const location = useLocation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const past = location.state ? location.state.past : false;
    const [bying , setBying] = useState(false);
    const { id } = useParams();
    const eventFromState = location.state ? location.state.event : null;
    const navigate = useNavigate();
    const { data: eventFromApi, error, isLoading  , refetch} = useGetEventByIdQuery(id, {
        skip: !!eventFromState,
    });
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
        // await approveRequest({
        //     id: rowData?._id,
        //     approvalData: data,
        // }).unwrap();
        refetch();
        console.log('Request approved successfully!');
    } catch (error) {
        console.error('Failed to approve request:', error);
    }
  };

const handleReject = async (data) => {
    try {
        // await rejectRequest({
        //     id: rowData?._id,
        //     rejectionData: data,
        // }).unwrap();
        refetch();
        console.log('Request rejected successfully!');
    } catch (error) {
        console.error('Failed to reject request:', error);
    }
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
                    {event?.status == 'past' ? 'Upcoming Event' : 'Upcoming Event'}
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
                            <div className="flex item-center gap-[18px]">
                                {/*<div className="h-[34px] px-3 py-2 bg-[#e5e5e6] rounded-[200px] justify-center items-center gap-2 flex">
                                    <svg width="21" height="22" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M10.4996 11.0001H10.5083M13.5932 14.0937C9.49266 18.1942 4.7835 20.1333 3.07495 18.4247C1.36641 16.7162 3.30548 12.007 7.40598 7.90653C11.5065 3.80603 16.2157 1.86696 17.9242 3.5755C19.6327 5.28405 17.6937 9.99321 13.5932 14.0937ZM13.5931 7.90637C17.6936 12.0069 19.6327 16.716 17.9242 18.4246C16.2156 20.1331 11.5065 18.1941 7.40595 14.0936C3.30544 9.99305 1.36637 5.28389 3.07492 3.57535C4.78346 1.8668 9.49263 3.80587 13.5931 7.90637ZM10.9371 11.0001C10.9371 11.2417 10.7412 11.4376 10.4996 11.4376C10.2579 11.4376 10.0621 11.2417 10.0621 11.0001C10.0621 10.7585 10.2579 10.5626 10.4996 10.5626C10.7412 10.5626 10.9371 10.7585 10.9371 11.0001Z" stroke="#8F8D95" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    <div className="text-[#a7a6a8] text-sm font-dm-sans-medium">Sponsored</div>
                                </div>
                                 <div className="w-[125px] h-[38px] px-[13px] py-2 rounded-[50px] border border-[#ffc564] justify-center items-center gap-1 inline-flex">
                                    <div className="text-[#e49614] text-xs font-dm-sans-regular leading-none tracking-tight">Prize Sponsors</div>
                                </div>
                                <div className="h-[38px] px-3 py-2 bg-[#00cdae] rounded-[200px] justify-center items-center gap-3 flex">
                                    <div className="text-white-A700 text-sm font-dm-sans-medium ">Approved</div>
                                </div> */}
                                <>
                                <button style={{whiteSpace:'nowrap'}} className={`h-[38px] px-3 py-2.5 bg-[#00cdae] hover:bg-greenbtnhoverbg active:bg-greenbtnhoverbg rounded-md justify-center items-center gap-2 flex cursorpointer-green`}>
                                    <PiCheckBold size={21} className="text-white-A700"/>
                                    <div className="text-white-A700 text-sm font-dm-sans-medium">Approve Now</div>
                                </button>
                                <div className="h-[38px] px-3 py-2 bg-[#ef4352] rounded-[200px] justify-center items-center gap-3 flex">
                                    <div className="text-white-A700 text-sm font-dm-sans-medium">Rejected</div>
                                </div>
                                </>
                            </div>
                        </div>
                      <div className="flex flex-row gap-3 items-center text-left">
                          <MdOutlineDateRange  size={18} className="text-teal-A300"/>
                          <Text
                          className="text-gray-801  text-base font-dm-sans-medium leading-6"
                          >
                          {formatEventDate(event?.startDate , event?.endDate)}
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
                          {event?.price !== undefined && event?.price !== null ? 
                            (event.price === 0 ? 'Free' : `$ ${(event.price).toFixed(2)}`) : 
                            'Free'}
                          </Text>
                      </div>                  
                    </div>
                  </div> 
                  <div className="flex flex-col gap-6 pt-9 w-full border-b border-gray-201 pb-8">
                    <Text className=" text-[22px] font-dm-sans-medium leading-8 text-left text-blue_gray-903">
                        Overview
                    </Text>
                    <div className="flex flex-col gap-[38px] w-full">
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
                                {event?.organizedBy || 'North Africa Dreamin'}
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
                                Start Date
                                </Text>
                              </div>
                              <Text className=" text-base font-dm-sans-regular leading-relaxed text-left text-gray700 pl-8">
                              {event?.startDate ? format(event?.startDate, 'EEE, MMM d , yyyy', { locale: enUS }) : 'Coming Soon'} {event?.startTime || ''}
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
                                {event?.endDate 
                                  ? format(new Date(event?.endDate), 'EEE, MMM d, yyyy', { locale: enUS })
                                  : event?.startDate 
                                    ? format(new Date(event?.startDate), 'EEE, MMM d, yyyy', { locale: enUS })
                                    : 'Coming Soon'} {event?.endTime || ''}
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
                                Description
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
                                Attendance
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
                        <div className="flex flex-col justify-center items-start w-full w-full gap-2.5 pt-3">
                            <div className="flex flex-row gap-3 items-center">
                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M15.75 15.75H4.65C3.80992 15.75 3.38988 15.75 3.06901 15.5865C2.78677 15.4427 2.5573 15.2132 2.41349 14.931C2.25 14.6101 2.25 14.1901 2.25 13.35V2.25M5.25 7.875V13.125M8.625 4.125V13.125M12 7.875V13.125M15.375 4.125V13.125" stroke="#00CDAE" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                                <Text  className=" text-xs font-dm-sans-bold leading-4 tracking-widest text-left text-blue_gray-301 uppercase">
                                Impact of Sponsorship
                                </Text>
                            </div>
                            <div className="flex text-base font-dm-sans-regular leading-6 text-[#344054] pl-8">
                                <ul className="list-disc leading-6">
                                    <li className="leading-6">
                                        Brand Visibility:
                                        <ul className="list-disc pl-6">
                                            <li className="leading-6">On-site and digital brand presence.</li>
                                            <li className="leading-6">Logo featured on event website, social media, and marketing materials.</li>
                                        </ul>
                                    </li>
                                    <li>
                                        Attendee Engagement:
                                        <ul className="list-disc pl-6">
                                            <li className="leading-6">Direct engagement with over 500 attendees.</li>
                                            <li className="leading-6">Platform for a keynote speech or presentation.</li>
                                        </ul>
                                    </li>
                                    <li>
                                        Event Promotion:
                                        <ul className="list-disc pl-6">
                                            <li className="leading-6">Highlighted in brochures, programs, and newsletters.</li>
                                            <li className="leading-6">Featured in the event app for attendee navigation.</li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="flex flex-col justify-center items-start w-full w-full gap-2.5 pt-3">
                            <div className="flex flex-row gap-3 items-center">
                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4.5 4.5L6 3M6 3L4.5 1.5M6 3H4.5C2.84315 3 1.5 4.34315 1.5 6M13.5 13.5L12 15M12 15L13.5 16.5M12 15H13.5C15.1569 15 16.5 13.6569 16.5 12M10.0629 10.0629C10.6496 10.3431 11.3065 10.5 12 10.5C14.4853 10.5 16.5 8.48528 16.5 6C16.5 3.51472 14.4853 1.5 12 1.5C9.51472 1.5 7.5 3.51472 7.5 6C7.5 6.69354 7.65689 7.35043 7.93712 7.93712M10.5 12C10.5 14.4853 8.48528 16.5 6 16.5C3.51472 16.5 1.5 14.4853 1.5 12C1.5 9.51472 3.51472 7.5 6 7.5C8.48528 7.5 10.5 9.51472 10.5 12Z" stroke="#00CDAE" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                                <Text  className=" text-xs font-dm-sans-bold leading-4 tracking-widest text-left text-blue_gray-301 uppercase">
                                Cost and Benefits Analysis
                                </Text>
                            </div>
                            <div className="flex text-base font-dm-sans-regular leading-normal text-[#344054] pl-8">
                                <ul className="list-disc leading-6">
                                    <li className="leading-6">Sponsorship Cost: $10,000 (Venue Partnership Package)
                                    <ul className="list-disc pl-6">
                                        <li className="leading-6">Return on Investment (ROI):
                                        <ul className="list-disc pl-6">
                                            <li className="leading-6">200+ potential leads generated.</li>
                                            <li className="leading-6">50,000+ impressions on social media.</li>
                                            <li className="leading-6">Media coverage in post-event articles.</li>
                                        </ul>
                                        </li>
                                        <li className="leading-6">Benefits:
                                        <ul className="list-disc pl-6">
                                            <li className="leading-6">Increased brand recognition and positive brand perception.</li>
                                            <li className="leading-6">Networking with industry leaders and decision-makers.</li>
                                        </ul>
                                        </li>
                                    </ul>
                                    </li>
                                    <li className="leading-6">Attendee Feedback:
                                    <ul className="list-disc pl-6">
                                        <li className="leading-6">95% rated the event as excellent or very good.</li>
                                        <li className="leading-6">Positive feedback on venue facilities and location.</li>
                                    </ul>
                                    </li>
                                </ul>
                            </div>
                        </div>
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
        <SendSponsoringModal isOpen={isModalOpen} onRequestClose={closeModal}  rowData={event}/>
        </>
    );
}

export default SponsorRequestHistoryDetails;
