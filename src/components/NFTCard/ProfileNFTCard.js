import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setNFTData } from "../../store/selectedReducer";
import RoundedButtonBG from "../Input/RoundedButton_bg";

const ProfileNFTCard = ({ item }) => {
  const {
    rawMetadata,
    title,
    like,
    auction,
    sale,
    price,
    sold,
    highestBid,
    endsIn,
  } = item;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <div className="md:w-[48%] xl:w-[30%] w-[90%] shadow-2xl flex flex-col my-4 hover:scale-105 transition-all cursor-pointer"
      onClick={async () => {
        await dispatch(setNFTData({image:rawMetadata?.image?.replace(
          "ipfs://",
          "https://ipfs.moralis.io:2053/ipfs/"
        ), title}))
        await navigate({
          pathname: "/client/category"
        });
      }}
    >
      <div className="w-full h-full">
        <img
          loading="lazy"
          src={rawMetadata?.image?.replace(
            "ipfs://",
            "https://ipfs.moralis.io:2053/ipfs/"
          )}
          alt=""
          className="w-full"
        />
      </div>

      <div className="flex p-5 bg-white text-[#313949] justify-between w-full h-full">
        <div className="flex flex-col justify-between text-sm w-full">
          <div className="flex justify-between">
            <div>Name</div>
            <div className="flex items-center">
              <img
                loading="lazy"
                src={process.env.REACT_APP_BACKEND_URL + "/client/img/heart_icon.svg"}
                alt=""
                className="w-5 h-5 mr-1 inline-block"
              />
              <div className=" inline-block">{like}</div>
            </div>
          </div>
          <div className="my-2 flex justify-start sm:text-xl text-base font-bold">
            {title}
          </div>
          {sale && (
            <div className="flex flex-col">
              <div className="my-3 flex justify-between text-sm text-gray-500">
                <div>Price</div>
                <div>Sold</div>
              </div>
              <div className="my-3 flex justify-between">
                <div>{price} ETH</div>
                <div>{sold}</div>
              </div>
            </div>
          )}
          {auction && (
            <div className="flex flex-col">
              <div className="my-3 flex justify-between text-sm text-gray-500">
                <div>Current Highest Bid </div>
                <div>Ends In</div>
              </div>
              <div className="my-3 flex justify-between">
                <div>{highestBid} ETH</div>
                <div className=" text-[#D3B789]">{endsIn}</div>
              </div>
            </div>
          )}
          {!sale && !auction && (
            <div className=" h-20 flex justify-center items-center py-4">
              <RoundedButtonBG active text="List Here" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileNFTCard;
