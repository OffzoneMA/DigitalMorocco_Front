// Contacts (Member).js
import React, { useEffect, useState } from "react";
import { useGetAllConatctsQuery } from "../../Services/Member.Service";
import { useCreateChatRoomMutation } from "../../Services/Message.Service";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import Chat from "../../Components/Chat";
import io from "socket.io-client";

export default function Contacts() {
  const { userInfo } = useSelector((state) => state.auth);

  const { data, isFetching } = useGetAllConatctsQuery();
  const [addChatRoom] = useCreateChatRoomMutation();
  const [room, setRoom] = useState(null);
  const [socket, setSocket] = useState(null);

 

  const handleContact = async (memberID, investorID) => {
    const socket = io.connect(process.env.REACT_APP_baseURL);

    try {

      const response = await addChatRoom([memberID, investorID]);
      const roomId = response.data.roomId;
      socket.emit("join_room", roomId);

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
      {room && userInfo?.member && (
        <div className="z-[99999] min-h-screen w-screen flex flex-col items-center gap-1 justify-center fixed top-0 left-0 bg-black/25 backdrop-blur-xl">
          <button
            className="bg-white text-black px-3 py-1 rounded-full  "
            onClick={() => setRoom(null)}
          >
            Exit
          </button>
          <Chat id={userInfo?.member?._id} roomId={room} socket={socket} />
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
                className=" sm:w-[90%] p-10 lg:w-full 2xl:-[950px]  flex flex-col gap-3  ring-2 ring-gray-300 shadow-xl rounded-3xl py-4"
              >
                <div className="flex items-center justify-around py-2 ">
                  <div className="space-y-2">
                    <div>
                      <span>Name : </span>
                      <span className="italic  ">
                        <span className="italic text-gray-800">
                          {el?.name ? el?.name : "No Name Specified!"}
                        </span>
                      </span>
                    </div>
                    <div>
                      <span>linkedIn Link : </span>
                      <a
                        className="italic underline "
                        target="_blank"
                        href={el?.linkedin_link}
                      >
                        Link
                      </a>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() =>
                    userInfo?.member &&
                    handleContact(userInfo?.member?._id, el?._id)
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
