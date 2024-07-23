import { Outlet } from "react-router-dom";
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