import React from "react";

const RoundedButtonMD = ({ active, text, onButtonClick, icon, fullWidth, className }) => {
  return (
    <div
      className={`hover:bg-opacity-70 transition-all ${
        fullWidth ? " w-full " : " "
      } cursor-pointer inline-block ${
        active
          ? " bg-[#D3B789] text-[#313949]"
          : "bg-[#444E66] text-white border border-[#95a9d1]"
      } rounded-full md:px-7 md:py-2 px-3 py-1 sm:text-base text-sm ${className?className:""}`}
      onClick={onButtonClick}
    >
      <span>{text}
      {icon}</span>
    </div>
  );
};

export default RoundedButtonMD;
