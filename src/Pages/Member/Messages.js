import React, { useEffect, useState } from 'react';
import { useGetMemberConversationsQuery } from '../../Services/Member.Service'; // Import your API file
import { NavLink, useNavigate } from 'react-router-dom';


function Messages() {
  // Use React Query to fetch member's conversations
  const { data: conversations, isLoading } = useGetMemberConversationsQuery();
  const navigate=useNavigate()

  // Use state to manage the selected conversation
  const [selectedConversation, setSelectedConversation] = useState(null);

  // Handle conversation selection
  const handleConversationClick = (conversationId) => {
    // Navigate to the chat component with the conversation ID
    navigate(`/Dashboard_member#Messages/${conversationId}`);
  };

  // Render the component
  return (
    <div className="messages-container">
      <div className="conversation-list">
      <h1 className='text-center text-5xl'>Your Conversations</h1>  
        {isLoading ? (
          <p>Loading conversations...</p>
        ) : (
          <ul>
            {conversations && conversations.length > 0 ? (
              conversations.map((conversation) => (
                <li
                  key={conversation.id}
                  onClick={() => handleConversationClick(conversation)}
                >
                  {conversation.name}
                </li>
              ))
            ) : (
              <p>No conversations found.</p>
            )}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Messages;
