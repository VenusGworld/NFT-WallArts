import React from "react";

const RectButton = ({ text, onButtonClick, icon }) => {
  return (
    <div
      className={`rounded-lg cursor-pointer text-xs hover:bg-[#f5cf92] transition-all bg-[#D3B789] py-4 px-6 font-semibold shadow-lg`}
      onClick={onButtonClick}
    >
      {text}
      {icon}
    </div>
  );
};

export default RectButton;
