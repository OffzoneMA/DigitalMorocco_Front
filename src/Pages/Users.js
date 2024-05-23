import React, { useState, useEffect } from "react";
import axios from "axios";
import { Text } from "../Components/Text";
import toast from "react-hot-toast";
import moment from "moment/moment";
import Loading from "../Components/Loading";
import { AiOutlineFileSearch } from "react-icons/ai";
import PageHeader from "../Components/PageHeader";
import SearchInput from "../Components/SeachInput";
import TableTitle from "../Components/TableTitle";
import { HiBan, HiCheck } from "react-icons/hi";
import Swal from "sweetalert2";


const Users = () => {
  
  const [users, setUsers] = useState([]);
  const date = moment();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);
  const fetchUsers = async () => {
    try {
      const token = sessionStorage.getItem("userToken");
      const response = await axios.get("http://localhost:5000/users/AllUsers", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const filteredUsers = response.data.filter(user => user.status === 'notVerified');
      setUsers(filteredUsers);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
      setLoading(false);
    }
  };



  const renderTableCell = (value) => {
    if (value instanceof Date || moment(value, moment.ISO_8601, true).isValid()) {
      return moment(value).format('YYYY-MM-DD HH:mm:ss');
    }
    return value !== undefined ? value : "________";
  };


  const usersData = users;

  const handleApproveUser = async (userId, role) => {
    const confirmation = await Swal.fire({
      title: "Êtes-vous sûr de vouloir approuver cet utilisateur ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui",
      cancelButtonText: "Annuler",
    });

    if (confirmation.isConfirmed) {
      try {
        const token = sessionStorage.getItem("userToken");
        console.log(userId)
        const response =  await axios.put(
          `http://localhost:5000/users/approveUser/${userId}?role=${role}`,
          {},
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }
        );
        fetchUsers();
        
        
      } catch (error) {

        console.error("Error validating user:", error);
        toast.error("Une erreur s'est produite lors de l'approbation de l'utilisateur.");
      }
    }
  };

    const handleRejectUser = async (userId, role) => {
      const confirmation = await Swal.fire({
        title: "Êtes-vous sûr de vouloir rejeter cet utilisateur ?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Oui",
        cancelButtonText: "Annuler",
      });
  
      if (confirmation.isConfirmed) {
  
        try {
          const token = sessionStorage.getItem("userToken");
          await axios.put(
            `http://localhost:5000/users/RejectUser/${userId}?role=${role}`,
            {},
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
            }
          );
  
          fetchUsers();
          toast.success("Approuver")
        } catch (error) {
          console.error("Error Rejecting user:", error);
        }
      }
    };
  

  return (
    <div className="bg-white-A700 flex flex-col gap-8 h-full min-h-screen items-start justify-start pb-12 pt-8 rounded-tl-[40px] w-full">
    <div className="flex flex-col items-start justify-start sm:px-5 px-8 w-full">
        <div className="border-b border-indigo-50 border-solid flex flex-col md:flex-row gap-5 items-start justify-start pb-6 w-full">
          <div className="flex flex-1 flex-col font-DmSans h-full items-start justify-start w-full">
            <PageHeader
              >
              Company
            </PageHeader>
          </div>
          <SearchInput className={'min-w-[25%]'}/>
        </div>
    </div>
    <div className="flex flex-col items-start justify-start w-full">
        <div className="flex flex-col items-start justify-start sm:px-5 px-8 w-full">
          <div className="w-full bg-white-A700 border border-gray-200 rounded-lg shadow  dark:border-gray-300">
            <div className="flex flex-row flex-wrap items-center text-gray-500 border-b border-gray-200 rounded-t-lg bg-white-A700 dark:border-gray-300 dark:text-gray-400  py-4 px-5">
                <TableTitle
                  >
                  Users
                </TableTitle>
              
            </div>
            <div className="bg-white-A700 border-b border-gray-200 flex flex-col md:gap-5 flex-1 items-start justify-start w-full overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                <tr className="font-DmSans text-sm leading-6">
                <th className="p-3 text-center text-blue_gray-800_01 font-medium ">Display Name</th>
                    <th className="p-3 text-center text-blue_gray-800_01 font-medium ">Google ID</th>
                    <th className="p-3 text-center text-blue_gray-800_01 font-medium ">LinkedIn ID</th>
                    <th className="p-3 text-center text-blue_gray-800_01 font-medium ">Email</th>
                    <th className="p-3 text-center text-blue_gray-800_01 font-medium ">Role</th>
                    <th className="p-3 text-center text-blue_gray-800_01 font-medium ">Date Created</th>
                    <th className="p-3 text-center text-blue_gray-800_01 font-medium ">Last Login</th>
                    <th className="p-3 text-center text-blue_gray-800_01 font-medium ">Status</th>
                  <th className="p-3 w-auto"></th>
                </tr>
                </thead>
                <tbody className="font-DmSans text-sm font-normal leading-6">
                {
                loading ? (
                     <div className="flex items-center justify-center w-full h-full">
                     <Loading />
                 </div>
                  ) : !usersData?.length>0 ? (
                    <div className="flex flex-col items-center w-full text-gray500 py-28">
                    <AiOutlineFileSearch size={30} c />
                    <Text
                      className="font-DmSans text-sm font-normal leading-6 text-gray-900_01 w-auto"
                      size=""
                    >
                      No Users Available
                    </Text>
                  </div>
                  )
                  : (usersData.map((user, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                    <td className="py-3 px-3 text-center text-gray500 font-DmSans text-sm font-normal leading-6" >
                        {renderTableCell(user.displayName)}
                    </td>
                    
                    <td className="py-3 px-3 text-gray-900_01">
                      <div className="flex flex-row space-x-3 items-center">
                        <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{renderTableCell(user.googleId)}</span>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-gray-900_01">
                      <div className="flex flex-row space-x-3 items-center">
                        <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{renderTableCell(user.linkedinId)}</span>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-gray-900_01">
                      <div className="flex flex-row space-x-3 items-center">
                        <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{renderTableCell(user.email)}</span>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-gray-900_01">
                      <div className="flex flex-row space-x-3 items-center">
                        <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{renderTableCell(user.role)}</span>
                      </div>
                    </td>
                    <td className="py-4 px-3 text-gray500" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      
                      {new Date(user.dateCreated).toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
      })}
                      </td>

                      <td className="py-3 px-3 text-gray-900_01">
                      <div className="flex flex-row space-x-3 items-center">
                        <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{renderTableCell(user.lastLogin)}</span>
                      </div>
                    </td>

                    <td className="py-3 px-3 text-gray-900_01">
                      <div className="flex flex-row space-x-3 items-center">
                        <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {renderTableCell(user.status)}</span>
                      </div>
                    </td>

                    <td className="py-3 px-3 ">
                      <div className="flex flex-row space-x-3 px-3 items-center">
                        <HiCheck size={17}  onClick={() => handleApproveUser(user._id, user.role)}  className="text-blue_gray-301" />
                        <HiBan size={17} onClick={() => handleRejectUser(user._id, user.role)} className="text-blue_gray-301"/>
                        
                      </div>
                    </td>
                  </tr>
                ))
                  )}
                </tbody>
                
              </table>
             
            </div>
            
          </div>
        </div>
    </div>
    
      
</div>
  );
};

export default Users;