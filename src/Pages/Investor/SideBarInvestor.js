import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
const SideBarInvestor = ({ handleMenuItemClick }) => { 
    const { userInfo } = useSelector((state) => state.auth)
    const [open, setOpen] = useState(true);
    const [activeMenu, setActiveMenu] = useState(decodeURIComponent(window.location.hash.substring(1)) || "History");
    const Menus = [
        // { title: "Dashboard", src: "dashboard" },
        // { title: "My Profil", src: "add-user" },
        { title: "Profile Status", src: "add-user" },
        // { title: "Events", src: "help" },
        // { title: "Documents", src: "document" },
        // { title: "Notifications", src: "notification" },
        //  { title: "Setting", src: "Settings" },
        { title: "History", src: "history" },
       
    ];
    const navigate = useNavigate()


    return (
        <div className='sticky top-0 left-0'>
        <div className={` ${open ? "w-72" : "w-20"} bg-gray-100 h-screen px-5 py-6 relative duration-300 rounded-md  `}>
            <img
                src="../img/control.png"
                alt=""  
                className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple border-2 rounded-full  ${!open && "rotate-180"}`}
                onClick={() => setOpen(!open)}
            />

                <div className="flex gap-x-4 items-center justify-center py-5">
               
                <div className={` duration-500  rounded-md p-2 hover:bg-light-white text-gray-300 text-sm flex items-center gap-x-4  `} >
                      
                </div>
            </div>
            <ul className="">
                {Menus.map((Menu, index) => (
                    <li
                        key={index} onClick={() => {
                            navigate('/Dashboard_investor#' + Menu.title)
                            handleMenuItemClick(Menu.title);
                            setActiveMenu(Menu.title);}}
                            className={`flex rounded-full p-2 cursor-pointer hover:bg-slate-400 text-black text-sm items-center gap-x-4 ${Menu.gap ? "mt-9" : "mt-2"} ${activeMenu === Menu.title ? "bg-slate-400" : ""}`}
                    >
                        <img src={`../img/${Menu.src}.png`} alt="" />
                        <span className={`${!open && "hidden"} origin-left duration-200`}>
                            {Menu.title}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
        </div>
    );
}
export default SideBarInvestor;