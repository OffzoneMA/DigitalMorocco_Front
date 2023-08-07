import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
const SideBar = ({ handleMenuItemClick }) => { 
    const { userInfo } = useSelector((state) => state.auth)
    const [open, setOpen] = useState(true);
    const [activeMenu, setActiveMenu] = useState("Dashboard");
    const Menus = [
        { title: "Dashboard", src: "dashboard" },
        { title: "My Profil", src: "add-user" },
        { title: "My Entreprise", src: "corporate" },
        { title: "Events", src: "help" },
        { title: "Investors", src: "investor" },
        { title: "Documents", src: "document" },
        { title: "Notifications", src: "notification" },
        { title: "Historique", src: "history" },
        { title: "Setting", src: "Settings" },
    ];


    return (
        <div className='sticky top-0 left-0'>
        <div className={` ${open ? "w-72" : "w-20"} bg-gray-100 h-screen px-5 py-6 relative duration-300 rounded-md  `}>
            <img
                src="../img/control.png"
                alt=""  
                className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple border-2 rounded-full  ${!open && "rotate-180"}`}
                onClick={() => setOpen(!open)}
            />
           {open && <div className='flex items-center  text-center p-8 '>
                    <span className='text-sm bg-gray-700 px-3 py-2 rounded-md text-white  shadow-2xl' >
                    Subscription expires in :  <br />
                      <span className='font-bold italic'>
                        {new Date(userInfo?.member?.expireDate).toLocaleDateString('en-US', {
                            weekday: 'short',
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                           
                        })}</span>  
                    
                    
                </span>
            </div>}
                {!userInfo?.member?.name &&     <NavLink
                    to="/Create_Startup"
                    className={` ${!open &&'hidden'}  bg-white p-3 rounded-full `}
            >
               + Create Startup
            </NavLink>}
                <div className="flex gap-x-4 items-center justify-center py-5">
               
                <div className={` duration-500  rounded-md p-2 hover:bg-light-white text-gray-300 text-sm flex items-center gap-x-4  `} >
                        <div className=' rounded-full bg-white flex items-center justify-center text-black font-bold py-2 px-3'>
                            <span>{userInfo?.member?.credits} {open && "credits"}</span>
                    </div>
                        {userInfo?.member?.name && <h1 className='not-italic text-black'>My Startup</h1>}  
                </div>
            </div>
            <ul className="">
                {Menus.map((Menu, index) => (
                    <li
                        key={index} onClick={() => {handleMenuItemClick(Menu.title);
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
export default SideBar;