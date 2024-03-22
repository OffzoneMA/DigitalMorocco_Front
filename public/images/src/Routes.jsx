import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "pages/Home";
import NotFound from "pages/NotFound";
import SidebarNav from "./components/SidebarNav";
import DashbordLayout from "./components/DashbordLayout";
import Projects from "./pages/Projects";
import CreateProject from "./pages/CreateProject";
import ProjectDetails from "./pages/ProjectDetails";
import CompanyLegal from "./pages/CompanyLegal";
import MyCompany from "./pages/MyCompany";
import Employees from "./pages/Employees";
import NewEmployee from "./pages/NewEmployee";
import SideBar22 from "./components/SideBar22";
const PasswordresetentercodeThree = React.lazy(
  () => import("pages/PasswordresetentercodeThree"),
);
const PasswordresetentercodeTwo = React.lazy(
  () => import("pages/PasswordresetentercodeTwo"),
);
const RegisterVerifyEmail = React.lazy(
  () => import("pages/RegisterVerifyEmail"),
);
const RegisterError = React.lazy(() => import("pages/RegisterError"));
const RegisterFilled = React.lazy(() => import("pages/RegisterFilled"));
const RegisterOne = React.lazy(() => import("pages/RegisterOne"));
const PasswordresetenteremailFour = React.lazy(
  () => import("pages/PasswordresetenteremailFour"),
);
const PasswordresetenteremailOne = React.lazy(
  () => import("pages/PasswordresetenteremailOne"),
);
const PasswordresetenteremailNine = React.lazy(
  () => import("pages/PasswordresetenteremailNine"),
);
const Passwordresetenteremail = React.lazy(
  () => import("pages/Passwordresetenteremail"),
);
const PasswordresetenteremailEight = React.lazy(
  () => import("pages/PasswordresetenteremailEight"),
);
const PasswordresetenteremailSeven = React.lazy(
  () => import("pages/PasswordresetenteremailSeven"),
);
const Frame1000004510 = React.lazy(() => import("pages/Frame1000004510"));
const PasswordresetentercodeOne = React.lazy(
  () => import("pages/PasswordresetentercodeOne"),
);
const Passwordresetentercode = React.lazy(
  () => import("pages/Passwordresetentercode"),
);
const VerificationCode = React.lazy(
  () => import("pages/VerificationCode"),
);
const RegisterErrorOne = React.lazy(() => import("pages/RegisterErrorOne"));
const RegisterFilledOne = React.lazy(() => import("pages/RegisterFilledOne"));
const Register = React.lazy(() => import("pages/Register"));
const PasswordResetSucces = React.lazy(
  () => import("pages/PasswordResetSucces"),
);
const ResetPassword = React.lazy(
  () => import("pages/ResetPassword"),
);
const ResendCodeEmail = React.lazy(
  () => import("pages/ResendCodeEmail"),
);
const ForgotPassword = React.lazy(
  () => import("pages/ForgotPassword"),
);
const PasswordresetenteremailFive = React.lazy(
  () => import("pages/PasswordresetenteremailFive"),
);
const PasswordresetenteremailTwo = React.lazy(
  () => import("pages/PasswordresetenteremailTwo"),
);

const Login = React.lazy(
  () => import("modals/Login"),
);
const SignUp = React.lazy(
  () => import("./pages/SignUp"),
);

const SignIn = React.lazy(
  () => import("./pages/SignIn"),
);


const ProjectRoutes = () => {
  return (
    <React.Suspense fallback={<>Loading...</>}>
      <Router>
        <Routes>
          <Route element={<DashbordLayout />}>
            <Route path="/projects" element={<Projects />} />
            <Route path="/createproject" element={<CreateProject />} />
            <Route path="/projectdetails" element={<ProjectDetails />} />
            <Route path="/CompanyLegal" element={<CompanyLegal />} />
            <Route path="/myCompany" element={<MyCompany />} />
            <Route path="/employees" element={<Employees />} />
            <Route path="/newEmployee" element={<NewEmployee />} />
          </Route>
          <Route path="/" element={<Home />} />
          <Route path="/sidebar" element={<SidebarNav />} />
          <Route path="/sidebar22" element={<SideBar22 />} />
          <Route path="*" element={<NotFound />} />
          <Route   path="/SignUp" element={<SignUp />} />
          <Route   path="/SignIn" element={<SignIn />} />

          <Route
            path="/passwordresetenteremailtwo"
            element={<PasswordresetenteremailTwo />}
          />
          <Route
            path="/ForgotPassword"
            element={<ForgotPassword />}
          />
          <Route
            path="/ResendCodeEmail"
            element={<ResendCodeEmail />}
          />
          <Route
            path="/ResetPassword"
            element={<ResetPassword />}
          />
          <Route
            path="/PasswordResetSucces"
            element={<PasswordResetSucces />}
          />
          <Route path="/registerfilledone" element={<RegisterFilledOne />} />
          <Route path="/registererrorone" element={<RegisterErrorOne />} />
          <Route
            path="/registerverifyCode"
            element={<VerificationCode />}
          />
          <Route
            path="/passwordresetentercode"
            element={<Passwordresetentercode />}
          />
          <Route
            path="/passwordresetentercodeone"
            element={<PasswordresetentercodeOne />}
          />
          <Route path="/frame1000004510" element={<Frame1000004510 />} />
          <Route
            path="/passwordresetenteremailseven"
            element={<PasswordresetenteremailSeven />}
          />
          <Route
            path="/passwordresetenteremaileight"
            element={<PasswordresetenteremailEight />}
          />
          <Route
            path="/passwordresetenteremail"
            element={<Passwordresetenteremail />}
          />
          <Route
            path="/passwordresetenteremailnine"
            element={<PasswordresetenteremailNine />}
          />
          <Route
            path="/passwordresetenteremailone"
            element={<PasswordresetenteremailOne />}
          />
          <Route
            path="/passwordresetenteremailfour"
            element={<PasswordresetenteremailFour />}
          />
          <Route path="/registerone" element={<RegisterOne />} />
          <Route path="/registerfilled" element={<RegisterFilled />} />
          <Route path="/registererror" element={<RegisterError />} />
          <Route
            path="/registerverifyemail"
            element={<RegisterVerifyEmail />}
          />
          <Route
            path="/passwordresetentercodetwo"
            element={<PasswordresetentercodeTwo />}
          />
          <Route
            path="/passwordresetentercodethree"
            element={<PasswordresetentercodeThree />}
          />
          <Route
            path="/login"
            element={<Login />}
          />
        </Routes>
      </Router>
    </React.Suspense>
  );
};
export default ProjectRoutes;
