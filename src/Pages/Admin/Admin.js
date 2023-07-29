import { useEffect, useState } from "react";
import { adminApi } from "../../Services/Admin.Service";
const Admin = () => {
  /*-----------------------------*/
  const [open, setOpen] = useState(false);
  const Menus = [
    { title: "Dashboard", src: "dashboard" },
    { title: "Inscription", src: "add-user" },
    { title: "Accounts", src: "User", gap: true },
    { title: "Demandes ", src: "help" },
    { title: "Documents", src: "document" },
    { title: "Notifications", src: "notification" },
    { title: "Historique ", src: "history", gap: true },
    { title: "Setting", src: "Settings" },
  ];
  const tableData = [];
  /*-----------------------------*/
  const [reqType, setreqType] = useState("member");


  const [trigger, { data, isFetching, status }, lastPromiseInfo] = adminApi.endpoints.getAllRequests.useLazyQuery()



  useEffect(() => {
    trigger({
      start: 0,
      qt: 8,
      type: reqType
    })
  }, [reqType])

  return (
    <div className="flex">
      <div
        className={` ${open ? "w-72" : "w-20 "
          } bg-dark-purple h-screen p-5 pt-8 relative duration-300 rounded-md -mt-4 `}
      >
        <img
          src="../img/control.png" alt=""
          className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
           border-2 rounded-full  ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
        />
        <div className="flex gap-x-4 items-center">

          <img
            src="../img/admin.png" alt=""
            className={`cursor-pointer duration-500 ${open && "rotate-[360deg]"
              }`}
          />
          <h1
            className={`text-white origin-left font-medium text-xl duration-200 ${!open && "scale-0"
              }`}
          >
            Admin
          </h1>
        </div>
        <ul className="pt-6">
          {Menus.map((Menu, index) => (
            <li
              key={index}
              className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
              ${Menu.gap ? "mt-9" : "mt-2"} ${index === 0 && "bg-light-white"
                } `}
            >
              <img src={`../img/${Menu.src}.png`} alt="" />
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                {Menu.title}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="h-screen flex-1 p-7 ">
        <div className=" w-full flex items-center justify-center text-white gap-3 py-5">
          <button
            disabled={reqType == "member"}
            onClick={() => { setreqType('member')  }}
            className={`bg-blue-600 px-8 py-3  rounded-lg ${reqType == "member" && 'bg-blue-600/25 cursor-not-allowed'}`}>Members</button>
          <button 
            disabled={reqType == "partner"}
          onClick={() => { setreqType('partner') }}
            className={`bg-blue-600 px-8 py-3  rounded-lg ${reqType == "partner" && 'bg-blue-600/25 cursor-not-allowed'}`}>Partners</button>
          <button 
            disabled={reqType == "investor"}
          onClick={() => { setreqType('investor') }}
            className={`bg-blue-600 px-8 py-3  rounded-lg ${reqType == "investor" && 'bg-blue-600/25 cursor-not-allowed'}`}>Investors</button>

        </div>
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-4  text-gray-700 text-center   font-semibold">
                  Email
                </th>
                <th className="px-6 py-4  text-gray-700 text-center   font-semibold">
                  Role
                </th>
                <th className="px-6 py-4  text-gray-700 text-center   font-semibold">
                  Date
                </th>
                <th className="px-6 py-4  text-gray-700 text-center   font-semibold">
                  Verification
                </th>
                <th className="px-6 py-4  text-gray-700 text-center   font-semibold">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {
                !isFetching && data &&
                data.map((el,i)=>(
                  <tr key={i} className="border-b border-gray-200">
                    <td className="px-6 py-4 text-gray-700 text-center">{el?.user.email}</td>
                    <td className="px-6 py-4 text-gray-700 text-center">{reqType}</td>
                    <td className="px-6 py-4 text-gray-700 text-center">{new Date(el?.dateCreated).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: 'numeric',
                      minute: 'numeric',
                      second: 'numeric',
                    })}</td>
                    <td className="px-6 py-4 text-gray-700 text-center">
                      {reqType === "member" && <a target="_blank" href={el?.rc_ice}>Document Link</a> }
                      {reqType === "partner" && <span>{el?.num_rc}</span> }
                      {reqType === "member" && <a target="_blank"  href={el?.linkedin_link}>{el?.linkedin_link}</a> }

                      </td>
                    <td className="px-6 py-4 text-gray-700 text-center space-x-5">
                      <button>Approve</button>
                      <button>Reject</button>
                      </td>
                  </tr>
                ))
              }
                
            </tbody>
          </table>
         { isFetching && <div className="text-center text-xl p-8">Loading...</div>}
          {data && data.length==0 && <div className="text-center text-xl p-8">No Requests Found</div>}

        </div>
      </div>
    </div>
  );
};
export default Admin;
