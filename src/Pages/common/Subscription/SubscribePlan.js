import React, { useState , useEffect } from 'react';
import { Text } from '../../../Components/Text';
import { TiFlashOutline } from "react-icons/ti";
import { FiTrash2 } from "react-icons/fi";
import CancelPlanModal from '../../../Components/Modals/CancelPlanModal';
import AddPaymentMethodModal from '../../../Components/PayementMethod/AddPaymentMethodModal';
import PageHeader from "../../../Components/common/PageHeader";
import { useNavigate , useLocation} from 'react-router-dom';
import { useCreateSubscriptionForUserMutation  , useUpgradeSubscriptionMutation} from '../../../Services/Subscription.Service';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import EmailExistModalOrConfirmation from '../../../Components/Modals/EmailExistModalOrConfirmation';
import checkVerifyImg from '../../../Media/check-verified-02.svg';
import { useGetUserDetailsQuery } from '../../../Services/Auth';
import HelmetWrapper from '../../../Components/common/HelmetWrapper';
import { useCreatePaymentSessionMutation } from '../../../Services/Payement.Service';

export default function SubscribePlan() {
  const { t } = useTranslation();
    const token = sessionStorage.getItem("userToken");
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    const [createSubscriptionForUser] = useCreateSubscriptionForUserMutation();
    const {refetch} = useGetUserDetailsQuery();
    const [upgradeSubscription, { isLoading: upgradeLoading, isSuccess:upgradeSuccess, isError, error }] = useUpgradeSubscriptionMutation();
    const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState('Monthly');
    const [sendingOk , setSendingOk] = useState(false);
    const navigate = useNavigate()
    const location = useLocation();
   
    const [userSubscriptionData , setUserSusbcriptionData] = useState(null);
    const [createPaymentSession] = useCreatePaymentSessionMutation();
    const currentLanguage = localStorage.getItem('language') || 'en'; 
    const [isSuccessOpenModal , setIsSuccessOpenModal] = useState(false);

    console.log("userSubscriptionData", userSubscriptionData);

    // Validation du plan choisi
    const [choosedPlan, setChoosedPlan] = useState(null);
    useEffect(() => {
      if (!location.state?.choosedPlan) {
        navigate('/ChoosePlan', { replace: true });
        return;
      }
      setChoosedPlan(location.state.choosedPlan);
    }, [location.state, navigate]);

    const formatPrice = (price) => {
      const locale = currentLanguage; // Get current language
      return new Intl.NumberFormat(locale, 
        { style: 'currency', currency: 'USD' , currencyDisplay: 'narrowSymbol', }).format(price);
    };

    const getUserSusbcription = async () => {
      try {
          const response = await axios.get(`${process.env.REACT_APP_baseURL}/subscriptions/forUser`, {
              headers: { Authorization: `Bearer ${token}` },
          });
          setUserSusbcriptionData(response.data);
      } catch (error) {
          console.error('Error checking subscription status:', error);
      }
    };
    
    useEffect(() => {
      getUserSusbcription();
    }, []);

    const openCancelModal = (rowData) => {
        setIsCancelModalOpen(true);
    };
    
    const closeCancelModal = () => {
      setIsCancelModalOpen(false);
    };
  
    const openPaymentModal = () => {
      setIsPaymentModalOpen(true);
    };
  
    const closePaymentModal = () => {
      setIsPaymentModalOpen(false);
    };

    const getEndDate = (durationInMonths) => {
      const startDate = new Date();
      startDate.setMonth(startDate.getMonth() + durationInMonths);
    
      return startDate.toLocaleDateString(currentLanguage === 'fr' ? 'fr-FR' : 'en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    };

    const openModal = () => {
      setIsSuccessOpenModal(true);
    };
        
    const closeModal = () => {
      setIsSuccessOpenModal(false);
      refetch();
      navigate('/Subscription');
    };
    

    const monthlyDuration = 1; 
    const annualDuration = monthlyDuration * 12;

  const annualPrice = formatPrice(choosedPlan?.annualPrice || (choosedPlan?.price * 12).toFixed(2));
  const annualPriceNotFormat = choosedPlan?.annualPrice || (choosedPlan?.price * 12).toFixed(2);
  const monthlyPrice = formatPrice(choosedPlan?.price.toFixed(2));
  const endDate = new Date();
  endDate.setFullYear(endDate.getFullYear() + 1);

  const confirmSubscription = async () => {
    try {
        const data = {
            billing: selectedPlan === 'Monthly' ? 'month' : 'year'
        };

        const hasActiveSubscription = userSubscriptionData?._id; 
        let result;

        if (hasActiveSubscription) {

          if (userSubscriptionData?.plan?._id === choosedPlan?._id) {
            console.log('You are already subscribed to this plan');
            return; 
          }
          setSendingOk(true);
          // Store subscription type in session storage
          localStorage.setItem('subscriptionType', 'upgrade');
          
          result = await upgradeSubscription({
              subscriptionId: userSubscriptionData?._id, 
              newPlanId: choosedPlan?._id,
              newBilling: data.billing,
          });
          // result = await createPaymentSession({
          //   name: choosedPlan?.name, 
          //   price: choosedPlan?.price,
          //   currency : "MAD" ,
          //   customerId: userData?._id,
          //   forUser: choosedPlan?.forUser,
          //   language : currentLanguage,
          //   metadata : {
          //     name: `${userData?.firstName} ${userData?.lastName}`,
          //     // email: userData?.email,
          //     email: "earnforroukichane@gmail.com",
          //   }
          // });

        } else {
          setSendingOk(true);
          // Store subscription type in session storage
          localStorage.setItem('subscriptionType', 'new');

          result = await createSubscriptionForUser({
              planId: choosedPlan?._id, 
              data 
          });

          // result = await createPaymentSession({
          //   name: choosedPlan?.name, 
          //   price: choosedPlan?.price,
          //   currency : "MAD" ,
          //   customerId: userData?._id,
          //   forUser: choosedPlan?.forUser,
          //   language : currentLanguage,
          //   metadata : {
          //     name: `${userData?.firstName} ${userData?.lastName}`,
          //     // email: userData?.email,
          //     email: "earnforroukichane@gmail.com"
          //   }
          // });
        }
        console.log('Subscription result:', result);
        // if (result.isSuccess || result?.data?._id)
        if (result?.isSuccess || result?.data?.success) {
          console.log('Subscription created successfully:', result?.data);
          // setSendingOk(false);
          // openModal();
          //Create a hidden form and submit it to redirect to payment page
          const { paywallUrl, payload, signature } = result.data.data;

          const form = document.createElement('form');
          form.method = 'POST';
          form.action = paywallUrl;
          form.style.display = 'none';
        
          const payloadInput = document.createElement('input');
          payloadInput.type = 'hidden';
          payloadInput.name = 'payload';
          payloadInput.value = payload;
          form.appendChild(payloadInput);
          
          const signatureInput = document.createElement('input');
          signatureInput.type = 'hidden';
          signatureInput.name = 'signature';
          signatureInput.value = signature;
          form.appendChild(signatureInput);
          
          document.body.appendChild(form);
          form.submit();
        } else {
            console.log('Subscription failed:', result.error);
        }
    } catch (error) {
        console.error('Error confirming subscription:', error);
    }
};

  // Validation des données nécessaires avant le rendu
  if (!choosedPlan) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <h2 className="text-xl font-dm-sans-medium mb-4">
            {t('subscriptionPlans.errors.noPlanSelected')}
          </h2>
          <button
            onClick={() => navigate('/ChoosePlan')}
            className="bg-blue-A400 text-white-A700 px-4 py-2 rounded"
            type='button'
          >
            {t('subscriptionPlans.selectPlan')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
    <HelmetWrapper 
      title={t('helmet.subscribePlan.title')}
      description={t('helmet.subscribePlan.description')}
      keywords={t('helmet.subscribePlan.keywords')}
      canonical={`${process.env.REACT_APP_URL}/SubscribePlan`}
    />
    <section className="bg-white-A700 flex flex-col gap-8 h-full min-h-screen overflow-auto items-start justify-start pb-14 pt-8 rounded-tl-[40px] w-full">
      <div className="flex flex-col items-start justify-start sm:px-5 px-8 w-full">
        <div className="border-b border-gray-201 border-solid flex flex-col md:flex-row gap-5 items-start justify-start pb-6 w-full">
          <div className="flex flex-1 flex-col font-DmSans h-full items-start justify-start w-full">
            <PageHeader
              >
              {t('settings.subscription.title')}
            </PageHeader>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-start py-6 w-full h-full md:min-h-[540px] gap-8">
          <div className="flex flex-col md:flex-1 lg:flex-1 gap-4">
            <Text className="font-dm-sans-medium text-lg leading-7 text-[#101828] text-left w-full">
            {t('settings.subscription.subscriptionManagement')}
            </Text>
            <div className="flex flex-col w-full rounded-[12px]  border p-4 border-gray-301 gap-4">
              <div className="flex flex-col w-full border-b pb-4 border-gray-301 gap-4">
                <Text className="font-dm-sans-bold text-base leading-6 text-left w-full text-[#101828]">
                {t('subscriptionPlans.selectedPlan')}
                </Text>
                <div className="flex flex-col w-full rounded-[12px] border border-[#E4E7EC] gap-[24px] p-4 ">
                  <div className='flex flex-col gap-1 w-full'>
                    <div className="flex flex-row w-full items-center">
                      <Text className="font-dm-sans-medium text-[22px] leading-8 text-left text-blue-501">
                      {choosedPlan?.forUser?.toLowerCase() === 'investor' ? t(`subscriptionPlans.investor.${choosedPlan?.name?.toLowerCase()}.name`) : t(`subscriptionPlans.${choosedPlan?.name?.toLowerCase()}.name`)}
                      </Text>
                      <div className="flex flex-row ml-auto">
                        <button
                          className={`flex justify-center items-center gap-3 w-[150px] h-[44px] p-[18px_30px] rounded-md hover:bg-[#235DBD] active:bg-[#224a94] cursorpointer ${
                            selectedPlan === 'Monthly' ? 'bg-blue-A400 text-white-A700' : 'border border-blue-A400 text-blue-A400 hover:text-[#EDF7FF]'
                          }`}
                          onClick={() => setSelectedPlan('Monthly')}
                          type="button"
                        >
                          <span className="text-base leading-[20.83px] font-dm-sans-medium">{t('subscriptionPlans.billingCycle.monthly')}</span>
                        </button>
                        <button
                          className={`flex justify-center items-center gap-3 ml-[10px] w-[150px] h-[44px] p-[18px_30px] rounded-md hover:bg-[#235DBD] active:bg-[#224a94] cursorpointer ${
                            selectedPlan === 'Annual' ? 'bg-blue-A400 text-white-A700' : 'border border-blue-A400 text-blue-A400 hover:text-[#EDF7FF]'
                          }`}
                          onClick={() => setSelectedPlan('Annual')}
                          type="button"
                        >
                          <span className="text-base leading-[20.83px] font-medium">{t('subscriptionPlans.billingCycle.annual')}</span>
                        </button>
                      </div>
                    </div>
                    {choosedPlan?.price > 0 && <div className="inline-flex h-[24px] py-[2px] px-[10px] justify-center items-center rounded-[6px] bg-[#E1FFED] ml-auto">
                      <span className="text-[#00CDAE] text-center font-dm-sans text-[10px] font-bold leading-[24px]">
                      {t('subscriptionPlans.billingCycle.annualSave')} 40%
                      </span>
                    </div>}
                  </div>
                  <div className='flex flex-col gap-[16px]'>
                  {choosedPlan?.featureDescriptions?.map((feature, index) => (
                    <div key={index} className={`flex flex-row w-full items-start gap-[12px]`}>
                      <div className="flex flex-col w-[24px] h-[24px] justify-center items-center bg-[#EDF7FF] rounded-full p-1">
                        <svg width="13" height="11" viewBox="0 0 13 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" clipRule="evenodd" d="M11.098 0.390159L3.93797 7.30016L2.03797 5.27016C1.68797 4.94016 1.13797 4.92016 0.737968 5.20016C0.347968 5.49016 0.237968 6.00016 0.477968 6.41016L2.72797 10.0702C2.94797 10.4102 3.32797 10.6202 3.75797 10.6202C4.16797 10.6202 4.55797 10.4102 4.77797 10.0702C5.13797 9.60016 12.008 1.41016 12.008 1.41016C12.908 0.490159 11.818 -0.31984 11.098 0.38016V0.390159Z" fill="#00CDAE"/>
                        </svg>
                      </div>
                      <Text className="font-dm-sans-regular text-base leading-6 text-left w-full text-gray700">
                      {t(feature)}
                      </Text>
                    </div>
                  ))}
                  </div>
                  {(selectedPlan === "Annual"  && choosedPlan?.price > 0 && choosedPlan?.planType !== "upcoming")? (
                    <div className="flex flex-row items-center w-full pt-1">
                        <Text className="font-dm-sans-medium text-base leading-8 text-left text-gray-500 line-through">
                            {annualPrice}
                        </Text>
                        {(choosedPlan?.price > 0 && choosedPlan?.planType !== "upcoming") && <Text className="font-dm-sans-medium text-lg leading-8 text-left text-gray-801 ml-2">
                           {formatPrice((annualPriceNotFormat*(100 - (choosedPlan?.annualDiscountRate || 20))/100).toFixed(2))}, {t('subscriptionPlans.endsOn')}  {getEndDate(annualDuration)}
                        </Text>}
                        <div className="inline-flex h-[24px] p-[2px_10px] justify-center items-center inline-flex rounded-[6px] bg-[#E1FFED] ml-6">
                            <span className="text-[#00CDAE] text-center font-dm-sans text-[10px] font-bold leading-[24px]">
                            {t('settings.subscription.annualDiscount', { rate: choosedPlan?.annualDiscountRate || 20 })}
                            </span>
                        </div>
                    </div>
                  ) : (
                   ( choosedPlan?.price > 0 && choosedPlan?.planType !== "upcoming") && <Text className="font-dm-sans-medium text-lg leading-8 pt-1 text-left w-full text-gray-801">
                      {monthlyPrice}/{t('subscriptionPlans.monthlyFee')}, {t('subscriptionPlans.endsOn')}  {getEndDate(monthlyDuration)}
                    </Text>
                  )}
                </div>
                <Text className="font-dm-sans-bold text-base leading-6 text-left w-full text-[#101828]">
                {t('subscriptionPlans.finalizationMessage')}
                </Text>
                <Text className="font-dm-sans-bold text-base leading-6 text-left text-col1 w-full">
                {t('subscriptionPlans.callToAction')}                
                </Text>
              </div>
              <div className="flex space-x-3 md:space-x-5 items-end  w-full py-2 justify-end">
                <button
                  onClick={() =>navigate('/ChoosePlan')}
                  className="flex flex-row text-base leading-[20.83px] gap-3 w-[147px] h-11 px-[30px] py-[18px] ml-auto items-center justify-center min-w-[93px] rounded-md bg-gray-201 text-blue_gray-301 hover:bg-[#D0D5DD] active:bg-light_blue-100 py-3 px-5 font-dm-sans-medium tracking-normal cursorpointer"
                  type="button"
                >
                  <FiTrash2 size={22} />
                  {t("common.cancel")} 
                </button>
                <button
                  className={`${sendingOk ? 'bg-[#235DBD] min-w-[180px]' : 'bg-blue-A400'} hover:bg-[#235DBD] active:bg-[#224a94] text-base leading-[20.83px] w-[282px] h-11 px-[30px] py-[18px] font-dm-sans-medium text-white-A700 flex flex-row items-center justify-center tracking-normal gap-3 ml-auto py-3 px-5 rounded-md w-auto cursorpointer`}
                  type="button"
                  onClick={()=> confirmSubscription()}
                >
                  {sendingOk ? 
                  <div className="flex items-center justify-center gap-6"> 
                    {t("all.sending")}
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.4995 13.5002L20.9995 3.00017M10.6271 13.8282L13.2552 20.5862C13.4867 21.1816 13.6025 21.4793 13.7693 21.5662C13.9139 21.6415 14.0862 21.6416 14.2308 21.5664C14.3977 21.4797 14.5139 21.1822 14.7461 20.5871L21.3364 3.69937C21.5461 3.16219 21.6509 2.8936 21.5935 2.72197C21.5437 2.57292 21.4268 2.45596 21.2777 2.40616C21.1061 2.34883 20.8375 2.45364 20.3003 2.66327L3.41258 9.25361C2.8175 9.48584 2.51997 9.60195 2.43326 9.76886C2.35809 9.91354 2.35819 10.0858 2.43353 10.2304C2.52043 10.3972 2.81811 10.513 3.41345 10.7445L10.1715 13.3726C10.2923 13.4196 10.3527 13.4431 10.4036 13.4794C10.4487 13.5115 10.4881 13.551 10.5203 13.5961C10.5566 13.647 10.5801 13.7074 10.6271 13.8282Z" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>  : 
                  <>
                  <TiFlashOutline size={23} />
                  {t('subscriptionPlans.confirm')}
                  </> 
                  }
                </button>
              </div>
            </div>
          </div>
          {/* <div className={`flex w-full ${currentLanguage === 'fr' ? 'md:min-w-1/3 md:max-w-[300px] lg:min-w-1/4 lg:max-w-[300px]' : 'md:w-1/3 lg:w-1/4' }`}>
            <PaymentMethode />
          </div> */}
        </div>
      </div>
      <CancelPlanModal isOpen={isCancelModalOpen}  onRequestClose={closeCancelModal}/>
      <AddPaymentMethodModal isOpen={isPaymentModalOpen}  onRequestClose={closePaymentModal}/>
    </section>
      <EmailExistModalOrConfirmation isOpen={isSuccessOpenModal}
        onRequestClose={closeModal} content={
          <div className="flex flex-col gap-[38px] items-center justify-start  w-full">
        <img
          className="h-[80px] w-[80px]"
          src={checkVerifyImg}
          alt="successtick"
        />
        <div className="flex flex-col gap-5 items-center justify-start w-full">
          <Text
            className="text-[#1d2838] w-[460px] text-lg leading-relaxed font-dm-sans-medium text-center "
          >
              {t('subscriptionPlans.confirmSuccess.title')}
          </Text>
          <Text
            className="leading-relaxed w-[460px] font-dm-sans-regular text-[#1d2838] text-center text-sm"
          >
            <>
              {t('subscriptionPlans.confirmSuccess.message')}
            </>
          </Text>
        </div>
          </div>
      }/>
    </>
  );
}

