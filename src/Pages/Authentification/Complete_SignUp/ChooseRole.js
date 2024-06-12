import React , {useState , useRef , useEffect} from "react";
import { useSelector } from "react-redux";
import axios from 'axios';
import { Text } from "../../../Components/Text";
import { Button } from "../../../Components/Button";
import { useTranslation } from "react-i18next";
import RoleConfirmedModal from "../../../Components/RoleConfirmedModal";
import logo from '../../../Media/img_logo.svg';
import userImage from '../../../Media/img_user03.svg';
import startupImage from '../../../Media/img_startup.svg';
import investorImage from '../../../Media/img_investor.svg';
import companyImage from '../../../Media/img_company.svg';
import { useAddNewRequestMutation } from '../../../Services/Auth';
import { authApi } from "../../../Services/Auth";
import { useNavigate , useSearchParams } from "react-router-dom";
import TestPopup from "../../../Components/TestPopup";
import { useUpdateFullNameMutation } from "../../../Services/User.Service";
import { setCredentials } from "../../../Redux/auth/authSlice";
import { useDispatch } from "react-redux";
import Popup from 'reactjs-popup';
import ConfirmedModal from "../../../Components/ConfirmedModal";
import { logout } from "../../../Redux/auth/authSlice";


const ChooseRole = () => {
    const { t, i18n } = useTranslation();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [auth, setAuth] = useState(searchParams.get('auth') ? searchParams.get('auth')  :null)
    const [selectedOption, setSelectedOption] = useState('');
    const { userInfo } = useSelector((state) => state.auth)
    const {userToken} = useSelector((state) =>state.auth)
    const [token , setToken] = useState(sessionStorage.setItem('userToken', auth))
    const { userEmail } = useSelector((state) => state.auth)
    const [UserId, setUserId] = useState(userInfo?._id)
    const [selectedGrid, setSelectedGrid] = useState(null);
    const [userTrigger ,{ data: userData, error: userError, isLoading } ]  = authApi.endpoints.getUserByEmail.useLazyQuery();
    const [updateFullName] = useUpdateFullNameMutation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showLogout , setShowLogout] = useState(false);
    const [addNewRequest, response] = useAddNewRequestMutation()
    const [getUserDetails , { data, isSuccess, isError, error }] = authApi.endpoints.getUserDetails.useLazyQuery();
    const {userSocialInfos} = useSelector((state) => state.auth)
    const [retryCount, setRetryCount] = useState(0);
    const maxRetries = 3;

    const dropdownRef = useRef(null);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowLogout(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

    const handleGridClick = (gridId , option) => {
      setSelectedGrid(gridId);
      setSelectedOption(option);
    };

    useEffect(() => {
      if (auth) {
        console.log('Fetching user details with token:', auth);
        sessionStorage.setItem('userToken', auth)
        setToken(auth)
        axios.get(`${process.env.REACT_APP_baseURL}/users/userInfo`, {
            headers: {
                'Authorization': `Bearer ${auth}`
            }
        })
        .then((response) => {
            const payload = response.data;
            console.log('User details fetched successfully', payload);
            if (payload) {
                dispatch(setCredentials(payload));
                sessionStorage.setItem('userData', payload);
                if (userSocialInfos) {
                  console.log('Updating full name with:', userSocialInfos);
                  updateFullName({ userId: payload._id, payload: { fullName: userSocialInfos } })
                      .unwrap()
                      .then((updatedData) => {
                          console.log('FullName updated', updatedData);
                          dispatch(setCredentials(updatedData));
                          sessionStorage.setItem('userData', updatedData);
                          // navigate('/ChooseRole');
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

  
    useEffect(() => {
      if (userInfo) {
        setUserId(userInfo?._id);
      } else {
        if (userEmail) {
          userTrigger(userEmail).then(() => {
            if (userData && userData.status === 'verified') {
              setUserId(userData?._id)
            }
          }).catch(error => {
            console.error("Error fetching user by email:", error);
          });
        }
      }
    }, [userInfo, userEmail, userData]);
    
    const openModal = () => {
      setIsModalOpen(true);
    };
  
    const closeModal = () => {
      setIsModalOpen(false);
      setSelectedGrid(null);
      setSelectedOption('');
      navigate('/ChooseRole')
      // window.location.href = 'https://digital-morocco-landing-page.vercel.app';
      window.open('https://digital-morocco-landing-page.vercel.app', '_blank');
      // Redirection ves site officiel
    };

    useEffect(()=>{
      if(response.isSuccess)  {
        openModal();
      }
     },[response.isSuccess])

    const confirmRole = () => {
      const formData = new FormData();
      formData.append('role', selectedOption);
      addNewRequest({ formdata: formData, userId: UserId })
      // openModal();
    }

    const handleMouseEnter = () => {
      setShowLogout(true);
    };
  
    const handleMouseLeave = () => {
      setShowLogout(false);
    };

  return (
    <>
      <div className={`bg-white-A700 flex flex-col font-DmSans ${selectedGrid ? 'gap-[20px]': 'gap-[84px]'} items-center justify-start mx-auto pb-[246px] w-full min-h-screen`}>
        <div className="border-b border-gray-201 border-solid flex flex-row md:flex-row gap-10 items-center justify-between px-20 md:px-[100px] py-5 w-full relative">
          <a href="https://digitalmorocco.net" target='_blank'>
            <img
              className="h-[47px] w-[180px]"
              src={logo}
              alt="logo"
            />
          </a>
          <div
            className="flex flex-row gap-[21px] items-start justify-start w-auto h-full relative btnUserProfil"
            ref={dropdownRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <button id="profileBtn" className="btnUserProfil cursorpointer relative" onClick={() => setShowLogout(!showLogout)}>
              <svg width="40" height="41" viewBox="0 0 40 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="1" y="1.78027" width="38" height="38" rx="19" stroke="#1F2545" strokeWidth="2" />
                <path d="M11 28.7803C13.3358 26.3029 16.507 24.7803 20 24.7803C23.493 24.7803 26.6642 26.3029 29 28.7803M24.5 16.2803C24.5 18.7656 22.4853 20.7803 20 20.7803C17.5147 20.7803 15.5 18.7656 15.5 16.2803C15.5 13.795 17.5147 11.7803 20 11.7803C22.4853 11.7803 24.5 13.795 24.5 16.2803Z" stroke="#303030" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            {showLogout && (
              <div className="absolute top-[100%] right-0 w-[248px]">
                <button className="cursorpointer-green bg-white-A700 text-blue_gray-904 flex flex-row gap-4 px-[18px] mt-[5px] border border-gray-201 w-[248px] rounded-[6px] h-[46px] flex items-center transition-colors duration-100 hover:text-[#EA6479] hover:stroke-red" 
                onClick={( ) => dispatch(logout())}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14 15L19 10M19 10L14 5M19 10H7M10 15C10 15.93 10 16.395 9.89778 16.7765C9.62038 17.8117 8.81173 18.6204 7.77646 18.8978C7.39496 19 6.92997 19 6 19H5.5C4.10218 19 3.40326 19 2.85195 18.7716C2.11687 18.4672 1.53284 17.8831 1.22836 17.1481C1 16.5967 1 15.8978 1 14.5V5.5C1 4.10217 1 3.40326 1.22836 2.85195C1.53284 2.11687 2.11687 1.53284 2.85195 1.22836C3.40326 1 4.10218 1 5.5 1H6C6.92997 1 7.39496 1 7.77646 1.10222C8.81173 1.37962 9.62038 2.18827 9.89778 3.22354C10 3.60504 10 4.07003 10 5" stroke="#203668" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="flex items-center font-dm-sans-regular text-base leading-[26px] transition-colors duration-100">{t('chooserole.signout')}</span>
                </button>
              </div>
            )}
          </div>
        </div>
        {selectedGrid && 
        <div className="px-20 flex justify-end w-full h-[52px]">
          <button 
          className={`cursorpointer leading-[20.83px] ml-auto my-3 max-w-[264px] flex flex-row gap-6 h-[52px] items-center justify-center px-[24px] py-[13px] rounded-[200px] w-auto ${ response?.isLoading ? 'bg-greenbtnhoverbg' : 'bg-teal-A700 hover:bg-greenbtnhoverbg  hover:svg-translate'} hover:bg-greenbtnhoverbg hover:svg-translate`} 
          onClick={confirmRole}
          type="button"
        >
          <span className="text-base items-center justify-center font-dm-sans-medium text-white-A700 w-auto">
            {isModalOpen ? t('chooserole.confirmed.button1') : response?.isLoading ? t("all.sending") : t('chooserole.confirmed.button')}
          </span>
          {!isModalOpen && (
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-transform transform">
              <path d="M11 15L15 11M15 11L11 7M15 11H7M21 11C21 16.5228 16.5228 21 11 21C5.47715 21 1 16.5228 1 11C1 5.47715 5.47715 1 11 1C16.5228 1 21 5.47715 21 11Z" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
          </button>
        </div>
        }
        <div className="flex flex-col gap-[42px] items-center justify-start max-w-[1232px] m-auto w-full">
          <Text
            className="text-[22px] text-blue_gray-900 text-center font-dm-sans-medium leading-[32px] w-auto"
          >
            {t('chooserole.welcomeMessage')}
          </Text>
          <div className="flex flex-col gap-[42px] items-center justify-start w-full">
            <div className="flex flex-col items-center justify-start w-full">
              <Text
                className="text-base text-blue_gray-500 font-dm-sans-medium  leading-[26px] text-center w-full"
              >
                {t('chooserole.choosePathMessage')} <br/>
                {t('chooserole.choosePathMessage2')}
              </Text>
            </div>
            <div className="flex flex-col items-center"> 
            <div className="gap-[42px] grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full">
              <div onClick={() => handleGridClick(1 , 'member')} 
                className={`border-2 animation border-solid flex flex-col items-center justify-start md:px-10 px-16 sm:px-5 py-[42px] rounded-[16px] w-[382.67px] cursorpointer-green hover:border-blue-503 hover:shadow-roleCardbs ${selectedGrid == 1 ? 'border-blue-503 shadow-roleCardbs' : 'border-gray-201'}`}>
                <div className="flex flex-col gap-[22px] items-center justify-start w-auto">
                  <Text
                    className="font-dm-sans-bold text-base leading-[26px] tracking-[2px]  text-center text-blue_gray-904 tracking-[2.00px] uppercase w-auto"
                  >
                    {t('chooserole.startup')}
                  </Text>
                  <img
                    className="h-40 w-40"
                    src={startupImage}
                    alt="startup"
                  />
                  <Text
                    className="leading-[26.00px] max-w-[257px]  font-dm-sans-regular text-center text-color2"
                  >
                   {t('chooserole.startupDescription')}
                  </Text>
                </div>
              </div>
              <div onClick={() => handleGridClick(2 , 'investor')} 
              className={`border-2 animation border-solid flex flex-col items-center justify-start md:px-10 px-16 sm:px-5 py-[42px] rounded-[16px] w-[382.67px] cursorpointer-green hover:border-blue-503 hover:shadow-roleCardbs ${selectedGrid === 2 ? 'border-blue-503 shadow-roleCardbs' : 'border-gray-201'}`}>                
                <div className="flex flex-col gap-[22px] items-center justify-start w-auto">
                  <Text
                    className="font-dm-sans-bold text-base leading-[26px] tracking-[2px]  text-center text-blue_gray-904 tracking-[2.00px] uppercase w-auto"
                    >
                    {t('chooserole.investor')}
                  </Text>
                  <img
                    className="h-40 w-40"
                    src={investorImage}
                    alt="startup"
                  />
                  <Text
                    className="leading-[26.00px] max-w-[257px]  font-dm-sans-regular text-center text-color2"
                    >
                    {t('chooserole.investorDescription')}
                  </Text>
                </div>
              </div>
              <div onClick={() => handleGridClick(3 , 'partner')} 
              className={`border-2 animation border-solid flex flex-col items-center justify-start md:px-10 px-16 sm:px-5 py-[42px] rounded-[16px] w-[382.67px] cursorpointer-green hover:border-blue-503 hover:shadow-roleCardbs ${selectedGrid === 3 ? 'border-blue-503 shadow-roleCardbs' : 'border-gray-201'}`}>                
                <div className="flex flex-col gap-[22px] items-center justify-start w-auto">
                  <Text
                    className="font-dm-sans-bold text-base leading-[26px] tracking-[2px]  text-center text-blue_gray-904 tracking-[2.00px] uppercase w-auto"
                    >
                    {t('chooserole.company')}
                  </Text>
                  <img
                    className="h-40 w-40"
                    src={companyImage}
                    alt="startup"
                  />
                  <Text
                    className="leading-[26.00px] max-w-[257px]  font-dm-sans-regular text-center text-color2"
                    >
                    {t('chooserole.companyDescription')}
                  </Text>
                </div>
              </div>
            </div>
            </div>
            
          </div>
        </div>
      </div>
      <div>
      </div>
      <ConfirmedModal isOpen={isModalOpen}
        onRequestClose={closeModal}
        m1={t('chooserole.confirmed.m1')}
        m2={t('chooserole.confirmed.m2')}
        m3={t('chooserole.confirmed.m3')}
        m4={t('chooserole.confirmed.m4')}
        />
    </>
  );
};

export default ChooseRole;
