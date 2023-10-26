import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { Cog8ToothIcon, UserPlusIcon, ClockIcon, UserCircleIcon, CubeIcon,EnvelopeIcon,BuildingOffice2Icon,UserGroupIcon,UsersIcon,ClipboardDocumentCheckIcon,UserIcon, ListBulletIcon } from '@heroicons/react/24/outline';

const SideBar = ({ handleMenuItemClick }) => { 
    const { userInfo } = useSelector((state) => state.auth)
    const [open, setOpen] = useState(true);
    const [activeMenu, setActiveMenu] = useState(decodeURIComponent(window.location.hash.substring(1)) || "History");
    const Menus = [
       // { title: "Dashboard", src: "dashboard" },
        { title: "Profile Status", src: <UserCircleIcon className='w-5 h-5' /> },
        userInfo?.member?.companyName && { title: "Subscription", src: <CubeIcon className='w-5 h-5' /> },
        {
            title: "My Entreprise", src: <BuildingOffice2Icon className='w-5 h-5' />  /*,
            child: userInfo?.member?.companyName && [ { title: "Enterprise Documents", src: "document" }]*/
    },
        userInfo?.member?.subStatus == "active" && {
            title: "Contacts", src: <UserGroupIcon className='w-5 h-5' />,
            child: [
                { title: "List Investors", src: <ListBulletIcon className='w-5 h-5' /> },
                { title: "Contact Requests", src: <UsersIcon className='w-4 h-4' /> },
                 { title: "Messages", src: <EnvelopeIcon className='w-4 h-4' />},

        ] },
        { title: "Subscription Billing", src: <ClipboardDocumentCheckIcon className='w-5 h-5' /> },
        { title: "My Profil", src: <UserIcon className='w-5 h-5' /> },
        { title: "History", src: <ClockIcon className='w-5 h-5' /> },
        { title: "Setting", src: <Cog8ToothIcon className='w-5 h-5'  /> },
    ];
    const navigate=useNavigate()
    return (
        <div className='pb-10'>
        <div className={` ${open ? "w-72" : "w-28"} bg-white-100 shadow-2xl min-h-screen px-5 py-6 relative duration-300 rounded-md  `}>
            <img
                src="../img/control.png"
                alt=""  
                className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple border-2 rounded-full  ${!open && "rotate-180"}`}
                onClick={() => setOpen(!open)}
            />
                {userInfo?.member?.companyName && open && 
                <div className='flex items-center justify-center pt-8 px-8 pb-3 gap-2'>
                        <img src={userInfo?.member?.logo} className='w-40 h-20 object-center object-contain   ' alt="Company Logo" />
                         <div className='flex-1'>
                            <h2 className='text-2xl font-semibold'>{userInfo?.member?.companyName}</h2>
                        </div>
                </div>
            }
        <div className='pb-3 mb-4 mx-8 border-b-2'>

                     {userInfo?.member?.subStatus == "active" ?
                        open && <div className='flex items-center  justify-center  text-center  '>
                            <span className='text-sm  px-3 py-2 rounded-md text-gray-400  ' >
                                Subscription expires in :  <br />
                                <span className='font-bold italic'>
                                    {new Date(userInfo?.member?.expireDate).toLocaleDateString('en-US', {
                                        weekday: 'short',
                                        year: 'numeric',
                                        month: 'short',
                                        day: 'numeric',

                                    })}</span>
                            </span>
                        </div>
                        : <div className='flex items-center justify-center  text-center '>
                            <span className='text-sm text-gray-400  px-3 py-2 rounded-md ' >
                                Not Subscribed
                            </span>
                        </div>
                    }


        </div>
              
            <div className='flex items-center justify-between'>
                    {userInfo?.member?.project &&
                        <div className='flex items-center justify-center'>
                            <button  onClick={() => {
                            navigate('/Dashboard_member#' + 'My Project')
                            handleMenuItemClick("Create Project");}}
                            
                                className={` ${!open && 'hidden'} bg-col1 text-white   p-3 rounded-full w-32 truncate `}
                            >
                                {userInfo?.member?.project?.name}
                            </button>
                        </div>

                    }
                    {userInfo?.member?.companyName && !userInfo?.member?.project && <button
                        disabled={activeMenu == "Create Project"}
                        onClick={() => {
                            if (!userInfo?.member?.companyName) {
                                toast.error("First Create Entreprise")
                            }
                            else {
                                setActiveMenu("Create Project")
                                handleMenuItemClick("Create Project")
                            }
                        }}
                        className={` ${!open && 'hidden'} ${activeMenu != "Create Project" ? 'bg-white ring-1 shadow-lg' : 'bg-blue-500/50 text-white cursor-not-allowed'}   p-3 rounded-full `}
                    >
                        + Create Project
                    </button>}
                    <div className="flex gap-x-4 items-center justify-center py-3">

                        <div className=' text-xs rounded-full border border-gray-200 bg-white flex items-center justify-center text-black font-bold py-1 px-2'>
                            <span>{userInfo?.member?.credits} {open && "credit(s)"}</span>
                        </div>
                    </div>
            </div>
              

            <ul className="">
                {Menus.map((Menu, index) => (
                    Menu && <div key={index} >
                    <li
                        onClick={() => {
                            navigate('/Dashboard_member#' + Menu.title)
                            handleMenuItemClick(Menu.title);
                        setActiveMenu(Menu.title);}}

                            className={` ${!open && 'w-fit'} flex rounded-full p-2 cursor-pointer hover:bg-blue-400 hover:text-white text-black items-center  gap-x-2 mt-3 ${activeMenu === Menu.title ? "bg-blue-500 text-white" : ""}`}
                    >
                        {/* <img src={`../img/${Menu.src}.png`} alt="" /> */}
                            {Menu.src}
                        <span className={`${!open && "hidden"} origin-left duration-200`}>
                            {Menu.title}
                        </span>
                    </li>
                       { Menu.child  && 
                        
                            Menu.child.map((el, i) => (
                       <li
                                key={i}
                            onClick={() => {
                                navigate('/Dashboard_member#' + el.title)
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
export default SideBar;