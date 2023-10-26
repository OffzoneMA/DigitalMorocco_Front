import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { Cog8ToothIcon, ClockIcon, EnvelopeIcon,ListBulletIcon,UserCircleIcon, UsersIcon,UserGroupIcon, UserIcon } from '@heroicons/react/24/outline';

const SideBarInvestor = ({ handleMenuItemClick }) => { 
    const { userInfo } = useSelector((state) => state.auth)
    const [open, setOpen] = useState(true);
    const [activeMenu, setActiveMenu] = useState(decodeURIComponent(window.location.hash.substring(1)) || "History");
    const Menus = [
        { title: "My Profil", src: <UserIcon className='w-5 h-5' /> },
        { title: "Profile Status", src: <UserCircleIcon className='w-5 h-5' /> },
        {
            title: "Contacts", src: <UserGroupIcon className='w-5 h-5' />, 
            child: [
                { title: "Contact Requests", src: <UsersIcon className='w-4 h-4' /> },
                { title: "Messages", src: <EnvelopeIcon className='w-4 h-4' />},
            ] },
        { title: "List Projects", src: <ListBulletIcon className='w-5 h-5' />},
        { title: "History", src: <ClockIcon className='w-5 h-5' /> },
        { title: "Setting", src: <Cog8ToothIcon className='w-5 h-5' /> },

    ];
    const navigate = useNavigate()


    return (
        <div className='pb-10'>
            <div className={` ${open ? "w-72" : "w-28"} bg-white-100 shadow-2xl min-h-screen px-5 py-6 relative duration-300 rounded-md  `}>
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
                    {Menus.map((Menu, index) => (<div key={index}>
                    <li
                        onClick={() => {
                            navigate('/Dashboard_investor#' + Menu.title)
                            handleMenuItemClick(Menu.title);
                            setActiveMenu(Menu.title);}}
                        className={` ${!open && 'w-fit'} flex rounded-full p-2 cursor-pointer hover:bg-blue-400 hover:text-white text-black items-center  gap-x-2 mt-3 ${activeMenu === Menu.title ? "bg-blue-500 text-white" : ""}`}                    >
                        {Menu.src}
                        <span className={`${!open && "hidden"} origin-left duration-200`}>
                           {Menu.title}
                        </span>
                    </li>
                    {Menu.child &&

                        Menu.child.map((el, i) => (
                            <li
                                key={i}
                                onClick={() => {
                                    navigate('/Dashboard_investor#' + el.title)
                                    handleMenuItemClick(el.title);
                                    setActiveMenu(el.title);
                                }}

                                className={`${!open && 'w-fit'}  flex rounded-full p-2 cursor-pointer hover:bg-blue-400 hover:text-white text-black items-center gap-x-2 ml-5 mt-1 ${activeMenu === el.title ? "bg-blue-500 text-white" : ""}`}
                            >
                                {el.src}
                                <span className={`${!open && "hidden"} origin-left duration-200`}>
                                    {el.title} 
                                </span>
                                {el?.badge && <span className='self-center justify-self-center text-xs rounded-full px-[6px] py-[2px] bg-red-600 text-white '> {el?.badge}</span>}

                            </li>))}
                    
                    </div>
                ))}
            </ul>
        </div>
        </div>
    );
}
export default SideBarInvestor;