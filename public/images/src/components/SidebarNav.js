import React from "react";
import {AiOutlineMenu} from "react-icons/ai";
import {BiBuildings} from "react-icons/bi";
import { Menu, MenuItem, Sidebar, SubMenu, useProSidebar } from "react-pro-sidebar";
import { RiHome6Line } from "react-icons/ri";
import { TiFlashOutline } from "react-icons/ti";
import { PiFolderThin, PiHourglassLowFill } from "react-icons/pi";
import { HiOutlineTicket } from "react-icons/hi";
import { GoRocket } from "react-icons/go";
import { IoNotificationsOutline, IoSettingsOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const SidebarNav = () => {
  const { collapseSidebar } = useProSidebar();

  const sideBarMenu = [
    { icon: <TiFlashOutline size={22} />, label: "Investor", href: "/investor", active: window.location.pathname === "/investor"  },
    { icon: <HiOutlineTicket size={22}/>, label: "Event", href: "/event", active: window.location.pathname === "/event"  },
    { icon: <PiFolderThin size={22}/>, label: "Document", href: "/document", active: window.location.pathname === "/document" },
    { icon: <PiHourglassLowFill size={22}/>, label: "History", href: "/history", active: window.location.pathname === "/history"  },
  ];

  const sideBarMenu1 = [
    { label: "My Company", href: "/mycompany", active: window.location.pathname === "/mycompany" },
    { label: "Employee", href: "/employee", active: window.location.pathname === "/employee" },
    { label: "Legal", href: "/legaldocument", active: window.location.pathname === "/legaldocument" },
  ];
  return (
      <Sidebar className=" pt-2 bg-blue_gray-901 flex h-screen ">
        <div className="flex flex-none flex-col items-start">
          <i className="ml-auto mr-1 mt-1 text-white-A700" >
            <AiOutlineMenu onClick={() => {collapseSidebar();} }/>
          </i>
          <img
            className="h-[38px] ml-6 mr-[114px] w-[142px]"
            src="images/img_logo3.svg"
            alt="logo"
          />
        </div>
        <Menu
          menuItemStyles={{
            button: {
              padding: "10px 10px 10px 10px",
              gap: "16px",
              marginTop: "7px",
              color: "#cfd4dc",
              fontSize: "16px",
              fontFamily: "DM Sans",
              borderRadius: "8px",
              "&:hover, &.ps-active": {
                color: "#35d8bf",
                fontWeight: "400 !important",
                backgroundColor: "#2c3462ff !important",
              },
            },
          }}
          className="flex flex-1 flex-col items-center justify-start mb-[10px] mt-[25px] px-4 w-[89%] flex-grow h-screen"
        >
          <div className="flex flex-col items-start justify-start w-full">
            <MenuItem icon={<RiHome6Line size={22}/>} component={<Link to="/Dashbord" className="link" />}>
              Dashboard
            </MenuItem>
            <MenuItem icon={<GoRocket size={22}/>} component={<Link to="/Projects" className="link" />}>
              Projects
            </MenuItem>
            <SubMenu icon={<BiBuildings size={22}/>} label="Company">
              <div className="pl-10">
                {sideBarMenu1.map((menu, i) => (
                  <MenuItem key={`sideBarMenu1Item${i}`} {...menu}>
                    {menu.label}
                  </MenuItem>
                ))}
              </div>
            </SubMenu>
            {sideBarMenu.map((menu, i) => (
              <MenuItem key={`sideBarMenuItem${i}`} {...menu}>
                {menu.label}
              </MenuItem>
            ))}
          </div>
          <div className="flex flex-col items-end content-end justify-start mt-auto pb-2 w-full">
            <MenuItem icon={<IoSettingsOutline size={22}/>}>
              Settings
            </MenuItem>
            <div className="bg-blue_gray-700 h-px mt-[20px] w-full" />
            <div className="mt-auto flex flex-col items-center">
              <MenuItem className="flex items-center">
                <div className="w-9 h-9 rounded-full bg-cover mr-2">
                  <img
                    className=""
                    src="images/img_avatar.svg"
                    alt="logo"
                  />
                </div>
                <div className="mt-2">
                  Camille Olivia
                </div>
                <div className="place-items-end ml-7 mt-2">
                  <IoNotificationsOutline size={22}/>
                </div>
              </MenuItem>
            </div>
          </div>
        </Menu>
      </Sidebar>
  );
};

export default SidebarNav;