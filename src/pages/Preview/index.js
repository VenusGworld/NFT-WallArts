import axios from "axios";
import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useItem } from "../../hooks/useItem";

import {
  NumberInput,
  RoundedButtonMD,
  RoundedDropDownSelect,
} from "../../components/Input";
import { selectedData, setItem, setQuantity } from "../../store/selectedReducer";
import { useETHPrice } from "../../hooks/useEthPrice";
import { toast } from "react-toastify";
import Three from "./PreviewImage";

const Preview = () => {
  const [color, setColor] = useState(0);
  const [quantity, setquantity] = useState(1);
  const [nftInfo, setnftInfo] = useState({});
  const [discount, setDiscount] = useState(0);

  // const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (!selected_data?.item_data || selected_data?.item_data === undefined || selected_data?.item_data === null || Object.keys(selected_data?.item_data).length === 0) {
      error('Select NFT and Category First!');
      navigate({
        pathname: "/profile"
      });
    }
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
  const Items = useItem();
  const ListItems = useMemo(() => {
    let arr = [];
    Items?.data?.data?.forEach((v) => {
      let flag = false;
      let data = {}
      if (selected_data?.item_data?.category_id) {
        if (v?.category_id === selected_data?.item_data?.category_id) {
          flag = true
          data = {
            ...v,
            text: v?.width + "X" + v?.height + "cm",
            value: v?._id
          }
        }
      }
      if (flag) arr.push(data);
    }
      // return arr;
    )
    return arr;
  }, [selected_data, Items?.data?.data]);
  const error = (text) => {
    toast.error(text, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: 0,
    });
  };
  const container = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  useLayoutEffect(() => {
    if (container.current) {
      setDimensions({
        width: container.current.offsetWidth,
        height: container.current.offsetHeight
      });
    }
  }, []);
  // if(selected_data?.item_data?.category_id) const items = useItemByCategory({ category_id: selected_data?.item_data?.category_id })
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
          <div className="md:w-[80%] w-[98%] mx-auto">
            <div className="flex flex-col justify-start items-start w-full">
              <div className="xl:text-5xl lg:text-3xl md:text-2xl text-lg font-bold inline-block my-5 h-full">
                Preview
              </div>
              <div className="flex md:flex-row flex-col items-start md:space-x-5 md:space-y-0 space-y-3 relative justify-center h-full w-full">
                <div className=" md:w-3/5 w-[95%] flex justify-center relative border rounded-lg" ref={container}>
                  <img
                    loading="lazy"
                    src={selected_data?.nft_img}
                    alt=""
                    className="w-full rounded-lg"
                  />
                  {/* {dimensions.height>0 && dimensions.width>0?<Three img_url={selected_data?.nft_img} width={nftInfo?.width} height={nftInfo?.width} containerWidth={dimensions.width} containerHeight={dimensions.height}/>:null} */}
                  {/* <img
                    loading="lazy"
                    src={process.env.PUBLIC_URL + "/img/360-view1.svg"}
                    alt=""
                    className="absolute bottom-5 right-3"
                  /> */}
                </div>
                <div className="md:w-2/5 w-[95%] bg-[#444E66] px-6 py-10 flex flex-col md:space-y-10 space-y-2 sm:space-y-5">
                  <div className="flex flex-col items-start space-y-2">
                    {Items?.data?.data ?
                      <RoundedDropDownSelect
                        label="Frame Size"
                        value={
                          ListItems?.findIndex(
                            (x) => x._id === selected_data?.item_data?._id
                          ) > 0
                            ? ListItems?.findIndex(
                              (x) => x._id === selected_data?.item_data?._id
                            )
                            : 0
                        }
                        list={ListItems}
                        onChangeHandle={async (v) => {
                          if (selected_data?.item_data?._id !== v) {
                            setnftInfo(Items?.data?.data[Items?.data?.data?.findIndex((x) => x._id === v)])
                            await dispatch(setItem(Items?.data?.data[Items?.data?.data?.findIndex((x) => x._id === v)]))
                            setColor(0);
                          }

                        }}
                      /> : <></>}
                  </div>
                  {selected_data?.item_data?.isColor ?
                    <div className="flex flex-col items-start space-y-2">
                      <span className="text-[#818DA9]">Colour</span>
                      <div className="flex items-center space-x-3">
                        {
                          selected_data?.item_data?.isColor ?
                            selected_data?.item_data?.color?.map((c, index) => {
                              return <div
                                key={index}
                                className={`relative p-3 rounded-full border ${color === index
                                  ? " border-green-500 "
                                  : " border-gray-400 "
                                  } cursor-pointer inline-block`}
                                onClick={() => {
                                  setColor(index)
                                }}
                                style={{
                                  backgroundColor: c
                                }}
                              >
                                {color === index && (
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
                            }) : null
                        }

                      </div>
                    </div> : null}
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

                  <div className="flex flex-col items-start space-y-2">
                    <span className="text-[#818DA9]">Total Price</span>
                    <div className="flex md:justify-between justify-center md:space-x-0 space-x-3 w-full flex-wrap max-w-lg mx-auto">
                      <div>
                        <span className=" text-white sm:text-2xl text-lg">
                          {quantity} x {nftInfo?.price}
                          {nftInfo?.priceType === "eth" ? "ETH" : "$"}
                        </span>
                        <div className="w-full">
                          {nftInfo?.isBulk ? (
                            <div className="flex flex-col">
                              {nftInfo?.bulk_pricing.map((p, i) => (
                                <span key={i} className="sm:text-sm md:text-base text-xs">
                                  {100 - p?.discount}% for {p?.quantity} or more
                                </span>
                              ))}
                            </div>
                          ) : null}
                        </div>
                      </div>

                      <div className="flex flex-col justify-start">
                        <span className=" text-[#D3B789] sm:text-2xl text-lg">
                          {nftInfo?.priceType === "eth"
                            ? Number(
                              quantity *
                              nftInfo?.price *
                              ((100 - discount) / 100)
                            ).toFixed(3) + "ETH"
                            : null}
                        </span>

                        {(eth_price.isLoading || isNaN(eth_price.data)) ? <div className="w-5 h-5">
                          <img src={process.env.PUBLIC_URL + "/img/loading.gif"} alt="loading" />
                        </div> :
                          <span className=" text-white text-sm">{nftInfo?.priceType === "eth"
                            ? (
                              quantity *
                              nftInfo?.price *
                              ((100 - discount) / 100) *
                              eth_price.data
                            ).toFixed(3)
                            : quantity *
                            nftInfo?.price *
                            ((100 - discount) / 100).toFixed(3)}{" "}
                            $</span>}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-start space-y-2 w-full">
                    <RoundedButtonMD
                      text="Add Cart"
                      onButtonClick={async () => {
                        let obj = {
                          ...selected_data?.item_data,
                          selected_color: selected_data?.item_data?.isColor ? color : null
                        };
                        await dispatch(setItem(obj))
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
