import React from "react";

const PreviewCard = ({ info, status, onClickHandle, isSelected }) => {
  const { image_for_printing, name_for_printing, item_info, quantity } = info;
  return (
    <div className={`flex lg:space-x-5 flex-col lg:flex-row cursor-pointer w-full p-2 ${isSelected?" bg-gray-500": " "}`} onClick={onClickHandle}>
      {/* <div className=" w-32 h-32 bg-white rounded-2xl flex justify-center items-center"> */}
      <div className="rounded-2xl flex justify-center items-center w-28">
        <img
          src={image_for_printing}
          alt=""
          className="w-full box-border flex justify-center items-center rounded-2xl"
        />
      </div>
      {/* </div> */}
      <div className="flex flex-col lg:w-[70%] w-full">
        <span className=" my-1 text-xl text-start">{name_for_printing}</span>
        <div className="flex justify-between my-1">
          <div className="flex flex-col items-start">
            <span className="text-sm text-[#BFC8DD]">Frame Size</span>
            <span>{item_info?.width}X{item_info?.height}cm</span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-sm text-[#BFC8DD]">Quantity</span>
            <span>{quantity}</span>
          </div>
        </div>
        <div className="flex space-x-3 items-center">
          <span className="text-sm text-[#BFC8DD]">Order Status</span>
          {status.map((status, i) => (
            <span key={i}>{status?.name}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PreviewCard;
