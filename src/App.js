import { Route, Routes, BrowserRouter } from 'react-router-dom';
import './App.css';
import Partners from './Pages/Partners';
import Home from './Pages/Home';
import Header from './Components/Header';
import PartnerDetails from './Pages/PartnerDetails';
import SignIn from './Pages/SignIn';
import SignUp from './Pages/SignUp';
import Footer from './Components/Footer/Footer';
import Admin from './Pages/Admin';


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
        <Route path="/Partners/:partnerId" element={<PartnerDetails />} /> {/**/}
        <Route   path="/Admin" element={<Admin />} />
        

      </Routes>
      <Footer />
      </div>
     
    </BrowserRouter>    
 
  );
}

export default App;
