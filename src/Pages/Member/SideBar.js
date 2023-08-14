import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
const SideBar = ({ handleMenuItemClick }) => { 
    const { userInfo } = useSelector((state) => state.auth)
    const [open, setOpen] = useState(true);
    const [activeMenu, setActiveMenu] = useState(decodeURIComponent(window.location.hash.substring(1)) || "History");
    const Menus = [
       // { title: "Dashboard", src: "dashboard" },
        { title: "Profile Status", src: "add-user" },
        { title: "Subscription", src: "document" },
        { title: "My Entreprise", src: "corporate" ,
            child: userInfo.member.companyName && [ { title: "Enterprise Documents", src: "document" }]
    },
        { title: "Subscription Billing", src: "investor" },
       // { title: "Events", src: "help" },
       { title: "My Profil", src: "add-user" },
       // { title: "Investors", src: "investor" },
       // { title: "Documents", src: "document" },
       // { title: "Notifications", src: "notification" },
        { title: "History", src: "history" },
       /// { title: "Setting", src: "Settings" },
    ];
    const navigate=useNavigate()

    return (
        <div className='pb-10'>
        <div className={` ${open ? "w-72" : "w-20"} bg-gray-100 min-h-screen px-5 py-6 relative duration-300 rounded-md  `}>
            <img
                src="../img/control.png"
                alt=""  
                className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple border-2 rounded-full  ${!open && "rotate-180"}`}
                onClick={() => setOpen(!open)}
            />
                {userInfo?.member?.subStatus=="active" ?    
                    open && <div className='flex items-center  justify-center  text-center p-8 '>
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
            </div>
                    : <div className='flex items-center justify-center  text-center p-8 '>
                    <span className='text-sm bg-gray-500/50 px-3 py-2 rounded-md text-white  shadow-2xl' >
                        Not Subscribed
                    </span> 
                    </div>
                    }

            
                {!userInfo?.member?.name &&     <button
                    disabled={activeMenu == "Create Project"}
                    onClick={() =>{
                        if (!userInfo?.member?.companyName){
                            toast.error("First Create Entreprise")
                        }
                        else{
                             setActiveMenu("Create Project")
                        handleMenuItemClick("Create Project")
                        }
                       }}
                    className={` ${!open && 'hidden'} ${activeMenu != "Create Project" ? 'bg-white' : 'bg-gray-500/20 cursor-not-allowed'}   p-3 rounded-full `}
            >
                    + Create Project
            </button>}
                <div className="flex gap-x-4 items-center justify-center py-5">
               
                <div className={` duration-500  rounded-md p-2 hover:bg-light-white text-gray-300 text-sm flex items-center gap-x-4  `} >
                        <div className=' rounded-full bg-white flex items-center justify-center text-black font-bold py-2 px-3'>
                            <span>{userInfo?.member?.credits} {open && "credits"}</span>
                    </div>
                </div>
            </div>
            <ul className="">
                {Menus.map((Menu, index) => (
                    <div key={index} >
                    <li
                        onClick={() => {
                            navigate('/Dashboard_member#' + Menu.title)
                            handleMenuItemClick(Menu.title);
                        setActiveMenu(Menu.title);}}

                            className={`flex rounded-full p-2 cursor-pointer hover:bg-slate-400 text-black text-sm items-center gap-x-4 mt-3 ${activeMenu === Menu.title ? "bg-slate-400" : ""}`}
                    >
                        <img src={`../img/${Menu.src}.png`} alt="" />
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

                            className={`flex rounded-full p-2 cursor-pointer hover:bg-slate-400 text-black text-sm items-center gap-x-4 ml-5 mt-1 ${activeMenu === el.title ? "bg-slate-400" : ""}`}
                        >
                            <img src={`../img/${el.src}.png`} alt="" />
                            <span className={`${!open && "hidden"} origin-left duration-200`}>
                                {el.title}
                            </span>
                        </li>))}
                    </div>
                ))}
            </ul>
        </div>
        </div>
    );
}
export default SideBar;