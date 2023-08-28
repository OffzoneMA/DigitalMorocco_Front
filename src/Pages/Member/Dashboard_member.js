import React, { useEffect, useState } from 'react';
import SideBar from './SideBar';
import UserEvents from '../UserEvents';
import ContinueSignUp from '../Authentification/ContinueSignUp';
import Subscription from '../Subscription';
import MyEntreprise from './MyEntreprise';
import Subscription_billing from './Subscription_billing';
import Create_Project from './Create_Project';
import UserProfile from '../UserProfile';
import EntrepriseDocs from './EntrepriseDocs';
import { Toaster } from 'react-hot-toast';
import Investors from './Investors';
import Settings from '../Settings';
import Contact_Requests from './Contact_Requests';



const Dashboard_member = () => {
  const [activeMenuItem, setActiveMenuItem] = useState(decodeURIComponent(window.location.hash.substring(1)) || "History");
  const handleMenuItemClick = (menuTitle) => {
    setActiveMenuItem(menuTitle);
  };

  return (
    <div className="flex px-5  gap-x-4 relative pt-3 md:pt-40">
      <Toaster />
      <SideBar handleMenuItemClick={handleMenuItemClick} />
      <div className="flex-1 -mt-8">

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
        {activeMenuItem === "Enterprise Documents" && (
          <div>

            <EntrepriseDocs />
          </div>
        )}
         {activeMenuItem === "History" && (
          <UserEvents />
        )}
        {activeMenuItem === "Investors" && (
          <Investors />
        )}
        {activeMenuItem === "Setting" && (
          <Settings />
        )} 
        {activeMenuItem === "Contact Requests" && (
        <Contact_Requests />
      )}
      </div>
     
    </div>
  );
}
export default Dashboard_member;