import React , {useState , useEffect} from "react";
import { default as ModalProvider } from "react-modal";
import { IoSearch } from "react-icons/io5";
import { Text } from "./Text";
import { IoCloseOutline } from "react-icons/io5";
import ConfirmedModal from "./ConfirmedModal";
import { useGetInvestorsQuery } from "../Services/Investor.Service";
import Loader from "./Loader";
import fileSearchImg from '../Media/file-search.svg';
import { useShareProjectMutation } from "../Services/Member.Service";
import { FaUserCircle } from "react-icons/fa";


const ShareToInvestorModal = (props) => {
  const [Mount, setMount] = useState(true)
  const [selectedInvestors, setSelectedInvestors] = useState([]);
  const projectId = props?.projectId;
  const [searchValue, setSearchValue] = useState("");
  const [isConfirmedModalOpen, setIsConfirmedModalOpen] = useState(false);
  const { data : investorsData, error, isLoading , refetch } = useGetInvestorsQuery();
  const [shareProject, { data: shareData, isLoading: shareLoding, isSuccess: shareSuccess , isError, error: shareError }] = useShareProjectMutation();

  const handleInvestorSelection = (id) => {
    setSelectedInvestors(prevSelectedInvestors => {
      if (prevSelectedInvestors.includes(id)) {
        return prevSelectedInvestors.filter(selectedId => selectedId !== id);
      } else {
        return [...prevSelectedInvestors, id];
      }
    });
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

const filteredInvestors = investorsData?.investors.filter(investor =>
  investor?.name?.toLowerCase().includes(searchValue.toLowerCase())
);

const onSubmit = async () => {
  try {
    await shareProject({ projectId , investorIds: selectedInvestors });
    openModal();
  } catch (err) {
    console.error('Failed to share project:', err);
  }
};

useEffect(() => {
  if (Mount) { setMount(false) }
  else {
    if (shareSuccess) {
      setTimeout(() =>{
            openModal();
      }, 2000)
    }
    if (shareError) {
        console.log(shareError)
    }
  }

}, [])


  return (
    <>
    <ModalProvider
      appElement={document.getElementById("root")}
      className="m-auto w-[95%] md:w-[100%] max-w-[540px] "
      overlayClassName="bg-blue_gray-900_c1 fixed flex h-full inset-y-[0] w-full"
      {...props}
    >
      <div className="max-h-[93vh] sm:w-full md:w-full">
        <div className="bg-white-A700 border border-gray-500_33 border-solid flex flex-col gap-3 items-center justify-start max-w-screen-sm p-5 md:px-5 rounded-[8px] w-full">
            <div className="border-b border-gray-201 border-solid flex flex-row gap-5 items-start justify-start pb-4 mb-2 w-full">
              <div className="flex flex-1 flex-col font-DmSans h-full items-start justify-start w-full">
                <Text
                  className="md:text-lg text-[18px]  leading-7 font-dm-sans-regular text-gray-900 w-full"
                >
                  Share project to Investors
                </Text>
              </div>
              <div className="hover:bg-gray-201 rounded-full p-1" onClick={props.onRequestClose}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.5 1.5L1.5 10.5M1.5 1.5L10.5 10.5" stroke="#A9ACB0" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
            </div>
            <div className="relative flex w-full">
              <input
                className={`!placeholder:text-blue_gray-300 h-[44px] !text-gray700 font-manrope p-2 text-left text-sm tracking-[0.14px] w-full bg-transparent border-[1px] border-[#D0D5DD] rounded-[6px] pr-[30px]`}
                type="text"
                name="search"
                placeholder="Search Investors"
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
              <div className="flex flex-col items-center text-blue_gray-800_01 gap-[16px] min-h-[330px] w-full py-28">
                <Loader />
              </div>
            ) : filteredInvestors?.length === 0 ? (
              <div className="flex flex-col items-center text-blue_gray-800_01 gap-[16px] min-h-[330px] w-full py-28">
                <img src={fileSearchImg} alt="No Project Created" />
                <Text className="font-dm-sans-medium text-sm leading-6 text-gray700 w-auto">
                  No Project Created
                </Text>
              </div>
            ) : (
              filteredInvestors?.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center h-[64px] justify-start space-x-3 border-b border-gray-201 py-[14px] cursorpointer-green"
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
                    <FaUserCircle className="h-9 w-9 text-gray-500" /> // Placeholder icon
                  )}
                  <Text className="text-sm text-gray-900_01 leading-6 tracking-normal font-dm-sans-regular">
                    {item.name}
                  </Text>
                </div>
              ))
            )}
          </div>
          <div className="flex space-x-3 md:space-x-5 w-auto justify-end ml-auto">
                <button 
                onClick={props.onRequestClose}
                className="flex items-center bg-[#E4E7EC] text-[#475467] hover:bg-[#D0D5DD] active:bg-light_blue-100 cursorpointer-green
                py-[10px] md:py-[18px] px-[12px] md:px-[20px] font-dm-sans-medium text-base h-[44px] leading-5 tracking-normal rounded-[6px]">
                    Cancel
                </button>
                <button 
                onClick={onSubmit}
                className="flex items-center ml-auto bg-blue-A400 hover:bg-[#235DBD] active:bg-[#224a94] text-white-A700 cursorpointer-green py-[10px] md:py-[18px] px-[12px] md:px-[20px] font-dm-sans-medium text-base h-[44px] leading-5 tracking-normal rounded-[6px]">
                    Share to Selected Investors
                </button>
                
              </div>
        </div>
      </div>
    </ModalProvider>
    <ConfirmedModal isOpen={isConfirmedModalOpen} onRequestClose={closeModal}
        m1="Your project has been successfully sent to"
        m2="Venture Catalys" 
        m3="The investor will review your request and respond accordingly. 
        Please keep an eye on your email 
        and dashboard for any additional communication or updates." />
    </>
  );
};

export default ShareToInvestorModal;