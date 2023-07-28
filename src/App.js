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
import Admin from './Pages/Admin/Admin';
import GuardedAdminRoute from './GuardedRoutes/GuardedAdminRoute';
import GuardedNewAccRoute from './GuardedRoutes/GuardedNewAccRoute';
import Failure from './Pages/Authentification/Failure';
import Success from './Pages/Authentification/Success';


function App() {

  return (
    <BrowserRouter>   
       <Header />

       <div className=' pt-3 md:pt-10'>
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
         <Route   path="/" element={<Partners />} />
        <Route   path="/SignIn" element={<SignIn />} />
        <Route   path="/SignUp" element={<SignUp />} />

        <Route path="/Partners/:partnerId" element={<PartnerDetails />} /> 
        <Route path="/Failure" element={<Failure/>}/>
        <Route path="/Success" element={<Success/>}/>
        

          {/* Admin Routes*/}
          <Route element={<GuardedAdminRoute />}>
            <Route path="/Admin" element={<Admin />} />
            </Route>
          {/* New Account Routes*/}
          <Route element={<GuardedNewAccRoute />}>
            <Route path="/Complete_SignUp" element={<ContinueSignUp />} />
          </Route>

      </Routes>
      <Footer />
      </div>
     
    </BrowserRouter>    
 
  );
}

export default App;
