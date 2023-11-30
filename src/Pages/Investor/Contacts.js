// Contacts (Investor).js
import { useGetAllConatctsQuery } from "../../Services/Investor.Service";
import { useCreateChatRoomMutation } from "../../Services/Message.Service";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import io from "socket.io-client";
import { useSelector } from "react-redux";
import Chat from "../../Components/Chat";

export default function Contacts() {
  const { userInfo } = useSelector((state) => state.auth);
  const { data, isFetching } = useGetAllConatctsQuery();
  const [room, setRoom] = useState(null);
  const [socket, setSocket] = useState(null);
  const [addChatRoom] = useCreateChatRoomMutation();



  const handleContact = async (memberID, investorID) => {
    const socket = io.connect(process.env.REACT_APP_baseURL);

    try {

      const response = await addChatRoom([memberID, investorID]);
      const roomId = response.data.roomId;
      socket.emit("join_room",roomId);

      setRoom(roomId);
      setSocket(socket);

      console.log("Joined room:", roomId);

    } catch (error) {
      console.error("Failed to create chat room:", error);
      toast.error("Failed to create chat room. Please try again.");
    }
  };

  return (
    <div className="pt-10">
      {room && userInfo?.investor && (
        <div className="z-[99999] min-h-screen w-screen flex flex-col items-center gap-1 justify-center fixed top-0 left-0 bg-black/25 backdrop-blur-xl">
          <button
            className="bg-white text-black px-3 py-1 rounded-full  "
            onClick={() => setRoom(null)}
          >
            Exit
          </button>
          <Chat id={userInfo?.investor?._id} roomId={room} socket={socket} />
        </div>
      )}
      <div className="px-10">
        <h1 className="text-center text-5xl">Your Contacts</h1>

        {isFetching && "Loading Data"}
        {data?.length == 0 && "Nothing Found !"}

        {!isFetching && data?.length > 0 && (
          <div className="space-y-4 flex flex-col items-center gap-6 py-8">
            {data?.map((el, i) => (
              <div
                key={i}
                className="w-[850px] 2xl:-[950px]  flex flex-col gap-3  ring-2 ring-gray-300 shadow-xl rounded-3xl py-4"
              >
                <div className="flex items-center justify-around py-2 ">
                  <img
                    src={el?.logo}
                    className="self-center w-52 h-36 object-center object-contain "
                    alt=""
                  />

                  <div className="space-y-2">
                    <div>
                      <span>Company Name : </span>
                      <span className="italic  ">
                        <span className="italic text-gray-800">
                          {el?.companyName}
                        </span>
                      </span>
                    </div>
                    <div>
                      <span>Website : </span>
                      <a
                        className="italic underline text-blue-500 cursor-pointer"
                        target="_blank"
                        href={el?.website}
                      >
                        Visit
                      </a>
                    </div>
                    <div>
                      <span>Contact Email : </span>
                      <a
                        className="italic underline "
                        target="_blank"
                        href={"mailto:" + el?.contactEmail}
                      >
                        {el?.contactEmail}
                      </a>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div>
                      Country :{" "}
                      <span className={`italic text-gray-500`}>{el?.country}</span>
                    </div>
                    <div>
                      City : <span className={`italic text-gray-500`}>{el?.city}</span>
                    </div>
                    <div>
                      Company Type :{" "}
                      <span className={`italic text-gray-500`}>{el?.companyType}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() =>
                    userInfo?.investor &&
                    handleContact(el?._id, userInfo?.investor?._id)
                  }
                  className="self-center transition-all duration-500 ease-in-out w-fit hover:opacity-30 p-2 bg-blue-500 text-white rounded-full"
                >
                  Contact Now
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
