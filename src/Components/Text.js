import React from "react";

const sizeClasses = {
  txtDmSansMedium16Bluegray500: "font-DmSans font-medium",
  txtDmSansBold14: "font-bold font-DmSans",
  txtDMSansCardHeader: "font-dmsans text-18 font-medium leading-7",
  txtDMSansCardHeader16:"font-dmsans text-base font-medium leading-7",
  txtDMSansLablel:"font-DmSans font-normal leading-6",
  txtDMDashHeader:"font-dmsans text-32 font-bold leading-10",
  txtDmSansRegular13Gray700: "font-DmSans font-normal",
  txtDmSansBold16: "font-bold font-DmSans",
  txtDMSansH5500:"font-dmsans text-lg font-medium leading-8",
  txtDMSansH6500:"font-dmsans text-base font-medium leading-7",
  txtDmSansBold32: "font-bold font-DmSans",
  txtDmSansBold12: "font-bold font-DmSans",
  txtDmSansRegular14Gray90001: "font-DmSans font-normal",
  txtDmSansMedium16Gray500: "font-DmSans font-medium",
  txtInterSemiBold200: "font-inter font-semibold",
  txtDmSansMedium22Black900: "font-DmSans font-medium",
  txtAvenirNextLTProRegular13Gray700: "font-avenirnextltpro font-normal",
  txtMontserratRomanRegular12: "font-montserrat font-normal",
  txtAvenirNextLTProRegular13: "font-avenirnextltpro font-normal",
  txtDmSansMedium16: "font-DmSans font-medium",
  txtDmSansMedium15: "font-DmSans font-medium",
  txtDmSansMedium14: "font-DmSans font-medium",
  txtManropeMedium14: "font-manrope font-medium",
  txtDmSansMedium22: "font-DmSans font-medium",
  txtManropeSemiBold14: "font-manrope font-semibold",
  txtDmSansRegular12: "font-DmSans font-normal",
  txtDmSansRegular14: "font-DmSans font-normal",
  txtDmSansMedium22Gray90001: "font-DmSans font-medium",
  txtDmSansRegular13: "font-DmSans font-normal",
  txtDmSansRegular16: "font-DmSans font-normal",
  txtDmSansMedium16WhiteA700: "font-DmSans font-medium",
  txtDmSansMedium18: "font-DmSans font-medium",
  txtDMSansDocuments:"font-dmsans text-base font-normal leading-6"
};

const Text = ({ children, className = "", size, as, ...restProps }) => {

  return (
    <label
      className={`block ${className} ${size && sizeClasses[size]}`}
      {...restProps}
    >
      {children}
    </label>
  );
};

export { Text };
