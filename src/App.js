import React, { Suspense, lazy  , useEffect} from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import './App.css';
import { I18nextProvider } from 'react-i18next'; 
import i18n from './i18n';
import GuardedConnectedUserRoute from './GuardedRoutes/GuardedConnectedUserRoute';
import GuardedAdminRoute from './GuardedRoutes/GuardedAdminRoute';
import Dashboard_Admin from './Pages/Dashboard_Admin/Dashboard';
import LogRocket from 'logrocket';
import setupLogRocketReact from 'logrocket-react';
import { getLocalStorageItemWithExpiration } from './data/helper';
import { setCredentials , setToken } from './Redux/auth/authSlice';
import ConnectedUserRoute from './GuardedRoutes/ConnectedUserRoute';
import Loader from './Components/Loader';
import Layout from './Components/Layout';
import DashbordLayout from "./Components/DashbordLayout";
import SubscribePlan from './Pages/SubscribePlan';
import NotFound from './Pages/NotFound';
import { useLocation } from 'react-router-dom';
import ScrollToTop from './Components/ScrollToTop';
import AutoLogout from './Components/AutoLogout ';
import ResendVerificationLink from './Pages/Authentification/Complete_SignUp/ResendVerificationLink';

// Utiliser React.lazy pour le code splitting
const Home = lazy(() => import('./Pages/Home'));
const SignIn = lazy(() => import('./Pages/Authentification/SignIn'));
const SignUp = lazy(() => import('./Pages/Authentification/SignUp'));
const Failure = lazy(() => import('./Pages/Authentification/Failure'));
const Success = lazy(() => import('./Pages/Authentification/Success'));
const SuccessSignUp = lazy(() => import('./Pages/Authentification/SuccessSignUp'))
const Subscription = lazy(() => import('./Pages/Subscription'));
const GuardedUserMemberRoutes = lazy(() => import('./GuardedRoutes/GuardedUserMemberRoutes'));
const UserProfile = lazy(() => import('./Pages/UserProfile'));
const Pricing = lazy(() => import('./Pages/Pricing'));
const ContactUs = lazy(() => import('./Pages/ContactUs'));
const PaySuccess = lazy(() => import('./Pages/Payment/PaySuccess'));
const PayFailed = lazy(() => import('./Pages/Payment/PayFailed'));
const VerificationCode = lazy(() => import('./Pages/Authentification/Complete_SignUp/VerificationCode'));
const AboutUs = lazy(() => import('./Pages/AboutUs'));
const ResetPasswordEmail = lazy(() => import('./Pages/Authentification/ResetPasswordEmail'));
const ResetPassword = lazy(() => import('./Pages/Authentification/ResetPassword'));
const PasswordResetSucces = lazy(() => import('./Pages/Authentification/PasswordResetSucces'));
const Explore = lazy(() => import('./Pages/Explore'));
const ForgotPassword = lazy(() => import('./Pages/Authentification/ForgotPassword'));
const ChooseRole = lazy(() => import('./Pages/Authentification/Complete_SignUp/ChooseRole'));
const SocialSignUp = lazy(() => import('./Pages/Authentification/SocialSignUp'));
const Projects = lazy(() => import('./Pages/Projects'));
const CreateProject = lazy(() => import('./Pages/CreateProject'));
const ProjectDetails = lazy(() => import('./Pages/ProjectDetails'));
const CompanyLegal = lazy(() => import('./Pages/CompanyLegal'));
const MyCompany = lazy(() => import('./Pages/MyCompany'));
const Employees = lazy(() => import('./Pages/Employees'));
const NewEmployee = lazy(() => import('./Pages/NewEmployee'));
const Dashbord = lazy(() => import('./Pages/Dashbord'));
const Investors = lazy(() => import('./Pages/Investors'));
const InvestorDetails = lazy(() => import('./Pages/InvestorDetails'));
const InvestorRequestHistory = lazy(() => import('./Pages/InvestorRequestHistory'));
const MyInvestors = lazy(() => import('./Pages/MyInvestor'));
const Documents = lazy(() => import('./Pages/Documents'));
const Events = lazy(() => import('./Pages/Events'));
const History = lazy(() => import('./Pages/History'));
const Users = lazy(() => import('./Pages/Users'));
const UpcomingEvents = lazy(() => import('./Pages/UpcomingEvent'));
const UpcomingEventDetails = lazy(() => import('./Pages/UpcomingEventDetails'));
const PastEvents = lazy(() => import('./Pages/PastEvents'));
const ChoosePlan = lazy(() => import('./Pages/ChoosePlan'));
const Notifications = lazy(() => import('./Pages/Notifications'));
const VerificationEmail = lazy(() => import('./Pages/Authentification/Complete_SignUp/VerificationEmail'));
const RedirectFromSignIn = lazy(() => import('./Pages/Authentification/RedirectFromSignIn'));
const ResendVerification = React.lazy(() => import('./Pages/Authentification/Complete_SignUp/ResendVerificationLink'));
const VerifyFailure = React.lazy(() => import('./Pages/Authentification/VerifyFailure'));
const ManageSubscriptionCredits = React.lazy(() => import('./Pages/ManageSubscriptionCredits'));
const Investment = React.lazy(()  => import('./Pages/Investment/Investment'))

