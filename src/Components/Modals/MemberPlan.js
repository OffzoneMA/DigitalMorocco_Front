import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const MemberPlan = ({ plan , buttonText , activePlan }) => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const currentLanguage = localStorage.getItem('language') || 'en'; 


    const formatPrice = (price) => {
        const locale = currentLanguage === 'fr' ? 'fr-FR' : 'en-US';
        const currency = 'USD';
    
        const formatter = new Intl.NumberFormat(locale, {
            style: 'currency',
            currency,
            currencyDisplay: 'narrowSymbol', 
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
    
        let formattedPrice = formatter.format(price);
    
        if (currentLanguage === 'fr') {
            formattedPrice = formattedPrice.replace(/\s*\$/g, ' $'); 
        }
    
        return formattedPrice;
    };

    return (
        <article key={plan?._id} className='flex flex-col border border-col1 basis-[300px] grow max-w-[460px] rounded-[12px] px-6 py-8 bg-bg_plan'>
            <div className='w-full flex flex-col items-center gap-1.5 h-auto'>
                <h1 className="text-[22px] font-dm-sans-medium leading-8 text-center text-[#1D2939] w-full">
                    {plan?.forUser?.toLowerCase() === 'investor' ? t(`subscriptionPlans.investor.${plan.name.toLowerCase()}.name`) : t(`subscriptionPlans.${plan.name.toLowerCase()}.name`)}
                </h1>
                <p className="text-base font-dm-sans-medium leading-[26px] text-center text-[#667085] w-full">
                    {plan?.forUser?.toLowerCase() === 'investor' ? t(`subscriptionPlans.investor.${plan.name.toLowerCase()}.description`) : t(`subscriptionPlans.${plan.name.toLowerCase()}.description`)}
                </p>
                {plan?.forUser?.toLowerCase() === "member" ? 
                <>
                <h2 className="text-center text-col1 text-[42px] font-dm-sans-bold leading-10">{t('Free')}</h2>
                <h3 className="text-center text-col1 font-dm-sans-bold pt-1 w-full">
                    <span className='text-[#1e0e62]/60 text-3xl font-dm-sans-bold line-through leading-8 tracking-wide'>
                        {plan?.price === 0 ? t('Free') : plan?.planType !== "upcoming" ? `${formatPrice(plan?.price)}/` : `$${t('Upcoming')}`}
                    </span>
                    {(plan?.price > 0 && plan?.planType !== "upcoming") && 
                    <span className='text-[#1e0e62]/60 text-2xl font-dm-sans-bold line-through leading-7'>
                        {t('subscriptionPlans.monthlyFee')}
                    </span>}
                </h3>
                </>
                :
                <h3 className="text-center text-col1 font-dm-sans-bold pt-1 w-full">
                    <span className='text-[2.5rem] leading-13 tracking-wide'>
                        {plan?.price === 0 ? t('Free') : plan?.planType !== "upcoming" ? `${formatPrice(plan?.price)}/` : `$${t('Upcoming')}`}
                    </span>
                    {(plan?.price > 0 && plan?.planType !== "upcoming") && <span className='text-[1.9rem] leading-12'>
                        {t('subscriptionPlans.monthlyFee')}
                    </span>}
                </h3>
                }
            </div>

            {/* Features Section with Blur and Overlay Text */}
            <div className='relative flex flex-col flex-1 w-full py-6 gap-[16px]'>
                {plan?.planType === "upcoming" && (
                    <div className='absolute inset-0 flex flex-col gap-4 items-center justify-center z-10 rounded-lg'>
                        <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16.1144 7.63848C16.724 7.54835 17.3529 7.5 18.0006 7.5C25.6581 7.5 30.6829 14.2573 32.371 16.9302C32.5754 17.2538 32.6775 17.4155 32.7347 17.665C32.7776 17.8524 32.7776 18.148 32.7346 18.3354C32.6774 18.5849 32.5745 18.7477 32.3688 19.0734C31.919 19.7852 31.2333 20.7857 30.3247 21.8707M10.0865 10.0726C6.84337 12.2726 4.64168 15.3291 3.63166 16.9279C3.42643 17.2528 3.32381 17.4152 3.26661 17.6647C3.22365 17.8521 3.22363 18.1477 3.26657 18.335C3.32374 18.5845 3.4259 18.7463 3.6302 19.0698C5.31831 21.7427 10.3431 28.5 18.0006 28.5C21.0882 28.5 23.7478 27.4014 25.9332 25.9149M4.50062 4.5L31.5006 31.5M14.8186 14.818C14.0043 15.6324 13.5006 16.7574 13.5006 18C13.5006 20.4853 15.5153 22.5 18.0006 22.5C19.2433 22.5 20.3683 21.9963 21.1826 21.182" stroke="#667085" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <div id="maskContent" className='px-[20px] flex flex-col gap-4 items-center'>
                            <p id="disc" className='px-[40px] text-center text-[22px] text-[#101828] font-dm-sans-medium'>{t('Discover all the features for investors')}</p>
                            <p id="discUpgrade" className='text-center text-sm text-[#1D2939] font-dm-sans-medium'>{t('Upgrade to')} <a href='/#' className='text-[#2575F0]' >Digital Morocco Premium</a> {t('to access all features, investment management tools, tracking, and much more.')}</p>
                        </div>
                    </div>
                )}
                <div className={`${plan?.planType === "upcoming" ? 'blur-sm' : ''} flex flex-col gap-4`}>
                    {plan?.featureDescriptions?.map((feature, index) => (
                        <div key={index} className='flex flex-row w-full items-start gap-[12px]'>
                            <div className="flex flex-col items-center justify-center w-[24px] h-[22px] bg-light_blue-100 rounded-full p-1">
                                <svg width="13" height="11" viewBox="0 0 13 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M11.098 0.390159L3.93797 7.30016L2.03797 5.27016C1.68797 4.94016 1.13797 4.92016 0.737968 5.20016C0.347968 5.49016 0.237968 6.00016 0.477968 6.41016L2.72797 10.0702C2.94797 10.4102 3.32797 10.6202 3.75797 10.6202C4.16797 10.6202 4.55797 10.4102 4.77797 10.0702C5.13797 9.60016 12.008 1.41016 12.008 1.41016C12.908 0.490159 11.818 -0.31984 11.098 0.38016V0.390159Z" fill="#00CDAE"/>
                                </svg>
                            </div>
                            <p className={`font-dm-sans-regular text-base leading-6 text-left w-full text-gray700 ${plan?.planType === "upcoming" ? 'opacity-75' : ''} `}>
                                {t(feature)}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            <div className='w-full flex-end' onClick={() => navigate('/subscribePlan', { state: { choosedPlan: plan } })}>
                <button
                    type="button"
                    className={`${(plan?.planType === "upcoming" || activePlan?._id === plan?._id ) ? 'text-[#a7a6a8] bg-[#e5e5e6] cursorpointer-green' : 'bg-blue-A400 text-white-A700 hover:bg-[#235DBD] active:bg-[#224a94] cursorpointer' } flex flex-row h-[44px] items-center justify-center rounded-md w-full text-base leading-[24px] font-dm-sans-medium`}
                    disabled={plan?.planType === "upcoming" || activePlan?._id === plan?._id }
                >
                    {buttonText || t('subscriptionPlans.getStarted')}
                </button>
            </div>
        </article>
    );
};

export default MemberPlan;
