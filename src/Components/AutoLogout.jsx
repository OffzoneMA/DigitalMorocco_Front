import React, { useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../Redux/auth/authSlice';
import { useDispatch } from 'react-redux';

const AutoLogout = ({ children }) => {
  const timeoutIdRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logoutTimeout = 6 * 60 * 60 * 1000; // 360 minutes

  const handleLogout = useCallback(() => {
    dispatch(logout());
    navigate('/SignIn'); // Redirect to SignIn page
  }, [dispatch, navigate]);

  const resetTimeout = useCallback(() => {
    if (timeoutIdRef.current) clearTimeout(timeoutIdRef.current);
    timeoutIdRef.current = setTimeout(handleLogout, logoutTimeout);
  }, [handleLogout, logoutTimeout]);

  useEffect(() => {
    const events = ['mousemove', 'keydown', 'mousedown', 'touchstart'];

    const resetEvents = () => resetTimeout();

    events.forEach(event => window.addEventListener(event, resetEvents));

    resetTimeout(); // Start the initial timeout

    return () => {
      events.forEach(event => window.removeEventListener(event, resetEvents));
      if (timeoutIdRef.current) clearTimeout(timeoutIdRef.current);
    };
  }, [resetTimeout]);

  return <>{children}</>;
};

export default AutoLogout;
