import React from "react";

const PageHeader = ({ children }) => {
  return (
    <h3 className="font-dm-sans-bold text-[20px] sm:text-[22px] md:text-[24px] lg:text-[28px] xl:text-[32px] leading-[1.4] sm:leading-[1.5] md:leading-[1.6] lg:leading-[1.375] text-left text-[#101828]]">
      {children}
    </h3>
  );
};

export default PageHeader;
