import React from "react";
import { RectButton } from "../../components/Input";

const PlaceOrderPart = () => {
  return (
    <div className={`flex w-[80%] relative`}>
      <img
        loading="lazy"
        src={process.env.PUBLIC_URL + "/img/home/home_4.png"}
        alt="profile_banner"
        width="100%"
      />
      <div className="absolute w-full top-0 px-[7%] py-[5%] ">
        <div className="flex w-full justify-between items-end">
          <div className="flex items-end space-x-5 text-start">
            <span className=" text-xl sm:text-4xl inline-block">Place Order</span>
            <img
              loading="lazy"
              src={process.env.PUBLIC_URL + "/img/home/delivery 1.svg"}
              alt="profile_banner"
              width="50px"
            />
          </div>
          <div className="sm:w-1/3 w-1/2 text-black">
            <RectButton text={"Start Creating My Artwork"} />
          </div>
        </div>
        <div className="w-full text-start">
        <span className=" text-sm">
          Make your tokens into physical art by transforming them into tokens
        </span>
        </div>
        <div
          className={`bg-gradient-to-r from-[#a1a1a100] via-[#7b43cf] to-[#45454500] my-4 w-full`}
          style={{
            height: "2px",
          }}
        />
      </div>
    </div>
  );
};

export default PlaceOrderPart;
