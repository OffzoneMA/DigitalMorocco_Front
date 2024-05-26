import { Outlet } from "react-router-dom";
import Header from './Header' 
import LanguageHeader from "./LanguageHeader";

const Layout = () => {
  return (
    <>
      <LanguageHeader />
      <Outlet />
    </>
  );
};

export default Layout;