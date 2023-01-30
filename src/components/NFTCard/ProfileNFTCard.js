// import React, { useEffect } from "react";
// import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setNFTData } from "../../store/selectedReducer";
import { RoundedButtonBG } from "../Input";
// import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
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
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const headers = {
  //   'X-API-KEY':"381de08380ed44c393389a1485094324" //process.env.REACT_APP_OPENSEA_API_KEY
  // };
  const [url, setUrl] = useState(process.env.PUBLIC_URL + "/img/logo.png")
  const [error, setError] = useState(false)
  useEffect(() => {
    setUrl(process.env.PUBLIC_URL + "/img/logo.png")
    const interval = setInterval(() => {
      setUrl(media[0]?.gateway)
    }, 2000);
    if (error) clearInterval(interval);
    return () => {
      clearInterval(interval);
    };
  }, [media, error])
  const errorHandle = () => {
    if (url !== process.env.PUBLIC_URL + "/img/logo.png") {
      setUrl(process.env.PUBLIC_URL + "/img/logo.png")
      setError(true)
    }
  }
  // async function download(url) {
  //   const a = document.createElement("a");
  //   a.href = await toDataURL(url);
  //   a.download = "myImage.png";
  //   document.body.appendChild(a);
  //   a.click();
  //   document.body.removeChild(a);
  // }

  // function toDataURL(url) {
  //   return fetch(url)
  //     .then((response) => {
  //       return response.blob();
  //     })
  //     .then((blob) => {
  //       return URL.createObjectURL(blob);
  //     });
  // }

  // useEffect(() => {
  //   download(media[0]?.gateway)
  // }, [])
  return (
    <div
      className=" sm:w-[48%] md:w-[32%] lg:w-[32%] xl:w-[32%] w-full shadow-2xl flex flex-col justify-between hover:scale-105 transition-all cursor-pointer
      mx-0 sm:mx-[4px] md:mx-[3px] lg:mx-[4px] my-[3px] sm:my-[4px] md:my-[5px] lg:my-[6px]
      "
    >
      <div className="overflow-hidden h-[300px] sm:h-[300px] md:h-[300px] lg:h-[400px] w-full">
        <img
          alt={contract?.name}
          effect="blur"
          className={`h-[100%] w-[100%] mx-auto `}
          // height={image.height}
          src={url !== undefined ? url : errorHandle()}
          onError={() => {
            // currentTarget.src=process.env.PUBLIC_URL + "/img/logo.svg";
            errorHandle()
          }}
        />
      </div>
      <div className="flex px-5 py-2 bg-white text-[#313949] justify-around  w-full z-50 h-[200px] sm:h-[200px] md:h-[200px] lg:h-[200px] ">
        <div className="flex flex-col justify-between text-sm w-full h-full">
          <div className="h-70% overflow-y-auto">
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
            <div className="my-1 flex flex-col justify-start sm:text-base md:text-lg xl:text-xl text-sm font-bold text-start">
              <span className="flex">{contract?.name ? contract?.name : (title ? title : '')}</span><span className="flex text-sm">{contract?.symbol}</span>
            </div>
            <div className="flex justify-between">
              <div className="flex justify-center items-center"><div className="">Total supply:</div>
                <div className="my-1 sm:text-base text-sm">
                  {contract?.totalSupply}
                </div></div>
              <div className="flex justify-center items-center"><div className="">Id:</div>
                <div className="my-1 sm:text-base text-sm">
                  {tokenId ? tokenId : ''}
                </div></div>
            </div>
          </div>

          {/* <div className="flex justify-between">
            <div>Description</div>
          </div>
          <div className="my-1 flex justify-start sm:text-base text-sm h-[100px] break-words overflow-y-auto">
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
                // })
                // .catch((err) => {
                // });
                await dispatch(
                  setNFTData({
                    image: error ? process.env.PUBLIC_URL + "/img/logo.svg" : url,
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
