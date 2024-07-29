import React, { useEffect, useState } from 'react';
import { ExclamationCircleIcon } from '@heroicons/react/24/solid'
import { useNavigate, useSearchParams } from 'react-router-dom';
import EmailExistModal from '../../Components/EmailExistModalOrConfirmation';
import Loader from '../../Components/Loader';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

export default function VerifyFailure() {
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search);
  
  useEffect(() => {
    const error = query.get('err');
    const userId = query.get('user_id');
    const email = query.get('email');

    if (email) {
        sessionStorage.setItem('email', email);
    }

    if (userId) {
        sessionStorage.setItem('user_id', userId);
    }

    // Determine the redirection based on error type
    if (error) {
      if (error.includes('expired')) {
        // Redirect to the resend verification page
        navigate(`/ResendVerification`);
      } else if (error.includes('Account already verified')) {
        // Redirect to the sign-in page
        navigate(`/SignIn?error=${'Account already verified'}`);
      } else {
        // Handle other types of errors (e.g., invalid token)
        navigate(`/SignIn?error=${encodeURIComponent(error)}`);
      }
    }
  }, [query, navigate]);
  
    return (
      <>
          <div className="flex flex-col items-center justify-center md:h-screen w-full">
            <Loader/>
        </div>
        </>
      )
    }
 
  

