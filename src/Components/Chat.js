import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import {
    useSendMessageMutation,
    useGetMessagesQuery,
} from "../Services/Message.Service";

function Chat({ socket, id, roomId }) {
    const [currentMessage, setCurrentMessage] = useState("");
    const [addMessage] = useSendMessageMutation();
    const { data: messages, isLoading, isError, refetch } = useGetMessagesQuery(roomId);
    const [messageList, setMessageList] = useState(messages || []);
    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp);
        return `${date.getHours()}:${date.getMinutes()}`;
    };

    const sendMessage = async () => {
        if (currentMessage !== "") {
            const messageData = {
                chatRoomID: roomId,
                author: id,
                message: currentMessage,
                timestamp:new Date().toISOString(),
            };

            try {
                // Save the message to the database
                await addMessage({
                    chatRoomID: roomId,
                    author: id,
                    message: currentMessage,
                    timestamp: messageData.timestamp,
                });
                console.log("Message saved to the database");
                refetch();

                // Update the UI
                await socket.emit("send_message", messageData);

                setMessageList((list) => [...list, messageData]);
                setCurrentMessage("");

                // Emit the message to the server after saving to the database
                console.log("Socket connected:", socket.connected, "Socket ID:", socket.id);
            } catch (error) {
                console.error("Error saving message to the database:", error);
            }
        }
    };

    useEffect(() => {

            socket.on("receive_message", (data) => {
                console.log("Received message in frontend:", data);
                console.log("Executing setMessageList");
                setMessageList((list) => [...list, data]);
                
            });
       

        return () => {
            console.log("Unmounting component");

            socket.off("receive_message"); // Make sure to unsubscribe
        };
    }, [socket]);

    useEffect(() => {
        setMessageList(messages || []);
    }, [messages, roomId]);

    

    return (
        <div className="bg-white p-5 text-black min-w-[80vw]">
            <div className="py-2 flex items-center justify-center gap-3">
                <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
                <h3 className="text-xl">Live Chat</h3>
            </div>
            <ScrollToBottom className="h-[550px] overflow-y-scroll ">
                {isLoading && <div>Loading...</div>}
                {isError && <div>Error fetching messages</div>}
                {messageList.map((messageContent, i) => {
                    return (
                        <div
                            key={i}
                            className={` flex ${
                                id == messageContent.author ? "justify-end" : "justify-start"
                            } my-1 `}
                        >
                            <div className={` `}>
                                <div
                                    className={`rounded-2xl ${
                                        id == messageContent.author
                                            ? "justify-end bg-blue-400"
                                            : "justify-start bg-green-400"
                                    } px-3 py-1  text-white`}
                                >
                                    <p>{messageContent.message}</p>
                                </div>
                                <div className="italic text-xs p-2 text-gray500">
                                    <p>{formatTimestamp(messageContent.timestamp)}</p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </ScrollToBottom>
            <div className="flex">
                <input
                    className="flex-1 ring-1 rounded-lg p-2"
                    type="text"
                    value={currentMessage}
                    placeholder="Hey..."
                    onChange={(event) => {
                        setCurrentMessage(event.target.value);
                    }}
                    onKeyPress={(event) => {
                        event.key === "Enter" && sendMessage();
                    }}
                />
                <button
                    onClick={sendMessage}
                    className="text-center bg-emerald-600 text-white mx-1 px-5 rounded-lg"
                >
                    <PaperAirplaneIcon className="h-5 w-5 " />
                </button>
            </div>
        </div>
    );
}

export default Chat;

