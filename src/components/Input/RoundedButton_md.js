import React from 'react';

const RoundedButtonMD = ({active, text, onButtonClick, icon, fullWidth}) => {
  return (
    <div className={`hover:bg-opacity-70 transition-all ${fullWidth?" w-full ":" "} cursor-pointer inline-block ${active?' bg-[#D3B789] text-[#313949]':'bg-[#444E66] text-white border border-[#95a9d1]'} rounded-full px-7 py-2`}
      onClick={onButtonClick}
    >
      {text}
      {icon}
    </div>
  )
}

export default RoundedButtonMD