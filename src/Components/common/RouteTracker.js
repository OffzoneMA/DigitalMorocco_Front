import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const RouteTracker = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    const currentPath = location.pathname;

    // Si on est sur la page des investisseurs, on ne remplace pas la page précédente
    if (currentPath !== '/Investors') {
      // Si la page actuelle est différente de la précédente, on enregistre la nouvelle page
      if (currentPath !== sessionStorage.getItem('previousPageVisited')) {
        sessionStorage.setItem('previousPageVisited', currentPath);
      }
    }
  }, [location]);

  return children;
};

export default RouteTracker;
