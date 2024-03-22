import React , {useState} from "react";

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
      <div className="bg-white-A700 flex flex-col font-dmsans sm:gap-10 md:gap-10 gap-[84px] items-center justify-start mx-auto pb-[246px] w-full">
        <div className="border-b border-indigo-50 border-solid flex flex-row md:flex-row gap-10 items-center justify-between md:px-20 sm:px-20 py-5 w-full">
          <img
            className="h-[47px] w-[180px]"
            src="images/img_logo.svg"
            alt="logo"
          />
          <div className="flex flex-row gap-[21px] items-start justify-start w-auto">
            <div className="flex flex-col items-start justify-start p-3 w-12">
              <img
                className="h-6 w-6"
                src="images/img_bell01.svg"
                alt="bellOne"
              />
            </div>
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
          </div>
        </div>
        {selectedGrid && 
        <div className="md:px-20 sm:px-20 ml-auto" onClick={openModal}>
          <div className="bg-teal-A700 flex flex-row gap-6 h-[52px] md:h-auto items-center ml-auto justify-end sm:px-5 px-7 py-[10px] rounded-[26px] w-auto">
            <button
              type="submit"
              className="text-base text-white-A700"
            >
              {isModalOpen ? t('chooserole.confirmed.button1') : t('chooserole.confirmed.button')}
            </button>
            {!isModalOpen &&
            <img
              className="h-6 w-6"
              src="images/img_arrowright.svg"
              alt="arrowright"
          />}
          </div>
        </div>
        }
        <div className="flex flex-col gap-[42px] items-center justify-start max-w-[1232px] mx-auto md:px-5 w-full">
          <Text
            className="text-[22px] text-black-900 sm:text-lg md:text-xl w-auto"
            size="txtDMSansMedium22Black900"
          >
            {t('chooserole.welcomeMessage')}
          </Text>
          <div className="flex flex-col gap-[42px] items-center justify-start w-full">
            <div className="flex flex-col items-center justify-start w-full">
              <Text
                className="text-base text-blue_gray-500 text-center w-full"
                size="txtDMSansMedium16Bluegray500"
              >
                {t('chooserole.choosePathMessage')}
              </Text>
            </div>
            <div className="gap-[42px] grid sm:grid-cols-2 md:grid-cols-3 items-start justify-center w-auto w-full">
              <div onClick={() => handleGridClick(1)} 
              className={`border-2  border-solid flex flex-col items-start justify-start md:px-10 px-16 sm:px-5 py-[42px] rounded-[16px] w-full ${selectedGrid == 1 ? 'border-blue-300' : 'border-indigo-50'}`}>
                <div className="flex flex-col gap-6 items-center justify-start w-auto">
                  <Text
                    className="text-base text-center text-indigo-900 tracking-[2.00px] uppercase w-auto"
                    size="txtDMSansBold16"
                  >
                    {t('chooserole.startup')}
                  </Text>
                  <img
                    className="h-40 w-40"
                    src="images/img_startup.svg"
                    alt="startup"
                  />
                  <Text
                    className="leading-[26.00px] max-w-[257px] md:max-w-full text-base text-center text-gray-900_66"
                    size="txtDMSansRegular16"
                  >
                   {t('chooserole.startupDescription')}
                  </Text>
                </div>
              </div>
              <div onClick={() => handleGridClick(2)} 
              className={`border-2 border-solid flex flex-col items-start justify-start md:px-10 px-16 sm:px-5 py-[42px] rounded-[16px] w-full ${selectedGrid === 2 ? 'border-blue-300' : 'border-indigo-50'}`}>                
                <div className="flex flex-col gap-6 items-center justify-start w-auto">
                  <Text
                    className="text-base text-center text-indigo-900 tracking-[2.00px] uppercase w-auto"
                    size="txtDMSansBold16"
                  >
                    {t('chooserole.investor')}
                  </Text>
                  <img
                    className="h-40 w-40"
                    src="images/img_investor.svg"
                    alt="startup"
                  />
                  <Text
                    className="leading-[26.00px] max-w-[257px] md:max-w-full text-base text-center text-gray-900_66"
                    size="txtDMSansRegular16"
                  >
                    {t('chooserole.investorDescription')}
                  </Text>
                </div>
              </div>
              <div onClick={() => handleGridClick(3)} 
              className={`border-2 border-solid flex flex-col items-start justify-start md:px-10 px-16 sm:px-5 py-[42px] rounded-[16px] w-full ${selectedGrid === 3 ? 'border-blue-300' : 'border-indigo-50'}`}>                
                <div className="flex flex-col gap-6 items-center justify-start w-auto">
                  <Text
                    className="text-base text-center text-indigo-900 tracking-[2.00px] uppercase w-auto"
                    size="txtDMSansBold16"
                  >
                    {t('chooserole.company')}
                  </Text>
                  <img
                    className="h-40 w-40"
                    src="images/img_company.svg"
                    alt="startup"
                  />
                  <Text
                    className="leading-[26.00px] max-w-[257px] md:max-w-full text-base text-center text-gray-900_66"
                    size="txtDMSansRegular16"
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
