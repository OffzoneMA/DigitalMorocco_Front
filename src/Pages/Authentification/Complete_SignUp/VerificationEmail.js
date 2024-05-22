import React , {useRef , useEffect , useState} from 'react'
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Text } from '../../../Components/Text';
import { authApi } from '../../../Services/Auth';
import { useNavigate } from 'react-router-dom';
import toast , {Toaster} from 'react-hot-toast';
import logo from '../../../Media/img_logo.svg';
import verifyImage from '../../../Media/img_verify.svg';


export default function VerificationEmail() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { loading, userInfo, error } = useSelector((state) => state.auth)
  const { userEmail } = useSelector((state) => state.auth)
  const [User, setUser] = useState(userInfo);
  const [userTrigger ,{ data: userData, error: userError, isLoading } ]  = authApi.endpoints.getUserByEmail.useLazyQuery()
  const [trigger, { data, isFetching, status , isSuccess , error: sendError}] = authApi.endpoints.sendEmailVerification.useLazyQuery()

  const handleResendEmail = async () => {
    try {
      await userTrigger(userInfo?.email).then((payload) => {
        if (payload?.isSuccess) {
          trigger(userInfo?._id);
        }
      })
    } catch (error) {
      console.error('Resend email request failed:', error);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
console.log(userInfo)
  useEffect(() => {
    const checkAccountVerification = async () => {
      if (userInfo) {
        userTrigger(userInfo?.email).then((payload) => {
          if (payload?.isSuccess && payload?.data?.status === 'verified') {
            toast.success("Account Verified !");
            setTimeout(() => {
              if (!payload?.data?.role) {
                navigate('/ChooseRole');
              } else {
                navigate('/SignIn');
              }
            }, 2000);
          }
        })
      }
      //  else {
      //   if (userEmail) {
      //     userTrigger(userEmail).then((payload) => {
      //       if (payload?.isSuccess && payload?.data?.status === 'verified') {
      //         toast.success("Account Verified !");
      //         setTimeout(() => {
      //           if (!payload?.data?.role) {
      //             navigate('/ChooseRole');
      //           } else {
      //             navigate('/SignIn');
      //           }
      //         }, 2000);
      //       }
      //     } )
      //   } else {
      //     console.log('user Email not found')
      //     console.log(userEmail)
      //   }

      // }
    };
  
    checkAccountVerification();
  
    const interval = setInterval(() => {
      checkAccountVerification();
    }, 5000); 
  
    return () => clearInterval(interval); 
  }, [userInfo]);
  
  

  useEffect(() => {
    if (data) {
      toast.success("Email Send")
    }
    if (sendError && sendError?.data?.name === "CastError") {
      toast.error('User not found !')
      console.log(sendError)
    }

  }, [isFetching])


  const formButtonRef = useRef();

  const onButtonClick = (inputref) => {
    inputref.current.click();
  };


    return (
        <>
          <div className="bg-gray-100 flex flex-col min-h-screen font-DmSans items-center justify-start mx-auto p-[60px] md:px-10 sm:px-5 w-full">
            <div className=" flex flex-col gap-[42px] items-center justify-start mb-[77px] w-auto w-full">
              <a href='https://digitalmorocco.net' target='_blank' className="flex flex-col items-center justify-center w-full">
                <img
                  className="h-[50px] w-[183px]"
                  src={logo}
                  alt="logo"
                />
              </a>
              <div className="bg-white-A700 flex flex-col gap-9 items-center justify-start px-6 py-[42px] rounded-[12px] shadow-formbs max-w-[520px] w-full">
                <Toaster/>
                <div className="flex flex-col items-center justify-start w-auto">
                  <img
                    className="h-[235px] w-[256px]"
                    src={verifyImage}
                    alt="logo"
                  />
                </div>
                <Text
                  className="text-[22px] font-dm-sans-medium text-gray-901 leading-8 w-auto"
                >
                  {t('verifyEmailMsg')}
                </Text>
                <div className="flex flex-col gap-9 items-center justify-start w-full">
                    <Text
                      className="leading-[26.00px] px-4 font-dm-sans-medium text-base text-[#667085] text-center"
                    >
                      <>
                        {t('verification.instructions')}
                      </>
                    </Text>
                  <div className="flex flex-col gap-6 items-center justify-start w-full">
                    <button
                        type="button"
                        onClick={handleResendEmail}
                        className="bg-[#EDF7FF] hover:bg-gray-202 flex cursorpointer flex-row h-[52px] items-center justify-center px-6 rounded-[26px] text-base items-center justify-center font-dm-sans-medium text-[#00CDAE] w-full"
                    >
                        {isFetching? t('forgot.resetPasswordSend') :t('resetEmail.resendEmail') }
                    </button>
                    <div className="flex flex-row gap-2.5 items-center justify-start w-auto">
                      <Text
                        className="text-blue_gray-900_02 font-dm-sans-medium leading-[26px] text-sm w-auto"
                        >
                        {t('resetEmail.signInTrouble')}
                      </Text>
                      <a href="mailto:support@digitalmorocco.net">
                        <Text
                          className=" text-deep_purple-A400 hover:text-[#00CDAE] leading-[26px] font-dm-sans-bold text-sm w-auto cursorpointer"
                        >
                          {t('resetEmail.contactSupport')}
                        </Text>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      );
}