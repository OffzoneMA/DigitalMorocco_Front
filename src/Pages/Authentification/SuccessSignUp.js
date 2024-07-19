import React, { useEffect , useState} from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCredentials } from "../../Redux/auth/authSlice";
import Loader from '../../Components/Loader';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { languages } from '../../data/tablesData';
import { useUpdateFullNameMutation } from '../../Services/User.Service';

export default function SuccessSignUp() {
  const [searchParams] = useSearchParams();
  const {userSocialInfos} = useSelector((state) => state.auth)
  const dispatch=useDispatch()
  const { userInfo } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const [auth, setAuth] = useState(searchParams.get('auth'))
  const [user_Id, setUser_Id] = useState(searchParams.get('user_id'))
  const [updateFullName] = useUpdateFullNameMutation();
  const [UserId, setUserId] = useState(userInfo?._id)


  const getLanguageLabelById = (id) => {
    const language = languages.find(lang => lang.id === id);
    return language ? language.label : null;
  };

  useEffect(() => {
    if (auth) {
      sessionStorage.setItem('userToken', auth)
  }
}, [auth]);  

useEffect(() => {
  const fetchUserInfo = async (id) => {
    try {
      const userInfo = await axios.get(`${process.env.REACT_APP_baseURL}/users/ById/${id}`);
      sessionStorage.setItem('userData', JSON.stringify(userInfo.data));
      navigate("/ChooseRole");
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  if (user_Id) {
    fetchUserInfo(user_Id);
  }
}, [user_Id, navigate]); 


    
  useEffect(() => {
    if (auth) {
    //   sessionStorage.setItem('userToken', auth)
      axios.get(`${process.env.REACT_APP_baseURL}/users/userInfo`, {
          headers: {
              'Authorization': `Bearer ${auth}`
          }
      })
      .then((response) => {
          const payload = response.data;
          if (payload) {
              dispatch(setCredentials(JSON.stringify(payload)));
              sessionStorage.setItem('userData', JSON.stringify(payload));
              if (userSocialInfos) {
                console.log('Updating full name with:', userSocialInfos);
                const lang = localStorage.getItem('language')
                const languageLabel = getLanguageLabelById(lang);
                updateFullName({ userId: payload._id, payload: { fullName: userSocialInfos , language: languageLabel} })
                    .unwrap()
                    .then((updatedData) => {
                        setUserId(updatedData?.user?._id)
                        dispatch(setCredentials(JSON.stringify(updatedData?.user)));
                        sessionStorage.setItem('userData', JSON.stringify(updatedData?.user));
                        navigate('/ChooseRole');
                    })
                    .catch((updateError) => {
                        console.error('Error updating full name:', updateError);
                        navigate('/ChooseRole'); 
                    });
              }
              navigate('/ChooseRole');
          }
      })
      .catch((error) => {
          console.error('Error fetching user details:', error);
      });
  }

}, [auth , dispatch, navigate, userSocialInfos]);  

    return (
        <div className="flex flex-col items-center justify-center md:h-screen w-full">
        <Loader/>
        </div>
      )
  
    }
 
  

