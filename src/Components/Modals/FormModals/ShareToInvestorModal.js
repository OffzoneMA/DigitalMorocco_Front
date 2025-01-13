import React , {useState , useEffect} from "react";
import { default as ModalProvider } from "react-modal";
import { IoSearch } from "react-icons/io5";
import { Text } from "../../Text";
import ConfirmedModal from "../ConfirmedModal";
import Loader from "../../Loader";
import fileSearchImg from '../../../Media/file-search.svg';
import { useShareProjectMutation } from "../../../Services/Member.Service";
import userdefaultProfile from '../../../Media/User.png';
import { useTranslation } from "react-i18next";
import { useGetInvestorsForMemberWithoutPageQuery } from "../../../Services/Member.Service";
import { useNavigate } from "react-router-dom";

const ShareToInvestorModal = (props) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [Mount, setMount] = useState(true)
  const [selectedInvestors, setSelectedInvestors] = useState([]);
  const [selectedInvestorsNames, setSelectedInvestorsNames] = useState([]);
  const projectId = props?.projectId;
  const [searchValue, setSearchValue] = useState("");
  const [isConfirmedModalOpen, setIsConfirmedModalOpen] = useState(false);
  const { data : investorsData, error, isLoading , refetch } = useGetInvestorsForMemberWithoutPageQuery();
  const [shareProject, { data: shareData, isLoading: shareLoding, isSuccess: shareSuccess , isError, error: shareError }] = useShareProjectMutation();
  const [sendingOk , setSendingOk] = useState(false);

  useEffect(() => {
    if (props?.project?.shareWithInvestors) { 
      setSelectedInvestors(props?.project?.shareWithInvestors )
    }
  }, [props?.project?.shareWithInvestors])

  useEffect(() => {
    if (!props.isOpen) {
      setSendingOk(false);
    }
  }, [props.isOpen]);

  // Fonction modifiée pour gérer la sélection
  const handleInvestorSelection = (id) => {
    // Étape 1 : Mettre à jour les IDs sélectionnés
    const newSelectedIds = selectedInvestors.includes(id)
      ? selectedInvestors.filter(selectedId => selectedId !== id)
      : [...selectedInvestors, id];
  
    // Mise à jour de l'état pour les IDs sélectionnés
    setSelectedInvestors(newSelectedIds);
  
    // Étape 2 : Vérifier et mettre à jour les noms
    if (investorsData?.investors && Array.isArray(investorsData.investors)) {
      const filteredInvestors = investorsData.investors.filter(investor =>
        newSelectedIds.includes(investor?._id)
      );
  
      const newSelectedNames = filteredInvestors.map(
        investor => investor?.name || investor?.companyName || 'Unnamed Investor'
      );

  
      // Mise à jour des noms sélectionnés
      setSelectedInvestorsNames(newSelectedNames);
    } else {
      console.error('Investors data is not properly defined or is not an array:', investorsData);
    }
  };
  

  const openModal  = () =>  {
    setIsConfirmedModalOpen(true);
    props.onRequestClose();
  };

  const closeModal = () => {
    setIsConfirmedModalOpen(false);
  };

  
//   const investorsData = [
//     { id: 1, logo: "/images/img_inv.svg", name: "Venture Catalysts" },
//     { id: 2, logo: "/images/img_inv1.svg", name: "Startup Funding Club" },
//     { id: 3, logo: "/images/img_inv2.svg", name: "XYZ Combinator" },
//     { id: 4, logo: "/images/img_inv3.svg", name: "Techstars Atlanta" },
//     { id: 5, logo: "/images/img_inv4.svg", name: "Urban-X Accelerator" },
//     { id: 6, logo: "/images/img_inv5.svg", name: "Misk500 Accelerator" },
//     { id: 7, logo: "/images/img_inv6.svg", name: "Brendan Wallace" },
//     { id: 8, logo: "/images/img_inv7.svg", name: "NextLevel Management" },
//     { id: 9, logo: "/images/img_inv7.svg", name: "NextLevel Management" },
// ];

const filteredInvestors = investorsData?.investors?.filter(investor =>
  investor?.name?.toLowerCase().includes(searchValue.toLowerCase())
);

const onSubmit = async () => {
  try {
    setSendingOk(true)
    await shareProject({ projectId , investorIds: selectedInvestors });
    openModal();
  } catch (err) {
    console.error('Failed to share project:', err);
  }
};

// useEffect(() => {
//   if (Mount) { setMount(false) }
//   else {
//     if (shareSuccess) {
//       setTimeout(() =>{
//             openModal();
//       }, 2000)
//     }
//     if (shareError) {
//         console.log(shareError)
//     }
//   }

