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
import GuardedUserInvestorRoutes from './GuardedRoutes/GuardedUserInvestorRoutes';
import GuardedUserPartnerRoutes from './GuardedRoutes/GuardedUserPartnerRoutes';
import Dashboard_partner from './Pages/Partner/Dashboard_partner';
import Dashboard_investor from './Pages/Investor/Dashboard_investor';
import UserProfile from './Pages/UserProfile';
import Pricing from './Pages/Pricing';
import ContactUs from './Pages/ContactUs';
import PaySuccess from './Pages/Payment/PaySuccess';
import PayFailed from './Pages/Payment/PayFailed';
import GuardedMemberPage from './GuardedRoutes/GuardedMemberPage';
import Members from './Pages/Members';
import AboutUs from './Pages/AboutUs';
import Explore from './Pages/Explore';


function App() {

  return (
    <BrowserRouter>   
      <div className='font-DmSans  overflow-hidden'>
       <Header />

        <div className='  min-h-[85vh] '>

      <Routes>
        <Route path="/Members" element={<Members />} />
        <Route path="/Partners" element={<Partners />} />
        <Route path="/" element={<Home />} />

        <Route   path="/SignIn" element={<SignIn />} />
        <Route   path="/SignUp" element={<SignUp />} />
        <Route   path="/UserProfile" element={<UserProfile />} />
        <Route   path="/Pricing" element={<Pricing />} />
        <Route   path="/ContactUs" element={<ContactUs/>}/>
        <Route   path="/About-Us" element={<AboutUs/>}/>
        <Route   path="/About-Us/Explore" element={<Explore/>}/>


        <Route path="/Partners/:partnerId" element={<PartnerDetails />} /> 
        <Route path="/Failure" element={<Failure/>}/>
        <Route path="/Success" element={<Success/>}/>
        
          {/* User Member Routes*/}
          <Route element={<GuardedUserMemberRoutes />}>
            <Route path="/Subscription" element={<Subscription />} />
            <Route path="/Dashboard_member" element={<Dashboard_member />} />
            <Route path="/Payement_Success" element={<PaySuccess />} />
            <Route path="/Payement_Failed" element={<PayFailed />} />
          </Route>

          {/* User Investor Routes*/}
          <Route element={<GuardedUserInvestorRoutes />}>
            <Route path="/Dashboard_investor" element={<Dashboard_investor/>} />
          </Route>

          {/* User Partner Routes*/}
          <Route element={<GuardedUserPartnerRoutes />}>
             <Route path="/Dashboard_partner" element={<Dashboard_partner />} /> 
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
</div>
    </BrowserRouter>    
 
  );
}

export default App;
