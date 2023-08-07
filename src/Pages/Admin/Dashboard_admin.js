import React, {  useState } from 'react';
import SideMenu from './SideMenu';
import RequestSection from './Requests/RequestSection';
import HistorySection from './History/HistorySection';

const Dashboard_admin = () => {

  const [activeMenuItem, setActiveMenuItem] = useState(window.location.hash.substring(1) || "Signup Requests");
  const handleMenuItemClick = (menuTitle) => {
    setActiveMenuItem(menuTitle);
  };

  
  return (
    <div className="flex px-5   gap-x-4 relative">
     <SideMenu handleMenuItemClick={handleMenuItemClick} />
      <div className="flex-1  -mt-8">
       
        {activeMenuItem === "Signup Requests" && (
          <div className="">
            <RequestSection />
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
          
            <HistorySection />
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