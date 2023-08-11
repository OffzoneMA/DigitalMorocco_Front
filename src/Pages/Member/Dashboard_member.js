import React, { useEffect, useState } from 'react';
import SideBar from './SideBar';
import UserEvents from '../UserEvents';
import ContinueSignUp from '../Authentification/ContinueSignUp';
import Subscription from '../Subscription';
import MyEntreprise from './MyEntreprise';
import Subscription_billing from './Subscription_billing';
import Create_Project from './Create_Project';
import UserProfile from '../UserProfile';



const Dashboard_member = () => {
  const [activeMenuItem, setActiveMenuItem] = useState(decodeURIComponent(window.location.hash.substring(1)) || "History");
  const handleMenuItemClick = (menuTitle) => {
    setActiveMenuItem(menuTitle);
  };

  return (
    <div className="flex px-5  gap-x-4 relative">
      <SideBar handleMenuItemClick={handleMenuItemClick} />
      <div className="flex-1 -mt-8">
        
        {activeMenuItem === "Dashboard" && (
          <div className=" ">
           
            <h1>Dashboard Content</h1>
          </div>
        )}
        {activeMenuItem === "Create Project" && (
          <div className=" ">

            <Create_Project />
          </div>
        )}
        {activeMenuItem === "Subscription" && (
          <div>

            <Subscription />
          </div>
        )}  
        {activeMenuItem === "Subscription Billing" && (
          <div>

            <Subscription_billing />
          </div>
        )}
        {activeMenuItem === "Profile Status" && (
          <div>

            <ContinueSignUp />
          </div>
        )}  
        {activeMenuItem === "My Profil" && (
          <div>
           
            <UserProfile  />
          </div>
        )}
        {activeMenuItem === "My Entreprise" && (
          <div>
          
            <MyEntreprise />
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
         {activeMenuItem === "History" && (
          <UserEvents />
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