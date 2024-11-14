import React, { useState } from 'react';
import { Text } from '../../../Components/Text';
import { useNavigate } from 'react-router-dom';
import { useGetAllSubscriptionPlansQuery } from '../../../Services/SubscriptionPlan.service';
import Loader from '../../../Components/Loader';
import { useTranslation } from 'react-i18next';
import MemberPlan from '../../../Components/Modals/MemberPlan';

export default function ChoosePlan() {
  const { t } = useTranslation();
  const userData = JSON.parse(sessionStorage.getItem('userData'));
  const userRole = userData?.role?.toLowerCase() === 'investor' ? 'Investor' : 'Member' ;
  const { data: plans, error, isLoading } = useGetAllSubscriptionPlansQuery();
  const memberPlans = plans?.filter(plan => plan.forUser === userRole);
  const navigate=useNavigate()

  const currentLanguage = localStorage.getItem('language') || 'en'; 


  const formatPrice = (price) => {
    const locale = currentLanguage === 'fr' ? 'fr-FR' : 'en-US';
    const currency = currentLanguage === 'fr' ? 'EUR' : 'USD';

    return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(price);
};


  return (
    <div className="bg-white-A700 flex flex-col gap-8 h-full min-h-screen overflow-auto items-start justify-start pb-14 pt-8 rounded-tl-[40px] w-full">
      <div className="flex flex-col items-start justify-start sm:px-5 px-8 w-full">
        <div className="border-b border-gray-201 border-solid flex flex-col md:flex-row gap-5 items-start justify-start pb-6 w-full">
          <div className="flex flex-1 flex-col h-full items-start justify-start w-full">
            <Text
              className="text-3xl font-dm-sans-bold leading-11 text-[#101828] w-full"
              size="txtDmSansBold32"
            >
              {t('subscriptionPlans.title')}
            </Text>
          </div>
        </div>
        <div className="flex flex-col items-start py-6 w-full h-full gap-3">
            <Text
                className="text-base font-dm-sans-bold leading-6 text-gray-900_01 w-full"
                >
              {t('subscriptionPlans.accelerateJourney')}
            </Text>
            <Text
                className="text-[28px] font-dm-sans-bold leading-[42px] text-gray-900_01 w-full"
                >
              {t('subscriptionPlans.choosePlan')}
            </Text>
            {isLoading ? 
                <div className='flex justify-center w-full'>
                    <Loader/>
                </div>
                :
            <div className='flex justify-center flex-wrap gap-5 w-full py-5 '>
            {memberPlans?.map(plan =>
                (
                <MemberPlan plan={plan} key={plan?._id}  buttonText={plan?.price === 0 ? t("Start") : plan?.planType === "upcoming" ? t("Coming soon"): null}/>
                )
            )}
            </div>
            }
        </div>
        
      </div>
    </div>
  )
}
