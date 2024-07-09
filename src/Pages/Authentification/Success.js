import React, { useEffect , useState} from 'react';
import { CheckCircleIcon } from '@heroicons/react/24/solid'
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout, setCredentials } from "../../Redux/auth/authSlice";
import Loader from '../../Components/Loader';
import axios from 'axios';

export default function Success() {
  const [searchParams] = useSearchParams();
  const dispatch=useDispatch()
  const navigate = useNavigate()
  const [auth, setAuth] = useState(searchParams.get('auth') ? searchParams.get('auth')  :null)
    
    useEffect(() => {
        if (auth) {
          sessionStorage.setItem('userToken', auth)
          axios.get(`${process.env.REACT_APP_baseURL}/users/userInfo`, {
              headers: {
                  'Authorization': `Bearer ${auth}`
              }
          })
          .then((response) => {
              const payload = response.data;
              if (payload) {
                  sessionStorage.setItem('userToken', auth)
                  dispatch(setCredentials(JSON.stringify(payload)));
                  sessionStorage.setItem('userData', JSON.stringify(payload));
                    // navigate('/SignIn') 
                    // openModal();
                    if (payload?.role?.toLowerCase() == "admin") { 
                      navigate('/Dashboard_Admin') 
                    }
                    else if(payload?.status?.toLowerCase() == "pending") {
                      navigate('/RedirectFromSignIn')
                    }
                    else{
                      // navigate('/Dashboard')
                      // openModal();
                      navigate('/RedirectFromSignIn')
                    }
                  
              }
          })
          .catch((error) => {
          });
      }
    
    }, [auth , dispatch, navigate]); 
    return (
        <div className="flex flex-col items-center justify-center md:h-screen w-full">
        <Loader/>
        </div>
      )
  
    }
 
  

