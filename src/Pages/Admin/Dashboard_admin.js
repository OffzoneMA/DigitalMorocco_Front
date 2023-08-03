import React, { useState } from 'react';
import SideMenu from './SideMenu';
import Admin from './Admin';
import Historique from './Historique';

const Dashboard_admin = () => {
  const [activeMenuItem, setActiveMenuItem] = useState(null);
  const handleMenuItemClick = (menuTitle) => {
    setActiveMenuItem(menuTitle);
  };
  return (
    <div className="flex p-5 pt-8 gap-x-4 relative">
     <SideMenu handleMenuItemClick={handleMenuItemClick} />
      <div className="main-content">
       
        {activeMenuItem === "Dashboard" && (
          <div className="">
           
           <Admin/>
          </div>
        )}
        {activeMenuItem === "Inscription" && (
          <div>
           
            <h1>My Inscription Content</h1>
          </div>
        )}
        {activeMenuItem === "Accounts" && (
          <div>
          
            <h1>My Accounts Content</h1>
          </div>
        )}
          {activeMenuItem === "Demandes" && (
          <div>
          
            <h1>My Demandes Content</h1>
          </div>
        )}
         {activeMenuItem === "Documents" && (
          <div>
          
            <h1>My document Content</h1>
          </div>
        )}
          {activeMenuItem === "Notifications" && (
          <div>
          
            <h1>My notification Content</h1>
          </div>
        )}
          
         {activeMenuItem === "Historique" && (
          <div className=''>
          
            <Historique/>
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
export default Dashboard_admin;