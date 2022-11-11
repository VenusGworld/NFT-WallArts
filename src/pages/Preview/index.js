import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";

import {
  NumberInput,
  RoundedButtonMD,
  RoundedTextInput,
} from "../../components/Input";
import { selectedData, setQuantity } from "../../store/selectedReducer";
import { useETHPrice } from "../../hooks/useEthPrice";

const Preview = () => {
  const [color, setColor] = useState(0);
  const [quantity, setquantity] = useState(1);
  const [nftInfo, setnftInfo] = useState({});
  const [discount, setDiscount] = useState(0);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    fetchNFTInfo();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const eth_price = useETHPrice(window.ethereum);
  const selected_data = useSelector(selectedData);
  const fetchNFTInfo = async () => {
    const result = await axios
      .get(
        `${process.env.REACT_APP_BACKEND_URL}/api/item/${selected_data?.item_data?._id}`
      )
      .catch((err) => {
        console.log(err);
      });
    setnftInfo(result.data.data);
  };
  // console.log('nftInfo', nftInfo);
  return (
    <div>
      <div className={`w-full h-full mt-20 relative text-white`}>
        <div className="relative">
          <img
            loading="lazy"
            src={process.env.PUBLIC_URL + "/img/image40.png"}
            className="w-full object-cover"
            alt="background"
          />
          <div
            className="absolute xl:text-7xl lg:text-5xl md:text-4xl text-xl top-1/2 font-extrabold left-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{ textShadow: " 0px 4px 12px rgba(0, 0, 0, 0.25)" }}
          >
            Wall Art Preview
          </div>
        </div>
        <div className="bg-[#363f54] w-full p-10 relative flex flex-col justify-start items-start -mt-[8%]">
          <div className="w-[80%] mx-auto">
            <div className="flex flex-col justify-start items-start">
              <div className="xl:text-5xl lg:text-3xl md:text-2xl text-lg font-bold inline-block my-5 h-full">
                Preview
              </div>
              <div className="flex items-start space-x-5 relative justify-center h-full">
                <div className="w-3/5 bg-white h-full relative">
                  <img
                    loading="lazy"
                    src={selected_data?.nft_img}
                    alt=""
                  />
                  <img
                    loading="lazy"
                    src={process.env.PUBLIC_URL + "/img/360-view1.svg"}
                    alt=""
                    className="absolute bottom-5 right-3"
                  />
                </div>
                <div className="w-2/5 bg-[#444E66] px-6 py-10 flex flex-col space-y-10">
                  <div className="flex">
                    {/* <div className='flex-1'><ToggleButton label='List'/></div>
                  <div className='flex-1'><ToggleButton label='Buy' onChangeHandle={setIsBuy}/></div> */}
                  </div>
                  <div className="flex flex-col items-start space-y-2">
                    <span className="text-[#818DA9]">Frame Size</span>
                    {nftInfo.width !== undefined && <RoundedTextInput
                      defaultValue={
                        nftInfo?.width + "X" + nftInfo?.height + "cm"
                      }
                      onChangeHandle={()=>{}}
                    />}
                    
                    {/* <RoundedDropDownSelect
                      onChangeHandle={(v) => {}}
                      list={[
                        {
                          text: "30x20cm",
                          value: 90,
                        },
                        {
                          text: "10x40cm",
                          value: 50,
                        },
                        {
                          text: "70x50cm",
                          value: 30,
                        },
                        {
                          text: "100x100cm",
                          value: 10,
                        },
                      ]}
                    /> */}
                  </div>
                  <div className="flex flex-col items-start space-y-2">
                    <span className="text-[#818DA9]">Colour</span>
                    <div className="flex items-center space-x-3">
                      <div
                        className={`relative bg-black p-3 rounded-full border ${
                          color === 1
                            ? " border-green-500 "
                            : " border-gray-400 "
                        } cursor-pointer inline-block`}
                        onClick={() => {
                          color === 1 ? setColor(0) : setColor(1);
                        }}
                      >
                        {color === 1 && (
                          <img
                            loading="lazy"
                            src={
                              process.env.PUBLIC_URL + "/img/check-green.svg"
                            }
                            alt="check"
                            className="w-2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                          />
                        )}
                      </div>
                      <div
                        className={`relative bg-white p-3 rounded-full border  ${
                          color === 2
                            ? " border-green-500 "
                            : " border-gray-400 "
                        } cursor-pointer inline-block`}
                        onClick={() => {
                          color === 2 ? setColor(0) : setColor(2);
                        }}
                      >
                        {color === 2 && (
                          <img
                            loading="lazy"
                            src={
                              process.env.PUBLIC_URL + "/img/check-green.svg"
                            }
                            alt="check"
                            className="w-2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-start space-y-2">
                    <span className="text-[#818DA9]">Quantity</span>
                    <NumberInput
                      onChangeHandle={(v) => {
                        if (nftInfo?.isBulk) {
                          let min = 100000;
                          let dis = 0;
                          nftInfo?.bulk_pricing.forEach((p) => {
                            if (
                              Number(v) - p.quantity >= 0 &&
                              min > Number(v) - p.quantity
                            ) {
                              min = Number(v) - p.quantity;
                              dis = p.discount;
                            }
                          });
                          setDiscount(dis);
                        }
                        setquantity(Number(v));
                      }}
                    />
                  </div>
                  {/* {!isbuy && (<div className='flex flex-col space-y-3'>
                <div className='flex flex-col items-start space-y-2'>
                  <span className='text-[#818DA9]'>Start Date Aunction</span>
                  <Calendar/>
                </div>
                <div className='flex flex-col items-start space-y-2'>
                  <span className='text-[#818DA9]'>End Date Aunction</span>
                  <Calendar/>
                </div></div>)} */}
                  <div className="flex flex-col items-start space-y-2">
                    <span className="text-[#818DA9]">Total Price</span>
                    <div className="flex justify-between w-full">
                      <span className=" text-white text-2xl">
                        {quantity} x {nftInfo?.price}
                        {nftInfo?.priceType === "eth" ? "ETH" : "$"}
                      </span>
                      <div className="flex flex-col justify-end">
                        <span className=" text-[#D3B789] text-2xl">
                          {nftInfo?.priceType === "eth"
                            ? Number(
                                quantity *
                                  nftInfo?.price *
                                  ((100 - discount) / 100)
                              ).toFixed(2) + "ETH"
                            : null}
                        </span>
                        <span className=" text-white text-sm">
                          ({" "}
                          {nftInfo?.priceType === "eth"
                            ? (
                                quantity *
                                nftInfo?.price *
                                ((100 - discount) / 100) *
                                eth_price.data
                              ).toFixed(2)
                            : quantity *
                              nftInfo?.price *
                              ((100 - discount) / 100).toFixed(2)}{" "}
                          $ )
                        </span>
                        <div>
                          {nftInfo?.isBulk ? (
                            <div className="flex flex-col">
                              {nftInfo?.bulk_pricing.map((p, i) => (
                                <span key={i}>
                                  +{p?.quantity}NFTs -{p?.discount}%
                                </span>
                              ))}
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-start space-y-2 w-full">
                    <RoundedButtonMD
                      text="See Next"
                      onButtonClick={async () => {
                        await dispatch(setQuantity(quantity))
                        navigate({
                          pathname: "/payment"
                        });
                      }}
                      active
                      fullWidth
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preview;