// }, [])

  return (
    <>
    <ModalProvider
      appElement={document.getElementById("root")}
      className="m-auto w-[95%] md:w-[100%] max-w-[540px] outline-none"
      overlayClassName="bg-blue_gray-900_c1 fixed flex h-full inset-y-[0] w-full"
      {...props}
    >
      <div className="max-h-[93vh] sm:w-full md:w-full">
        <div className={`bg-white-A700 border border-gray-500_33 border-solid flex flex-col gap-6 items-center justify-start max-w-screen-sm px-3 md:px-5 pt-5 pb-[30px] rounded-[8px] w-full`}>
            <div className="border-b border-gray-201 border-solid flex flex-row gap-5 items-start justify-start pb-4 w-full">
              <div className="flex flex-1 flex-col font-DmSans h-full items-start justify-start w-full">
                <Text
                  className="md:text-lg text-[18px]  leading-7 font-dm-sans-regular text-[#1D2939] w-full"
                >
                  {t('projects.shareProject.title')}
                </Text>
              </div>
              <div className="hover:bg-gray-201 rounded-full p-1" onClick={props.onRequestClose}>
                {/* <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.5 1.5L1.5 10.5M1.5 1.5L10.5 10.5" stroke="#A9ACB0" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg> */}
              </div>
            </div>
            {!isLoading && investorsData?.investors?.length === 0 ? 
              (
                <div class="flex-col justify-center items-center inline-flex">
                  <svg width="36" height="37" viewBox="0 0 36 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 12.5L6.14018 19.5318C5.61697 20.1596 5.35536 20.4736 5.35137 20.7387C5.34789 20.9692 5.4506 21.1885 5.62988 21.3333C5.83612 21.5 6.24476 21.5 7.06205 21.5H18L16.5 33.5L24 24.5M23.4751 15.5H28.938C29.7552 15.5 30.1639 15.5 30.3701 15.6667C30.5494 15.8115 30.6521 16.0308 30.6486 16.2613C30.6446 16.5264 30.383 16.8404 29.8598 17.4682L27.8254 19.9096M15.8591 7.86897L19.4999 3.5L18.6004 10.6966M31.5 32L4.5 5" stroke="#667085" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  <div class="self-stretch h-[35px] mt-2 text-center text-[#344053] text-sm font-dm-sans-medium leading-relaxed">{t("projects.shareProject.emptyInvestorsList.mainMessage")}</div>
                  <div class="self-stretch text-center text-[#344053] px-3 text-sm font-dm-sans-regular leading-relaxed">{t("projects.shareProject.emptyInvestorsList.instruction")}</div>
                </div>
              ):
              (
              <div className="flex flex-col w-full gap-2">
                <div className="relative flex w-full">
                  <input
                    className={`!placeholder:text-blue_gray-301 h-[44px] !text-gray700 font-manrope p-2 text-left text-sm tracking-[0.14px] w-full bg-transparent border-[1px] border-[#D0D5DD] rounded-[6px] pr-[30px] focus:border-focusColor focus:shadow-inputBs`}
                    type="text"
                    name="search"
                    placeholder={t('projects.shareProject.searchLabel')}
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                  />
                  <IoSearch
                    size={18}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-[#98A2B3] z-20 hover:text-gray-500"
                  />
                </div>
                <div className="flex flex-col w-full max-h-[60vh] overflow-y-auto">
                  {isLoading ? (
                    <div className="flex flex-col items-center text-blue_gray-800_01 gap-[16px] min-h-[330px] w-full py-28 rounded-b-[8px]">
                      <Loader />
                    </div>
                  ) : filteredInvestors?.length === 0 ? (
                    <div className="flex flex-col items-center text-blue_gray-800_01 gap-[16px] min-h-[330px] w-full py-28 rounded-b-[8px]">
                      <img src={fileSearchImg} alt="No Project Created" />
                      <Text className="font-dm-sans-medium text-sm leading-6 text-gray700 w-auto">
                      {t('projects.noProject')}
                      </Text>
                    </div>
                  ) : (
                    filteredInvestors?.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center h-[64px] justify-start space-x-3 border-b border-gray-201 py-[14px] hover:bg-gray-100 cursorpointer-green"
                        onClick={() => handleInvestorSelection(item._id)}
                      >
                        <label
                          htmlFor={`check_inv_${index}`}
                          className={`cursorpointer-green relative inline-flex items-center ${
                            selectedInvestors.includes(item._id) ? 'animation' : ''
                          }`}
                        >
                          <input
                            id={`check_inv_${index}`}
                            type="checkbox"
                            checked={selectedInvestors.includes(item._id)}
                            onChange={() => handleInvestorSelection(item._id)}
                            className={`peer appearance-none w-[20px] h-[20px] bg-gray-300 text-blue-600 checked:bg-green-A200 border-gray-201 rounded-[6px] focus:ring-blue-500`}
                          />
                          <svg
                            width="11"
                            height="8"
                            viewBox="0 0 11 7"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="absolute left-[50%] top-[50%] transform -translate-x-1/2 -translate-y-1/2 transition opacity-0 peer-checked:opacity-100 text-blue_gray-903"
                          >
                            <path
                              d="M1.5 3.5L4.14706 6L9.5 1"
                              stroke="#1E0E62"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </label>
                        {item?.image ? (
                          <img src={item?.image} alt="investors" className="h-[32px] w-[32px] rounded-full" />
                        ) : (
                          <div className="flex items-center justify-center rounded-full h-9 w-9 bg-[#EDF7FF] p-2">
                            <img src={userdefaultProfile} alt="" className="" />
                          </div>
                        )}
                        <Text className="text-sm capitalize text-gray-900_01 leading-6 tracking-normal font-dm-sans-regular">
                          {item.name}
                        </Text>
                      </div>
                    ))
                  )}
                </div>
              </div>
              )
            }
            
          <div className="flex space-x-3 md:space-x-5 w-auto justify-end ml-auto">
            {!isLoading && investorsData?.investors?.length === 0 ? (
            <>
            <div class="justify-end items-start gap-[18px] inline-flex">
              <button type="button" onClick={props.onRequestClose} class="px-5 cursorpointer py-[18px] h-[44px] bg-[#e4e6eb] hover:bg-[#D0D5DD] active:bg-light_blue-100 rounded-md justify-center items-center gap-[18px] flex">
                  <div class="justify-center items-center gap-3 flex">
                      <div class="text-[#475466] text-base font-dm-sans-medium">{t("common.cancel")}</div>
                  </div>
              </button>
              <button type="button" onClick={() => navigate('/Investors')} class="px-5 cursorpointer py-[18px] h-[44px] bg-[#2575f0] hover:bg-[#235DBD] active:bg-[#224a94] rounded-md justify-center items-center gap-[18px] flex">
                  <div class="justify-center items-center gap-3 flex">
                      <div class="text-white-A700 text-base font-dm-sans-medium">{t("projects.shareProject.emptyInvestorsList.buttonText")}</div>
                  </div>
              </button>
            </div>
            </>
          ) :
          (
            <>
              <button 
                onClick={props.onRequestClose}
                className="flex items-center justify-center min-w-[93px] bg-[#E4E7EC] text-[#475467] hover:bg-[#D0D5DD] active:bg-light_blue-100 cursorpointer-green
                py-[10px] md:py-[18px] px-[12px] md:px-[20px] font-dm-sans-medium text-base h-[44px] leading-5 tracking-normal rounded-[6px]">
                  {t('common.cancel')}
              </button>
              <button 
                onClick={onSubmit}
                className={`flex items-center justify-center ml-auto ${sendingOk ? 'bg-[#235DBD] min-w-[180px]' : 'bg-blue-A400'} hover:bg-[#235DBD] active:bg-[#224a94] text-white-A700 cursorpointer-green py-[10px] md:py-[18px] px-[12px] md:px-[20px] font-dm-sans-medium text-base h-[44px] leading-5 tracking-normal rounded-[6px]`}>
                  {sendingOk ? 
                  <div className="flex items-center justify-center gap-6"> {t("all.sending")}
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10.4995 13.5002L20.9995 3.00017M10.6271 13.8282L13.2552 20.5862C13.4867 21.1816 13.6025 21.4793 13.7693 21.5662C13.9139 21.6415 14.0862 21.6416 14.2308 21.5664C14.3977 21.4797 14.5139 21.1822 14.7461 20.5871L21.3364 3.69937C21.5461 3.16219 21.6509 2.8936 21.5935 2.72197C21.5437 2.57292 21.4268 2.45596 21.2777 2.40616C21.1061 2.34883 20.8375 2.45364 20.3003 2.66327L3.41258 9.25361C2.8175 9.48584 2.51997 9.60195 2.43326 9.76886C2.35809 9.91354 2.35819 10.0858 2.43353 10.2304C2.52043 10.3972 2.81811 10.513 3.41345 10.7445L10.1715 13.3726C10.2923 13.4196 10.3527 13.4431 10.4036 13.4794C10.4487 13.5115 10.4881 13.551 10.5203 13.5961C10.5566 13.647 10.5801 13.7074 10.6271 13.8282Z" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>  :  
                  t('projects.shareProject.share')}
              </button>
            </>
          )}   
          </div>
        </div>
      </div>
    </ModalProvider>
    <ConfirmedModal isOpen={isConfirmedModalOpen} onRequestClose={closeModal}
        m1={t("projects.shareProject.projectSentConfirmation.successMessage")}
        m2={`${selectedInvestorsNames.join(', ')}`} 
        m3={selectedInvestors?.length ===1 ? t("projects.shareProject.projectSentConfirmation.singular") : t("projects.shareProject.projectSentConfirmation.plural")} />
    </>
  );
};

export default ShareToInvestorModal;