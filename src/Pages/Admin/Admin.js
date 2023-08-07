import { useEffect, useState } from "react";
import { adminApi } from "../../Services/Admin.Service";
import Request from "./Request";
import SideMenu from "./SideMenu";
import { Toaster } from "react-hot-toast";
const Admin = () => {
  const [reqType, setreqType] = useState("member");
  const [start, setStart] = useState(0);
  const [qt, setQt] = useState(8);
  const [reqs, setreqs] = useState([]);
  const [trigger, { data, isFetching, status }, lastPromiseInfo] = adminApi.endpoints.getAllRequests.useLazyQuery()

  useEffect(() => {
    setStart(0)
    setreqs([])
    trigger({
      start: 0,
      qt,
      type: reqType
    })
  }, [reqType])

  useEffect(() => {
    if(data?.length >0){
    setreqs((prevReqs) => [...prevReqs, ...data]);
      setStart(data?.length+reqs?.length)
    }
  }, [data])


  return (
    <div className="flex">
      <Toaster  />
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
               reqs.length >0 &&
                reqs.map((el, i) =>  (
                  <Request reqType={reqType} el={el}  key={i} />
                ))
                   }
                
            </tbody>
          </table>
         { isFetching && <div className="text-center text-xl p-8">Loading...</div>}
          {reqs && reqs.length==0 && <div className="text-center text-xl p-8">No Requests Found</div>}

        </div>
        <div className="flex justify-center p-8">
          <button
          disabled={isFetching || data?.length==0 ||  reqs.length<qt}
          onClick={()=>{
              trigger({
                start,
                qt,
                type: reqType
              })
          }}
          className="bg-green-800 px-4 py-2 rounded-3xl text-white disabled:cursor-not-allowed disabled:bg-green-800/10"> 
            {isFetching ? 'Loading ...' : "Get More"} 
        </button>
        </div>
      </div>
    </div>
  );
};
export default Admin;
