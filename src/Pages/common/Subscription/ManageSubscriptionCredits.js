import React, { useState , useEffect } from "react";
import { Text } from "../../../Components/Text";
import { useForm } from "react-hook-form";
import { FaRegPlusSquare } from "react-icons/fa";
import { useNavigate , useSearchParams } from "react-router-dom";
import { useAchatCreditsMutation } from "../../../Services/Subscription.Service";
import PageHeader from "../../../Components/common/PageHeader";
import EmailExistModalOrConfirmation from "../../../Components/Modals/EmailExistModalOrConfirmation";
import SearchInput from "../../../Components/common/SeachInput";
import checkVerifyImg from '../../../Media/check-verified-02.svg'
import emailErrorImg from '../../../Media/emailError.svg'
import { useGetUserDetailsQuery } from "../../../Services/Auth";
import SimpleSelectWithGroup from "../../../Components/common/SimpleSelectWithGroup";
import { useTranslation } from 'react-i18next';
// import CommonModal from '../../../Components/common/CommonModal';
import HelmetWrapper from "../../../Components/common/HelmetWrapper";


const ManageSubscriptionCredits = () => {
    const currentLanguage = localStorage.getItem('language') || 'en'; 
    const { t } = useTranslation();
      const [searchParams] = useSearchParams();

    const statuspaid = searchParams.get('statuspaid');
    const [achatCredits] = useAchatCreditsMutation();
    const [isModalOpen , setIsModalOpen] = useState(false);
    const [isCancelPaidModalOpen , setIsCancelPaidModalOpen] = useState(false);
    const navigate = useNavigate();
    const [sendingOk , setSendingOk] = useState(false);
    const [selectedCredits , setSelectedCredits] = useState(null);
    const {data: userDetails , isLoading: userDetailsLoading} = useGetUserDetailsQuery();
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();

      const creditOptionsEn = [
        {
            group: "Buy 1 000+ credits and get a 10% discount",
            options: [
                { credits: 1000, price: 9.45, initialRate: 10.50, formatted: "1 000 credits: $9.45 (Initial rate: $10.50)" },
                { credits: 2000, price: 18.90, initialRate: 21.00, formatted: "2 000 credits: $18.90 (Initial rate: $21.00)" },
                { credits: 3000, price: 28.35, initialRate: 31.50, formatted: "3 000 credits: $28.35 (Initial rate: $31.50)" },
                { credits: 4000, price: 37.80, initialRate: 42.00, formatted: "4 000 credits: $37.80 (Initial rate: $42.00)" },
                { credits: 5000, price: 47.25, initialRate: 52.50, formatted: "5 000 credits: $47.25 (Initial rate: $52.50)" },
                { credits: 6000, price: 56.70, initialRate: 63.00, formatted: "6 000 credits: $56.70 (Initial rate: $63.00)" },
            ],
        },
        {
            group: "Buy 7 000+ credits and get a 15% discount",
            options: [
                { credits: 7000, price: 62.48, initialRate: 73.50, formatted: "7 000 credits: $62.48 (Initial rate: $73.50)" },
                { credits: 8000, price: 71.40, initialRate: 84.00, formatted: "8 000 credits: $71.40 (Initial rate: $84.00)" },
                { credits: 9000, price: 80.33, initialRate: 94.50, formatted: "9 000 credits: $80.33 (Initial rate: $94.50)" },
                { credits: 10000, price: 89.25, initialRate: 105.00, formatted: "10 000 credits: $89.25 (Initial rate: $105.00)" },
                { credits: 11000, price: 98.18, initialRate: 115.50, formatted: "11 000 credits: $98.18 (Initial rate: $115.50)" },
                { credits: 12000, price: 107.10, initialRate: 126.00, formatted: "12 000 credits: $107.10 (Initial rate: $126.00)" },
                { credits: 13000, price: 116.03, initialRate: 136.50, formatted: "13 000 credits: $116.03 (Initial rate: $136.50)" },
                { credits: 14000, price: 124.95, initialRate: 147.00, formatted: "14 000 credits: $124.95 (Initial rate: $147.00)" },
            ],
        },
        {
            group: "Buy 15 000+ credits and get a 25% discount",
            options: [
                { credits: 15000, price: 118.13, initialRate: 157.50, formatted: "15 000 credits: $118.13 (Initial rate: $157.50)" },
                { credits: 16000, price: 126.00, initialRate: 168.00, formatted: "16 000 credits: $126.00 (Initial rate: $168.00)" },
                { credits: 17000, price: 133.88, initialRate: 178.50, formatted: "17 000 credits: $133.88 (Initial rate: $178.50)" },
                { credits: 18000, price: 141.75, initialRate: 189.00, formatted: "18 000 credits: $141.75 (Initial rate: $189.00)" },
                { credits: 19000, price: 149.63, initialRate: 199.50, formatted: "19 000 credits: $149.63 (Initial rate: $199.50)" },
                { credits: 20000, price: 157.50, initialRate: 210.00, formatted: "20 000 credits: $157.50 (Initial rate: $210.00)" },
                { credits: 21000, price: 165.38, initialRate: 220.50, formatted: "21 000 credits: $165.38 (Initial rate: $220.50)" },
                { credits: 22000, price: 173.25, initialRate: 231.00, formatted: "22 000 credits: $173.25 (Initial rate: $231.00)" },
                { credits: 23000, price: 181.13, initialRate: 241.50, formatted: "23 000 credits: $181.13 (Initial rate: $241.50)" },
                { credits: 24000, price: 189.00, initialRate: 252.00, formatted: "24 000 credits: $189.00 (Initial rate: $252.00)" },
                { credits: 25000, price: 196.88, initialRate: 262.50, formatted: "25 000 credits: $196.88 (Initial rate: $262.50)" },
                { credits: 26000, price: 204.75, initialRate: 273.00, formatted: "26 000 credits: $204.75 (Initial rate: $273.00)" },
                { credits: 27000, price: 212.63, initialRate: 283.50, formatted: "27 000 credits: $212.63 (Initial rate: $283.50)" },
                { credits: 28000, price: 220.50, initialRate: 294.00, formatted: "28 000 credits: $220.50 (Initial rate: $294.00)" },
                { credits: 29000, price: 228.38, initialRate: 304.50, formatted: "29 000 credits: $228.38 (Initial rate: $304.50)" },
                { credits: 30000, price: 236.25, initialRate: 315.00, formatted: "30 000 credits: $236.25 (Initial rate: $315.00)" },
            ],
        },
    ];

    useEffect(() => {
        if (statuspaid === "success") {
            setIsModalOpen(true);
        } else if (statuspaid === "failed") {
            setIsCancelPaidModalOpen(true);
        } 
      }, [statuspaid]);
    
    const onSubmit = async () => {
        setSendingOk(true);
        if(selectedCredits !== null) {
            const result = await achatCredits({
                credits: selectedCredits?.credits,
                price: selectedCredits?.price,
            });

            if (result?.data?.success) {
                //Create a hidden form and submit it to redirect to payment page
                const { paywallUrl, payload, signature } = result.data.data;
                console.log("result : ", result);
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
               console.log("Error in payment process : ", result.error);
            }
        }
    };

    const closePopup = () => {
        setIsModalOpen(false)
        const url = new URL(window.location.href);
        url.searchParams.delete('statuspaid');
        window.history.replaceState({}, document.title, url);
    }

    const closeCancelPaidModal = () => {
        setIsCancelPaidModalOpen(false)
    }
      
    return (
    <>
        <HelmetWrapper 
            title={t('helmet.manageCredits.title')}
            description={t('helmet.manageCredits.description')}
            keywords={t('helmet.manageCredits.keywords')}
            canonical={`${process.env.REACT_APP_URL}/ManageCredits`}
        />
        <section className="bg-white-A700 flex flex-col gap-8 h-full min-h-screen overflow-auto items-start justify-start pb-14 pt-8 rounded-tl-[40px] w-full">
            <div className="flex flex-col sm:px-5 px-8 gap-8 w-full h-full">
                <div className="flex flex-col items-start justify-start w-full">
                    <div className="flex flex-col lg:flex-row gap-5 items-start lg:justify-between pb-2 w-full">
                        <div className="flex h-full items-start justify-start w-auto">
                            <PageHeader
                            >
                            {t('dashboard.welcome')} {userDetails?.displayName ? `, ${userDetails.displayName}` : userData?.displayName? `, ${userData.displayName}` : userDetailsLoading ? "loading..." : ""}
                            </PageHeader>
                        </div>
                        <div className="flex flex-row w-full lg:w-auto gap-4 justify-between ">
                            <SearchInput className={'w-[240px] '}/>
                            <button 
                            style={{whiteSpace: 'nowrap'}}
                            className=" bg-blue-A400 hover:bg-[#235DBD] text-white-A700 flex flex-row  items-center justify-center min-w-[184px] h-[44px] px-[12px] py-[7px] cursorpointer rounded-md w-auto" 
                            onClick={() => navigate("/CreateProject")}
                        >
                            <FaRegPlusSquare size={18} className="mr-2" />
                            {t('dashboard.createProject')}
                        </button>
                        </div>
                    </div>
                    <div className="flex">
                        <Text
                            className="text-sm md:text-base lg:text-lg font-inter text-gray-500 leading-6 tracking-normal w-full"
                            >
                            {t('dashboard.trackManageForecast')}
                        </Text>
                    </div>
                </div>
                <div className="min-h-[220px] px-2.5 py-[30px] bg-white-A700 rounded-xl border border-[#e4e6eb] flex-col justify-center items-center gap-6 flex">
                    <div className="p-2 bg-[#f9edfd] rounded-md justify-center items-center gap-2.5 inline-flex">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13 5C13 6.10457 10.5376 7 7.5 7C4.46243 7 2 6.10457 2 5M13 5C13 3.89543 10.5376 3 7.5 3C4.46243 3 2 3.89543 2 5M13 5V6.5M2 5V17C2 18.1046 4.46243 19 7.5 19M7.5 11C7.33145 11 7.16468 10.9972 7 10.9918C4.19675 10.9 2 10.0433 2 9M7.5 15C4.46243 15 2 14.1046 2 13M22 11.5C22 12.6046 19.5376 13.5 16.5 13.5C13.4624 13.5 11 12.6046 11 11.5M22 11.5C22 10.3954 19.5376 9.5 16.5 9.5C13.4624 9.5 11 10.3954 11 11.5M22 11.5V19C22 20.1046 19.5376 21 16.5 21C13.4624 21 11 20.1046 11 19V11.5M22 15.25C22 16.3546 19.5376 17.25 16.5 17.25C13.4624 17.25 11 16.3546 11 15.25" stroke="#D026DF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </div>
                    <div className="self-stretch h-24 flex-col justify-center items-center gap-2 flex">
                        <div className="text-[#101828] text-lg font-dm-sans-medium leading-7">{t('dashboard.totalCredits')}</div>
                        {userDetails?.subscription?.totalCredits > 0 ? (
                        <div className="w-auto text-center text-[#00cdae] text-[28px] font-dm-sans-medium leading-relaxed">
                            {userDetails?.subscription?.totalCredits?.toLocaleString()}
                        </div>
                        ) : (
                        <>
                        <div className="w-auto text-center text-[#00cdae] text-[28px] font-dm-sans-medium leading-relaxed">
                            00
                        </div>
                        <div className="self-stretch text-center text-[#98a1b2] text-sm font-dm-sans-regular leading-relaxed">
                            {t('Upgrade your account or buy credits')}
                        </div>
                        </>
                        )}
                    </div>
                </div>
                <div className="h-full w-full items-start gap-[42px] flex flex-col md:flex-row flex-wrap pb-[80px]">
                    <div className="h-full md:min-w-[300px] max-h-[481px] p-6 bg-white-A700 rounded-xl border border-[#e4e6eb] flex-col justify-start items-start gap-[18px] flex flex-1">
                        <div className="self-stretch justify-start items-start gap-4 pb-[18px] flex border-b border-[#e4e6eb]">
                            <div className="p-2 bg-[#f9edfd] rounded-md justify-center items-center gap-2.5 flex">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M13 5C13 6.10457 10.5376 7 7.5 7C4.46243 7 2 6.10457 2 5M13 5C13 3.89543 10.5376 3 7.5 3C4.46243 3 2 3.89543 2 5M13 5V6.5M2 5V17C2 18.1046 4.46243 19 7.5 19M7.5 11C7.33145 11 7.16468 10.9972 7 10.9918C4.19675 10.9 2 10.0433 2 9M7.5 15C4.46243 15 2 14.1046 2 13M22 11.5C22 12.6046 19.5376 13.5 16.5 13.5C13.4624 13.5 11 12.6046 11 11.5M22 11.5C22 10.3954 19.5376 9.5 16.5 9.5C13.4624 9.5 11 10.3954 11 11.5M22 11.5V19C22 20.1046 19.5376 21 16.5 21C13.4624 21 11 20.1046 11 19V11.5M22 15.25C22 16.3546 19.5376 17.25 16.5 17.25C13.4624 17.25 11 16.3546 11 15.25" stroke="#D026DF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </div>
                            <div className="self-stretch flex-col justify-start items-start flex">
                                <div className="text-[#101828] text-lg font-dm-sans-medium leading-7">{t('How many Credits would you like to buy?')}</div>
                                <div className="self-stretch text-[#98a1b2] text-sm font-dm-sans-regular leading-relaxed">{t('Out of Credits for a reward or an upgrade? You can buy the additional Credits you need.')}</div>
                            </div>
                        </div>
                        <div className="h-auto bg-white-A700 flex-col justify-start items-start w-full gap-2 flex">
                            <div className="w-auto h-[21px] text-[#1d1c21] text-base font-dm-sans-regular leading-relaxed">{t('Your Order')}</div>
                            <div className="w-full h-auto text-[#98a1b2] text-sm font-dm-sans-regular leading-relaxed">{t('Please choose the amount of Credits you want from the dropdown menu below.')}</div>
                            <div className="self-stretch h-auto flex-col justify-start items-start gap-2 w-full flex">
                                <SimpleSelectWithGroup id='credits'
                                groupedOptions={creditOptionsEn}  selectedOptionsDfault={selectedCredits}
                                setSelectedOptionVal={setSelectedCredits} searchable={true}
                                placeholder={t("Select Credits")} valuekey="formatted" required = {sendingOk && selectedCredits === null}
                                content={
                                (option) => {
                                    return (
                                    <div className="flex  py-2 items-center  w-full">
                                    <span
                                        className="text-gray-801 w-full text-left text-base font-dm-sans-regular leading-5 w-auto"
                                        >
                                        {t(option?.formatted)}
                                    </span>
                                    </div>
                                    );
                                }
                                } />
                            </div>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} className="min-w-auto max-w-[339px] md:w-[339px] h-[481px] p-6 bg-white-A700 rounded-xl border border-[#e4e6eb] flex-col justify-start items-start gap-6 flex">
                        <div className="text-center text-[#1d2838] text-base font-dm-sans-bold">{t('Order Summary')}</div>
                        <div className="self-stretch justify-between items-start flex">
                            <div className="text-[#98a1b2] text-base font-dm-sans-medium">{t('Number of Credits:')}</div>
                            <div className="text-[#1e0d62] text-lg font-dm-sans-medium leading-7">{selectedCredits?.credits?.toLocaleString() || '-'}</div>
                        </div>
                        <div className="self-stretch justify-between items-start flex">
                            <div className="text-[#98a1b2] text-base font-dm-sans-medium">{t('Cost of Credits:')}</div>
                            <div className="text-[#1e0d62] text-lg font-dm-sans-medium leading-7">$ {selectedCredits?.price?.toFixed(2) || '00.00'}</div>
                        </div>
                        <div className="self-stretch h-[0px] border-2 border-[#eaeaed]"></div>
                        <div className="self-stretch justify-between items-end flex">
                            <div className="text-[#1e0d62] text-lg font-dm-sans-medium leading-7">{t('Total')}</div>
                            <div className="text-[#1e0d62] text-[22px] font-dm-sans-bold leading-7">$ {selectedCredits?.price?.toFixed(2) || '00.00'}</div>
                        </div>
                        <div className="self-stretch justify-start items-start gap-[9px] flex">
                            <label htmlFor={`acceptTerms`} className="cursorpointer relative inline-flex items-center peer-checked:border-0 rounded-[3px] mr-2">
                                <input
                                    {...register("acceptTerms" , {
                                      required: 'required',
                                    }
                                    )}
                                    id={`acceptTerms`}
                                    type="checkbox"
                                    name="acceptTerms"
                                    className={`peer appearance-none w-[16px] h-[16px] bg-white-A700 checked:bg-blue-600 checked:border-blue-600 checked:shadow-none border-[0.5px]  ${(errors?.acceptTerms)? 'border-errorColor shadow-checkErrorbs': 'shadow-none border-[#303030]' } rounded-[4px]  relative`}
                                    />
                                <svg width="12" height="9" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 transition opacity-0 peer-checked:opacity-100">
                                    <path d="M5.10497 8.10407L5.08735 8.12169L0.6875 3.72185L2.12018 2.28917L5.10502 5.27402L9.87904 0.5L11.3117 1.93268L5.12264 8.12175L5.10497 8.10407Z" fill="white"/>
                                </svg>
                            </label>
                            <label
                            htmlFor='acceptTerms'
                            className="text-[13px] leading-[16.93px] text-[#555458] w-auto font-dm-sans-regular"
                            >
                            {t('I accept the')} <a href={`https://digitalmorocco.net/terms?lang=${currentLanguage}`} target='_blank' rel='noreferrer' className='text-[#2575F0] hover:text-[#00CDAE] cursorpointer'><span>{t('Terms of Service.')}</span></a>                     
                            </label>
                        </div>
                        <button 
                        type="submit"
                            className="w-full cursorpointer h-[50px] text-center text-white-A700 text-lg font-dm-sans-medium leading-relaxed bg-[#482be7] hover:bg-[#3016C0] active:bg-[#251192] rounded-[100px]">
                            {t('Check Out')}
                        </button>
                    </form>
                </div>
            </div>
        </section>
        {/* <CommonModal isOpen={isModalOpen}
          onRequestClose={closePopup} title={t('Information: Feature Unavailable')} showCloseBtn = {true}
          content={
          <div className="flex flex-col gap-5 items-center justify-start py-5 w-full">
            <div className="text-center">
              <span className="text-[#1d1c21] text-base font-dm-sans-regular leading-relaxed">{t("This feature")}</span><span className="text-[#2575f0] text-base font-dm-sans-regular leading-relaxed"> {t('is not yet available.')}</span>
              <br/>
              <span className="leading-[3rem]"></span>
              <span className="text-[#1d1c21] text-base font-dm-sans-regular leading-relaxed">{t("Please check back later for updates!")}</span>
            </div>
            <div className="self-stretch justify-center items-center pt-4 gap-[18px] inline-flex">
            <button className="w-[195px] h-11 px-5 py-[18px] bg-[#2575f0] rounded-md justify-center items-center gap-[18px] inline-flex cursorpointer hover:bg-[#235DBD] active:bg-[#235DBD]}"
                onClick={() => setIsModalOpen(false)}>
                    <div className="text-white-A700 text-base font-dm-sans-medium">{t('Ok')}</div>
                </button>
            </div>
          </div>
        }/> */}
        <EmailExistModalOrConfirmation isOpen={isModalOpen}
        onRequestClose={closePopup} content={
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
                {t('subscriptionPlans.paidCredits.title')}
            </Text>
            <Text
            className="leading-relaxed w-[460px] font-dm-sans-regular text-[#1d2838] text-center text-sm"
            >
            <>
                {t('subscriptionPlans.paidCredits.message')}
            </>
            </Text>
        </div>
            </div>
        }/>
        <EmailExistModalOrConfirmation isOpen={isCancelPaidModalOpen}
                  onRequestClose={closeCancelPaidModal} content={
                    <div className="flex flex-col gap-[38px] items-center justify-start  w-full">
                      <img
                        className="h-[80px] w-[80px]"
                        src={emailErrorImg}
                        alt="successtick"
                      />
                      <div className="flex flex-col gap-5 items-center justify-start w-full">
                        <Text
                          className="text-[#1d2838] w-[460px] text-lg leading-relaxed font-dm-sans-medium text-center "
                        >
                          {t('subscriptionPlans.paidCreditsError.title')}
                        </Text>
                        <Text
                          className="leading-relaxed w-[460px] font-dm-sans-regular text-[#1d2838] text-center text-sm"
                        >
                          <>
                            {t('subscriptionPlans.paidCreditsError.message')}
                          </>
                        </Text>
                      </div>
                    </div>
                  } />
    </>
    );
}

export default ManageSubscriptionCredits;
