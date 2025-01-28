import React , {Suspense} from "react";
import { Outlet } from "react-router-dom";
import LanguageHeader from "./LanguageHeader";
import Loader from "../Loader";

const Layout = () => {
  return (
    <div className="flex h-screen overflow-y-auto w-full">
      <Suspense fallback={
        <div className="flex items-center justify-center w-full h-screen">
          <Loader />
        </div>
      }>
        <LanguageHeader />
        <Outlet />
      </Suspense>
    </div>
  );
};

export default Layout;