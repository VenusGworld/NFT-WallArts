import React from "react";
import CategoryItem from "../../components/CategoryItem";

const PreviewCard = ({ info }) => {
  const {
    image_for_printing,
    name_for_printing,
    item_info,
    quantity,
    total_price_eth,
  } = info;
  // console.log('infor', info);
  return (
    <div className="flex sm:space-x-5 flex-col sm:flex-row w-full">
      <div className="rounded-2xl flex justify-center items-center w-28">
        <img
          src={image_for_printing}
          alt=""
          className="w-full box-border flex justify-center items-center rounded-2xl"
        />
      </div>
      <div className="flex flex-col w-[60%]">
        <div className="flex items-center">
          <span className="flex text-xl text-start">{name_for_printing}</span>
          <CategoryItem id={item_info?.category_id} />
        </div>
        <div className="flex justify-between w-full">
          <div className="flex flex-col items-start">
            <span className="text-sm text-[#BFC8DD]">Frame Size</span>
            <span>
              {item_info?.width}X{item_info?.height}cm
            </span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-sm text-[#BFC8DD]">Quantity</span>
            <span>{quantity}</span>
          </div>
        </div>
        <div className="flex space-x-3 items-center">
          <span className="text-sm text-[#BFC8DD]">Colour</span>
          {item_info?.color.map((colour, i) => (
            <div
              className={`relative bg-${colour} p-3 rounded-full border`}
              key={i}
            ></div>
          ))}
        </div>
        <div className="flex space-x-3 items-center">
          <span className="text-sm text-[#BFC8DD]">Price</span>
          <span>{Number(total_price_eth).toFixed(3)} ETH</span>
        </div>
      </div>
    </div>
  );
};

export default PreviewCard;
