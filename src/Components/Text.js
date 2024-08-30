import React from "react";

const sizeClasses = {
  txtDmSansMedium16Bluegray500: "font-dm-sans-medium",
  txtDmSansBold14: "font-dm-sans-bold",
  txtDMSansCardHeader: "font-dm-sans-medium text-18 leading-7",
  txtDMSansCardHeader16:"font-dm-sans-medium text-base leading-7",
  txtDMSansLablel:"font-dm-sans-regular leading-6",
  txtDMDashHeader:"font-dm-sans-bold text-32leading-10",
  txtDmSansRegular13Gray700: "font-dm-sans-regular",
  txtDmSansBold16: "font-dm-sans-bold",
  txtDMSansH5500:"font-dm-sans-medium text-lg leading-8",
  txtDMSansH6500:"font-dm-sans-medium text-base leading-7",
  txtDmSansBold32: "font-dm-sans-bold",
  txtDmSansBold12: "font-dm-sans-bold",
  txtDmSansRegular14Gray90001: "font-dm-sans-regular",
  txtDmSansMedium16Gray500: "font-dm-sans-medium",
  txtInterSemiBold200: "font-inter font-semibold",
  txtDmSansMedium22Black900: "font-dm-sans-medium",
  txtAvenirNextLTProRegular13Gray700: "font-avenirnextltpro font-normal",
  txtMontserratRomanRegular12: "font-montserrat font-normal",
  txtAvenirNextLTProRegular13: "font-avenirnextltpro font-normal",
  txtDmSansMedium16: "font-dm-sans-medium",
  txtDmSansMedium15: "font-dm-sans-medium",
  txtDmSansMedium14: "font-dm-sans-medium",
  txtManropeMedium14: "font-manrope font-medium",
  txtDmSansMedium22: "font-dm-sans-medium",
  txtManropeSemiBold14: "font-manrope font-semibold",
  txtDmSansRegular12: "font-dm-sans-regular",
  txtDmSansRegular14: "font-dm-sans-regular",
  txtDmSansMedium22Gray90001: "font-dm-sans-medium",
  txtDmSansRegular13: "font-dm-sans-regular",
  txtDmSansRegular16: "font-dm-sans-regular",
  txtDmSansMedium16WhiteA700: "font-dm-sans-medium",
  txtDmSansMedium18: "font-dm-sans-medium",
  txtDMSansDocuments:"font-dm-sans-regular text-base leading-6"
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
