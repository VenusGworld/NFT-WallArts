import React from "react";
// import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
// import { Items } from '.';

import Board from "../../components/Board";
import { useETHPrice } from "../../hooks/useEthPrice";
import { useOrder } from "../../hooks/useOrder";
import { useOrderStatus } from "../../hooks/useOrderStatus";

const ActivityPart = () => {
  // const [selectedPage, selectPage] = useState(0);
  const orders = useOrder();
  const orderStatus = useOrderStatus();
  const navigate = useNavigate();

  const eth_price = useETHPrice(window.ethereum);

  // const generateChartData = (v) => {
  //   let arr = [];
  //   for (let index = v; index >= 0; index -= v / 30) {
  //     let date = new Date();
  //     date.setDate(new Date().getDate() - index);
  //     arr.push({
  //       date: date.getMonth() + 1 + "/" + date.getDate(),
  //       value: Math.floor(1 + Math.random() * 90) % 20,
  //     });
  //   }
  //   return arr;
  //   //
  // };

  // const [chartData, setChartData] = useState(generateChartData(90));

  return (
    <div className="w-[90%] flex flex-col space-y-10">
      <div className="flex w-full justify-end items-end text-white">
        <div className="flex w-1/3">
          {/* <RoundedDropDownSelect
            onChangeHandle={() => {}}
            list={[
              {
                text: "Listing",
                value: 0,
              },
              {
                text: "Sales",
                value: 0,
              },
              {
                text: "Bids",
                value: 0,
              },
              {
                text: "Transfer",
                value: 0,
              },
            ]}
          /> */}
        </div>
      </div>
      {/* <Board>
        <div className="flex flex-col justify-center w-full h-full space-y-4">
          <div className="flex space-x-8">
            <div className="w-1/4">
              <RoundedDropDownSelect
                onChangeHandle={(v) => {
                  setChartData(generateChartData(v));
                }}
                list={[
                  {
                    text: "Last 90 days",
                    value: 90,
                  },
                  {
                    text: "Last 50 days",
                    value: 50,
                  },
                  {
                    text: "Last 30 days",
                    value: 30,
                  },
                  {
                    text: "Last 10 days",
                    value: 10,
                  },
                ]}
              />
            </div>
            <div className="flex flex-col justify-center items-start">
              <div className=" text-gray-500">90 Day Avg. Price</div>
              <div className=" text-xl text-[#D3B789]">7.8953</div>
            </div>
            <div className="flex flex-col justify-center items-start">
              <div className=" text-gray-500">90 Day Voulme</div>
              <div className=" text-xl text-[#D3B789]">148,250.2751</div>
            </div>
          </div>
          <div className="flex justify-center items-center w-full h-full">
            <div className="w-full">
              <AreaChart width={1000} height={400} data={chartData}>
                <defs>
                  <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#D3B789" stopOpacity={1} />
                    <stop offset="95%" stopColor="#D3B789" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  stroke="#ccc"
                  strokeDasharray="3 10"
                  vertical={false}
                />
                <XAxis dataKey="date" />
                <YAxis dataKey="value" />
                <Area
                  type="temperature"
                  dataKey="value"
                  strokeWidth={3}
                  stroke="#D3B789"
                  fill="url(#colorUv)"
                />
              </AreaChart>
            </div>
          </div>
        </div>
      </Board> */}
      <div className="w-full">
        <div className="w-full overflow-x-auto">
          <div className="flex justify-center items-start  text-white px-11 py-2 min-w-[800px]">
            <div className=" flex justify-start w-4/12">Item</div>
            <div className=" flex justify-center w-2/12">Price</div>
            <div className=" flex justify-center w-1/12">Quantity</div>
            <div className=" flex justify-center w-1/12">Size</div>
            <div className=" flex justify-center w-2/12">Status</div>
            <div className=" flex justify-center w-2/12">Time</div>
          </div>
        </div>
        <div className="flex flex-col space-y-3 h-[500px] overflow-y-auto sm:p-10 p-5 rounded-lg ">
          {orders?.data?.data?.map((item, i) => {
            return (
              <Board key={i} onClick={() => {
                navigate({
                  pathname: "/order_summary",
                  search: `?order_id=${item._id}`,
                });
              }}>
                <div className="w-full overflow-x-auto">
                  <div className="flex min-w-[800px]  text-xl flex-wrap cursor-pointer hover:px-0 px-3 transition-all">
                    <div className=" flex justify-start items-center w-4/12">
                      <img
                        loading="lazy"
                        src={item?.image_for_printing}
                        alt=""
                        className="w-16 h-16 rounded-full"
                      />
                      <div className=" ml-3 overflow-x-auto">{item?.name_for_printing}</div>
                    </div>
                    <div className=" flex justify-center w-2/12 flex-col items-center">
                      <div className="flex flex-col justify-end">
                        <div className="flex justify-end text-2xl">
                          <img
                            loading="lazy"
                            src={
                              process.env.PUBLIC_URL + "/img/eth_icon.svg"
                            }
                            alt=""
                            className=" inline-block w-7 h-7"
                          />
                          {item?.item_info?.priceType === "eth"
                            ? Number(
                              item?.quantity * item?.item_info?.price
                              // * ((100 - discount) / 100)
                            ).toFixed(3) + "ETH"
                            : null}
                        </div>
                        {(eth_price.isLoading || isNaN(eth_price.data)) ? <div className="w-5 h-5">
                          <img src={process.env.PUBLIC_URL + "/img/loading.gif"} alt="loading" />
                        </div> :
                          <div className=" text-[#b6b3e0] text-lg">
                            ${
                              item?.item_info?.priceType === "eth"
                                ? (
                                  item?.quantity *
                                  item?.item_info?.price *
                                  eth_price.data
                                )
                                  // * ((100 - discount) / 100)

                                  .toFixed(3)
                                : item?.quantity * item?.item_info?.price
                              // ((100 - discount) / 100).toFixed(3)}{" "}
                            }
                          </div>}
                      </div>
                    </div>
                    <div className=" flex justify-center items-center w-1/12">
                      {item.quantity}
                    </div>
                    <div className=" flex justify-center items-center w-1/12">
                      <span className="w-16 whitespace-nowrap">
                        {item?.item_info?.width}X{item?.item_info?.height}cm
                      </span>
                    </div>
                    <div className=" flex justify-center items-center w-2/12">
                      <span className=" w-full overflow-hidden text-ellipsis whitespace-nowrap">
                        {orderStatus.isLoading
                          ? []
                          : orderStatus?.data?.data
                            .filter(
                              (status) =>
                                status._id ===
                                item?.order_statuses[
                                  item?.order_statuses?.length - 1
                                ]?.order_status_id
                            )
                            .map((status, i) => (
                              <span key={i}>{status?.name}</span>
                            ))}
                      </span>
                    </div>
                    <div className=" flex justify-center items-center w-2/12">
                      <span>
                        {new Date(
                          item?.order_statuses[
                            item?.order_statuses?.length - 1
                          ]?.ordered_time
                        ).toLocaleDateString() +
                          " " +
                          new Date(
                            item?.order_statuses[
                              item?.order_statuses?.length - 1
                            ]?.ordered_time
                          ).toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                </div>
              </Board>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ActivityPart;
