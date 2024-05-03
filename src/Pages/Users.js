import React, { useEffect, useState } from "react";
import axios from "axios";
import { Text } from "../Components/Text";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("userToken");
        const response = await axios.get("http://localhost:5000/users/AllUsers", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // Filtrer les utilisateurs dont le statut est "notVerified"
        const filteredUsers = response.data.filter(user => user.status === 'notVerified');
        setUsers(filteredUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

   

  const renderTableCell = (value) => {
    return value !== undefined ? value : "________";
  };

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
        const token = localStorage.getItem("userToken");
        await axios.put(
            `http://localhost:5000/users/approveUser/${userId}?role=${role}`,
            {},
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        window.location.reload();
    } catch (error) {
        
        console.error("Error validating user:", error);
        toast.error("Une erreur s'est produite lors de l'approbation de l'utilisateur.");
    }}
  };

  

  const handleRejectUser = async (userId,role) => {
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
      const token = localStorage.getItem("userToken");
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

      const updatedUsers = users.map((user) => {
        if (user.userId === userId) {
          return { ...user, status: "Rejected" };
        }
        return user;
      });
      setUsers(updatedUsers);
      toast.success("Approuver")
    } catch (error) {
      console.error("Error Rejecting user:", error);
    }}
  };

  return (
    <div className="bg-white-A700 flex flex-col gap-8 h-full min-h-screen items-start justify-start pb-8 pt-8 rounded-tl-[40px]  w-full">
        <div className="flex items-start justify-start sm:px-5 px-8 w-full">
          <div className="border-b border-indigo-50 border-solid flex flex-row gap-5 items-start justify-start pb-6 w-full">
            <div className="flex flex-1 font-DmSans h-full items-start justify-start w-auto">
              <Text
                className="text-3xl font-bold leading-11 text-gray-900 w-full"
                size="txtDMSansBold32"
              >
                User List
              </Text>
      </div>
      <div className="flex md:w-[25%] w-full rounded-md p-2 border border-solid">
            <img
              className="cursor-pointer h-[18px] mr-1.5 my-px"
              src="images/img_search_blue_gray_700_01.svg"
              alt="search"
            />
            <input
              className={`!placeholder:text-blue_gray-300 !text-blue_gray-300 font-manrope p-0 text-left text-sm tracking-[0.14px] w-full bg-transparent border-0`}
              type="text"
              name="search"
              placeholder="Search..."
            />
          </div>
    </div>
  </div>

  <div className="flex flex-col items-start justify-start w-full">
        <div className="flex flex-col items-start justify-start sm:px-5 px-8 w-full">
          <div className="w-full bg-white-A700 border border-gray-200 rounded-lg shadow dark:bg-gray-800">
           
          <div className="bg-white-A700 border-b border-gray-200 flex flex-col md:gap-5 flex-1 items-start justify-start w-full overflow-x-auto">
          
          <table className="w-full mx-auto table-auto">
              <thead>
              <tr className="text-sm leading-6" >
              <th className="p-3 text-center text-blue_gray-800_01 font-medium w-[10%]">Display Name</th>
                <th className="p-3 text-center text-blue_gray-800_01 font-medium w-[10%]">Google ID</th>
                <th className="p-3 text-center text-blue_gray-800_01 font-medium w-[15%]">LinkedIn ID</th>
                <th className="p-3 text-center text-blue_gray-800_01 font-medium w-[15%]">Email</th>
                <th className="p-3 text-center text-blue_gray-800_01 font-medium w-[10%]">Role</th>
                <th className="p-3 text-center text-blue_gray-800_01 font-medium w-[15%]">Date Created</th>
                <th className="p-3 text-center text-blue_gray-800_01 font-medium w-[15%]">Last Login</th>
                <th className="p-3 text-center text-blue_gray-800_01 font-medium w-[10%]">Status</th>
                <th className="p-3 text-center text-blue_gray-800_01 font-medium w-[10%]">Action</th> </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-50' : ''} hover:bg-blue-50 w-full`}>
                    <td className="py-3 px-3 text-gray-600 font-DmSans text-sm font-normal leading-6">{renderTableCell(user.displayName)}</td>
                    <td className="py-3 px-3 text-gray-600 font-DmSans text-sm font-normal leading-6">{renderTableCell(user.googleId)}</td>
                    <td className="py-3 px-3 text-gray-600 font-DmSans text-sm font-normal leading-6">{renderTableCell(user.linkedinId)}</td>
                    <td className="py-3 px-3 text-gray-600 font-DmSans text-sm font-normal leading-6">{renderTableCell(user.email)}</td>
                    <td className="py-3 px-3 text-gray-600 font-DmSans text-sm font-normal leading-6">{renderTableCell(user.role)}</td>
                    <td className="py-3 px-3 text-gray-600 font-DmSans text-sm font-normal leading-6">{renderTableCell(user.dateCreated)}</td>
                    <td className="py-3 px-3 text-gray-600 font-DmSans text-sm font-normal leading-6">{renderTableCell(user.lastLogin)}</td>
                    <td className="py-3 px-3 text-gray-600 font-DmSans text-sm font-normal leading-6">{renderTableCell(user.status)}</td>
                    <td className="py-3 px-3 text-gray-600 font-DmSans text-sm font-normal leading-6">
                      {user.status === "notVerified" && (
                        <>
                          <button className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded mr-2" onClick={() => handleApproveUser(user._id, user.role)}>Approuver</button>
                          <button className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded" onClick={() => handleRejectUser(user._id, user.role)}>Rejeter</button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
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
