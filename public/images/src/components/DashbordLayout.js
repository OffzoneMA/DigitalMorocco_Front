import React from "react";
import SidebarNav from "./SidebarNav";
import { Outlet } from "react-router-dom";
import SideBar22 from "./SideBar22";
const DashbordLayout = () => {
  return (
    <div className="bg-blue_gray-901 flex w-full">
        <SideBar22/>
      <div className="h-screen flex-1 pt-6 overflow-auto">
        <Outlet/>
      </div>
    </div>
  );
};

export default DashbordLayout;