import React, { useState } from "react";
import { BsArrowLeftShort, BsDot } from "react-icons/bs";
import { BiChevronDown } from "react-icons/bi";
import { BiBuildings } from "react-icons/bi";
import { GoRocket } from "react-icons/go";
import { RiHome6Line, RiUser3Line } from "react-icons/ri";
import { TiFlashOutline } from "react-icons/ti";
import { useSelector } from 'react-redux';
import { PiFolderThin, PiHourglassLowFill } from "react-icons/pi";
import { HiOutlineTicket } from "react-icons/hi";
import { IoNotificationsOutline, IoSettingsOutline } from "react-icons/io5";
import { useNavigate, Link } from "react-router-dom";



const SidebarNav = () => {
  const { userInfo } = useSelector((state) => state.auth)
    const [open, setOpen] = useState(true);
    const [submenuOpen, setSubmenuOpen] = useState({
      company: false,
      investor: false,
      event: false,
      // Ajoutez d'autres sous-menus si nécessaire
    });
    const [settingsOpen , setSettingsOpen] = useState(false);
    const [notifOpen , setNotifOpen] = useState(false);

    const [activeMenu, setActiveMenu] = useState(decodeURIComponent(window.location.hash.substring(1)) || "History");

    const navigate=useNavigate()

    const userData = JSON.parse(sessionStorage.getItem('userData'));


    const setSubmenu = (submenuName, isOpen) => {
      setSubmenuOpen(prevState => ({
        ...prevState,
        [submenuName]: isOpen,
      }));
    };
    
    const Menus = [
      { title: "Dashboard", src: <RiHome6Line size={22} className="text-light_blue-100" /> , link:"Dashboard" },
      
      { title: "Projects", src: <GoRocket size={22} className="text-light_blue-100"/>, link:"Projects" },
      //(userInfo?.member || userInfo?.partner) && 
      {
        title: "Company", src: <BiBuildings size={22} className="text-light_blue-100"/>,
        submenu: true,
        child: [
          //(userInfo?.member?.companyName || userInfo?.partner?.companyName) && 
          { title: "My Company", src: '', link: "MyCompany" },
          { title: "Employee", src: '', link: "Employees" },
          { title: "Legal", src: '', link: "CompanyLegal" },
        ]
      }
      ,
      { title: "Investor", src: <TiFlashOutline size={22} className="text-light_blue-100"/> ,
      submenu: true,
      child: [
        //(userInfo?.member?.companyName || userInfo?.partner?.companyName) && 
        { title: "Investor List", src: '', link: "Investors" },
        { title: "My Investors", src: '', link: "MyInvestors" },
        { title: "Request History", src: '', link: "InvestorRequestsHistoty" },
      ]
      },
      { title: "Event", src: <HiOutlineTicket size={22} className="text-light_blue-100"/>  ,
      submenu: true,
      child: [
        { title: "Participate", src: '', link: "Participate" },
        { title: "Upcoming Event", src: '', link: "UpcomingEvent" },
        { title: "Past Event", src: '', link: "PastEvent" },
      ]},
      { title: "Document", src: <PiFolderThin size={22}  className="text-light_blue-100"/> , link:"Document"},
      { title: "History", src: <PiHourglassLowFill size={22} className="text-light_blue-100"/> , link:"History" },
  
    ];
    if (userData?.role === "Admin") {
      Menus.push({ title: "Users", src: <RiUser3Line size={22} className="text-light_blue-100"/> , link:"Users" });
    }
    
  return (
    <div className={`bg-blue_gray-901 flex flex-col h-full min-h-screen p-5 pt-8 ${open ? "w-64" : "w-20"} duration-300 relative`}>
    <BsArrowLeftShort className={`bg-white-A700 text-blue_gray-901 text-2xl rounded-full absolute -right-3 top-9 border border-blue_gray-901 cursor-pointer ${!open && "rotate-180"}`} onClick={() => setOpen(!open)} />
    <div className="inline-flex">
    <img src="/images/img_simple_logo.svg" className={`text-4xl rounded cursor-pointer block float-left mr-2 ${open && "rotate-[360deg]"}`}  alt="logo" onClick={() => navigate("/")}/>
  <Link to="/">
    <img src="/images/img_simple_logo_text.svg" className={`origin-left ${!open && "scale-0"}`}/>
  </Link>
</div>
  <ul className="font-DmSans text-base font-normal leading-6 pt-3 flex-1">
    {Menus.map((Menu, index) => (
      Menu && <div key={index} >
        <li
        onClick={() => {
          (Menu.submenu && setSubmenu(Menu.title, !submenuOpen[Menu.title]))
          navigate( Menu.link)
          setActiveMenu(Menu.title);}}
          className={` ${!open && 'w-fit'} flex rounded-md p-2 cursor-pointer hover:bg-blue_gray-902 hover:text-teal-400 ${activeMenu === Menu.link ? "bg-blue_gray-902 text-teal-400" : ""} text-gray-301 items-center ${open ? "gap-x-3" :"gap-x-1.5"} mt-3 `}
        >
          {Menu.src}
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
        </li>
        { Menu.submenu  && submenuOpen[Menu.title] && (

          Menu.child.map((el, i) => (
            <li
              key={i}
              onClick={() => {
                navigate(el.link)
                setActiveMenu(el.link);}}
              className={`font-DmSans flex text-base font-normal leading-6 ${!open && 'w-full'} rounded-md py-2 pl-10 cursor-pointer hover:bg-blue_gray-902 hover:text-teal-400 ${activeMenu === el.link ? "bg-blue_gray-902 text-teal-400" : ""} text-gray-301 items-center gap-x-2  mt-1 `}
            >
              <span className={`${!open && "hidden"} flex-1 origin-left duration-200`}>
                        {el.title}
                    </span>

            </li>))
        )}
      </div>
    ))}
  </ul>
  <div className="font-DmSans text-base font-normal leading-6">
    <div
    onClick={() => {setSettingsOpen(!settingsOpen)}}
      className={` ${!open && 'w-fit'} flex ${!settingsOpen && 'mb-4'} rounded-md p-2 cursor-pointer hover:bg-blue_gray-902 hover:text-teal-400 text-gray-301 items-center  gap-x-3 mt-3 `}
    >
      <IoSettingsOutline size={22} className="text-light_blue-100"/>
      <span className={`${!open && "hidden"} origin-left duration-200 flex-1`}>
          Settings
      </span>
      {(open && settingsOpen)  ? (
              <BiChevronDown size={22} className={``}  />
            ) : (
""      )}
    </div>
    {settingsOpen && (
      <>
      <div
      onClick={() => {
        navigate("/UserProfile")
        setActiveMenu("My Profil");}}
      className={`font-DmSans flex text-base font-normal leading-6 ${!open && 'w-full'} rounded-md py-2 pl-10 cursor-pointer hover:bg-blue_gray-902 hover:text-teal-400 ${activeMenu === "My Profil"? "bg-blue_gray-902 text-teal-400" : ""} text-gray-301 items-center gap-x-2  mt-1 `}
    >
      <span className={`${!open && "hidden"} flex-1 origin-left duration-200`}>
      My Profil
      </span>

    </div>
    <div
      onClick={() => {
        navigate("/Subscription")
        setActiveMenu("Subscription & Billing");}}
      className={`font-DmSans  mb-6 flex text-base font-normal leading-6 ${!open && 'w-full'} rounded-md py-2 pl-10 cursor-pointer hover:bg-blue_gray-902 hover:text-teal-400 ${activeMenu === "Subscription & Billing"? "bg-blue_gray-902 text-teal-400" : ""} text-gray-301 items-center gap-x-2  mt-1 `}
    >
      <span className={`${!open && "hidden"} flex-1 origin-left duration-200`}>
      Subscription & Billing
      </span>
    </div></>
    )}
    <div className="border-t border-blue_gray-601 flex px-1 py-3 items-center">
      <img
        src="/images/img_avatar.svg"
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
        <span className="text-white-A700">{userData?.displayName? userData?.displayName : "Camille Olivia"}</span>
        </div>
      </div>
      <div className={`flex ${notifOpen? 'bg-teal-401' :""}  p-1 rounded-full items-center justify-center cursor-pointer`} 
      onClick={()=> {
        setNotifOpen(true)
        navigate('/Notification')
        setActiveMenu("Notification")
      }}>
      <IoNotificationsOutline size={20} className={`text-white-A700 ${notifOpen? 'text-blue_gray-801' :""}`}/>
      </div>
    </div>
  </div>

</div>

  );
};

export default SidebarNav;