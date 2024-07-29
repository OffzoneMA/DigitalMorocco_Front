import React, { useState } from "react";
import { AiFillEnvironment } from "react-icons/ai";
import { BsArrowLeftShort, BsChevronDown, BsCircle, BsDot } from "react-icons/bs";
import { BiBuildings } from "react-icons/bi";
import { GoRocket } from "react-icons/go";
import { RiHome6Line } from "react-icons/ri";
import { TiFlashOutline } from "react-icons/ti";
import { PiFolderThin, PiHourglassLowFill } from "react-icons/pi";
import { HiOutlineTicket } from "react-icons/hi";
import { IoNotificationsOutline, IoSettingsOutline } from "react-icons/io5";

const Sidebar22 = () => {
    const [open, setOpen] = useState(true);
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const Menus = [
    { title: "Dashboard", src: <RiHome6Line size={22} /> },
    { title: "Users", src: <RiUser3Line size={22} /> , link:"Users" },
    { title: "Projects", src: <GoRocket size={22} /> },
    {
      title: "Company", src: <BiBuildings size={22} />,
      submenu :true,
      child: [
        { title: "My Company", src: '' },
        { title: "Employee", src: '' },
        { title: "Legal", src: '' },

      ] },
    { title: "Investor", src: <TiFlashOutline size={22} /> },
    { title: "Event", src: <HiOutlineTicket size={22} /> },
    { title: "Document", src: <PiFolderThin size={22}  /> },
    { title: "History", src: <PiHourglassLowFill size={22} /> },

  ];
    return (
        <div className={`bg-blue_gray-901 flex flex-col min-h-screen p-5 pt-8 ${open ? "w-64" : "w-20"} duration-300 relative`}>
            <BsArrowLeftShort className={`bg-white-A700 text-blue_gray-901 text-2xl rounded-full absolute -right-3 top-9 border border-blue_gray-901 cursor-pointer ${!open && "rotate-180"}`} onClick={() => setOpen(!open)} />
            <div className="inline-flex">
              <img src="images/img_simple_logo.svg" className={`text-4xl rounded cursor-pointer block float-left mr-2 ${open && "rotate-[360deg]"}`}  alt="logo"/>
              <img src="images/img_simple_logo_text.svg" className={`origin-left ${!open && "scale-0"}`}/>
            </div>
          <ul className="font-DmSans text-base font-normal leading-6 pt-3 flex-1">
            {Menus.map((Menu, index) => (
              Menu && <div key={index} >
                <li
                  className={` ${!open && 'w-fit'} flex rounded-md p-2 cursor-pointer hover:bg-blue_gray-902 hover:text-teal-400 text-gray-300 items-center  gap-x-3 mt-3 `}
                >
                  {Menu.src}
                  <span className={`${!open && "hidden"} origin-left duration-200 flex-1`}>
                            {Menu.title}
                        </span>
                  {Menu.submenu && (
                    open ? (
                      <BsChevronDown className={`${submenuOpen && "rotate-180"}`} onClick={() => {setSubmenuOpen(!submenuOpen)}} />
                    ) : (
                      <BsDot size={18} className="text-gray-500" />
                    )
                  )}
                </li
                  >
                { Menu.submenu  && submenuOpen && (

                  Menu.child.map((el, i) => (
                    <li
                      key={i}
                      className={`font-DmSans text-base font-normal leading-6 ${!open && 'w-fit'}  flex rounded-md py-2 px-4 cursor-pointer hover:bg-blue_gray-902 hover:text-teal-400 text-gray-300 items-center gap-x-2 ml-5 mt-1 `}
                    >
                      <span className={`${!open && "hidden"} origin-left duration-200`}>
                                {el.title}
                            </span>

                    </li>))
                )}
              </div>
            ))}
          </ul>
          <div className="font-DmSans text-base font-normal leading-6">
            <div
              className={` ${!open && 'w-fit'} flex rounded-md p-2 mb-4 cursor-pointer hover:bg-blue_gray-902 hover:text-teal-400 text-gray-300 items-center  gap-x-3 mt-3 `}
            >
              <IoSettingsOutline size={22}/>
              <span className={`${!open && "hidden"} origin-left duration-200 flex-1`}>
                            Settings
                        </span>

            </div>
            <div className="border-t flex px-2 py-3 items-center">
              <img
                src="images/img_avatar.svg"
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
                  <span className=" text-white-A700">Camille Olivia</span>
                </div>
              </div>
              <IoNotificationsOutline size={26} className="text-white-A700"/>
            </div>
          </div>

        </div>
  );
};
export default Sidebar22;
