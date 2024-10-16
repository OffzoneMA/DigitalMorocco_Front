import React , {useState , useEffect} from "react";
import { default as ModalProvider } from "react-modal";
import { IoSearch } from "react-icons/io5";
import { Text } from "./Text";
import { IoIosCheckmark } from "react-icons/io";
import { IoCloseOutline } from "react-icons/io5";
import ConfirmedModal from "./ConfirmedModal";
import { useGetAllUsersQuery } from "../Services/User.Service";
import { FaUserCircle } from "react-icons/fa";
import { useGetShareWithDataQuery, useShareDocumentMutation } from "../Services/Document.Service";
import Loader from "./Loader";
import userDefaultProfil from "../Media/User1.png";

const ShareDocumentToMembersModal = (props) => {
  const [selectedMembers, setSelectedMembers] = useState(
    Array.isArray(props?.rowData?.shareWithUsers) ? props.rowData.shareWithUsers : []
  );
  const [selectedRoles, setSelectedRoles] = useState([]); 
  const [searchValue, setSearchValue] = useState("");
  const [isConfirmedModalOpen, setIsConfirmedModalOpen] = useState(false);
  const { data: users} = useGetAllUsersQuery();
  const {data: shareWithData , isLoading, isError , refetch } = useGetShareWithDataQuery();
  const [filteredUsers, setFilteredUsers] = useState([]);
  const userData = JSON.parse(sessionStorage.getItem('userData'));
  const [shareDocument, response] = useShareDocumentMutation();
  const [shareType , setShareType] = useState('');
  const [sendingOk , setSendingOk] = useState(false);

  useEffect(() => {
    if (Array.isArray(props?.rowData?.shareWithUsers)) {
      setSelectedMembers(props.rowData.shareWithUsers);
    } else {
      setSelectedMembers([]);
    }
  }, [props?.rowData?.shareWithUsers]);


  useEffect(() => {
    if (shareWithData) {
      setFilteredUsers(shareWithData);
    }
  }, [shareWithData]);

  const handleMembersSelection = (id, role) => {
    setSelectedMembers((prevSelectedMembers) => {
      if (prevSelectedMembers.includes(id)) {
        setSelectedRoles(selectedRoles.filter((r) => r.id !== id)); // Enlever le rôle du membre désélectionné
        return prevSelectedMembers.filter((selectedId) => selectedId !== id);
      } else {
        setSelectedRoles([...selectedRoles, { id, role }]); // Ajouter le rôle du membre sélectionné
        return [...prevSelectedMembers, id];
      }
    });
  };

  const determineShareWith = () => {
    const pluralRoles = {
      member: 'Members',
      investor: 'Investors',
      partner: 'Partners',
      employee: 'Marketing Team', 
    };
  
    // Map the selected members' roles to their singular forms
    const roles = selectedMembers?.map(id => {
      const user = filteredUsers.find(user => user._id === id);
      return user?.type?.toLowerCase();
    });
  
    // Get unique roles and sort them
    const uniqueRoles = [...new Set(roles)];
    uniqueRoles.sort();
  
    // Convert roles to their plural forms and capitalize them
    const capitalizedPluralRoles = uniqueRoles.map(role => {
      const pluralRole = pluralRoles[role] || role?.charAt(0)?.toUpperCase() + role?.slice(1) + 's';
      return pluralRole;
    });
  
    // Join the roles with ' & ' for the final result
    return capitalizedPluralRoles.join(' & ');
  };
  

  const openModal  = () =>  {
    setIsConfirmedModalOpen(true);
    props.onRequestClose();
  };

  const closeModal = () => {
    setIsConfirmedModalOpen(false);
  };


const filteredInvestors = filteredUsers?.filter(investor =>
  investor?.name?.toLowerCase().includes(searchValue.toLowerCase())
);

const onSubmit = async () => {
  const type = determineShareWith(); 
  setShareType(type)
    try {
      setSendingOk(true);
      await shareDocument({
        id: props?.rowData?._id, 
        userIds: selectedMembers,
        shareWith: type,
      }).unwrap();
      setSendingOk(false);
      props.onRequestClose();
      setSelectedMembers([]);
      openModal();
    } catch (error) {
      // Handle error (e.g., show an error message)
      console.error('Failed to share document:', error);
    }
};


  return (
    <>
    <ModalProvider
      appElement={document.getElementById("root")}
      className="m-auto w-[95%] md:w-[100%] max-w-[540px] outline-none"
      overlayClassName="bg-blue_gray-900_c1 fixed flex h-full inset-y-[0] w-full"
      {...props}
    >
      <div className="max-h-[93vh] sm:w-full md:w-full">
        <div className="bg-white-A700 border border-gray-500_33 border-solid flex flex-col gap-3 items-center justify-start max-w-screen-sm p-5 md:px-5 rounded-[8px] w-full">
            <div className="border-b border-gray-201 border-solid flex flex-row gap-5 items-start justify-start pb-4 mb-2 w-full">
              <div className="flex flex-1 flex-col font-DmSans h-full items-start justify-start w-full">
                <Text
                  className="md:text-lg text-[18px]  leading-7 font-DmSans text-[#1D2939] font-medium w-full"
                >
                  Share Document
                </Text>
              </div>
              <div className="hover:bg-gray-201 rounded-full p-1" onClick={props.onRequestClose}>
                {/* <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.5 1.5L1.5 10.5M1.5 1.5L10.5 10.5" stroke="#A9ACB0" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg> */}
              </div>
            </div>
            <div className="relative w-full">
              <input
                className={`pl-3 pr-3 h-[44px] py-2 w-full border border-[#D0D5DD] rounded-md placeholder:text-blue_gray-301 text-gray700 font-manrope text-left text-sm tracking-[0.14px] focus:border-focusColor focus:shadow-inputBs`}
                type="text"
                name="search"
                placeholder="Search"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
              <IoSearch size={18} className="absolute top-1/2 right-3 transform -translate-y-1/2 text-[#98A2B3] z-20 hover:text-gray-500" />
            </div>
          <div className="flex flex-col w-full max-h-[60vh] overflow-y-auto">
            {
              filteredInvestors?.length > 0 ?
              (filteredInvestors.map((item, index) => (
              <div key={index} className="flex items-center justify-start space-x-3 border-b border-gray-201 py-3 hover:bg-gray-100 cursorpointer" 
              onClick={() => handleMembersSelection(item._id, item.role)}>
                <label htmlFor={`check_inv_${index}`} className="cursorpointer-green relative inline-flex items-center">
                  <input id={`check_inv_${index}`}
                    type="checkbox"
                    checked={selectedMembers?.includes(item?._id)}
                    onChange={() => handleMembersSelection(item._id, item.type)}
                    className="peer appearance-none w-[18px] h-[18px] bg-gray-300 text-blue-600 checked:bg-green-A200 border-gray-201 rounded-[6px] focus:ring-blue-500"/>
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
                  <img src={item.image} className="rounded-full h-8 w-8 mr-2" alt="Profile" />
                ) : (
                  <img src={userDefaultProfil} className="rounded-full h-8 w-8 mr-2" alt="Profile" />
                )}
                <Text className="text-sm leading-6 text-gray-900_01 tracking-normal capitalize" size="txtDMSansRegular14">
                  {item?.name}
                </Text>
              </div>
            ))) :
            <>
              {isLoading? (
                <div className="flex flex-col items-center text-blue_gray-800_01 gap-[16px] min-h-[230px] w-full py-28">
                  <Loader />
                </div>
              ) :
              (
                <div className="flex flex-col items-center h-screen  w-full py-28 gap-4">
                  <svg width="29" height="32" viewBox="0 0 29 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 14.5H7M10 20.5H7M19 8.5H7M25 13.75V8.2C25 5.67976 25 4.41965 24.5095 3.45704C24.0781 2.61031 23.3897 1.9219 22.543 1.49047C21.5804 1 20.3202 1 17.8 1H8.2C5.67976 1 4.41965 1 3.45704 1.49047C2.61031 1.9219 1.9219 2.61031 1.49047 3.45704C1 4.41965 1 5.67976 1 8.2V23.8C1 26.3202 1 27.5804 1.49047 28.543C1.9219 29.3897 2.61031 30.0781 3.45704 30.5095C4.41965 31 5.67976 31 8.2 31H12.25M28 31L25.75 28.75M27.25 25C27.25 27.8995 24.8995 30.25 22 30.25C19.1005 30.25 16.75 27.8995 16.75 25C16.75 22.1005 19.1005 19.75 22 19.75C24.8995 19.75 27.25 22.1005 27.25 25Z" stroke="#667085" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <Text
                    className="font-dm-sans-medium text-sm leading-[26px] text-gray700 w-auto"
                    size=""
                  >
                    No Data Available 
                  </Text>
                </div>
              )}
            </>
            }
          </div>
          <div className="flex space-x-3 md:space-x-5 w-auto justify-end ml-auto">
                <button 
                onClick={props.onRequestClose}
                className="flex items-center justify-center min-w-[93px] bg-[#E4E7EC] text-[#475467] py-2 hover:bg-[#D0D5DD] active:bg-light_blue-100
                py-[10px] md:py-[18px] px-[12px] md:px-[20px] font-dm-sans-medium text-base h-[44px] leading-5 tracking-normal rounded-[6px] cursorpointer-green">
                    Cancel
                </button>
                <button 
                onClick={onSubmit}
                className={`flex items-center justify-center ml-auto ${sendingOk ? 'bg-[#235DBD] min-w-[180px]' : 'bg-blue-A400'} hover:bg-[#235DBD] active:bg-[#224a94] text-white-A700 py-[10px] md:py-[18px] px-[12px] md:px-[20px] font-dm-sans-medium text-base h-[44px] leading-5 tracking-normal rounded-[6px] cursorpointer-green`}>
                    {sendingOk ? 
                    <div className="flex items-center justify-center gap-6"> Sending... 
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.4995 13.5002L20.9995 3.00017M10.6271 13.8282L13.2552 20.5862C13.4867 21.1816 13.6025 21.4793 13.7693 21.5662C13.9139 21.6415 14.0862 21.6416 14.2308 21.5664C14.3977 21.4797 14.5139 21.1822 14.7461 20.5871L21.3364 3.69937C21.5461 3.16219 21.6509 2.8936 21.5935 2.72197C21.5437 2.57292 21.4268 2.45596 21.2777 2.40616C21.1061 2.34883 20.8375 2.45364 20.3003 2.66327L3.41258 9.25361C2.8175 9.48584 2.51997 9.60195 2.43326 9.76886C2.35809 9.91354 2.35819 10.0858 2.43353 10.2304C2.52043 10.3972 2.81811 10.513 3.41345 10.7445L10.1715 13.3726C10.2923 13.4196 10.3527 13.4431 10.4036 13.4794C10.4487 13.5115 10.4881 13.551 10.5203 13.5961C10.5566 13.647 10.5801 13.7074 10.6271 13.8282Z" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>  :  
                    'Share to Selected Members'}
                </button>
                
              </div>
        </div>
      </div>
    </ModalProvider>
    <ConfirmedModal isOpen={isConfirmedModalOpen} onRequestClose={closeModal}
        m1="Your document has been successfully share with"
        m2={shareType} 
        m3 = "They will review the shared document and respond accordingly. Please keep an eye on your email and dashboard for any additional communication or updates." />
    </>
  );
};

export default ShareDocumentToMembersModal;