// import axios from "axios";
// import React, { useEffect } from "react";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setNFTData } from "../../store/selectedReducer";
import { RoundedButtonBG } from "../Input";
// import RoundedButtonBG from "../Input/RoundedButton_bg";

const ProfileNFTCard = ({ item }) => {
  const {
    // rawMetadata,
    tokenId,
    description,
    media,
    // like,
    title,
    // sale,
    // price,
    // sold,
    // highestBid,
    contract,
    // endsIn,
  } = item;
  // console.log('item', item);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const headers = {
  //   'X-API-KEY':"381de08380ed44c393389a1485094324" //process.env.REACT_APP_OPENSEA_API_KEY
  // };
  // useEffect(() => {
    
  // }, [])
  return (
    <div
      className="md:w-[48%] xl:w-[30%] w-[90%] shadow-2xl flex flex-col my-4 hover:scale-105 transition-all cursor-pointer"
    >
      <div className="w-full h-full">
        <img
          loading="lazy"
          src={media[0]?.gateway}
          alt=""
          className="w-full"
        />
      </div>

      <div className="flex p-5 bg-white text-[#313949] justify-between w-full h-full">
        <div className="flex flex-col justify-between text-sm w-full">
          <div className="flex justify-between">
            <div>Name</div>
            {/* <div className="flex items-center">
              <img
                loading="lazy"
                src={
                  process.env.PUBLIC_URL + "/img/heart_icon.svg"
                }
                alt=""
                className="w-5 h-5 mr-1 inline-block"
              />
              <div className=" inline-block">{like}</div>
            </div> */}
          </div>
          <div className="my-2 flex flex-col justify-start sm:text-xl text-base font-bold break-words text-start">
            <span className="flex">{contract?.name ? contract?.name : (title ? title : '')}</span><span className="flex text-sm">{contract?.symbol}</span>
          </div>
          <div className="flex justify-between">
            <div className="flex justify-center items-center space-x-2"><div className="">Total supply:</div>
              <div className="my-2 sm:text-base text-sm">
                {contract?.totalSupply}
              </div></div>
            <div className="flex justify-center items-center space-x-2"><div className="">Id:</div>
              <div className="my-2 sm:text-base text-sm">
                {tokenId ? tokenId : ''}
              </div></div>
          </div>
          {/* <div className="flex justify-between">
            <div>Description</div>
          </div>
          <div className="my-2 flex justify-start sm:text-base text-sm h-[100px] break-words overflow-y-auto">
            {description?description:''}
          </div> */}
          {/* {sale && (
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
          )} */}
          {/* {auction && (
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
          )} */}
          {
            <div className=" h-20 flex justify-center items-center py-4">
              <RoundedButtonBG active text="Select" onButtonClick={async () => {
                // await axios
                // .get(`https://api.opensea.io/api/v1/assets/${contract?.address}/${tokenId}`,
                // {headers}
                // )
                // .then((res) => {
                //   console.log('sssssssssssssssss', res)
                // })
                // .catch((err) => {
                //   console.log('sdfsdfsdfsdfsdf', err);
                // });
                await dispatch(
                  setNFTData({
                    image: media[0]?.gateway,
                    title: contract?.name ? contract?.name : (title ? title : ''),
                    description,
                    contract: contract?.address,
                    id: tokenId,
                    symbol: contract?.symbol,
                    total: contract?.totalSupply
                  })
                );
                await navigate({
                  pathname: "/category",
                });
              }} />
            </div>
          }
        </div>
      </div>
    </div>
  );
};

export default ProfileNFTCard;
