import React, { useState } from 'react';
const SideBar = ({ handleMenuItemClick }) => {
    const [open, setOpen] = useState(false);
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
        <div className={` ${open ? "w-72" : "w-20"} bg-gray-100 h-screen p-5 pt-8 relative duration-300 rounded-md -mt-4 `}>
            <img
                src="../img/control.png"
                alt=""
                className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple border-2 rounded-full  ${!open && "rotate-180"}`}
                onClick={() => setOpen(!open)}
            />
            <div className="flex gap-x-4 items-center">
               
                <div className={`cursor-pointer duration-500 ${open ? "rotate-[360deg]" : ""} rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm flex items-center gap-x-4 ${open ? "" : "hidden"}`} >
                    <div className=' h-6 rounded-full bg-white flex items-center justify-center text-black font-bold'>
                        <span id="credits">20 credits</span>
                    </div>
                    <h1 className='not-italic text-black'>Nom de Startup</h1>
                </div>
            </div>
            <ul className="pt-6">
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