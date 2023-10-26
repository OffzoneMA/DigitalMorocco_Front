import React, { useEffect, useState } from 'react';
import { useGetAllConatctsQuery, useCreateChatRoomWithInvestorMutation } from "../../Services/Member.Service";
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function Contacts() {
  const { data: contacts, isFetching } = useGetAllConatctsQuery(); // Change the query name to match your implementation
  const navigate = useNavigate();
  const [createChatRoomWithInvestor] = useCreateChatRoomWithInvestorMutation();

  const handleContactNowClick = async (investorId) => {
    console.log('Investor ID:', investorId); // Add this line

    try {
      
      // Make an API request to create a chat room with the selected investor
      const response = await createChatRoomWithInvestor(investorId);
      console.log('Response:', response);
      if (response.error) {
        console.error('Error creating chat room:', response.error.message);
      } else if (response.data && response.data.conversationId) {
        const conversationId = response.data.conversationId;
        navigate(`/Dashboard_member#Messages/${conversationId}`);
      }
    } catch (error) {
      console.error('Failed to create a chat room:', error);
      toast.error('Failed to create or access the chat.');
    }
  };

  return (
    <div className='pt-10'>
      <div className='px-10'>
        <h1 className='text-center text-5xl'>Your Contacts</h1>

        {isFetching && "Loading Data"}
        {contacts?.length === 0 && "Nothing Found!"}

        {!isFetching && contacts?.length > 0 && (
          <div className='space-y-4 flex flex-col items-center gap-6 py-8'>
            {contacts?.map((contact, i) => (
              <div key={i} className='w-[850px] 2xl:-[950px]  flex flex-col gap-3  ring-2 ring-gray-300 shadow-xl rounded-3xl py-4'>
                <div className='flex items-center justify-around py-2 '>
                  <div className='space-y-2'>
                    <div>
                      <span>Name : </span>
                      <span className='italic text-gray-800'>
                        {contact?.name ? contact?.name : "No Name Specified!"}
                      </span>
                    </div>
                    <div>
                      <span>LinkedIn Link : </span>
                      <a
                        className='italic underline '
                        target='_blank'
                        href={contact?.linkedin_link}
                      >
                        Link
                      </a>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleContactNowClick(contact._id)}
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
