import React from "react";
import { useTranslation } from "react-i18next";

const StatusBadge = ({ status }) => {
    const {t} = useTranslation();
    // Configuration des badges
    const statusConfig = {
      Active: {
        bgColor: 'bg-green-100',
        textColor: 'text-green-700',
        icon: <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="4" cy="4" r="3" fill="#12B76A"/>
            </svg>,
      },
      'In Progress': {
        bgColor: 'bg-light_blue-100',
        textColor: 'text-blue-501',
        icon: <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="4" cy="4" r="3" fill="#2575F0"/>
        </svg>,
      },
      'Stand by': {
        bgColor: 'bg-gray-201',
        textColor: 'text-blue_gray-700',
        icon: <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="4" cy="4" r="3" fill="#667085"/>
        </svg>
        ,
      },
      // Autre statut par défaut
      Default: {
        bgColor: 'bg-gray-100',
        textColor: 'text-gray-700',
        icon: <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="4" cy="4" r="3" fill="#667085"/>
        </svg>
        ,
      },
    };
  
    const { bgColor, textColor, icon } = statusConfig[status] || statusConfig.Default;
  
    return (
      <div
        className={`inline-flex items-center justify-center h-[22px] px-[8px] font-inter gap-[6px] text-xs font-medium leading-[18px] rounded-full ${bgColor} ${textColor}`}
        style={{ whiteSpace: 'nowrap' }}
      >
        <span className="">{icon}</span>
        {t(status)}
      </div>
    );
};

export default StatusBadge;
  