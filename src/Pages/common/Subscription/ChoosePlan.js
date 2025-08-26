import React, { useState, useEffect } from 'react';
import { useGetAllSubscriptionPlansQuery } from '../../../Services/SubscriptionPlan.service';
import Loader from '../../../Components/Loader';
import { useTranslation } from 'react-i18next';
import MemberPlan from '../../../Components/Modals/MemberPlan';
import HelmetWrapper from '../../../Components/common/HelmetWrapper';
import axios from 'axios';

export default function ChoosePlan() {
  const { t } = useTranslation();
  const token = sessionStorage.getItem("userToken");
  const userData = JSON.parse(sessionStorage.getItem('userData'));
  const userRole = userData?.role?.toLowerCase() === 'investor' ? 'Investor' : 'Member';
  const { data: plans, isLoading } = useGetAllSubscriptionPlansQuery();
  const memberPlans = plans?.filter(plan => plan.forUser === userRole);
  const [userSubscriptionData, setUserSusbcriptionData] = useState(null);

  //   const formatPrice = (price) => {
  //     const locale = currentLanguage === 'fr' ? 'fr-FR' : 'en-US';
  //     const currency = 'USD';

  //     return new Intl.NumberFormat(locale, { style: 'currency', currency , currencyDisplay: 'narrowSymbol' }).format(price);
  // };

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


  return (
    <>
      <HelmetWrapper
        title={t('helmet.choosePlan.title')}
        description={t('helmet.choosePlan.description')}
        keywords={t('helmet.choosePlan.keywords')}
        canonical={`${process.env.REACT_APP_URL}/ChoosePlan`}
      />
      <section className="bg-white-A700 flex flex-col gap-8 h-full min-h-screen overflow-auto items-start justify-start pb-14 pt-8 rounded-tl-[40px] w-full">
        <div className="flex flex-col items-start justify-start sm:px-5 px-8 w-full">
          <div className="border-b border-gray-201 border-solid flex flex-col md:flex-row gap-5 items-start justify-start pb-6 w-full">
            <div className="flex flex-1 flex-col h-full items-start justify-start w-full">
              <h1
                className="text-3xl font-dm-sans-bold leading-11 text-[#101828] w-full"
              >
                {t('subscriptionPlans.title')}
              </h1>
            </div>
          </div>
          <div className="flex flex-col items-start py-6 w-full h-full gap-3">
            <p
              className="text-base font-dm-sans-bold leading-6 text-gray-900_01 w-full"
            >
              {t('subscriptionPlans.accelerateJourney')}
            </p>
            <p
              className="text-[28px] font-dm-sans-bold leading-[42px] text-gray-900_01 w-full"
            >
              {t('subscriptionPlans.choosePlan')}
            </p>
            {isLoading ?
              <div className='flex justify-center w-full'>
                <Loader />
              </div>
              :
              <div className='flex justify-center flex-wrap gap-5 w-full py-5 '>
                {memberPlans?.map(plan =>
                (
                  <MemberPlan plan={plan} key={plan?._id} buttonText={plan?.price === 0 ? t('subscriptionPlans.getStartedIn') : plan?.planType === "upcoming" ? t("Coming soon") : null} activePlan={userSubscriptionData?.plan} />
                )
                )}
              </div>
            }
          </div>

        </div>
      </section>
    </>
  )
}
