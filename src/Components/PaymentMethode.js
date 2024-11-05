import React, { useEffect , useState } from 'react';
import { Text } from '../Components/Text';
import {  toast } from 'react-hot-toast';
import { IoWalletOutline } from "react-icons/io5";
import AddPaymentMethodModal from '../Components/AddPaymentMethodModal';
import axios from 'axios';
import Loader from '../Components/Loader';
import { useAddPaymentMethodMutation , useUpdatePaymentMethodMutation } from '../Services/PaymentMethod.Service';
import { paymentMethodsData } from '../data/tablesData';
import { useTranslation } from 'react-i18next';

const PaymentMethode = () => {
  const { t } = useTranslation();
    const [userLastPaymentMethod, setUserLastPaymentMethod] = useState(null);
    const [userSubscriptionData , setUserSusbcriptionData] = useState(null);
    const [loadingLastPayment, setLoadingLastPayment] = useState(true);  
    const [addPaymentMethod , response] = useAddPaymentMethodMutation();
    const [updatePaymentMethod , responseUpdate] = useUpdatePaymentMethodMutation();
    const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
    const [isEditPaymentModalOpen, setIsEditPaymentModalOpen] = useState(false);
    const token = sessionStorage.getItem("userToken");
    const userData = JSON.parse(sessionStorage.getItem("userData"));
    const userId = userData?._id;
    const [selectedMethod, setSelectedMethod] = useState(null);
    const [sendingOk , setSendingOk] = useState(false);

    const currentLanguage = localStorage.getItem('language') || 'en'; 

    const fetchLastPaymentMethod = async () => {
        setLoadingLastPayment(true);
        try {
            const token = sessionStorage.getItem("userToken");
            const response = await axios.get(`${process.env.REACT_APP_baseURL}/payment-methods/last`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setUserLastPaymentMethod(response.data);
        } catch (error) {
            console.error('Error fetching last payment method:', error);
        } finally {
            setLoadingLastPayment(false);
        }
    };
    
    useEffect(() => {
      fetchLastPaymentMethod();
    }, []);

    useEffect(() => {
        if (userLastPaymentMethod) {
          const method = paymentMethodsData.find(method => method.name === userLastPaymentMethod.paymentMethod);
          setSelectedMethod(method);    }
      }, [userLastPaymentMethod]);


    const formatCardNumberForDisplay = (cardNumber) => {
    // Masquer tous les chiffres sauf les quatre derniers
    const lastFourDigits = cardNumber.slice(-4);
    return `•••• •••• •••• ${lastFourDigits}`;
    };

    const openPaymentModal = () => {
        setIsPaymentModalOpen(true);
    };

    const closePaymentModal = () => {
        setIsPaymentModalOpen(false);
    };

    const openEditPaymentModal = () => {
        setIsEditPaymentModalOpen(true);
    };

    const closeEditPaymentModal = () => {
        setIsEditPaymentModalOpen(false);
    };

    const addMethode = async (data) => {
        try {
          setSendingOk(true);
          const res = await addPaymentMethod(data);
            if (res.data) {
              toast.success("Payment method added successfully");
              await fetchLastPaymentMethod();
              closePaymentModal();
            } else {
              toast.error("Error adding payment method");
            }
            setSendingOk(false);
        } catch (error) {
          setSendingOk(false);
        console.error('Error adding payment method:', error);
        }
    };
    
    const updateMethode = async (data) => {
        try {
            const res = await updatePaymentMethod(data);
            if (res.data) {
            toast.success("Payment method updated successfully");
            await fetchLastPaymentMethod();        
            closeEditPaymentModal();
            } else {
            toast.error("Error updating payment method");
            }
        } catch (error) {
            console.error('Error updating payment method:', error);
            toast.error("An unexpected error occurred");
        }
    };

    return (
        <>
            { ( userLastPaymentMethod !== null) ?
          <div className="flex flex-col w-full gap-6">
            <Text className="font-dm-sans-medium text-lg leading-7 text-[#101828] text-left w-full">
            {t('payment.paymentInfo')}
            </Text>
            <div className="flex flex-row w-full rounded-[12px] border py-4 px-4 border-gray-301 gap-4">
              <div className="flex rounded-md px-3 py-3.5 bg-gray-201 items-center">
                <img src={selectedMethod?.image || "images/img_visa.svg"} />
              </div>
              <div className="flex flex-col gap-3">
                <Text className="font-dm-sans-medium text-sm leading-[18px] text-left text-[#101828] w-full">
                  {userLastPaymentMethod?.cardNumber ? formatCardNumberForDisplay(userLastPaymentMethod?.cardNumber) : '•••• •••• •••• ••••'}
                </Text>
                <Text className="font-dm-sans-regular text-xs leading-[15.62px] text-gray500 text-left w-full">
                  expired { userLastPaymentMethod?.expiryDate ||'00/00'}
                </Text>
              </div>
            </div>
            <button
              className="bg-blue-A400 hover:bg-[#235DBD] active:bg-[#224a94] text-base leading-[20.83px] font-dm-sans-medium text-white-A700 flex flex-row items-center justify-center h-[44px] gap-3 mr-auto py-3 rounded-md w-full cursorpointer"
              onClick={openEditPaymentModal}
              type="button"
            >
              <IoWalletOutline size={22} />
              {t('payment.changePaymentMethod')}            
            </button>
          </div>
          :
          <div className="flex flex-col w-full gap-7">
            <Text className="font-dm-sans-medium text-lg leading-7 text-[#101828] text-left w-full">
            {t('payment.paymentInfo')}
            </Text>
            <button
              className="bg-blue-A400 hover:bg-[#235DBD] active:bg-[#224a94] text-base leading-[20.83px] font-dm-sans-medium text-white-A700 flex flex-row h-[44px] items-center gap-3 mr-auto py-3 justify-center rounded-md w-full cursorpointer"
              type="button"
              onClick={()=> openPaymentModal()}
            >
              <IoWalletOutline size={22} />
              {t('payment.addPaymentMethod')}
            </button>
          </div>
          }
          <AddPaymentMethodModal isOpen={isPaymentModalOpen}  onRequestClose={closePaymentModal} payMethod={addMethode}/>
          <AddPaymentMethodModal isOpen={isEditPaymentModalOpen}  onRequestClose={closeEditPaymentModal} payMethod={updateMethode} data={userLastPaymentMethod} />
        </>
    );
}

export default PaymentMethode;
