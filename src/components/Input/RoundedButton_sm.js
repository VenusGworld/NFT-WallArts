import React from 'react';

const RoundedButtonSM = ({active, text, onButtonClick, icon}) => {
  return (
    <div className={`hover:bg-opacity-70 transition-all cursor-pointer inline-block ${active?' bg-[#D3B789] text-[#313949]':'bg-[#444E66] text-white border border-[#3d4f73]'} rounded-full p-2 w-10 h-10`}
      onClick={onButtonClick}
    >
      {text}
      {icon}
    </div>
  )
}

export default RoundedButtonSM