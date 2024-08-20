import React , {useState , useEffect} from "react";
import { default as ModalProvider } from "react-modal";
import { IoSearch } from "react-icons/io5";
import { Text } from "./Text";
import { IoIosCheckmark } from "react-icons/io";
import { IoCloseOutline } from "react-icons/io5";
import ConfirmedModal from "./ConfirmedModal";
import { useGetAllUsersQuery } from "../Services/User.Service";
import { FaUserCircle } from "react-icons/fa";
import { useShareDocumentMutation } from "../Services/Document.Service";


const ShareDocumentToMembersModal = (props) => {
  const [selectedMembers, setSelectedMembers] = useState(
    Array.isArray(props?.rowData?.shareWithUsers) ? props.rowData.shareWithUsers : []
  );
  const [selectedRoles, setSelectedRoles] = useState([]); 
  const [searchValue, setSearchValue] = useState("");
  const [isConfirmedModalOpen, setIsConfirmedModalOpen] = useState(false);
  const { data: users, isLoading, isError , refetch} = useGetAllUsersQuery();
  const [filteredUsers, setFilteredUsers] = useState([]);
  const userData = JSON.parse(sessionStorage.getItem('userData'));
  const [shareDocument, response] = useShareDocumentMutation();

  useEffect(() => {
    if (Array.isArray(props?.rowData?.shareWithUsers)) {
      setSelectedMembers(props.rowData.shareWithUsers);
    } else {
      setSelectedMembers([]);
    }
  }, [props?.rowData?.shareWithUsers]);


  useEffect(() => {
    if (users) {
      const usersWithRoles = users.filter(user => 
        user.role && user.role?.toLowerCase() !== 'admin' && user._id !== userData?._id
      );
      setFilteredUsers(usersWithRoles);
    }
  }, [users]);

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
      marketing: 'Marketing Team', 
    };
  
    // Map the selected members' roles to their singular forms
    const roles = selectedMembers.map(id => {
      const user = filteredUsers.find(user => user._id === id);
      return user?.role.toLowerCase();
    });
  
    // Get unique roles and sort them
    const uniqueRoles = [...new Set(roles)];
    uniqueRoles.sort();
  
    // Convert roles to their plural forms and capitalize them
    const capitalizedPluralRoles = uniqueRoles.map(role => {
      const pluralRole = pluralRoles[role] || role.charAt(0).toUpperCase() + role.slice(1) + 's';
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


const filteredInvestors = filteredUsers.filter(investor =>
  investor.displayName.toLowerCase().includes(searchValue.toLowerCase())
);

const onSubmit = async () => {
  const type = determineShareWith(); 

    try {
      await shareDocument({
        id: props?.rowData?._id, 
        userIds: selectedMembers,
        shareWith: type,
      }).unwrap();
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
      className="m-auto w-[95%] md:w-[100%] max-w-[540px]"
      overlayClassName="bg-blue_gray-900_c1 fixed flex h-full inset-y-[0] w-full"
      {...props}
    >
      <div className="max-h-[93vh] sm:w-full md:w-full">
        <div className="bg-white-A700 border border-gray-500_33 border-solid flex flex-col gap-3 items-center justify-start max-w-screen-sm p-5 md:px-5 rounded-[8px] w-full">
            <div className="border-b border-indigo-50 border-solid flex flex-row gap-5 items-start justify-start pb-4 mb-2 w-full">
              <div className="flex flex-1 flex-col font-DmSans h-full items-start justify-start w-full">
                <Text
                  className="md:text-lg text-[18px]  leading-7 font-DmSans text-gray-900 font-medium w-full"
                >
                  Share Document to members
                </Text>
              </div>
              <div className="hover:bg-gray-200 rounded-full p-1" onClick={props.onRequestClose}>
                <IoCloseOutline  className='text-blue_gray-500'
                  size={20}
                />
              </div>
            </div>
          <div className="flex w-full rounded-md p-2 border border-solid">
            <input
              className={`!placeholder:text-blue_gray-300 !text-gray700 font-manrope p-0 text-left text-sm tracking-[0.14px] w-full bg-transparent border-0`}
              type="text"
              name="search"
              placeholder="Search Investors"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <IoSearch size={18} className="text-gray-400 z-20 hover:text-gray-500"/>
          </div>
          <div className="flex flex-col w-full max-h-[60vh] overflow-y-auto">
            {filteredInvestors.map((item, index) => (
              <div key={index} className="flex items-center justify-start space-x-3 border-b border-gray-300 py-3 cursorpointer-green" 
              onClick={() => handleMembersSelection(item._id, item.role)}>
                <label htmlFor={`check_inv_${index}`} className="cursorpointer-green relative inline-flex items-center">
                  <input id={`check_inv_${index}`}
                         type="checkbox"
                         checked={selectedMembers?.includes(item?._id)}
                         onChange={() => handleMembersSelection(item._id, item.role)}
                         className="peer appearance-none w-[18px] h-[18px] bg-gray-300 text-blue-600 checked:bg-green-A200 border-gray-300 rounded-[6px] focus:ring-blue-500"/>
                  <IoIosCheckmark size={19} fontWeight={500} className="absolute left-0 top-0 transition opacity-0 peer-checked:opacity-100 text-blue_gray-903"/>
                </label>
                {item?.image ? (
                  <img src={item.image} className="rounded-full h-8 w-8 mr-2" alt="Profile" />
                ) : (
                  <FaUserCircle className="h-8 w-8 mr-2 text-gray-500" /> 
                )}
                <Text className="text-sm leading-6 text-gray-900_01 tracking-normal" size="txtDMSansRegular14">
                  {item.displayName}
                </Text>
              </div>
            ))}
          </div>
          <div className="flex space-x-3 md:space-x-5 w-auto justify-end ml-auto">
                <button 
                onClick={props.onRequestClose}
                className="bg-gray-300 text-gray-700 py-2 md:py-3 px-2 
                md:px-5 font-DmSans text-base font-medium leading-5 tracking-normal rounded-lg">
                    Cancel
                </button>
                <button 
                onClick={onSubmit}
                className="ml-auto bg-blue-500 text-white-A700 py-2 md:py-3 px-2 md:px-5 font-DmSans 
                text-base font-medium leading-5 tracking-normal rounded-lg">
                    Share to Selected Members
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

export default ShareDocumentToMembersModal;