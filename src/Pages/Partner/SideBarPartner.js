import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { Cog8ToothIcon,ClockIcon,UserCircleIcon,BuildingOffice2Icon,UserIcon } from '@heroicons/react/24/outline';

const SideBarPartner = ({ handleMenuItemClick }) => { 
    const { userInfo } = useSelector((state) => state.auth)
    const [open, setOpen] = useState(true);
    const [activeMenu, setActiveMenu] = useState(decodeURIComponent(window.location.hash.substring(1)) || "History");
    const Menus = [
        { title: "My Profil", src: <UserIcon className='w-5 h-5' /> },
        { title: "My Entreprise", src: <BuildingOffice2Icon className='w-5 h-5' />  },      
        { title: "Profile Status", src: <UserCircleIcon className='w-5 h-5' /> },
         { title: "History", src: <ClockIcon className='w-5 h-5' /> },
        { title: "Setting", src: <Cog8ToothIcon className='w-5 h-5'  /> },
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
                {userInfo?.partner?.companyName && open &&
                    <div className='flex items-center justify-center pt-8 px-8 pb-3 gap-2'>
                            {/*                        <div className=' w-28 h-20 bg-no-repeat bg-cover bg-center' style={{ backgroundImage: `url(${userInfo?.partner?.logo})` }}>

                        </div>
                            */}
                        <img src={userInfo?.partner?.logo} className='w-20    ' alt="Company Logo" />
                        <div className='flex-1'>
                            <h2 className='text-2xl font-semibold'>{userInfo?.partner?.companyName}</h2>
                        </div>
                    </div>

                }
                <div className="flex gap-x-4 items-center justify-center py-5">
               
                <div className={` duration-500  rounded-md p-2 hover:bg-light-white text-gray-300 text-sm flex items-center gap-x-4  `} >
                      
                </div>
            </div>
            <ul className="">
                {Menus.map((Menu, index) => (
                    <li
                        key={index} onClick={() => {
                            navigate('/Dashboard_partner#' + Menu.title)
                            handleMenuItemClick(Menu.title);
                            setActiveMenu(Menu.title);}}
                        className={` ${!open && 'w-fit'} flex rounded-full p-2 cursor-pointer hover:bg-blue-400 hover:text-white text-black items-center  gap-x-2 mt-3 ${activeMenu === Menu.title ? "bg-blue-500 text-white" : ""}`}                    >
                        {Menu.src} 
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
export default SideBarPartner;