import React, { useState , useEffect } from "react";
import { BsArrowLeftShort } from "react-icons/bs";
import { BiChevronDown } from "react-icons/bi";
import { BiBuildings } from "react-icons/bi";
import { GoRocket } from "react-icons/go";
import { RiHome6Line, RiUser3Line } from "react-icons/ri";
import { TiFlashOutline } from "react-icons/ti";
import { useSelector ,useDispatch} from 'react-redux';
import { PiFolderThin, PiHourglassLowFill } from "react-icons/pi";
import { HiOutlineLogout, HiOutlineTicket } from "react-icons/hi";
import { IoNotificationsOutline, IoSettingsOutline } from "react-icons/io5";
import { useNavigate, Link } from "react-router-dom";
import coinsIcon from '../Media/credits_img.svg';
import questionImg from '../Media/question.svg';
import Popup from "reactjs-popup";
import { logout } from "../Redux/auth/authSlice";
import userImg from '../Media/img_avatar_1.png';
import simpleLogo from '../Media/img_simple_logo.svg';
import simpleLogoText from '../Media/img_simple_logo_text.svg';
import { useGetUserDetailsQuery } from "../Services/Auth";
import { useLocation } from "react-router-dom";
import ReactDOM from 'react-dom';
import { PiAtomBold } from "react-icons/pi";
import userDefaultProfil from '../Media/User1.png';
import { useGetNotificationSummaryQuery } from "../Services/Notification.Service";


