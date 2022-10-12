import React from "react";

const RoundedButtonBG = ({ active, text, onButtonClick, icon }) => {
  return (
    <div
      className={`hover:bg-opacity-70 transition-all cursor-pointer inline-block h-full ${
        active
          ? " bg-[#D3B789] text-[#313949]"
          : "bg-[#444E66] text-white border border-[#95a9d1]"
      } rounded-full px-7 py-4 w-full`}
      onClick={onButtonClick}
    >
      {text}
      {icon}
    </div>
  );
};

export default RoundedButtonBG;
