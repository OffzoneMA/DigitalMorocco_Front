import React, {useState} from "react";
import { default as ModalProvider } from "react-modal";
import { Text } from "./Text";
import { IoCloseOutline } from "react-icons/io5";
import { GiCheckMark } from "react-icons/gi";

const AddPaymentMethodModal = (props) => {
    const rowData = props?.rowData? props.rowData : null;
    const [cardNumber, setCardNumber] = useState('');
    const [selectedMethod, setSelectedMethod] = useState(null);
    const [haveMethod , setHaveMethod] = useState(false);
    const paymentMethods = [
        { id:1, name: 'Mastercard', image: 'images/img_mastercard.svg',icon:"images/img_mastercard_icon.svg", info: 'Mastercard information' },
        { id:2, name: 'Visa', image: 'images/img_visa.svg', info: 'Visa information' },
        { id:3, name: 'Paypal', image: 'images/img_paypal.svg', info: 'Paypal information' },
        { id:4, name: 'Google Pay', image: 'images/img_googlepay.svg', info: 'Google Pay information' },
        { id:5, name: 'Apple Pay', image: 'images/img_applepay.svg', info: 'Apple Pay information' },
    ];

    const handleSelectMethod = (index) => {
        setSelectedMethod(paymentMethods[index]);
      };    

      const formatCardNumber = (value) => {
        let formattedValue = value.replace(/\s/g, '');
        formattedValue = formattedValue.replace(/(\d{4})/g, '$1 ').trim();
        setCardNumber(formattedValue);
      };
    
      const handleChange = (e) => {
        formatCardNumber(e.target.value);
      };
    return (
        <ModalProvider
          appElement={document.getElementById("root")}
          className="m-auto w-[65%] md:w-[50%] lg:w-[45%] xl:w-[45%] 2xl:w-[40%]"
          overlayClassName="bg-blue_gray-900_c1 fixed flex h-full inset-y-[0] w-full"
          {...props}
        >
          <div className="max-h-[97vh] overflow-y-auto w-full md:w-full">
            <div className="bg-white-A700 border border-gray-500_33 border-solid flex flex-col p-6 gap-4 items-center justify-start max-w-screen-sm  rounded-[10px] w-full">
                <div className="flex flex-col w-full gap-5">
                    <div className="flex flex-col w-full">
                      <div className="flex flex-col w-full gap-2 border-b border-gray-301">
                        <Text
                            className="font-DmSans text-[22px] font-medium leading-8 text-gray-900_01 w-full"
                            >
                            Add Payment Method              
                        </Text>
                        <Text
                            className="font-DmSans text-base font-normal leading-[26px] text-gray500 text-left w-full"
                            >
                            Select Payment Method
                        </Text>
                        <div className='flex flex-row w-full gap-2 pb-4'>
                            {paymentMethods.map((method, index) => (
                                <div
                                key={index}
                                onClick={() => handleSelectMethod(index)}
                                className={`flex border w-[58px] rounded-[6px] items-center h-[40px] justify-center ${selectedMethod?.id === method?.id ? 'shadow-bs3 border-blue-502' : 'border-gray-201'}`}
                                >
                                <img src={method.image} alt={method.name} />
                                </div>
                            ))}

                        </div>
                      </div>
                      {!haveMethod &&
                      (
                                            <div className="flex flex-col w-full pt-4 gap-6">
                        <div className={`flex flex-col gap-1.5 items-start justify-start w-full`}>
                            <Text
                            className="text-base font-DmSans font-medium leading-[26px] text-gray700 w-auto"
                            >
                            Name on card
                            </Text>
                            <div className="flex md:flex-1 w-full md:w-full rounded-[8px] p-1.5 border border-solid">
                                <input
                                    className={`!placeholder:text-blue_gray-300 !text-gray-900_01 font-Manrope p-0 text-left text-sm tracking-[0.14px] w-full bg-transparent border-0`}
                                    type="text"
                                    name="companyName"
                                    placeholder="Enter your full name"
                                />
                            </div>
                        </div>
                        <div className="flex flex-row gap-5 items-start justify-start w-full">
                            <div className={`flex flex-col gap-1.5 w-[56%] items-start justify-start `}>
                                <Text
                                className="text-base font-DmSans font-medium leading-[26px] text-gray700 w-auto"
                                >
                                Card number
                                </Text>
                                <div className="flex md:flex-1 w-full rounded-[8px] p-1.5 border border-solid">
                                    <img src="images/img_mastercard_icon.svg" className=""/>
                                    <input
                                        className={`!placeholder:text-blue_gray-300 !text-gray-900_01 font-Manrope p-0 text-left text-sm tracking-[0.14px] w-full bg-transparent border-0`}
                                        type="text"
                                        name="cardNumber"
                                        placeholder="0000 0000 0000 0000"
                                        value={cardNumber}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className={`flex flex-col gap-1.5 w-[22%] items-start justify-start `}>
                                <Text
                                className="text-base font-DmSans font-medium leading-[26px] text-gray700 w-auto"
                                >
                                Expiry
                                </Text>
                                <div className="flex md:flex-1 w-full rounded-[8px] p-2 border border-solid">
                                    <input
                                        className={`!placeholder:text-blue_gray-300 !text-gray-900_01 font-Manrope p-0 text-left text-sm tracking-[0.14px] w-full bg-transparent border-0`}
                                        type="text"
                                        name="cardExpiry"
                                        placeholder="MM/YY"
                                    />
                                </div>
                            </div>
                            <div className={`flex flex-col gap-1.5 w-[22%] items-start justify-start `}>
                                <Text
                                className="text-base font-DmSans font-medium leading-[26px] text-gray700 w-auto"
                                >
                                CVV
                                </Text>
                                <div className="flex md:flex-1 w-full rounded-[8px] p-2 border border-solid">
                                    <input
                                        className={`!placeholder:text-blue_gray-300 !text-gray-900_01 font-Manrope p-0 text-left text-sm tracking-[0.14px] w-full bg-transparent border-0`}
                                        type="text"
                                        name="cardExpiry"
                                        placeholder="000"
                                    />
                                </div>
                            </div>
                        </div>
                      </div>
                      )
                      }
                    </div>
                    <div className="flex items-start w-full pt-1 pb-2">
                    {haveMethod? (
                        <div className="flex flex-row space-x-3 w-full">
                            <button type="button" className="flex-1 bg-blue-501 text-white-A700 py-2.5 font-DmSans text-base font-medium leading-5 tracking-normal rounded-md">Update</button>
                        </div>
                    ) :
                    (
                    <div className="flex flex-row space-x-3 w-full">
                            <button onClick={props.onRequestClose} type="button" className="flex-1 border border-gray-301 text-gray-700 py-2.5 font-DmSans text-base font-medium leading-5 tracking-normal rounded-md">Cancel</button>
                            <button type="button" className="flex-1 bg-blue-501 text-white-A700 py-2.5 font-DmSans text-base font-medium leading-5 tracking-normal rounded-md">Update</button>
                        </div>
                    )}
                        
                    </div>
                </div>
            </div>
          </div>
        </ModalProvider>
    )
}
export default AddPaymentMethodModal;