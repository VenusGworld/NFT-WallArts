import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setItem } from "../../store/selectedReducer";
import { useETHPrice } from "../../hooks/useEthPrice";

const CustomizedArtCard = ({ item }) => {
  const {
    width,
    height,
    price,
    bestseller,
    popular,
    color,
    isColor,
    image,
    priceType,
  } = item;
  const navigate = useNavigate();
  const eth_price = useETHPrice(window.ethereum);
  // console.log('window.ethereum',window.ethereum)
  // if(eth_price.isFetched)console.log('price_eth', eth_price)
  const dispatch = useDispatch();
  return (
    <div
      className="relative hover:scale-105 hover:drop-shadow-2xl transition-all sm:w-[45%] xl:w-[30%] w-[90%] shadow-xl flex flex-col my-4 hover:shadow-2xl bg-[#454E61] p-3 cursor-pointer mx-5 sm:mx-2"
      onClick={async () => {
        await dispatch(setItem(item))
        navigate({
          pathname: "/preview"
        });
      }}
    >
      <div className="relative box-border border-white border-2">
        <img
          loading="lazy"
          src={process.env.PUBLIC_URL + "/img/image41.png"}
          alt=""
          className="w-full h-[200px]"
        />
        <div
          className={`absolute bg-white shadow-gray-800 shadow-md border border-gray-500 top-10 left-1/2 -translate-x-1/2`}
          style={{
            width: width + "px",
            height: height + "px",
            backgroundImage: `url(${process.env.REACT_APP_BACKEND_URL}/images/${image})`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <div className="absolute -top-1 w-full border-dotted border-t border-gray-700 text-center">
            <div className="-mt-5 text-sm text-gray-700 w-max text-center mx-auto">{width} cm</div>
          </div>
          <div className="absolute -right-1 h-full border-dotted border-r border-gray-700">
            <div className="absolute -mr-5 text-sm text-gray-700 w-14 top-1/2 -translate-y-1/2 h-max">
              {height} cm
            </div>
          </div>
        </div>
        {bestseller && (
          <div className="bg-[#B982FF] p-3 rounded-tr-full rounded-br-full absolute top-2 left-0 w-28">
            <div className=" text-sm">Best Seller</div>
          </div>
        )}
        {popular && (
          <div className="bg-[#F33F3F] p-3 rounded-tr-full rounded-br-full absolute top-2 left-0 w-28">
            <div className=" text-sm">Popular</div>
          </div>
        )}
      </div>
      <div className="flex flex-col p-3 text-white justify-between w-full h-full">
        <div className="flex justify-between items-start w-full">
          <div className="flex flex-col items-baseline space-y-2">
            <div className=" text-[#818DA9] text-xl">Frame Size</div>
            <div className="text-white text-xl font-bold text">
              {width} x {height} cm
            </div>
          </div>
          {isColor && (
            <div className="flex space-x-1 items-start">
              <div className="flex space-x-1">
                {color.map((c) => (
                  <span
                    key={c}
                    className={`bg-${c} bg-${c}-500 p-3 rounded-full border border-gray-600`}
                  ></span>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="flex justify-between items-center">
          {priceType === 'eth' ? (<><div className=" text-[#818DA9] text-sm">Price in ETH</div>
            <div className="flex flex-col items-end">
              <div className=" text-lg font-bold">{price} ETH</div>
              
              {(eth_price.isLoading || isNaN(eth_price.data)) ? <div className="w-5 h-5">
                <img src={process.env.PUBLIC_URL + "/img/loading.gif"} alt="loading"/>
              </div> :
                <div className=" text-sm">( {Number(price * eth_price.data).toFixed(3)} $ )</div>}
            </div></>) : (<><div className=" text-[#818DA9] text-sm">Price in USD</div>
              <div className="flex flex-col items-end">
                <div className=" text-lg font-bold">{price} $</div>
              </div></>)}
        </div>
      </div>
    </div>
  );
};

export default CustomizedArtCard;
