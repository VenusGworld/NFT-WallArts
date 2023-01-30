import React from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import Board from "../../components/Board";
import { RoundedButtonMD } from "../../components/Input";
import { orderedProducts, setCart } from "../../store/cartReducer";
import { useETHPrice } from "../../hooks/useEthPrice";
import PreviewCard from "./PreviewCard";
import Checkout from "../../components/CheckOut";

const PreviewPart = ({ orderClickHandle, stripeRef, amount, payMethod, orderedDataForCard }) => {
  // const navigate = useNavigate();
  const ordered_products = useSelector(orderedProducts);
  const dispatch = useDispatch();
  let temp = 0;
  ordered_products?.orderedProducts.forEach((item) => {
    temp = Number(Number(temp) + Number(item.total_price_eth));
  });
  const eth_price = useETHPrice(window.ethereum);

  return (
    <Board>
      <div className="flex flex-col sm:items-start items-center w-full">
        <div className="w-full text-start">
          <span className=" text-3xl sm:mt-4 mt-1">
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
        </div>
        <div className="flex flex-col space-y-5 mb-5 w-full justify-center items-center">
          {ordered_products?.orderedProducts.map((item, i) => {
            return <div key={i} className="w-fit flex items-center flex-wrap flex-row-reverse relative">
              <PreviewCard info={item} key={i} index={i} onChangeItemInfo={(v) => {
                let arr = [];
                let dis = 0;
                if (v?.isBulk) {
                  let min = 100000;
                  v?.bulk_pricing.forEach((b) => {
                    if (
                      Number(item?.quantity) - b.quantity >= 0 &&
                      min > Number(item?.quantity) - b.quantity
                    ) {
                      min = Number(item?.quantity) - b.quantity;
                      dis = b.discount;
                    }
                  });
                }
                ordered_products?.orderedProducts.forEach((p, j) => {
                  if (i !== j) arr.push(p)
                  else {
                    let a = {
                      ...p,
                      item_id: v?._id,
                      item_info: {
                        ...p?.item_info,
                        ...v
                      },
                      total_price_eth: v?.priceType === "eth"
                        ? Number(
                          p?.quantity *
                          v?.price *
                          ((100 - dis) / 100)
                        )
                        : Number(
                          p?.quantity *
                          v?.price *
                          ((100 - dis) / 100)
                        ) / eth_price.data
                    };
                    arr.push(a)
                  }
                })

                dispatch(setCart(arr));
              }}
                onChangeQuantity={(v) => {
                  let arr = [];
                  let dis = 0;
                  if (ordered_products?.orderedProducts[i]?.item_info?.isBulk) {
                    let min = 100000;
                    ordered_products?.orderedProducts[i]?.item_info?.bulk_pricing.forEach((b) => {
                      if (
                        Number(v) - b.quantity >= 0 &&
                        min > Number(v) - b.quantity
                      ) {
                        min = Number(v) - b.quantity;
                        dis = b.discount;
                      }
                    });
                  }
                  ordered_products?.orderedProducts.forEach((p, j) => {
                    if (i !== j) arr.push(p)
                    else {
                      let a = {
                        ...p,
                        quantity: v,
                        total_price_eth: p?.item_info?.priceType === "eth"
                          ? Number(
                            v *
                            p?.item_info?.price *
                            ((100 - dis) / 100)
                          )
                          : Number(
                            v *
                            p?.item_info?.price *
                            ((100 - dis) / 100)
                          ) / eth_price.data
                      };
                      arr.push(a)
                    }
                  })
                  dispatch(setCart(arr));
                }}
              />
              <div
                className="border rounded-full border-red-500 text-red-400 p-1 cursor-pointer hover:text-red-600 transition-all absolute top-3 right-0"
                onClick={async () => {
                  if (window.confirm('Are you sure to remove this Product from Cart?')) {
                    let arr = []
                    ordered_products?.orderedProducts.forEach((element, j) => {
                      if (i !== j) arr.push(element);
                    });
                    dispatch(setCart(arr));
                  }
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 flex items-end justify-end"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
              </div></div>;
          })}
        </div>
        <div className=" mb-5 flex w-full justify-between items-center">
          <span className=" text-[#818DA9] text-lg">Total Price</span>
          <div className="flex flex-col">
            <span className="text-[#D3B789] text-xl">
              {Number(temp).toFixed(3)} ETH
            </span>
            <span className=" text-sm">
              {(eth_price.isLoading || isNaN(eth_price.data)) ? <div className="w-5 h-5">
                <img src={process.env.PUBLIC_URL + "/img/loading.gif"} alt="loading" />
              </div> :
                <span>{Number(temp * eth_price.data).toFixed(1)} $</span>
              }
            </span>
          </div>
        </div>
        <div className=" w-full flex space-x-1 items-center sm:flex-row flex-col sm:space-y-0 space-y-2">
          <RoundedButtonMD
            text="Continue Shopping"
            onButtonClick={() => {
              orderClickHandle(false);
            }}
            active
            className={' h-16 text-center flex items-center justify-center'}
            fullWidth
          />
          <RoundedButtonMD
            text="Checkout"
            onButtonClick={() => {
              orderClickHandle(true);
            }}
            active
            className={'  h-16 text-center flex items-center justify-center'}
            fullWidth
          />
          <Checkout
            name={'The Road to learn React'}
            description={'Only the Book'}
            orderedDataForCard={orderedDataForCard}
            amount={Number(Number(temp * eth_price.data).toFixed(1))}
            stripeRef={stripeRef}
            payMethod={payMethod}
          />
        </div>
      </div>
    </Board>
  );
};

export default PreviewPart;
