import React, { useState } from 'react';
import SideBar from './SideBarInvestor';
import UserEvents from '../UserEvents';
import ContinueSignUp from '../Authentification/ContinueSignUp';
import UserProfile from '../UserProfile';
import { Toaster } from 'react-hot-toast';
import Projects from './Projects';
import Settings from '../Settings';
import Contact_Requests from './Contact_Requests';
import Contacts from './Contacts';
import Messages from './Messages';

const Dashboard_investor = () => {
  const [activeMenuItem, setActiveMenuItem] = useState(decodeURIComponent(window.location.hash.substring(1)) || "History");
  const handleMenuItemClick = (menuTitle) => {
    setActiveMenuItem(menuTitle);
  };
  return (
    <div className="flex px-5  gap-x-4 relative pt-28 md:pt-40">
      <Toaster />
      <SideBar handleMenuItemClick={handleMenuItemClick} />
      <div className="flex-1 -mt-8">
        {activeMenuItem === "My Profil" && (
          <div>
           
            <UserProfile />
          </div>
        )}
        {activeMenuItem === "Profile Status" && (
          <div>
            <ContinueSignUp />
          </div>
        )}  
        {activeMenuItem === "List Projects" && (
          <Projects />
        )}
         {activeMenuItem === "History" && (
          <UserEvents />
        )}
        {activeMenuItem === "Setting" && (
          <Settings />
        )}
        {activeMenuItem === "Contact Requests" && (
          <Contact_Requests />
        )}
        {activeMenuItem === "Contacts" && (
          <Contacts />
        )}
        {activeMenuItem === "Messages" && (
          <Messages />
        )}
      </div>
    </div>
  );
}
export default Dashboard_investor;