import React from 'react';

const Input = ({ size = '15px', fontFamily = '', padding = '11px 20px', borderRadius = '50px', borderColor = 'borderColor', focusColor = 'focusColor', placeholderColor = 'rgb(21 20 57 / 40%)', ...props }) => {
  return (
    <input
      {...props}
      className={`bg-white w-full border-2 border-solid border-${borderColor} px-5 py-3 focus:border-${focusColor} focus:ring-1 focus:ring-${focusColor} placeholder-${placeholderColor} ${fontFamily} text-[${size}]`}
      style={{ padding, borderRadius }}
    />
  );
};

export default Input;
