import { Outlet } from "react-router-dom";
import LanguageHeader from "./LanguageHeader";

const Layout = () => {
  return (
    <div className="flex h-screen overflow-y-auto w-full">
      <LanguageHeader />
        <Outlet />
    </div>
  );
};

export default Layout;