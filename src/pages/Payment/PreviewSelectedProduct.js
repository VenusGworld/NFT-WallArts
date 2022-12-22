import React from "react";
import Board from "../../components/Board";
import { useETHPrice } from "../../hooks/useEthPrice";
import PreviewCard from "./PreviewCard";


const PreviewSelectedProduct = ({ data }) => {
  const eth_price = useETHPrice(window.ethereum);
  let dis = 0;
  if (data?.item_data?.isBulk) {
    let min = 100000;
    data?.item_data?.bulk_pricing.forEach((p) => {
      if (
        Number(data?.quantity) - p.quantity >= 0 &&
        min > Number(data?.quantity) - p.quantity
      ) {
        min = Number(data?.quantity) - p.quantity;
        dis = p.discount;
      }
    });
  }
  let info = {
    image_for_printing: data?.nft_img,
    name_for_printing: data?.nft_name,
    item_info: data?.item_data,
    quantity: data?.quantity,
    total_price_eth: data?.item_data?.priceType === "eth"
      ? Number(
        data?.quantity *
        data?.item_data?.price *
        ((100 - dis) / 100)
      )
      : Number(
        data?.quantity *
        data?.item_data?.price *
        ((100 - dis) / 100)
      ) / eth_price.data,
  }
  if(Object.keys(data?.item_data).length === 0) return null
  return (
    <Board>
      <div className="flex flex-col sm:items-start items-center w-full">
        <span className=" text-3xl mt-4">
          Preview
        </span>
        <div>
          <PreviewCard info={info} />
        </div>
      </div>
    </Board>
  );
};

export default PreviewSelectedProduct;
