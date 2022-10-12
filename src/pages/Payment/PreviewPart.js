import React from "react";
import { useNavigate } from "react-router-dom";
import Board from "../../components/Board";
import { RoundedButtonMD } from "../../components/Input";
import PreviewCard from "./PreviewCard";

const data = [
  {
    img: "image 38.png",
    title: "Nature of flower",
    frameSize: "30 x 20 cm",
    quantity: 1,
    colour: "white",
  },
  {
    img: "image 37.png",
    title: "Plant frame",
    frameSize: "30 x 20 cm",
    quantity: 1,
    colour: "black",
  },
  {
    img: "image 36.png",
    title: "Picture art",
    frameSize: "50 x 40 cm",
    quantity: 1,
    colour: "white",
  },
  {
    img: "Poster_Mockup_2 1.png",
    title: "Matted structure",
    frameSize: "45 x 30 cm",
    quantity: 1,
    colour: "black",
  },
];

const PreviewPart = () => {
  const navigate = useNavigate();

  return (
    <Board>
      <div className="flex flex-col sm:items-start items-center w-full">
        <span className=" text-3xl my-5">Preview</span>
        <div className="flex flex-col space-y-5 my-10 w-full">
          {data.map((item, i) => {
            return <PreviewCard info={item} key={i} />;
          })}
        </div>
        <div className=" my-5 flex w-full justify-between items-center">
          <span className=" text-[#818DA9] text-lg">Total Price</span>
          <div className="flex flex-col">
            <span className="text-[#D3B789] text-xl">78.2ETH</span>
            <span className=" text-sm">(5876 USD)</span>
          </div>
        </div>
        <div className=" w-full">
          <RoundedButtonMD
            text="Order Now"
            onButtonClick={() => {
              navigate("/order_summary");
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
