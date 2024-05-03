import React , {useState , useRef} from "react";

import { Text } from "../../../Components/Text";
import { Button } from "../../../Components/Button";
import { useTranslation } from "react-i18next";
import RoleConfirmedModal from "../../../Components/RoleConfirmedModal";

const ChooseRole = () => {
    const { t, i18n } = useTranslation();

    const [selectedGrid, setSelectedGrid] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleGridClick = (gridId) => {
      setSelectedGrid(gridId);
    };

    const openModal = () => {
      setIsModalOpen(true);
    };
  
    const closeModal = () => {
      setIsModalOpen(false);
      setSelectedGrid(null);
    };

  return (
    <>
      <div className="bg-white-A700 flex flex-col font-DmSans sm:gap-10 md:gap-10 gap-[84px] items-center justify-start mx-auto pb-[246px] w-full min-h-screen">
        <div className="border-b border-gray-201 border-solid flex flex-row md:flex-row gap-10 items-center justify-between px-20 md:px-[100px] py-5 w-full relative">
          <a href="/">
            <img
              className="h-[47px] w-[180px]"
              src="images/img_logo.svg"
              alt="logo"
            />
          </a>
          <div className="flex flex-row gap-[21px] items-start justify-start w-auto relative">
            <Button
              className="flex h-10 items-center justify-center w-10"
              shape="circle"
              color="blue_gray_900_04"
              variant="outline"
            >
              <img
                className="h-6"
                src="images/img_user03.svg"
                alt="userThree"
              />
            </Button>
            <div className="absolute bg-white-A700 text-blue_gray-904 flex flex-row gap-4 px-[18px] border border-gray-201 top-[46px] right-0 w-[248px] rounded-[6px] cursor-pointer  h-[46px] flex items-center transition-colors duration-200 hover:text-[#EA6479] hover:stroke-red">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 15L19 10M19 10L14 5M19 10H7M10 15C10 15.93 10 16.395 9.89778 16.7765C9.62038 17.8117 8.81173 18.6204 7.77646 18.8978C7.39496 19 6.92997 19 6 19H5.5C4.10218 19 3.40326 19 2.85195 18.7716C2.11687 18.4672 1.53284 17.8831 1.22836 17.1481C1 16.5967 1 15.8978 1 14.5V5.5C1 4.10217 1 3.40326 1.22836 2.85195C1.53284 2.11687 2.11687 1.53284 2.85195 1.22836C3.40326 1 4.10218 1 5.5 1H6C6.92997 1 7.39496 1 7.77646 1.10222C8.81173 1.37962 9.62038 2.18827 9.89778 3.22354C10 3.60504 10 4.07003 10 5" stroke="#203668" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <button className="flex items-center font-dm-sans-regular text-base leading-[26px] focus:outline-none transition-colors duration-200 hover:text-blue-500">
                Sign out
              </button>
            </div>
          </div>
        </div>
        <div className="px-20 flex justify-end w-full">
        {selectedGrid && 
          <div className="bg-teal-A700 ml-auto my-3 flex flex-row gap-6 h-[52px] items-center justify-center px-7 py-[13px] rounded-[26px] w-auto cursor-pointer hover:bg-greenbtnhoverbg hover:svg-translate" 
            onClick={openModal}>
            <button type="submit" className="text-base items-center justify-center font-dm-sans-medium text-white-A700 w-auto">
            {isModalOpen ? t('chooserole.confirmed.button1') : t('chooserole.confirmed.button')}
            </button>
            {!isModalOpen &&
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-transform transform">
                <path d="M11 15L15 11M15 11L11 7M15 11H7M21 11C21 16.5228 16.5228 21 11 21C5.47715 21 1 16.5228 1 11C1 5.47715 5.47715 1 11 1C16.5228 1 21 5.47715 21 11Z" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            }
          </div>
        }
        </div>
        <div className="flex flex-col gap-[42px] items-center justify-start max-w-[1232px] m-auto px-7 w-full">
          <Text
            className="text-[22px] text-blue_gray-900 text-center font-dm-sans-medium leading-[32px] w-auto"
          >
            {t('chooserole.welcomeMessage')}
          </Text>
          <div className="flex flex-col gap-[42px] items-center justify-start w-full">
            <div className="flex flex-col items-center justify-start w-full">
              <Text
                className="text-base text-blue_gray-500 font-dm-sans-medium  leading-[26px] text-center w-full"
              >
                {t('chooserole.choosePathMessage')} <br/>
                {t('chooserole.choosePathMessage2')}
              </Text>
            </div>
            <div className="gap-[42px] grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 items-center justify-center w-full">
              <div onClick={() => handleGridClick(1)} 
                className={`border-2  border-solid flex flex-col items-center justify-start md:px-10 px-16 sm:px-5 py-[42px] rounded-[16px] max-w-[382.67px] cursor-pointer hover:border-blue-503 ${selectedGrid == 1 ? 'border-blue-503 shadow-roleCardbs' : 'border-gray-201'}`}>
                <div className="flex flex-col gap-6 items-center justify-start w-auto">
                  <Text
                    className="font-dm-sans-bold text-base leading-[26px] tracking-[2px]  text-center text-blue_gray-904 tracking-[2.00px] uppercase w-auto"
                  >
                    {t('chooserole.startup')}
                  </Text>
                  <img
                    className="h-40 w-40"
                    src="images/img_startup.svg"
                    alt="startup"
                  />
                  <Text
                    className="leading-[26.00px] max-w-[257px]  font-dm-sans-regular text-center text-color2"
                  >
                   {t('chooserole.startupDescription')}
                  </Text>
                </div>
              </div>
              <div onClick={() => handleGridClick(2)} 
              className={`border-2 border-solid flex flex-col items-center justify-start md:px-10 px-16 sm:px-5 py-[42px] rounded-[16px] max-w-[382.67px] cursor-pointer hover:border-blue-503 ${selectedGrid === 2 ? 'border-blue-503 shadow-roleCardbs' : 'border-gray-201'}`}>                
                <div className="flex flex-col gap-6 items-center justify-start w-auto">
                  <Text
                    className="font-dm-sans-bold text-base leading-[26px] tracking-[2px]  text-center text-blue_gray-904 tracking-[2.00px] uppercase w-auto"
                    >
                    {t('chooserole.investor')}
                  </Text>
                  <img
                    className="h-40 w-40"
                    src="images/img_investor.svg"
                    alt="startup"
                  />
                  <Text
                    className="leading-[26.00px] max-w-[257px]  font-dm-sans-regular text-center text-color2"
                    >
                    {t('chooserole.investorDescription')}
                  </Text>
                </div>
              </div>
              <div onClick={() => handleGridClick(3)} 
              className={`border-2 border-solid flex flex-col items-center justify-start md:px-10 px-16 sm:px-5 py-[42px] rounded-[16px] max-w-[382.67px] cursor-pointer hover:border-blue-503 ${selectedGrid === 3 ? 'border-blue-503 shadow-roleCardbs' : 'border-gray-201'}`}>                
                <div className="flex flex-col gap-6 items-center justify-start w-auto">
                  <Text
                    className="font-dm-sans-bold text-base leading-[26px] tracking-[2px]  text-center text-blue_gray-904 tracking-[2.00px] uppercase w-auto"
                    >
                    {t('chooserole.company')}
                  </Text>
                  <img
                    className="h-40 w-40"
                    src="images/img_company.svg"
                    alt="startup"
                  />
                  <Text
                    className="leading-[26.00px] max-w-[257px]  font-dm-sans-regular text-center text-color2"
                    >
                    {t('chooserole.companyDescription')}
                  </Text>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
      <RoleConfirmedModal isOpen={isModalOpen}
        onRequestClose={closeModal}/>
      </div>
    </>
  );
};

export default ChooseRole;
