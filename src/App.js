import { useEffect } from 'react';
import { Route, Routes, BrowserRouter, useLocation } from 'react-router-dom';
import './App.css';
import Partners from './Pages/Partners';
import Home from './Pages/Home';
import Header from './Components/Header';
import PartnerDetails from './Pages/PartnerDetails';
import SignIn from './Pages/Authentification/SignIn';
import SignUp from './Pages/Authentification/SignUp';
import ContinueSignUp from './Pages/Authentification/ContinueSignUp';
import Footer from './Components/Footer/Footer';
import GuardedAdminRoute from './GuardedRoutes/GuardedAdminRoute';
import GuardedNewAccRoute from './GuardedRoutes/GuardedNewAccRoute';
import Failure from './Pages/Authentification/Failure';
import Success from './Pages/Authentification/Success';
import Subscription from './Pages/Subscription';
import GuardedUserMemberRoutes from './GuardedRoutes/GuardedUserMemberRoutes';
import Dashboard_member from './Pages/Member/Dashboard_member';
import Dashboard_admin from './Pages/Admin/Dashboard_admin';
import Create_Project from './Pages/Member/Create_Project';
import GuardedUserInvestorRoutes from './GuardedRoutes/GuardedUserInvestorRoutes';
import GuardedUserPartnerRoutes from './GuardedRoutes/GuardedUserPartnerRoutes';

function App() {

  return (
    <BrowserRouter>   
       <Header />

      <div className=' pt-3 md:pt-10 min-h-[85vh]'>
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
         <Route   path="/" element={<Partners />} />
        <Route   path="/SignIn" element={<SignIn />} />
        <Route   path="/SignUp" element={<SignUp />} />
       

        <Route path="/Partners/:partnerId" element={<PartnerDetails />} /> 
        <Route path="/Failure" element={<Failure/>}/>
        <Route path="/Success" element={<Success/>}/>
        
          {/* User Member Routes*/}
          <Route element={<GuardedUserMemberRoutes />}>
            <Route path="/Subscription" element={<Subscription />} />
            <Route path="/Create_Project" element={<Create_Project />} />
            <Route path="/Dashboard_member" element={<Dashboard_member />} />
          </Route>

          {/* User Investor Routes*/}
          <Route element={<GuardedUserInvestorRoutes />}>
            {/* <Route path="/Dashboard_investor" element={<Dashboard_investor/>} /> */}
          </Route>

          {/* User Partner Routes*/}
          <Route element={<GuardedUserPartnerRoutes />}>
             {/* <Route path="/Dashboard_partner" element={<Dashboard_partner />} />  */}
          </Route>


          {/* Admin Routes*/}
          <Route element={<GuardedAdminRoute />}>
            <Route path="/Dashboard_admin" element={<Dashboard_admin />} />
            </Route>
          {/* New Account Routes*/}
          <Route element={<GuardedNewAccRoute />}>
            <Route path="/Complete_SignUp" element={<ContinueSignUp />} />
          </Route>

      </Routes>
      </div>
      <Footer />

    </BrowserRouter>    
 
  );
}

export default App;
