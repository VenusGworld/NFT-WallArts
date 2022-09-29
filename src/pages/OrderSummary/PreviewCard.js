import React from "react";
import { useNavigate } from "react-router-dom";

const PreviewCard = ({ info }) => {
  const { img, title, frameSize, quantity, colour } = info;

  return (<div className="flex lg:space-x-5 flex-col lg:flex-row w-full">
    {/* <div className=" w-32 h-32 bg-white rounded-2xl flex justify-center items-center"> */}
      <img src={process.env.PUBLIC_URL + "/img/" +img} alt="" className="w-32 h-32 flex justify-center items-center rounded-2xl"/>
    {/* </div> */}
    <div className="flex flex-col lg:w-[70%] w-full">
      <span className=" my-1 text-xl text-start">{title}</span>
      <div className="flex justify-between my-3">
        <div className="flex flex-col items-start">
          <span className="text-sm text-[#BFC8DD]">Frame Size</span>
          <span>{frameSize}</span>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-sm text-[#BFC8DD]">Quantity</span>
          <span>{quantity}</span>
        </div>
      </div>
      <div className="flex space-x-3 items-center">
          <span className="text-sm text-[#BFC8DD]">Colour</span>
          <div className={`relative bg-${colour} p-3 rounded-full border`}>
          </div>
        </div>
    </div>
  </div>);
};

export default PreviewCard;
