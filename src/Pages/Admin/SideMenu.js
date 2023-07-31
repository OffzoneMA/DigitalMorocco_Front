import React, { useState } from 'react'

export default function SideMenu() {
    const [open, setOpen] = useState(false);
    const Menus = [
        { title: "Dashboard", src: "dashboard" },
        { title: "Inscription", src: "add-user" },
        { title: "Accounts", src: "User", gap: true },
        { title: "Demandes ", src: "help" },
        { title: "Documents", src: "document" },
        { title: "Notifications", src: "notification" },
        { title: "Historique ", src: "history", gap: true },
        { title: "Setting", src: "Settings" },
    ];
  return (
      <div
          className={` ${open ? "w-72" : "w-20 "
              } bg-dark-purple h-screen p-5 pt-8 relative duration-300 rounded-md -mt-4 `}
      >
          <img
              src="../img/control.png" alt=""
              className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
           border-2 rounded-full  ${!open && "rotate-180"}`}
              onClick={() => setOpen(!open)}
          />
          <div className="flex gap-x-4 items-center">

              <img
                  src="../img/admin.png" alt=""
                  className={`cursor-pointer duration-500 ${open && "rotate-[360deg]"
                      }`}
              />
              <h1
                  className={`text-white origin-left font-medium text-xl duration-200 ${!open && "scale-0"
                      }`}
              >
                  Admin
              </h1>
          </div>
          <ul className="pt-6">
              {Menus.map((Menu, index) => (
                  <li
                      key={index}
                      className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
              ${Menu.gap ? "mt-9" : "mt-2"} ${index === 0 && "bg-light-white"
                          } `}
                  >
                      <img src={`../img/${Menu.src}.png`} alt="" />
                      <span className={`${!open && "hidden"} origin-left duration-200`}>
                          {Menu.title}
                      </span>
                  </li>
              ))}
          </ul>
      </div>
  )
}
