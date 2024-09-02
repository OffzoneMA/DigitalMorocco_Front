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

const SidebarNav = () => {
  const { loading, userInfo, error } = useSelector((state) => state.auth)
  const {data: userDetails , error: userDetailsError , isLoading: userDetailsLoading} = useGetUserDetailsQuery();
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

  console.log(activeMenu)
  console.log(activeParent)

  const navigate=useNavigate()

  const userData = JSON.parse(sessionStorage.getItem('userData'));

  useEffect(() => {
    setActiveMenu(location.pathname.split('/')[1]);
  }, [location.pathname]);

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
    { title: "Dashboard", src: <RiHome6Line size={22} className="text-light_blue-100" /> , link: userData?.role?.toLowerCase() === "admin"? "Dashboard_Admin": "Dashboard" },
    
    (userData?.role?.toLowerCase() === "member") &&  { title: "Projects", src: <GoRocket size={22} className="text-light_blue-100"/>, link:"Projects" , activeLinks: ["Projects" , "Createproject" , "Editproject" , "Projectdetails"] },
    (userData?.role?.toLowerCase() === "member") && {
      title: "Company", src: <BiBuildings size={22} className="text-light_blue-100"/>,
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
    title: "Investor", src: <TiFlashOutline size={22} className="text-light_blue-100"/> , 
    submenu: true, activeLinks: ["InvestorDetails" , "InvestorRequestsHistoty" , "MyInvestors" , "Investors"] ,
    child: [
      //(userInfo?.member?.companyName || userInfo?.partner?.companyName) && 
      { title: "Investor List", src: '', link: "Investors" , activeLinks: ["Investors" ,"InvestorDetails"] },
      { title: "My Investors", src: '', link: "MyInvestors" , activeLinks: ["MyInvestors"]},
      { title: "Request History", src: '', link: "InvestorRequestsHistoty" , activeLinks:["InvesotrRequestsHistoty"] },
    ]
    },
    { title: "Event", src: <HiOutlineTicket size={22} className="text-light_blue-100"/>  ,
    submenu: true, activeLinks:["Participate" ,"UpcomingEventDetails" , "PastEventDetails" , "PastEvent" , "UpcomingEvent"],
    child: [
      { title: "Participate", src: '', link: "Participate" , activeLinks:["Participate"] },
      { title: "Upcoming Event", src: '', link: "UpcomingEvent" , activeLinks:["UpcomingEvent", "UpcomingEventDetails"] },
      { title: "Past Event", src: '', link: "PastEvent" , activeLinks:["PastEvent", "PastEventDetails"] },
    ]},
    (userData?.role?.toLowerCase() === "member") && { title: "Document", src: <PiFolderThin size={22}  className="text-light_blue-100"/> , link:"Document"},
    { title: "History", src: <PiHourglassLowFill size={22} className="text-light_blue-100"/> , link:"History" },

  ];
  if (userData?.role === "Admin") {
    Menus.push({ title: "Users", src: <RiUser3Line size={22} className="text-light_blue-100"/> , link:"Users" });
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
      <div className={`bg-blue_gray-901 flex flex-col h-full min-h-screen p-5 pt-8 ${open ? "w-[280px]" : "w-20"} duration-300 relative`}>
    <BsArrowLeftShort className={`bg-white-A700 text-blue_gray-901 text-2xl rounded-full absolute -right-3 top-9 border border-blue_gray-901 cursorpointer ${!open && "rotate-180"}`} onClick={() => setOpen(!open)} />
    <div className="inline-flex" >
      <img src={simpleLogo} className={`text-4xl rounded cursorpointer block float-left mr-2 ${open && "rotate-[360deg]"}`}  alt="logo" onClick={() => openLink()}/>
    <Link to="https://digitalmorocco.net" target="_blank" className="cursorpointer">
      <img src={simpleLogoText} className={`origin-left ${!open && "scale-0"}`} alt={""}/>
    </Link>
   </div>
  <ul className=" text-base font-dm-sans-regular leading-6 pt-3 flex-1">
    {Menus.map((Menu, index) => (
      Menu && <div key={index} >
        <li
          onClick={() => handleMenuClick(Menu)}
          className={` ${!open && 'w-fit'} group relative flex rounded-md p-2 cursorpointer hover:bg-blue_gray-902 hover:text-teal-400  ${(activeMenu === Menu.link || (activeParent === Menu.title && activeParent !== "Dashboard" )|| Menu.activeLinks?.includes(activeMenu) )? "bg-blue_gray-902 text-teal-400" : "hover-active-color"} text-gray-301 items-center ${open ? "gap-x-3" :"gap-x-1.5"} mt-3 `} 
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
              <BiChevronDown size={22} fontWeight={700} className={``} onClick={() => {setSubmenu(Menu.title, !submenuOpen[Menu.title])}} />
            ) : (
              ""
            )
          )}
          {!open && (
          <div className="absolute top-[100%] z-10 left-0 transform hidden group-hover:flex flex-col items-start">
            <div className="mb-px ml-[12px]">
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="7" viewBox="0 0 13 7" fill="none">
                <path d="M0.8547 5.26895L5.81768 0.63683C6.20189 0.278237 6.79811 0.278237 7.18232 0.636829L12.1453 5.26894C12.8088 5.88823 12.3706 7 11.463 7H1.53702C0.629399 7 0.191179 5.88823 0.8547 5.26895Z" fill="#2C3563"/>
              </svg>
            </div>
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
              <div className="absolute top-[100%] z-10 left-0 transform hidden group-hover:flex flex-col items-start">
                <div className="mb-px ml-[12px]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="13" height="7" viewBox="0 0 13 7" fill="none">
                    <path d="M0.8547 5.26895L5.81768 0.63683C6.20189 0.278237 6.79811 0.278237 7.18232 0.636829L12.1453 5.26894C12.8088 5.88823 12.3706 7 11.463 7H1.53702C0.629399 7 0.191179 5.88823 0.8547 5.26895Z" fill="#2C3563"/>
                  </svg>
                </div>
                <div className="bg-[#334081] w-auto h-[30px] rounded-[6px] px-[18px] py-[3px] flex items-center">
                  <div className="grow shrink basis-0 text-center text-white-A700 text-sm font-dm-sans-regular leading-relaxed" 
                  style={{whiteSpace: 'nowrap'}}>{el?.title}</div>
                </div>
              </div>
              )}
            </li>))
        )}
      </div>
    ))}
  </ul>
  <div className=" text-base font-dm-sans-regular leading-6">
    <div
      onClick={() => {setSettingsOpen(!settingsOpen)
              setActiveParent("settings")
              setActiveMenu("settings")
              resetSubmenus();
      }}
      className={` ${!open && 'w-fit'} relative group flex ${!settingsOpen && 'mb-4'} rounded-md p-2 cursorpointer ${(activeMenu === "settings" || activeParent === "settings")? "bg-blue_gray-902 text-teal-400" : "hover-active-color"} text-gray-301 items-center ${open ? "gap-x-3" :"gap-x-1.5"} hover:bg-blue_gray-902 hover:text-teal-400 text-gray-301 items-center  gap-x-3 mt-3 `} 
      // title={!open ? "Settings" : ""}
    >
      <IoSettingsOutline size={22} className={`text-light_blue-100 ${activeMenu === "settings" || activeParent === "settings" ? "active-icon-color" : "hover-active-color"}`} />
      <span className={`${!open && "hidden"} origin-left duration-200 flex-1`}>
          Settings
      </span>
      {(open && settingsOpen)  ? (
          <BiChevronDown size={22} className={``}  />
        ) : (
""    )}
      {!open && (
      <div className="absolute top-[100%] z-10 left-0 transform hidden group-hover:flex flex-col items-start">
        <div className="mb-px ml-[12px]">
          <svg xmlns="http://www.w3.org/2000/svg" width="13" height="7" viewBox="0 0 13 7" fill="none">
            <path d="M0.8547 5.26895L5.81768 0.63683C6.20189 0.278237 6.79811 0.278237 7.18232 0.636829L12.1453 5.26894C12.8088 5.88823 12.3706 7 11.463 7H1.53702C0.629399 7 0.191179 5.88823 0.8547 5.26895Z" fill="#2C3563"/>
          </svg>
        </div>
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
      className={`relative group flex text-base font-dm-sans-regular leading-6 ${!open && 'w-full'} rounded-md py-2 pl-10 cursorpointer hover:bg-blue_gray-902 hover:text-teal-400 ${activeMenu === "UserProfile"? "bg-blue_gray-902 text-teal-400" : ""} text-gray-301 items-center gap-x-2  mt-1 `} 
      title={!open ? "My Profil" : ""}
    >
      <span className={`${!open && "hidden"} flex-1 origin-left duration-200`}>
      My Profil
      </span>
      {!open && (
      <div className="absolute top-[100%] z-10 left-0 transform hidden group-hover:flex flex-col items-start">
        <div className="mb-px ml-[12px]">
          <svg xmlns="http://www.w3.org/2000/svg" width="13" height="7" viewBox="0 0 13 7" fill="none">
            <path d="M0.8547 5.26895L5.81768 0.63683C6.20189 0.278237 6.79811 0.278237 7.18232 0.636829L12.1453 5.26894C12.8088 5.88823 12.3706 7 11.463 7H1.53702C0.629399 7 0.191179 5.88823 0.8547 5.26895Z" fill="#2C3563"/>
          </svg>
        </div>
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
      className={`relative group mb-6 flex text-base font-dm-sans-regular leading-6 ${!open && 'w-full'} rounded-md py-2 pl-10 cursorpointer hover:bg-blue_gray-902 hover:text-teal-400 ${(activeMenu === "Subscription" || activeMenu === "ChoosePlan" || activeMenu === "SubscribePlan" )? "bg-blue_gray-902 text-teal-400" : ""} text-gray-301 items-center gap-x-2  mt-1 `} 
      // title={!open ? "Subscription & Billing" : ""}
    >
      <span className={`${!open && "hidden"} flex-1 origin-left duration-200`}>
      Subscription & Billing
      </span>
      {!open && (
      <div className="absolute top-[100%] z-10 left-0 transform hidden group-hover:flex flex-col items-start">
        <div className="mb-px ml-[12px]">
          <svg xmlns="http://www.w3.org/2000/svg" width="13" height="7" viewBox="0 0 13 7" fill="none">
            <path d="M0.8547 5.26895L5.81768 0.63683C6.20189 0.278237 6.79811 0.278237 7.18232 0.636829L12.1453 5.26894C12.8088 5.88823 12.3706 7 11.463 7H1.53702C0.629399 7 0.191179 5.88823 0.8547 5.26895Z" fill="#2C3563"/>
          </svg>
        </div>
        <div className="bg-[#334081] w-auto h-[30px] rounded-[6px] px-[18px] py-[3px] flex items-center">
          <div className="grow shrink basis-0 text-center text-white-A700 text-sm font-dm-sans-regular leading-relaxed" 
          style={{whiteSpace: 'nowrap'}}>{'Subscription & Billing'}</div>
        </div>
      </div>
      )}
    </div></>
    )}
    <div className="flex flex-col relative" 
     onMouseEnter={handleMouseEnter}
     onMouseLeave={handleMouseLeave}>
      <div className="border-t border-blue_gray-601 flex px-1 pt-5 items-center" >
        <img
          src={`${userData?.image || userImg}`}
          alt=""
          className="w-9 h-9 rounded-full bg-cover"
        />
        <div
          className={`
        flex justify-between items-center
        overflow-hidden transition-all ${open ? "w-52 ml-3" : "w-0"}
      `}
        >
          <div className="leading-4">
          <span className="text-white-A700">{userDetails?.displayName? userDetails?.displayName : "Camille Olivia"}</span>
          </div>
        </div>
        <div className={`flex ${activeMenu === "Notification" ? 'bg-teal-401' :""}  p-1 rounded-full items-center justify-center cursorpointer`} 
        onClick={()=> {
          setNotifOpen(true)
          navigate('/Notification')
          setActiveMenu("Notification")
        }}>
        <IoNotificationsOutline size={20} className={`text-white-A700 ${activeMenu === "Notification"? 'text-blue_gray-801' :""}`}/>
        </div>
      </div>
      {showLogout && (
      <div className="absolute top-full left-0 w-full">
        <div className={`group relative flex text-base bg-[#2C3563] font-dm-sans-regular leading-6 rounded-md px-[10px] py-2.5 cursorpointer-green hover:bg-blue_gray-902 text-gray-301 items-center justify-center gap-x-2 ${userData?.role?.toLowerCase() === 'member'? 'mt-1' : 'mt-1' }`} 
        title={!open ? "SignOut" : ""}
          onClick={() => {
            dispatch(logout());
            navigate('/SignIn');
          }}>
          <HiOutlineLogout size={22} className="text-light_blue-100 group-hover:text-red-500 transition-colors duration-300" />
          <span className={`${!open && "hidden"} origin-left duration-200 transition-colors duration-300 flex-1 group-hover:text-red-500`}>
            SignOut
          </span>
          {!open && (
          <div className="absolute top-[100%] z-10 left-0 transform hidden group-hover:flex flex-col items-start">
            <div className="mb-px ml-[12px]">
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="7" viewBox="0 0 13 7" fill="none">
                <path d="M0.8547 5.26895L5.81768 0.63683C6.20189 0.278237 6.79811 0.278237 7.18232 0.636829L12.1453 5.26894C12.8088 5.88823 12.3706 7 11.463 7H1.53702C0.629399 7 0.191179 5.88823 0.8547 5.26895Z" fill="#2C3563"/>
              </svg>
            </div>
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
    {userData?.role?.toLowerCase() === 'member' &&
    <div className={`border border-[#475467] py-[12px] ${ open ? "px-[16px]" : "px-[7px]"} rounded-[200px] flex flex-row items-center justify-between mt-5`}>
      <div className="flex gap-2 items-center">
        <img src={coinsIcon} className="min-w-[23px] w-[23px] h-[23px]" alt={""}/>
        {open &&
          <span className="text-sm font-dm-sans-medium text-teal-A700">{userDetails?.subscription?.totalCredits || 0}</span>
        }
      </div>
      {/* <img src={questionImg} /> */}
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
      {open && 
        <button className={`px-3 py-2 bg-teal-A700 rounded-[100px] justify-center items-center flex`}>
        <span className="text-white-A700 text-sm font-dm-sans-medium">Manage</span>
      </button>
      }
    </div>
    }
    </div>
    
  </div>



  );
};

export default SidebarNav;