import React, { useState , useEffect } from "react";
import ModalProvider from "react-modal";
import { Text } from "./Text";
import { IoCloseOutline } from "react-icons/io5";
import { GiCheckMark } from "react-icons/gi";
import { useForm } from "react-hook-form";
import { paymentMethodsData } from "../data/tablesData";
import { useTranslation } from "react-i18next";

const AddPaymentMethodModal = (props) => {
  const { t } = useTranslation();
  const paymentMethod = props?.data ? props.data : null;
  const { register, handleSubmit, formState: { errors } , setValue ,  reset } = useForm();
  const [cardNumber, setCardNumber] = useState('');
  const [selectedMethod, setSelectedMethod] = useState({ id: 1, name: 'Mastercard', image: 'images/img_mastercard.svg', icon: "images/img_mastercard_icon.svg", info: 'Mastercard information' });
  const [haveMethod , setHaveMethod] = useState(false);
  const [sendingOk , setSendingOk] = useState(false);
  const currentLanguage = localStorage.getItem('language') || 'en'; 

  useEffect(() => {
    if (paymentMethod) {
      const method = paymentMethodsData.find(method => method.name === paymentMethod.paymentMethod);
      setSelectedMethod(method);
      
      // Initialize form data
      const initialValues = {
        cardName: paymentMethod.cardName || '',
        cardNumber: paymentMethod.cardNumber || '',
        expiryDate: paymentMethod.expiryDate || '',
        cvv: paymentMethod.cvv || '',
      };
      reset(initialValues);
    }
  }, [paymentMethod, reset]);

  useEffect(() => {
    if (!props.isOpen) {
      // setSelectedMethod(null);
      reset();
      setSendingOk(false);
    }
  }, [props.isOpen]);

  const paymentMethods = paymentMethodsData ;

  const handleSelectMethod = (method) => {
    setSelectedMethod(method);
    setHaveMethod(method.id === 3 || method.id === 4 || method.id === 5); 
  };

  const formatCardNumber = (value) => {
    let formattedValue = value.replace(/\s/g, '');
    formattedValue = formattedValue.replace(/(\d{4})/g, '$1 ').trim();
    setCardNumber(formattedValue);
    setValue('cardNumber', formattedValue);
  };

  const handleChange = (e) => {
    formatCardNumber(e.target.value);
  };

  const getCardIcon = () => {
    if (!selectedMethod) return '';
    if (selectedMethod.name === 'Mastercard' || selectedMethod.name === 'Visa') {
      return selectedMethod.icon;
    }
    return '';
  };

  const updateClick = () => {
    const data  = {

    }
    props?.onRequestClose();
    // props?.updateMethode();
  }

  const validateExpiryDate = (value) => {
    const [month, year] = value.split('/').map(Number);
    if (!month || !year || month < 1 || month > 12) {
      return 'Invalid expiry date';
    }
    
    const currentYear = new Date().getFullYear() % 100; // Get last two digits of the current year
    const currentMonth = new Date().getMonth() + 1;
    const maxCardLifeYears = 5; // Durée de vie maximale de la carte en années
  
    // Check if the expiry date is in the past
    if (year < currentYear || (year === currentYear && month < currentMonth)) {
      return 'Expiry date cannot be in the past';
    }
  
    // Check if the expiry date exceeds the maximum card life
    const maxExpiryYear = currentYear + maxCardLifeYears;
    if (year > maxExpiryYear || (year === maxExpiryYear && month > currentMonth)) {
      return `Expiry date cannot exceed ${maxCardLifeYears} years from now`;
    }
  
    return true;
  };
  

  const onSubmit = (data) => {
    setSendingOk(true);
    const updatedData  = {
      ...data ,
       paymentMethod: selectedMethod?.name
    }
    paymentMethod?._id ?  props?.payMethod({paymentMethodId: paymentMethod?._id , paymentMethodData: updatedData}) : props?.payMethod(updatedData) ;
    reset();
    props.onRequestClose();
  };

  return (
    <ModalProvider
      appElement={document.getElementById("root")}
      className="m-auto w-[95%] max-w-[640px]"
      overlayClassName="bg-blue_gray-900_c1 fixed flex h-full inset-y-[0] w-full"
      {...props}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="max-h-[97vh] w-full md:w-full">
        <div className="bg-white-A700 border border-gray-500_33 max-h-[97vh] overflow-y-auto border-solid flex flex-col p-6 gap-4 items-center justify-start max-w-screen-sm  rounded-[10px] w-full">
          <div className="flex flex-col w-full gap-5">
            <div className="flex flex-col w-full">
              <div className="flex flex-col w-full gap-2 border-b border-gray-301">
                <Text className="font-dm-sans-medium text-[22px] leading-8 text-[#101828] w-full">{t('payment.addPaymentMethod')}</Text>
                <Text className="font-dm-sans-regular text-base leading-[26px] text-gray500 text-left w-full">{t('payment.selectPaymentMethod')}</Text>
                <div className='flex flex-row w-full gap-2 pb-4'>
                  {paymentMethods.map((method, index) => (
                    <div
                      key={index}
                      onClick={() => handleSelectMethod(method)}
                      className={`flex border w-[58px] rounded-[6px] items-center h-[40px] justify-center hover:shadow-bs3 hover:border-blue-502 ${selectedMethod?.id === method?.id ? 'shadow-bs3 border-blue-502' : 'border-gray-201'}`}
                    >
                      <img src={method.image} alt={method.name} />
                    </div>
                  ))}
                </div>
              </div>
              {!haveMethod && (
                <div className="flex flex-col w-full pt-4 gap-6">
                  {(selectedMethod?.name === 'Mastercard' || selectedMethod?.name === 'Visa') && (
                    <>
                      <div className={`flex flex-col gap-1.5 items-start justify-start w-full`}>
                        <Text className="text-base font-dm-sans-medium leading-[26px] text-gray700 w-auto">{t('payment.nameOnCard')}</Text>
                        <input
                        {...register('cardName', { required: 'Name on card is required' })}
                          className={`!placeholder:text-blue_gray-301 !text-gray700 leading-[18.2px] font-manrope text-left text-sm tracking-[0.14px] w-full rounded-[6px] px-[12px] py-[10px] h-[40px] border border-[#D0D5DD] ${errors?.cardName ? 'border-errorColor shadow-inputBsError focus:border-errorColor' : 'border-[#D0D5DD] focus:border-focusColor focus:shadow-inputBs'}`}
                          type="text"
                          name="cardName"
                          placeholder={t('payment.enterFullName')}
                        />
                      </div>
                      <div className="flex flex-row gap-5 items-start justify-start w-full">
                        <div className={`flex flex-col gap-1.5 flex-1 items-start justify-start `}>
                          <Text className="text-base font-dm-sans-medium leading-[26px] text-gray700 w-auto">{t('payment.cardNumber')}</Text>
                          <div className="relative w-full rounded-[8px]">
                            <input
                              {...register('cardNumber', 
                              { required: 'Card number is required' , 
                                pattern: {
                                  value: /^(\d{4} \d{4} \d{4} \d{4})$/,
                                  message: 'Card number must be in the format 0000 0000 0000 0000'
                                }
                                , onChange: handleChange })}
                              className={`!placeholder:text-blue_gray-301 !text-gray700 leading-[18.2px] font-manrope text-left text-sm tracking-[0.14px] w-full rounded-[6px] pl-[42px] pr-[12px] py-[10px] h-[40px] border border-[#D0D5DD] ${errors?.cardNumber ? 'border-errorColor shadow-inputBsError focus:border-errorColor' : 'border-[#D0D5DD] focus:border-focusColor focus:shadow-inputBs'}`}
                              type="text"
                              name="cardNumber"
                              placeholder="0000 0000 0000 0000"
                            />
                            <img
                              src={getCardIcon()}
                              alt="Card Icon"
                              className="absolute top-1/2 left-2 transform -translate-y-1/2"
                              style={{ width: '30px', height: '30px' }}
                            />
                          </div>
                        </div>
                        <div className={`flex flex-col gap-1.5 ${currentLanguage === 'fr' ? 'w-[25%]' : 'w-[22%]'} items-start justify-start `}>
                          <Text className="text-base font-dm-sans-medium leading-[26px] text-gray700 w-auto">{t('payment.expiry')}</Text>
                          <input
                          {...register('expiryDate', 
                            { required: 'Expiry date is required' ,
                              pattern: {
                                value: /^(0[1-9]|1[0-2])\/\d{2}$/,
                                message: 'Expiry date must be in the format MM/YY'
                              } ,
                              validate: validateExpiryDate
                            })}
                            className={`!placeholder:text-blue_gray-301 !text-gray700 leading-[18.2px] font-manrope text-left text-sm tracking-[0.14px] w-full rounded-[6px] px-[12px] py-[10px] h-[40px] border border-[#D0D5DD] ${errors?.expiryDate ? 'border-errorColor shadow-inputBsError focus:border-errorColor' : 'border-[#D0D5DD] focus:border-focusColor focus:shadow-inputBs'}`}
                            type="text"
                            name="expiryDate"
                            placeholder="MM/YY"
                          />
                        </div>
                        <div className={`flex flex-col gap-1.5 w-[22%] items-start justify-start `}>
                          <Text className="text-base font-dm-sans-medium leading-[26px] text-gray700 w-auto">{t('payment.cvv')}</Text>
                          <input
                          {...register('cvv', 
                            { required: 'CVV is required' ,
                              pattern: {
                                value: /^[0-9]{3}$/,
                                message: 'CVV must be 3 digits'
                              } 
                            })}
                            className={`!placeholder:text-blue_gray-301 !text-gray700 leading-[18.2px] font-manrope text-left text-sm tracking-[0.14px] w-full rounded-[6px] px-[12px] py-[10px] h-[40px] border border-[#D0D5DD] ${errors?.cvv ? 'border-errorColor shadow-inputBsError focus:border-errorColor' : 'border-[#D0D5DD] focus:border-focusColor focus:shadow-inputBs'}`}
                            type="text"
                            name="cvv"
                            placeholder="000"
                          />
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
            <div className="flex items-start w-full pt-1 pb-2">
              {haveMethod ? (
                <button
                  type="button"
                  className="flex items-center justify-center flex-1 bg-blue-A400 hover:bg-[#235DBD] active:bg-[#224a94] text-white-A700 py-[10px] md:py-[18px] px-[12px] md:px-[20px] font-dm-sans-medium text-base h-[44px] leading-5 tracking-normal rounded-[6px]"
                >
                  {t('payment.update')}
                </button>
              ) : (
                <div className="flex flex-row space-x-3 w-full">
                  <button
                    onClick={props.onRequestClose}
                    type="button"
                    className="flex items-center justify-center flex-1 border border-gray-301 hover:bg-[#D0D5DD] active:bg-light_blue-100 text-gray700 py-[10px] md:py-[18px] px-[12px] md:px-[20px] font-dm-sans-medium text-base h-[44px] leading-5 tracking-normal rounded-[6px] cursorpointer"
                  >
                    {t("common.cancel")}
                  </button>
                  <button
                    type="submit"
                    className={`flex items-center justify-center flex-1 ${sendingOk ? 'bg-[#235DBD]' : 'bg-blue-A400'} hover:bg-[#235DBD] active:bg-[#224a94] text-white-A700 py-[10px] md:py-[18px] px-[12px] md:px-[20px] font-dm-sans-medium text-base h-[44px] leading-5 tracking-normal rounded-[6px] cursorpointer`}
                  >
                    {sendingOk ? 
                      <div className="flex items-center justify-center gap-6"> {t("all.sending")}
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.4995 13.5002L20.9995 3.00017M10.6271 13.8282L13.2552 20.5862C13.4867 21.1816 13.6025 21.4793 13.7693 21.5662C13.9139 21.6415 14.0862 21.6416 14.2308 21.5664C14.3977 21.4797 14.5139 21.1822 14.7461 20.5871L21.3364 3.69937C21.5461 3.16219 21.6509 2.8936 21.5935 2.72197C21.5437 2.57292 21.4268 2.45596 21.2777 2.40616C21.1061 2.34883 20.8375 2.45364 20.3003 2.66327L3.41258 9.25361C2.8175 9.48584 2.51997 9.60195 2.43326 9.76886C2.35809 9.91354 2.35819 10.0858 2.43353 10.2304C2.52043 10.3972 2.81811 10.513 3.41345 10.7445L10.1715 13.3726C10.2923 13.4196 10.3527 13.4431 10.4036 13.4794C10.4487 13.5115 10.4881 13.551 10.5203 13.5961C10.5566 13.647 10.5801 13.7074 10.6271 13.8282Z" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>  :  
                      t('payment.update')}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </form>
    </ModalProvider>
  );
};

export default AddPaymentMethodModal;
