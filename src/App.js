import React, { lazy  , useEffect} from 'react';
import { Route, Routes , useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import './App.css';
import { I18nextProvider } from 'react-i18next'; 
import i18n from './i18n';
import GuardedConnectedUserRoute from './GuardedRoutes/GuardedConnectedUserRoute';
import GuardedAdminRoute from './GuardedRoutes/GuardedAdminRoute';
import Dashboard_Admin from './Pages/Dashboard_Admin/Dashboard';
// import LogRocket from 'logrocket';
// import setupLogRocketReact from 'logrocket-react';
import { getLocalStorageItemWithExpiration } from './data/helper';
import { setCredentials , setToken } from './Redux/auth/authSlice';
import ConnectedUserRoute from './GuardedRoutes/ConnectedUserRoute';
// import Loader from './Components/Loader';
import Layout from './Components/Layouts/Layout';
import DashbordLayout from "./Components/Layouts/DashbordLayout";
import SubscribePlan from './Pages/common/Subscription/SubscribePlan';
import NotFound from './Pages/NotFound';
// import { useLocation } from 'react-router-dom';
import ScrollToTop from './Components/ScrollToTop';
import AutoLogout from './Components/AutoLogout ';
import ResendVerificationLink from './Pages/Authentification/Complete_SignUp/ResendVerificationLink';
import RouteTracker from './Components/common/RouteTracker';
import ErrorBoundary from './Components/errors/ErrorBoundary';
import { initGA  , trackPageView } from './utils/analytics';
import { initGTM } from './utils/gtm';

// Utiliser React.lazy pour le code splitting
const SignIn = lazy(() => import('./Pages/Authentification/SignIn'));
const SignUp = lazy(() => import('./Pages/Authentification/SignUp'));
const Failure = lazy(() => import('./Pages/Authentification/Failure'));
const Success = lazy(() => import('./Pages/Authentification/Success'));
const SuccessSignUp = lazy(() => import('./Pages/Authentification/SuccessSignUp'))
const Subscription = lazy(() => import('./Pages/common/Subscription/Subscription'));
// const GuardedUserMemberRoutes = lazy(() => import('./GuardedRoutes/GuardedUserMemberRoutes'));
const UserProfile = lazy(() => import('./Pages/common/UserProfile'));
const VerificationCode = lazy(() => import('./Pages/Authentification/Complete_SignUp/VerificationCode'));
const ResetPasswordEmail = lazy(() => import('./Pages/Authentification/ResetPasswordEmail'));
const ResetPassword = lazy(() => import('./Pages/Authentification/ResetPassword'));
const PasswordResetSucces = lazy(() => import('./Pages/Authentification/PasswordResetSucces'));
const ForgotPassword = lazy(() => import('./Pages/Authentification/ForgotPassword'));
const ChooseRole = lazy(() => import('./Pages/Authentification/Complete_SignUp/ChooseRole'));
const SocialSignUp = lazy(() => import('./Pages/Authentification/SocialSignUp'));
const Projects = lazy(() => import('./Pages/Member/Project/Projects'));
const CreateProject = lazy(() => import('./Pages/Member/Project/CreateProject'));
const ProjectDetails = lazy(() => import('./Pages/Member/Project/ProjectDetails'));
const CompanyLegal = lazy(() => import('./Pages/common/Company/CompanyLegal'));
const MyCompany = lazy(() => import('./Pages/common/Company/MyCompany'));
const Employees = lazy(() => import('./Pages/common/Company/Employees'));
const NewEmployee = lazy(() => import('./Pages/common/Company/NewEmployee'));
const Dashbord = lazy(() => import('./Pages/Member/Dashbord'));
const Dashboard_Investor = lazy(() => import('./Pages/Investor/Dashboard_Investor'));
const Dashboard_Partner = lazy(() => import('./Pages/Partner/Dashboard_Partner'));
const Investors = lazy(() => import('./Pages/Member/Investor/Investors'));
const InvestorDetails = lazy(() => import('./Pages/Member/Investor/InvestorDetails'));
const InvestorRequestHistory = lazy(() => import('./Pages/Member/Investor/InvestorRequestHistory'));
const MyInvestors = lazy(() => import('./Pages/Member/Investor/MyInvestor'));
const Documents = lazy(() => import('./Pages/common/Documents'));
const Events = lazy(() => import('./Pages/common/Event/Events'));
const History = lazy(() => import('./Pages/common/History'));
const Users = lazy(() => import('./Pages/Dashboard_Admin/Users'));
const UpcomingEvents = lazy(() => import('./Pages/common/Event/UpcomingEvent'));
const UpcomingEventDetails = lazy(() => import('./Pages/common/Event/UpcomingEventDetails'));
const PastEvents = lazy(() => import('./Pages/common/Event/PastEvents'));
const ChoosePlan = lazy(() => import('./Pages/common/Subscription/ChoosePlan'));
const Notifications = lazy(() => import('./Pages/common/Notifications'));
const VerificationEmail = lazy(() => import('./Pages/Authentification/Complete_SignUp/VerificationEmail'));
const RedirectFromSignIn = lazy(() => import('./Pages/Authentification/RedirectFromSignIn'));
const ResendVerification = React.lazy(() => import('./Pages/Authentification/Complete_SignUp/ResendVerificationLink'));
const VerifyFailure = React.lazy(() => import('./Pages/Authentification/VerifyFailure'));
const ManageSubscriptionCredits = React.lazy(() => import('./Pages/common/Subscription/ManageSubscriptionCredits'));
const Investment = React.lazy(()  => import('./Pages/Investor/Investment/Investment'))
const MyInvestment = React.lazy(() => import('./Pages/Investor/MyInvestment/MyInvestment'))
const MyInvestmentDetails = React.lazy(() => import('./Pages/Investor/MyInvestment/MyInvestmentDetails'))
const InvestmentRequestHistory = React.lazy(() => import('./Pages/Investor/Investment/InvestmentRequestHistory'))
const UpcomingSponsorEvent = React.lazy(() => import('./Pages/Partner/Sponsoring/UpcomingSponsorEvent'))
const SponsorEventDetails = React.lazy(() => import('./Pages/Partner/Sponsoring/SponsorEventDetails'))
const SponsorCurrentRequests = React.lazy(() => import('./Pages/Partner/Sponsoring/SponsorCurrentRequests'))
const PastSponsorEvent = React.lazy(() => import('./Pages/Partner/Sponsoring/PastSponsorEvent'))
const SponsorCurrentRequestDetails = React.lazy(() => import('./Pages/Partner/Sponsoring/SponsorCurrentRequestDetails'))
const PastSponsorEventDetails = React.lazy(() => import('./Pages/Partner/Sponsoring/PastSponsorEventDetails'))
const SponsorRequestHistory = React.lazy(() => import('./Pages/Partner/Sponsoring/SponsorRequestHistory'))
const SponsorRequestHistoryDetails = React.lazy(() => import('./Pages/Partner/Sponsoring/SponsorRequestHistoryDetails'))
const CompanyProfile = React.lazy(() => import('./Pages/Investor/Company/CompanyProfile'))
const MembersHistory = React.lazy(() => import('./Pages/Dashboard_Admin/Histories/MembersHistory'))
const InvestorsHistory = React.lazy(() => import('./Pages/Dashboard_Admin/Histories/InvestorsHistory'))
const CompaniesHistory = React.lazy(() => import('./Pages/Dashboard_Admin/Histories/CompaniesHistory'))
 
function App() {

  const dispatch = useDispatch();

  const location = useLocation();

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

  useEffect(() => {
      initGA();
      initGTM();
    }
  , []);

  useEffect(() => {
    trackPageView(location.pathname + location.search);
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'pageview',
      page: location.pathname + location.search,
    });
  }, [location]);

  return (
    <I18nextProvider i18n={i18n}> {/* Add I18nextProvider */}
 
      <AutoLogout>
        <div className='font-dm-sans-regular overflow-hidden'>
          <RouteTracker>
            <ScrollToTop>
            <div className='min-h-screen'>
              <ErrorBoundary>
                <Routes>
                  <Route element={<DashbordLayout />}>
                    <Route element={<GuardedConnectedUserRoute />}>
                      <Route path="/Dashboard" element={<Dashbord />} />
                      <Route path="/Dashboard_Investor" element={<Dashboard_Investor />} />
                      <Route path="/Dashboard_Partner" element={<Dashboard_Partner />} />
                      <Route path="/ManageCredits" element={<ManageSubscriptionCredits />} />
                      <Route path="/Users" element={<Users />} />
                      <Route path="/Investors" element={<Investors />} />
                      <Route path="/MyInvestors" element={<MyInvestors />} />
                      <Route path="/InvestorDetails/:investorId" element={<InvestorDetails />} />
                      <Route path="/MyInvestorDetails/:investorId" element={<InvestorDetails />} />
                      <Route path="/InvestorRequestsHistoty" element={<InvestorRequestHistory />} />
                      <Route path="/Projects" element={<Projects />} />
                      <Route path="/Createproject" element={<CreateProject />} />
                      <Route path="/Editproject/:projectId" element={<CreateProject />} />
                      <Route path="/Projectdetails/:projectId" element={<ProjectDetails />} />
                      <Route path="/CompanyLegal" element={<CompanyLegal />} />
                      <Route path="/MyCompany" element={<MyCompany />} />
                      <Route path="/InvestorProfile" element={<CompanyProfile />} />
                      <Route path="/Employees" element={<Employees />} />
                      <Route path="/CreateEmployee" element={<NewEmployee />} />
                      <Route path="/EditEmployee/:employeeId" element={<NewEmployee />} />
                      <Route path="/Document" element={<Documents />} />
                      <Route path="/Participate" element={<Events />} />
                      <Route path="/UpcomingEvent" element={<UpcomingEvents />} />
                      <Route path="/PastEvent" element={<PastEvents />} />
                      <Route path="/UpcomingEventDetails/:id" element={<UpcomingEventDetails />} />
                      <Route path="/EventDetails/:id" element={<UpcomingEventDetails />} />
                      <Route path="/PastEventDetails/:id" element={<UpcomingEventDetails />} />
                      <Route path="/UserProfile" element={<UserProfile />} />
                      <Route path="/Subscription" element={<Subscription />} />
                      <Route path="/ChoosePlan" element={<ChoosePlan />} />

                      <Route path="/History" element={<History />} />
                      <Route path="/MembersHistory" element={<MembersHistory />} />
                      <Route path="/InvestorsHistory" element={<InvestorsHistory />} />
                      <Route path="/CompaniesHistory" element={<CompaniesHistory />} />
                      <Route path="/Notification" element={<Notifications />} />
                      <Route path="/SubscribePlan" element={<SubscribePlan />} />
                      <Route path="/Investment" element={<Investment />} />
                      <Route path="/MyInvestment" element={<MyInvestment />} />
                      <Route path="/InvestmentDetails/:id" element={<MyInvestmentDetails />} />
                      <Route path="/InvestmentRequestDetails/:id" element={<MyInvestmentDetails />} />
                      <Route path="/InvestmentRequestHistoryDetails/:id" element={<MyInvestmentDetails />} />
                      <Route path="/InvestmentRequestHistory" element={<InvestmentRequestHistory />} />
                      <Route path="/UpcomingSponsorEvent" element={<UpcomingSponsorEvent />} />
                      <Route path="/SponsorEventDetails/:id" element={<SponsorEventDetails />} />
                      <Route path="/SponsorCurrentRequest" element={<SponsorCurrentRequests />} />
                      <Route path="/PastSponsorEvent" element={<PastSponsorEvent />} />
                      <Route path="/SponsorCurrentRequestDetails/:id" element={<SponsorCurrentRequestDetails />} />
                      <Route path="/PastSponsorEventDetails/:id" element={<PastSponsorEventDetails />} />
                      <Route path="/SponsorRequestHistory" element={<SponsorRequestHistory />} />
                      <Route path="/SponsorRequestHistoryDetails/:id" element={<SponsorRequestHistoryDetails />} />

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

                    <Route path="/Failure" element={<Failure/>}/>
                    <Route path="/Success" element={<Success/>}/>
                    <Route path="/SuccessSignUp" element={<SuccessSignUp/>}/>
                    <Route path="/ResendVerification" element={<ResendVerification />} />
                    <Route path="/VerifyFailure" element={<VerifyFailure />} />
                  </Route>
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </ErrorBoundary>
            </div>
            </ScrollToTop>
          </RouteTracker>
        </div>
      </AutoLogout>
  </I18nextProvider>

 
  );
}

export default App;
