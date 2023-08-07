import React, {  useState } from 'react';
import SideMenu from './SideMenu';
import Admin from './Admin';
import Historique from './Historique';

const Dashboard_admin = () => {

  const [activeMenuItem, setActiveMenuItem] = useState(window.location.hash.substring(1) || "Demandes");
  const handleMenuItemClick = (menuTitle) => {
    setActiveMenuItem(menuTitle);
  };

  
  return (
    <div className="flex p-5 pt-8 gap-x-4 relative">
     <SideMenu handleMenuItemClick={handleMenuItemClick} />
      <div className="flex-1 ">
       
        {activeMenuItem === "Demandes" && (
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
        {activeMenuItem === "Dashboard" && (
          <div>
          
            <h1>My Dashboard Content</h1>
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
          
        {activeMenuItem === "History" && (
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