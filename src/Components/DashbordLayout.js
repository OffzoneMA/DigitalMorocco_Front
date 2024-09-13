import React from "react";
import SidebarNav from "./SidebarNav";
import { Outlet } from "react-router-dom";
const DashbordLayout = () => {
  return (
    <div className="bg-blue_gray-901 flex h-screen w-full">
      <div className="h-full overflow-x-visible no-scrollbar-div min-h-screen">
      <SidebarNav/>
      </div>
      <div className="h-full flex-1 pt-6 overflow-x-auto no-scrollbar-div min-h-screen">
          <Outlet/>
      </div>
    </div>
  );
};

export default DashbordLayout;