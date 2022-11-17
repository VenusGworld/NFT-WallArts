import React from "react";
import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import Board from "../../components/Board";
import { RoundedButtonMD } from "../../components/Input";
import { orderedProducts } from "../../store/cartReducer";
import { useETHPrice } from "../../hooks/useEthPrice";
import PreviewCard from "./PreviewCard";

const PreviewPart = ({ orderClickHandle }) => {
  // const navigate = useNavigate();
  const ordered_products = useSelector(orderedProducts);
  let temp = 0;
  ordered_products?.orderedProducts.forEach((item) => {
    temp = Number(Number(temp) + Number(item.total_price_eth));
  });
  const eth_price = useETHPrice(window.ethereum);
  return (
    <Board>
      <div className="flex flex-col sm:items-start items-center w-full">
        <span className=" text-3xl mt-4">
          Cart
          <span className=" inline-block w-7 ml-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
              />
            </svg>
          </span>
        </span>
        <div className="flex flex-col space-y-5 mb-5 w-full">
          {ordered_products?.orderedProducts.map((item, i) => {
            return <PreviewCard info={item} key={i} />;
          })}
        </div>
        <div className=" mb-5 flex w-full justify-between items-center">
          <span className=" text-[#818DA9] text-lg">Total Price</span>
          <div className="flex flex-col">
            <span className="text-[#D3B789] text-xl">
              {Number(temp).toFixed(3)} ETH
            </span>
            <span className=" text-sm">
              {Number(temp * eth_price.data).toFixed(1)} $
            </span>
          </div>
        </div>
        <div className=" w-full flex space-x-1">
          <RoundedButtonMD
            text="Adding Cart"
            onButtonClick={() => {
              // navigate("/order_summary");
              orderClickHandle(false);
            }}
            active
            fullWidth
          />
          <RoundedButtonMD
            text="Order Now"
            onButtonClick={() => {
              // navigate("/order_summary");
              orderClickHandle(true);
            }}
            active
            fullWidth
          />
        </div>
      </div>
    </Board>
  );
};

export default PreviewPart;
