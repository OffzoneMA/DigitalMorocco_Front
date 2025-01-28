import React , {Suspense} from "react";
import SidebarNav from "./SidebarNav";
import { Outlet } from "react-router-dom";
import Loader from "../Loader";
const DashbordLayout = () => {
  return (
    <div className="bg-blue_gray-901 flex h-screen w-full">
      <div className="h-full no-scrollbar-div min-h-screen">
      <SidebarNav/>
      </div>
      <div className="h-full flex-1 pt-6 overflow-x-auto no-scrollbar-div min-h-screen">
        <div className="bg-white-A700 flex flex-col gap-8 h-full min-h-screen items-start justify-start rounded-tl-[40px] w-full">
          <Suspense fallback={
            <div className="flex items-center justify-center w-full h-[calc(100vh-120px)]">
              <Loader />
            </div>
          }>
            <Outlet />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default DashbordLayout;