function App() {

  const dispatch = useDispatch();


    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const lang = queryParams.get('lang');
        if (lang) {
            i18n.changeLanguage(lang);
            localStorage.setItem('language', lang); 
        }
    }, []);

  useEffect(() => {
    const rememberMe = getLocalStorageItemWithExpiration('rememberMe');

    if (rememberMe) {
      const userToken = getLocalStorageItemWithExpiration('userToken');
      const userData = getLocalStorageItemWithExpiration('userData');

      if (userToken && userData) {
        // Mettre à jour sessionStorage
        sessionStorage.setItem('userToken', userToken);
        sessionStorage.setItem('userData', userData);
        dispatch(setCredentials(JSON.parse(userData)));
        dispatch(setToken(userToken));
      }
    } else {
      const userToken = sessionStorage.getItem('userToken');
      const userData = sessionStorage.getItem('userData');

      if (userToken && userData) {
        dispatch(setCredentials(JSON.parse(userData)));
        dispatch(setToken(userToken));
      }
    }
  }, [dispatch]);

  useEffect(() => {
    const userDataString = sessionStorage.getItem('userData');
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      // Vérifier si les cookies ne sont pas déjà définis
      if (!document.cookie.includes('user=')) {
        // Set cookie with user data
        document.cookie = `user=${JSON.stringify(userData)}; path=/; secure; SameSite=None`;
      }
    }
  }, []);

  return (
    <I18nextProvider i18n={i18n}> {/* Add I18nextProvider */}
 
    <BrowserRouter>   
      <AutoLogout>
        <div className='font-dm-sans-regular overflow-hidden'>
          <ScrollToTop>
          <div className='min-h-screen'>
          <Suspense fallback={<div className='min-h-[100vh] flex items-center justify-center w-[100%] '><Loader /></div>}>
            <Routes>
              <Route element={<DashbordLayout />}>
                <Route element={<GuardedConnectedUserRoute />}>
                  <Route path="/Dashboard" element={<Dashbord />} />
                  <Route path="/ManageCredits" element={<ManageSubscriptionCredits />} />
                  <Route path="/Users" element={<Users />} />
                  <Route path="/Investors" element={<Investors />} />
                  <Route path="/MyInvestors" element={<MyInvestors />} />
                  <Route path="/InvestorDetails/:investorId" element={<InvestorDetails />} />
                  <Route path="/InvestorRequestsHistoty" element={<InvestorRequestHistory />} />
                  <Route path="/Projects" element={<Projects />} />
                  <Route path="/Createproject" element={<CreateProject />} />
                  <Route path="/Editproject/:projectId" element={<CreateProject />} />
                  <Route path="/Projectdetails/:projectId" element={<ProjectDetails />} />
                  <Route path="/CompanyLegal" element={<CompanyLegal />} />
                  <Route path="/MyCompany" element={<MyCompany />} />
                  <Route path="/Employees" element={<Employees />} />
                  <Route path="/CreateOrEditEmployee" element={<NewEmployee />} />
                  <Route path="/Document" element={<Documents />} />
                  <Route path="/Participate" element={<Events />} />
                  <Route path="/UpcomingEvent" element={<UpcomingEvents />} />
                  <Route path="/PastEvent" element={<PastEvents />} />
                  <Route path="/UpcomingEventDetails/:id" element={<UpcomingEventDetails />} />
                  <Route path="/PastEventDetails/:id" element={<UpcomingEventDetails />} />
                  <Route path="/UserProfile" element={<UserProfile />} />
                  <Route path="/Subscription" element={<Subscription />} />
                  <Route path="/ChoosePlan" element={<ChoosePlan />} />
                  <Route path="/History" element={<History />} />
                  <Route path="/Notification" element={<Notifications />} />
                  <Route path="/SubscribePlan" element={<SubscribePlan />} />
                  <Route path="/Investment" element={<Investment />} />
                </Route>
                <Route element={<GuardedAdminRoute />}>
                  <Route path="/Dashboard_Admin" element={<Dashboard_Admin />} />
                </Route>
              </Route>
              <Route element={<Layout />}>
                <Route element={<GuardedConnectedUserRoute />}>
                  <Route path="/ChooseRole" element={<ChooseRole />} />
                  <Route path="/RedirectFromSignIn" element={<RedirectFromSignIn />} />
                </Route>
                <Route element={<ConnectedUserRoute />}>
                  <Route   path="/SignIn" element={<SignIn />} />
                  <Route   path="/" element={<SignIn />} />
                  <Route   path="/SignUp" element={<SignUp />} />
                  <Route   path="/SocialSignUp" element={<SocialSignUp />} />
                </Route>
                <Route path="/VerificationCode" element={<VerificationCode />} />
                <Route path="/VerificationEmail" element={<VerificationEmail />} />
                <Route path="/ResetPasswordEmail" element={<ResetPasswordEmail />} />
                <Route path="/ForgotPassword" element={<ForgotPassword />} />
                <Route path="/ResetPassword" element={<ResetPassword />} />
                <Route path="/PasswordResetSucces" element={<PasswordResetSucces />} />
                <Route path="/ResendVerificationLink" element={<ResendVerificationLink />} />

                <Route path="/Home" element={<Home />} />
                <Route   path="/Pricing" element={<Pricing />} />
                <Route   path="/ContactUs" element={<ContactUs/>}/>
                <Route   path="/About-Us" element={<AboutUs/>}/>
                <Route   path="/About-Us/Explore" element={<Explore/>}/>
                <Route path="/Failure" element={<Failure/>}/>
                <Route path="/Success" element={<Success/>}/>
                <Route path="/SuccessSignUp" element={<SuccessSignUp/>}/>
                <Route path="/ResendVerification" element={<ResendVerification />} />
                <Route path="/VerifyFailure" element={<VerifyFailure />} />
              
                {/* User Member Routes*/}
                <Route element={<GuardedUserMemberRoutes />}>
                  <Route path="/Payement_Success" element={<PaySuccess />} />
                  <Route path="/Payement_Failed" element={<PayFailed />} />
                </Route>
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
          </div>
          </ScrollToTop>
        </div>
      </AutoLogout>
    </BrowserRouter>    
  </I18nextProvider>

 
  );
}

export default App;
