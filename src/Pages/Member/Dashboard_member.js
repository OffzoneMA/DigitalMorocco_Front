import React, { useState } from 'react';
import SideBar from './SideBar';
const Dashboard_member = () => {
  const [activeMenuItem, setActiveMenuItem] = useState("Dashboard");
  const handleMenuItemClick = (menuTitle) => {
    setActiveMenuItem(menuTitle);
  };
  return (
    <div className="flex p-5 pt-8 gap-x-4 relative">
      <SideBar handleMenuItemClick={handleMenuItemClick} />
      <div className="main-content">
       
        {activeMenuItem === "Dashboard" && (
          <div className=" ">
           
            <h1>Dashboard Content</h1>
          </div>
        )}
        {activeMenuItem === "My Profil" && (
          <div>
           
            <h1>My Profil Content</h1>
          </div>
        )}
        {activeMenuItem === "My Entreprise" && (
          <div>
          
            <h1>My Entreprise Content</h1>
          </div>
        )}
          {activeMenuItem === "Events" && (
          <div>
          
            <h1>My events Content</h1>
          </div>
        )}
         {activeMenuItem === "Investors" && (
          <div>
          
            <h1>My Investors Content</h1>
          </div>
        )}
          {activeMenuItem === "Documents" && (
          <div>
          
            <h1>My Documents Content</h1>
          </div>
        )}
          {activeMenuItem === "Notifications" && (
          <div>
          
            <h1>My Notifications Content</h1>
          </div>
        )}
         {activeMenuItem === "Historique" && (
          <div>
          
            <h1>My Historique Content</h1>
          </div>
        )}
        {activeMenuItem === "Setting" && (
          <div>
          
            <h1>My Setting Content</h1>
          </div>
        )}
        

     
      </div>
    </div>
  );
}
export default Dashboard_member;