const SidebarNav = () => {
  const { loading, userInfo, error } = useSelector((state) => state.auth)
  const {data: userDetails , error: userDetailsError , isLoading: userDetailsLoading , refetch} = useGetUserDetailsQuery();
  const { data: notifications, error: notificationsError, isLoading: notificationsLoading , refetch: refetchNotifications } = useGetNotificationSummaryQuery();
  const [open, setOpen] = useState(true);
  const dispatch = useDispatch()
  const [submenuOpen, setSubmenuOpen] = useState({
    company: false,
    investor: false,
    event: false,
    // Ajoutez d'autres sous-menus si nécessaire
  });
  const location = useLocation();
  const [settingsOpen , setSettingsOpen] = useState(false);
  const [notifOpen , setNotifOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(location.pathname.split('/')[1]);
  const [activeParent, setActiveParent] = useState('');
  const [showLogout , setShowLogout] = useState(false);

  const navigate=useNavigate()

  const userData = JSON.parse(sessionStorage.getItem('userData'));

  const settingActiveLinks = ["settings" , "Subscription" , "UserProfile" , "ChoosePlan" , "SubscribePlan"];
  const subscriptionActiveLinks = ["Subscription" , "ChoosePlan" , "SubscribePlan"];

  useEffect(() => {
    refetch();
  }, [refetch]);

  useEffect(() => {
    const interval = setInterval(() => {
      refetchNotifications(); // Refresh the notifications from the API
    }, 30000); // 30 seconds

    return () => clearInterval(interval); // Cleanup the interval on unmount
  }, [refetchNotifications]);

  useEffect(() => {
    setActiveMenu(location.pathname.split('/')[1]);
  }, [location]);

  console.log(activeMenu)

  const setSubmenu = (submenuName, isOpen) => {
    setSubmenuOpen(prevState => ({
      ...prevState,
      [submenuName]: isOpen,
    }));
  };

  const resetSubmenus = () => {
    setSubmenuOpen({
      company: false,
      investor: false,
      event: false,
      // Reset other submenus as needed
    });
  };

  const handleMenuClick = (Menu) => {
    if (!Menu.submenu) {
      resetSubmenus(); 
    } else {
      setSubmenuOpen(prevState => {
        const updatedState = { ...prevState };
        Object.keys(updatedState).forEach(key => {
          if (key !== Menu.title) {
            updatedState[key] = false;
          }
        });
        return updatedState;
      });
      setSettingsOpen(false);
      // Toggle the clicked submenu
      setSubmenu(Menu.title, !submenuOpen[Menu.title]);
    }
    navigate(Menu.link);
    setActiveParent(Menu.title);
    setActiveMenu(Menu.title);
  };
  
  const Menus = [
    { title: "Dashboard", src: <RiHome6Line size={23} className="text-light_blue-100" /> , link: userData?.role?.toLowerCase() === "admin"? "Dashboard_Admin": userData?.role?.toLowerCase() === "investor"? "Dashboard_Investor" : userData?.role?.toLowerCase() === "partner"? "Dashboard_Partner" : "Dashboard" },
    
    (userData?.role?.toLowerCase() === "member") &&  { title: "Projects", src: <GoRocket size={23} className="text-light_blue-100"/>, link:"Projects" , activeLinks: ["Projects" , "CreateProject" , "Editproject" , "Projectdetails"] },
    (userData?.role?.toLowerCase() === "member" || userData?.role?.toLowerCase() === "investor" || userData?.role?.toLowerCase() === "partner") && {
      title: "Company", src: <BiBuildings size={23} className="text-light_blue-100"/>,
      submenu: true, activeLinks: ["CreateOrEditEmployee" , "MyCompany" , "Employees" , "CompanyLegal"] ,
      child: [
        //(userInfo?.member?.companyName || userInfo?.partner?.companyName) && 
        { title: "My Company", src: '', link: "MyCompany" },
        { title: "Employee", src: '', link: "Employees" , activeLinks: ["CreateOrEditEmployee"] },
        { title: "Legal", src: '', link: "CompanyLegal" },
      ]
    }
    ,
    (userData?.role?.toLowerCase() === "member") && { 
    title: "Investor", src: <TiFlashOutline size={23} className="text-light_blue-100"/> , 
    submenu: true, activeLinks: ["InvestorDetails" , "InvestorRequestsHistoty" , "MyInvestors" , "Investors"] ,
    child: [
      //(userInfo?.member?.companyName || userInfo?.partner?.companyName) && 
      { title: "Investor List", src: '', link: "Investors" , activeLinks: ["Investors" ,"InvestorDetails"] },
      { title: "My Investors", src: '', link: "MyInvestors" , activeLinks: ["MyInvestors" , "MyInvestorDetails"]},
      { title: "Request History", src: '', link: "InvestorRequestsHistoty" , activeLinks:["InvesotrRequestsHistoty"] },
    ]
    },
    (userData?.role?.toLowerCase() === "investor") && { 
      title: "Investment", src: <TiFlashOutline size={23} className="text-light_blue-100"/> , 
      submenu: true, activeLinks: ["Investment" , "MyInvestment" , "InvestmentRequestHistory" , "InvestmentDetails" , "InvestmentRequestDetails"] ,
      child: [
        { title: "Current Requests", src: '', link: "Investment" , activeLinks: ["Investment" , "InvestmentRequestDetails" ] },
        { title: "My Investments", src: '', link: "MyInvestment" , activeLinks: ["MyInvestment" , "InvestmentDetails"]},
        { title: "Request History", src: '', link: "InvestmentRequestHistory" , activeLinks:["InvestmentRequestHistory"] },
      ]
      },
    { title: "Event", src: <HiOutlineTicket size={23} className="text-light_blue-100"/>  ,
    submenu: true, activeLinks:["Participate" ,"UpcomingEventDetails" , "PastEventDetails" , "PastEvent" , "UpcomingEvent" ,"EventDetails"],
    child: [
      { title: "Participate", src: '', link: "Participate" , activeLinks:["Participate" , "EventDetails"] },
      { title: "Upcoming Event", src: '', link: "UpcomingEvent" , activeLinks:["UpcomingEvent", "UpcomingEventDetails"] },
      { title: "Past Event", src: '', link: "PastEvent" , activeLinks:["PastEvent", "PastEventDetails"] },
    ]},
    (userData?.role?.toLowerCase() === "partner") && { title: "Sponsoring", src: <PiAtomBold size={23} className="text-light_blue-100"/>  ,
    submenu: true, activeLinks:["UpcomingSponsorEvent" ,"SponsorCurrentRequest" , "PastSponsorEvent" , "SponsorRequestHistory" , "SponsorEventDetails" ,"SponsorCurrentRequestDetails" , "PastSponsorEventDetails" , "SponsorRequestHistoryDetails" ],
    child: [
      { title: "Upcoming Event", src: '', link: "UpcomingSponsorEvent" , activeLinks:["UpcomingSponsorEvent", "SponsorEventDetails"] },
      { title: "Current Requests", src: '', link: "SponsorCurrentRequest" , activeLinks:["SponsorCurrentRequest" , "SponsorCurrentRequestDetails"] },
      { title: "Past Event Sponsor", src: '', link: "PastSponsorEvent" , activeLinks:["PastSponsorEvent", "PastSponsorEventDetails"] },
      { title: "Request History", src: '', link: "SponsorRequestHistory" , activeLinks:["SponsorRequestHistory" ,"SponsorRequestHistoryDetails"] },
    ]},
    (userData?.role?.toLowerCase() === "member" || userData?.role?.toLowerCase() === "investor" || userData?.role?.toLowerCase() === "partner") && { title: "Document", src: <PiFolderThin size={23}  className="text-light_blue-100"/> , link:"Document"},
    { title: "History", src: <PiHourglassLowFill size={23} className="text-light_blue-100"/> , link:"History" },

  ];
  if (userData?.role === "Admin") {
    Menus.push({ title: "Users", src: <RiUser3Line size={23} className="text-light_blue-100"/> , link:"Users" });
  }

  const handleMouseEnter = () => {
    setShowLogout(true);
  };

  const handleMouseLeave = () => {
    setShowLogout(false);
  };
  const openLink = () =>{
    window.open('https://digitalmorocco.net', '_blank');
  }

  return (
  <div className={`bg-blue_gray-901 flex flex-col h-full min-h-screen pt-8 ${open ? "w-[280px]" : "w-20"} duration-300 relative `}>
    <BsArrowLeftShort className={`bg-white-A700 text-blue_gray-901 text-2xl rounded-full absolute -right-3 top-9 border border-blue_gray-901 cursorpointer ${!open && "rotate-180"}`} onClick={() => setOpen(!open)} />
    <div className="inline-flex px-5" >
      <img src={simpleLogo} className={`text-4xl rounded cursorpointer block float-left mr-2 ${open && "rotate-[360deg]"}`}  alt="logo" onClick={() => openLink()}/>
      <Link to="https://digitalmorocco.net" target="_blank" className="cursorpointer">
        <img src={simpleLogoText} className={`origin-left ${!open && "scale-0"}`} alt={""}/>
      </Link>
    </div>
    {/* <div className={`flex flex-col overflow-y-auto flex-1 h-full ${open ? "w-auto" : "w-20"} w-full pb-5 px-5`}> */}
      <ul className=" text-base font-dm-sans-regular leading-6 pt-3 px-5 flex-1">
        {Menus.map((Menu, index) => (
          Menu && <div key={index} >
            <li
              onClick={() => handleMenuClick(Menu)}
              className={`overflow-x-visible ${!open && 'w-fit'} group relative flex rounded-md p-2 cursorpointer hover:bg-blue_gray-902 hover:text-teal-400  ${(activeMenu === Menu.link || (activeParent === Menu.title && activeParent !== "Dashboard" )|| Menu.activeLinks?.includes(activeMenu) )? "bg-blue_gray-902 text-teal-400" : "hover-active-color"} text-gray-301 items-center ${open ? "gap-x-3" :"gap-x-1.5"} mt-3 `} 
              // title={!open ? Menu.title : ""}
            >
              <span className={`duration-200 ${(activeMenu === Menu.link || (activeParent === Menu.title && activeParent !== "Dashboard" ) || Menu.activeLinks?.includes(activeMenu)) ? "active-icon-color" : "hover-active-color"}`}>
                {Menu.src}
              </span>
              <span className={`${!open && "hidden"} origin-left duration-200 flex-1`}>
                        {Menu.title}
                    </span>
              {submenuOpen[`${Menu.title}`] && (
                open ? (
                  <BiChevronDown size={23} fontWeight={700} className={``} onClick={() => {setSubmenu(Menu.title, !submenuOpen[Menu.title])}} />
                ) : (
                  ""
                )
              )}
              {!open && (
              <div className="absolute ml-6 z-[1000] left-full invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0">
                <div className="bg-[#334081] w-auto h-[30px] rounded-[6px] px-[18px] py-[3px] flex items-center">
                  <div className="grow shrink basis-0 text-center text-white-A700 text-sm font-dm-sans-regular leading-relaxed">{Menu?.title}</div>
                </div>
              </div>
              )}
            </li>
            { Menu.submenu  && submenuOpen[Menu.title] && (
              Menu.child.map((el, i) => (
                <li
                  key={i}
                  onClick={() => {
                    setActiveMenu(el.link)
                    setActiveParent(Menu.title)
                    navigate(el.link);}}
                  className={`relative group flex text-base font-dm-sans-regular leading-6 ${!open && 'w-full'} rounded-md py-2 pl-10 cursorpointer hover:bg-blue_gray-902 hover:text-teal-400 ${(activeMenu === el.link || el.activeLinks?.includes(activeMenu)) ? "bg-blue_gray-902 text-teal-400" : ""} text-gray-301 items-center gap-x-2  mt-1 `} 
                  // title={!open ? el.title : ""}
                >
                  <span className={`${!open && "hidden"} flex-1 origin-left duration-200`}>
                      {el.title}
                  </span>
                  {!open && (
                  <div className="absolute ml-6 z-[1000] left-full invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0">
                    <div className="bg-[#334081] w-auto h-[30px] rounded-[6px] px-[18px] py-[3px] flex items-center">
                      <div className="grow shrink basis-0 text-center text-white-A700 text-sm font-dm-sans-regular leading-relaxed" 
                      style={{whiteSpace: 'nowrap'}}>{el?.title}</div>
                    </div>
                  </div>
                  )}
                </li>
              ))
            )}
          </div>
        ))}
      </ul>
      <div className=" text-base font-dm-sans-regular leading-6 px-5 mb-[60px]">
        <div
          onClick={() => {setSettingsOpen(!settingsOpen)
                  setActiveParent("settings")
                  // setActiveMenu("settings")
                  resetSubmenus();
          }}
          className={` ${!open && 'w-fit'} relative group flex ${!settingsOpen && 'mb-4'} rounded-md p-2 cursorpointer ${(activeMenu === "settings" || activeParent === "settings" || settingActiveLinks?.includes(activeMenu))? "bg-blue_gray-902 text-teal-400" : "hover-active-color"} text-gray-301 items-center ${open ? "gap-x-3" :"gap-x-1.5"} hover:bg-blue_gray-902 hover:text-teal-400 text-gray-301 items-center  gap-x-3 mt-3 `} 
        >
          <IoSettingsOutline size={23} className={`text-light_blue-100 ${(activeMenu === "settings" || activeParent === "settings" || settingActiveLinks?.includes(activeMenu) )? "active-icon-color" : "hover-active-color"}`} />
          <span className={`${!open && "hidden"} origin-left duration-200 flex-1`}>
              Settings
          </span>
          {(open && settingsOpen)  ? (
              <BiChevronDown size={23} className={``}  />
            ) : (
    ""    )}
          {!open && (
          <div className="absolute ml-6 z-[1000] left-full invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0">
            <div className="bg-[#334081] w-auto h-[30px] rounded-[6px] px-[18px] py-[3px] flex items-center">
              <div className="grow shrink basis-0 text-center text-white-A700 text-sm font-dm-sans-regular leading-relaxed" 
              style={{whiteSpace: 'nowrap'}}>{'Settings'}</div>
            </div>
          </div>
          )}
        </div>
        {settingsOpen && (
          <>
          <div
          onClick={() => {
            navigate("/UserProfile")
            setActiveParent("settings")
            setActiveMenu("UserProfile");}}
          className={`relative group flex text-base font-dm-sans-regular leading-6 ${!open && 'w-full'} rounded-md py-2 pl-10 cursorpointer hover:bg-blue_gray-902 hover:text-teal-400 ${(activeMenu === "UserProfile") ? "bg-blue_gray-902 text-teal-400" : "hover-active-color"} text-gray-301 items-center gap-x-2  mt-1 `} 
        >
          <span className={`${!open && "hidden"} flex-1 origin-left duration-200`}>
          My Profil
          </span>
          {!open && 
            (
          <div className="absolute ml-6 z-[1000] left-full invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0">
            <div className="bg-[#334081] w-auto h-[30px] rounded-[6px] px-[18px] py-[3px] flex items-center">
              <div className="grow shrink basis-0 text-center text-white-A700 text-sm font-dm-sans-regular leading-relaxed" 
              style={{whiteSpace: 'nowrap'}}>{'My Profil'}</div>
            </div>
          </div>      
          )}
        </div>
        <div
          onClick={() => {
            navigate("/Subscription")
            setActiveParent("settings")
            setActiveMenu("Subscription");}}
          className={`relative group mb-6 flex text-base font-dm-sans-regular leading-6 ${!open && 'w-full'} rounded-md py-2 pl-10 cursorpointer hover:bg-blue_gray-902 hover:text-teal-400 ${(activeMenu === "Subscription" || activeMenu === "ChoosePlan" || activeMenu === "subscribePlan" || subscriptionActiveLinks?.includes(activeMenu) )? "bg-blue_gray-902 text-teal-400" : ""} text-gray-301 items-center gap-x-2  mt-1 `} 
        >
          <span className={`${!open && "hidden"} flex-1 origin-left duration-200`}>
          Subscription & Billing
          </span>
          {!open && (
          <div className="absolute ml-6 z-[1000] left-full invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0">
            <div className="bg-[#334081] w-auto h-[30px] rounded-[6px] px-[18px] py-[3px] flex items-center">
              <div className="grow shrink basis-0 text-center text-white-A700 text-sm font-dm-sans-regular leading-relaxed" 
              style={{whiteSpace: 'nowrap'}}>{'Subscription & Billing'}</div>
            </div>
          </div>
          )}
        </div></>
        )}
        <div className={`border-t border-blue_gray-601 flex px-1 pt-5 items-center ${open ? "flex-row" : "flex-col gap-3"}`} >
          <div className="flex relative" 
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}>
          <img
            src={`${userData?.image || userDefaultProfil}`}
            alt=""
            className="w-9 h-auto rounded-full bg-cover"
          />
          {open && <div
            className={`
          flex justify-between items-center
          overflow-hidden transition-all ${open ? "w-52 ml-3" : "w-0"}
        `}
          >
            <div className="leading-4">
              <span className="text-white-A700">{userDetails?.displayName? userDetails?.displayName : "Camille Olivia"}</span>
            </div>
          </div>}
          {showLogout && (
            <div className="absolute top-full z-50 left-0 w-full">
              <div className={`group relative flex text-base bg-[#2C3563] font-dm-sans-regular leading-6 rounded-md ${open ? "px-[10px] py-2.5" : "px-[7px] py-2"} cursorpointer-green hover:bg-blue_gray-902 text-gray-301 items-center justify-center gap-x-2 ${userData?.role?.toLowerCase() === 'member'? 'mt-1' : 'mt-1' }`} 
                onClick={() => {
                  dispatch(logout());
                  navigate('/SignIn');
                }}>
                <HiOutlineLogout size={23} className="text-light_blue-100 group-hover:text-red-500 transition-colors duration-300" />
                <span className={`${!open && "hidden"} origin-left duration-200 transition-colors duration-300 flex-1 group-hover:text-red-500`}>
                  SignOut
                </span>
                {!open && (
                <div className="absolute ml-6 z-[1000] left-full invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0">
                  <div className="bg-[#334081] w-auto h-[30px] rounded-[6px] px-[18px] py-[3px] flex items-center">
                    <div className="grow shrink basis-0 text-center text-white-A700 text-sm font-dm-sans-regular leading-relaxed" 
                    style={{whiteSpace: 'nowrap'}}>{'SignOut'}</div>
                  </div>
                </div>
                )}
              </div>
              <div className="pb-5"></div>
            </div>
            )}
          </div>
          <div className={`relative flex ${(activeMenu === "Notification" || notifications?.unreadCount > 0) ? 'bg-teal-401' : ""}  p-1 rounded-full items-center justify-center cursorpointer`}
            onClick={() => {
                setNotifOpen(true);
                navigate('/Notification');
                setActiveMenu("Notification");
            }}>
            {/* Icône de notification */}
            <IoNotificationsOutline size={20} className={`text-white-A700 cursorponter ${activeMenu === "Notification" ? 'text-blue_gray-801' : ""}`} />
            
            {/* Badge de notifications non lues */}
            {notifications?.unreadCount > 0 && (
                <div className="absolute top-[-10px] right-[-10px] bg-blue-A400 text-white-A700 rounded-full text-xs w-5 h-5 flex items-center justify-center">
                    {notifications.unreadCount}
                </div>
            )}
          </div>
        </div>
        {userData?.role?.toLowerCase() === 'member' &&
        <div className={`border border-[#475467] ${ open ? "px-[16px] py-[12px] mt-5" : "px-[6px] py-[8px] mt-2"} rounded-[200px] flex flex-row items-center justify-between`}>
          <div className="flex gap-2 items-center">
            <img src={coinsIcon} className={`min-w-[23px] w-[23px] h-[23px] ${!open ? 'cursorpointer' : ''}`} onClick={() => {
              if (!open) { 
                navigate('/ManageCredits');
              }
            }}  alt={""}/>
            {open &&
              <span className="text-sm font-dm-sans-medium text-teal-A700">{userDetails?.subscription?.totalCredits || 0}</span>
            }
          </div>
          {/* <img src={questionImg} /> */}
          <div className="flex items-center">
          <Popup
          className="text-[#2C3462] creditQuestion"
            trigger={open => (
              <button className="button ml-2"><img src={questionImg}  alt={""}/></button>
            )}
            position="bottom center"
            on={['hover', 'focus']}
            closeOnDocumentClick
          >
          <div className="w-[228px] h-[50px] px-[18px] py-2.5 bg-[#2C3462] rounded-lg justify-center items-center flex">
            <div className="grow shrink basis-0 h-[30px] justify-center items-center flex">
              <div className="w-48 text-[#D0D5DD] text-[8px] font-dm-sans-regular">
                Explore a new dimension of flexibility: add credits at your convenience with just a click on the "Manage" button, and stay in control of your experience.
              </div>
            </div>
            </div>
          </Popup>
          </div>
          {open && 
            <button
            onClick={() => navigate('/ManageCredits')}
             className={`px-3 py-2 bg-teal-A700 hover:bg-greenbtnhoverbg active:bg-[#018080] rounded-[100px] justify-center items-center cursorpointer flex`}>
            <span className="text-white-A700 text-sm font-dm-sans-medium">Manage</span>
          </button>
          }
        </div>
        }
      </div>
    {/* </div> */}
  </div>



  );
};

export default SidebarNav;