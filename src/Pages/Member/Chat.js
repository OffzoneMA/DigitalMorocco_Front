import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const Chat = ({ conversationId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const socket = io('http://localhost:5000'); // Replace with your actual server URL

  useEffect(() => {
    // Connect to the chat room using the conversationId
    socket.emit('join', conversationId);

    // Listen for incoming messages
    socket.on('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Clean up the socket connection when the component unmounts
    return () => {
      socket.emit('leave', conversationId);
      socket.disconnect();
    };
  }, [conversationId, socket]);

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      const message = { text: newMessage, sender: 'member' }; // You can set the sender as needed
      socket.emit('message', conversationId, message);
      setMessages([...messages, message]);
      setNewMessage('');
    }
  };

  return (
    <div>
      <h2>Chat with Investor</h2>
      <div className="chat-box">
        <div className="messages">
          {messages.map((message, index) => (
            <div key={index} className={`message ${message.sender}`}>
              {message.text}
            </div>
          ))}
        </div>
        <input
          type="text"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
