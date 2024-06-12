import { Route, Routes, BrowserRouter } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home';
import SignIn from './Pages/Authentification/SignIn';
import SignUp from './Pages/Authentification/SignUp';
import Failure from './Pages/Authentification/Failure';
import Success from './Pages/Authentification/Success';
import Subscription from './Pages/Subscription';
import GuardedUserMemberRoutes from './GuardedRoutes/GuardedUserMemberRoutes';
import UserProfile from './Pages/UserProfile';
import Pricing from './Pages/Pricing';
import ContactUs from './Pages/ContactUs';
import PaySuccess from './Pages/Payment/PaySuccess';
import PayFailed from './Pages/Payment/PayFailed';
import VerificationCode from './Pages/Authentification/Complete_SignUp/VerificationCode';
import AboutUs from './Pages/AboutUs';
import ResetPasswordEmail from './Pages/Authentification/ResetPasswordEmail';
import ResetPassword from './Pages/Authentification/ResetPassword';
import PasswordResetSucces from './Pages/Authentification/PasswordResetSucces';
import Explore from './Pages/Explore';
import ForgotPassword from './Pages/Authentification/ForgotPassword';
import ChooseRole from './Pages/Authentification/Complete_SignUp/ChooseRole';
import { I18nextProvider } from 'react-i18next'; 
import i18n from './i18n';
import Layout from './Components/Layout';
import SocialSignUp from './Pages/Authentification/SocialSignUp';
import DashbordLayout from "./Components/DashbordLayout";
import Projects from "./Pages/Projects";
import CreateProject from "./Pages/CreateProject";
import ProjectDetails from "./Pages/ProjectDetails";
import CompanyLegal from "./Pages/CompanyLegal";
import MyCompany from "./Pages/MyCompany";
import Employees from "./Pages/Employees";
import NewEmployee from "./Pages/NewEmployee";
import Dashbord from './Pages/Dashbord';
import Investors from './Pages/Investors';
import InvestorDetails from './Pages/InvestorDetails';
import InvestorRequestHistory from './Pages/InvestorRequestHistory';
import MyInvestors from './Pages/MyInvestor';
import Documents from './Pages/Documents';
import Events from './Pages/Events';
import History from './Pages/History';
import Users from './Pages/Users';
import UpcomingEvents from './Pages/UpcomingEvent';
import UpcomingEventDetails from './Pages/UpcomingEventDetails';
import PastEvents from './Pages/PastEvents';
import ChoosePlan from './Pages/ChoosePlan';
import Notifications from './Pages/Notifications';
import VerificationEmail from './Pages/Authentification/Complete_SignUp/VerificationEmail';
import { isAuthenticated } from './Services/UserAuth';
import GuardedConnectedUserRoute from './GuardedRoutes/GuardedConnectedUserRoute';
import GuardedAdminRoute from './GuardedRoutes/GuardedAdminRoute';
import Dashboard_Admin from './Pages/Dashboard_Admin/Dashboard';

function App() {
 
  return (
    <I18nextProvider i18n={i18n}> {/* Add I18nextProvider */}
 
    <BrowserRouter>   
      <div className='font-DmSans overflow-hidden'>
       
        <div className='min-h-screen'>
      <Routes>
        
        <Route element={<DashbordLayout />}>
          <Route element={<GuardedConnectedUserRoute />}>
            <Route path="/Dashboard" element={<Dashbord />} />
            <Route path="/Users" element={<Users />} />
            <Route path="/Investors" element={<Investors />} />
            <Route path="/MyInvestors" element={<MyInvestors />} />
            <Route path="/InvestorDetails" element={<InvestorDetails />} />
            <Route path="/InvestorRequestsHistoty" element={<InvestorRequestHistory />} />
            <Route path="/Projects" element={<Projects />} />
            <Route path="/Createproject" element={<CreateProject />} />
            <Route path="/Editproject/:projectId" element={<CreateProject />} />
            <Route path="/Projectdetails/:projectId" element={<ProjectDetails />} />
            <Route path="/CompanyLegal" element={<CompanyLegal />} />
            <Route path="/MyCompany" element={<MyCompany />} />
            <Route path="/Employees" element={<Employees />} />
            <Route path="/NewEmployee" element={<NewEmployee />} />
            <Route path="/Document" element={<Documents />} />
            <Route path="/Participate" element={<Events />} />
            <Route path="/UpcomingEvent" element={<UpcomingEvents />} />
            <Route path="/PastEvent" element={<PastEvents />} />
            <Route path="/UpcomingEventDetails/:id" element={<UpcomingEventDetails />} />
            <Route path="/UserProfile" element={<UserProfile />} />
            <Route path="/Subscription" element={<Subscription />} />
            <Route path="/ChoosePlan" element={<ChoosePlan />} />
            <Route path="/History" element={<History />} />
            <Route path="/Notification" element={<Notifications />} />
          </Route>
          <Route element={<GuardedAdminRoute />}>
            <Route path="/Dashboard_Admin" element={<Dashboard_Admin />} />
          </Route>
        </Route>
        <Route element={<Layout />}>
          <Route   path="/SignIn" element={<SignIn />} />
          <Route   path="/" element={<SignIn />} />
          <Route   path="/SignUp" element={<SignUp />} />
          <Route   path="/SocialSignUp" element={<SocialSignUp />} />
          <Route path="/VerificationCode" element={<VerificationCode />} />
          <Route path="/VerificationEmail" element={<VerificationEmail />} />
          <Route path="/ResetPasswordEmail" element={<ResetPasswordEmail />} />
          <Route path="/ForgotPassword" element={<ForgotPassword />} />
          <Route path="/ResetPassword" element={<ResetPassword />} />
          <Route path="/PasswordResetSucces" element={<PasswordResetSucces />} />
          <Route path="/ChooseRole" element={<ChooseRole />} />
          <Route path="/Home" element={<Home />} />
          <Route   path="/Pricing" element={<Pricing />} />
          <Route   path="/ContactUs" element={<ContactUs/>}/>
          <Route   path="/About-Us" element={<AboutUs/>}/>
          <Route   path="/About-Us/Explore" element={<Explore/>}/>
          <Route path="/Failure" element={<Failure/>}/>
          <Route path="/Success" element={<Success/>}/>
        
          {/* User Member Routes*/}
          <Route element={<GuardedUserMemberRoutes />}>
            <Route path="/Payement_Success" element={<PaySuccess />} />
            <Route path="/Payement_Failed" element={<PayFailed />} />
          </Route>
        </Route>
      </Routes>
      </div>

</div>
    </BrowserRouter>    
  </I18nextProvider>

 
  );
}

export default App;
