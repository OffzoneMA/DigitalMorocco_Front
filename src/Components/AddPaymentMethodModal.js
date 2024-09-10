import React, { useState , useEffect } from "react";
import ModalProvider from "react-modal";
import { Text } from "./Text";
import { IoCloseOutline } from "react-icons/io5";
import { GiCheckMark } from "react-icons/gi";
import { useForm } from "react-hook-form";
import { paymentMethodsData } from "../data/tablesData";


const AddPaymentMethodModal = (props) => {
  const paymentMethod = props?.data ? props.data : null;
  const { register, handleSubmit, formState: { errors } , setValue ,  reset } = useForm();
  const [cardNumber, setCardNumber] = useState('');
  const [selectedMethod, setSelectedMethod] = useState({ id: 1, name: 'Mastercard', image: 'images/img_mastercard.svg', icon: "images/img_mastercard_icon.svg", info: 'Mastercard information' });
  const [haveMethod , setHaveMethod] = useState(false);

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
      className="m-auto w-[65%] md:w-[50%] lg:w-[45%] xl:w-[45%] 2xl:w-[40%]"
      overlayClassName="bg-blue_gray-900_c1 fixed flex h-full inset-y-[0] w-full"
      {...props}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="max-h-[97vh] overflow-y-auto w-full md:w-full">
        <div className="bg-white-A700 border border-gray-500_33 border-solid flex flex-col p-6 gap-4 items-center justify-start max-w-screen-sm rounded-[10px] w-full">
          <div className="flex flex-col w-full gap-5">
            <div className="flex flex-col w-full">
              <div className="flex flex-col w-full gap-2 border-b border-gray-301">
                <Text className="font-dm-sans-medium text-[22px] leading-8 text-[#101828] w-full">Add Payment Method</Text>
                <Text className="font-dm-sans-regular text-base leading-[26px] text-gray500 text-left w-full">Select Payment Method</Text>
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
                        <Text className="text-base font-dm-sans-medium leading-[26px] text-gray700 w-auto">Name on card</Text>
                        <input
                        {...register('cardName', { required: 'Name on card is required' })}
                          className={`!placeholder:text-blue_gray-300 !text-gray700 leading-[18.2px] font-manrope text-left text-sm tracking-[0.14px] w-full rounded-[6px] px-[12px] py-[10px] h-[40px] border border-[#D0D5DD] ${errors?.cardName ? 'border-errorColor shadow-inputBsError focus:border-errorColor' : 'border-[#D0D5DD] focus:border-focusColor focus:shadow-inputBs'}`}
                          type="text"
                          name="cardName"
                          placeholder="Enter your full name"
                        />
                      </div>
                      <div className="flex flex-row gap-5 items-start justify-start w-full">
                        <div className={`flex flex-col gap-1.5 w-[56%] items-start justify-start `}>
                          <Text className="text-base font-dm-sans-medium leading-[26px] text-gray700 w-auto">Card number</Text>
                          <div className="relative w-full rounded-[8px]">
                            <input
                              {...register('cardNumber', 
                              { required: 'Card number is required' , 
                                pattern: {
                                  value: /^(\d{4} \d{4} \d{4} \d{4})$/,
                                  message: 'Card number must be in the format 0000 0000 0000 0000'
                                }
                                , onChange: handleChange })}
                              className={`!placeholder:text-blue_gray-300 !text-gray700 leading-[18.2px] font-manrope text-left text-sm tracking-[0.14px] w-full rounded-[6px] pl-[42px] pr-[12px] py-[10px] h-[40px] border border-[#D0D5DD] ${errors?.cardNumber ? 'border-errorColor shadow-inputBsError focus:border-errorColor' : 'border-[#D0D5DD] focus:border-focusColor focus:shadow-inputBs'}`}
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
                        <div className={`flex flex-col gap-1.5 w-[22%] items-start justify-start `}>
                          <Text className="text-base font-dm-sans-medium leading-[26px] text-gray700 w-auto">Expiry</Text>
                          <input
                          {...register('expiryDate', 
                            { required: 'Expiry date is required' ,
                              pattern: {
                                value: /^(0[1-9]|1[0-2])\/\d{2}$/,
                                message: 'Expiry date must be in the format MM/YY'
                              } ,
                              validate: validateExpiryDate
                            })}
                            className={`!placeholder:text-blue_gray-300 !text-gray700 leading-[18.2px] font-manrope text-left text-sm tracking-[0.14px] w-full rounded-[6px] px-[12px] py-[10px] h-[40px] border border-[#D0D5DD] ${errors?.expiryDate ? 'border-errorColor shadow-inputBsError focus:border-errorColor' : 'border-[#D0D5DD] focus:border-focusColor focus:shadow-inputBs'}`}
                            type="text"
                            name="expiryDate"
                            placeholder="MM/YY"
                          />
                        </div>
                        <div className={`flex flex-col gap-1.5 w-[22%] items-start justify-start `}>
                          <Text className="text-base font-dm-sans-medium leading-[26px] text-gray700 w-auto">CVV</Text>
                          <input
                          {...register('cvv', 
                            { required: 'CVV is required' ,
                              pattern: {
                                value: /^[0-9]{3}$/,
                                message: 'CVV must be 3 digits'
                              } 
                            })}
                            className={`!placeholder:text-blue_gray-300 !text-gray700 leading-[18.2px] font-manrope text-left text-sm tracking-[0.14px] w-full rounded-[6px] px-[12px] py-[10px] h-[40px] border border-[#D0D5DD] ${errors?.cvv ? 'border-errorColor shadow-inputBsError focus:border-errorColor' : 'border-[#D0D5DD] focus:border-focusColor focus:shadow-inputBs'}`}
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
                  Update
                </button>
              ) : (
                <div className="flex flex-row space-x-3 w-full">
                  <button
                    onClick={props.onRequestClose}
                    type="button"
                    className="flex items-center justify-center flex-1 border border-gray-301 hover:bg-[#D0D5DD] active:bg-light_blue-100 text-gray700 py-[10px] md:py-[18px] px-[12px] md:px-[20px] font-dm-sans-medium text-base h-[44px] leading-5 tracking-normal rounded-[6px]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex items-center justify-center flex-1 bg-blue-A400 hover:bg-[#235DBD] active:bg-[#224a94] text-white-A700 py-[10px] md:py-[18px] px-[12px] md:px-[20px] font-dm-sans-medium text-base h-[44px] leading-5 tracking-normal rounded-[6px]"
                  >
                    Update
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
