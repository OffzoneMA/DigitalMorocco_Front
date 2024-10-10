import React, { useEffect, useState } from 'react';
import { ExclamationCircleIcon } from '@heroicons/react/24/solid'
import { useNavigate, useSearchParams } from 'react-router-dom';
import EmailExistModal from '../../Components/EmailExistModalOrConfirmation';

export default function Failure() {
  const [searchParams] = useSearchParams();
  const [error, seterror] = useState(searchParams.get('error') ? searchParams.get('error')  :null)
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate()
  // useEffect(() => {
  //   setTimeout(()=>{
  //     closeModal();  
  //     navigate('/')
  //   },4000)
     
  // }, [])

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(()=>{
      navigate('/')
    },0)
  };

  useEffect(() => {
    if (error === "An account already exists with this email") {
      openModal();
    } else {
      const timeout = setTimeout(() => {
        navigate('/');
      }, 4000);
      return () => clearTimeout(timeout);
    }
  }, [error, navigate]);
  
    return (
      <div className='flex w-full min-h-screen overflow-y-auto items-center'>
        {(!isModalOpen && error !== "An account already exists with this email") &&
          <div className="flex flex-col items-center justify-start md:h-screen ">
            <ExclamationCircleIcon className='h-36 w-36 text-red-500' />
            <h1 className="text-xl md:text-4xl font-bold text-red-600 mb-4">
            { error ? error :'Oops, something went wrong!' }</h1>
          </div>
        }
          <EmailExistModal isOpen={isModalOpen}
                      onRequestClose={closeModal}
                      />
        </div>
      )
    }
 
  

