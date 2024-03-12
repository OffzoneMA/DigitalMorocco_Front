import React from "react";
import SidebarNav from "./SidebarNav";
import { Outlet } from "react-router-dom";
const DashbordLayout = () => {
  return (
    <div className="bg-blue_gray-901 flex h-full w-full">
        <SidebarNav/>
      <div className="h-full flex-1 pt-6 overflow-hidden">
        <Outlet/>
      </div>
    </div>
  );
};

export default DashbordLayout;