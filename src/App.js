import { Route, Routes, BrowserRouter } from 'react-router-dom';
import './App.css';
import Partners from './Pages/Partners';
import Home from './Pages/Home';
import Header from './Components/Header';
import PartnerDetails from './Pages/PartnerDetails';

function App() {
  return (
    <BrowserRouter>   
       <Header />
       <div className=' pt-10'>
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route   path="/" element={<Partners />} />
        <Route path="/Partners/:partnerId" element={<PartnerDetails />} />

      </Routes>
      </div>
    </BrowserRouter>    
 
  );
}

export default App;
