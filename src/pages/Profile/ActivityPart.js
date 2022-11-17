import React, { useState } from "react";
import { useEffect } from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
// import { Items } from '.';

import Board from "../../components/Board";
import { RoundedButtonSM, RoundedDropDownSelect } from "../../components/Input";

export const Activities = [
  {
    img: "image 4.png",
    name: "Aui dolorem eum",
    price: 5,
    quantity: "1",
    from: "Jeffry Benton",
    to: "Aida Bugg",
    time: "10 min",
  },
  {
    img: "image 16.png",
    name: "Annoyances accepted",
    price: 2,
    quantity: "1",
    from: "Abraham Marubutt",
    to: "Peg Legge",
    time: "3 min",
  },
  {
    img: "image 19.png",
    name: "Facere possimus",
    price: 3,
    quantity: "1",
    from: "Georgi Liu",
    to: "Allie Grater",
    time: "2 min",
  },
  {
    img: "image 16.png",
    name: "Lorem Ipsume",
    price: 10,
    quantity: "1",
    from: "Robert Lee",
    to: "Olive Yew",
    time: "11 min",
  },
  {
    img: "image 19.png",
    name: "Aui dolorem eum",
    price: 3.5,
    quantity: "1",
    from: "Grant Dong",
    to: "Jeffry Benton",
    time: "7 min",
  },
  {
    img: "image 19.png",
    name: "Facere possimus",
    price: 1,
    quantity: "1",
    from: "Jeffry Benton",
    to: "MICHAEL Jin",
    time: "20 min",
  },
  {
    img: "image 16.png",
    name: "Lorem Ipsume",
    price: 0.3,
    quantity: "1",
    from: "Olive Yew",
    to: "Georgi Liu",
    time: "30 min",
  },
  {
    img: "image 4.png",
    name: "Aui dolorem eum",
    price: 11,
    quantity: "1",
    from: "Jackson Bill",
    to: "Robert Lee",
    time: "15 min",
  },
  {
    img: "image 16.png",
    name: "Annoyances accepted",
    price: 5,
    quantity: "1",
    from: "Scalett Ohara",
    to: "Billy Graham",
    time: "10 min",
  },
];

const ActivityPart = () => {
  const [selectedPage, selectPage] = useState(0);
  useEffect(() => {}, []);

  const generateChartData = (v) => {
    let arr = [];
    for (let index = v; index >= 0; index -= v / 30) {
      let date = new Date();
      date.setDate(new Date().getDate() - index);
      arr.push({
        date: date.getMonth() + 1 + "/" + date.getDate(),
        value: Math.floor(1 + Math.random() * 90) % 20,
      });
    }
    return arr;
    //
  };

  const [chartData, setChartData] = useState(generateChartData(90));

  return (
    <div className="w-[90%] flex flex-col space-y-10">
      <div className="flex w-full justify-end items-end text-white">
        <div className="flex w-1/3">
          <RoundedDropDownSelect
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
          />
        </div>
      </div>
      <Board>
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
              {/* <ResponsiveContainer width="100%"> */}
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
              {/* </ResponsiveContainer> */}
            </div>
          </div>
        </div>
      </Board>
      <div className=" my-32">
        <div className="flex justify-center items-start  text-white px-11 py-2">
          <div className=" flex justify-start w-3/12">Item</div>
          <div className=" flex justify-center w-2/12">Price</div>
          <div className=" flex justify-center w-1/12">Quantity</div>
          <div className=" flex justify-center w-2/12">From</div>
          <div className=" flex justify-center w-2/12">To</div>
          <div className=" flex justify-center w-2/12">Time</div>
        </div>
        <div className="flex flex-col space-y-3">
          {Activities.map((item, i) => {
            return (
              <Board key={i}>
                <div className="flex md:flex-row w-full text-xl flex-wrap cursor-pointer hover:px-0 px-3 transition-all">
                  <div className=" flex justify-start items-center w-3/12">
                    <img
                      loading="lazy"
                      src={process.env.REACT_APP_BACKEND_URL + "/client/img/" + item.img}
                      alt=""
                      className="w-16 h-16 rounded-full"
                    />
                    <div className=" ml-3">{item.name}</div>
                  </div>
                  <div className=" flex justify-center w-2/12 flex-col items-center">
                    <div className="flex flex-col justify-end">
                      <div className="flex justify-end text-2xl">
                        <img
                          loading="lazy"
                          src={process.env.REACT_APP_BACKEND_URL + "/client/img/eth_icon.svg"}
                          alt=""
                          className=" inline-block w-7 h-7"
                        />
                        {item.price}
                      </div>
                      <div className=" text-[#b6b3e0] text-lg">
                        ${Number(item.price * 1459)}
                      </div>
                    </div>
                  </div>
                  <div className=" flex justify-center items-center w-1/12">
                    {item.quantity}
                  </div>
                  <div className=" flex justify-center items-center w-2/12">
                    <span className="w-16 overflow-hidden text-ellipsis whitespace-nowrap">
                      {item.from}
                    </span>
                  </div>
                  <div className=" flex justify-center items-center w-2/12">
                    <span className=" w-16 overflow-hidden text-ellipsis whitespace-nowrap">
                      {item.to}
                    </span>
                  </div>
                  <div className=" flex justify-center items-center w-2/12">
                    {item.time}
                  </div>
                </div>
              </Board>
            );
          })}
        </div>
        <div className="flex space-x-1 my-3 items-center justify-center">
          <RoundedButtonSM
            text={1}
            active={selectedPage === 0}
            onButtonClick={() => {
              selectPage(0);
            }}
          />
          <RoundedButtonSM
            text={2}
            active={selectedPage === 1}
            onButtonClick={() => {
              selectPage(1);
            }}
          />
          <RoundedButtonSM
            text={3}
            active={selectedPage === 2}
            onButtonClick={() => {
              selectPage(2);
            }}
          />
          <RoundedButtonSM
            text={4}
            active={selectedPage === 3}
            onButtonClick={() => {
              selectPage(3);
            }}
          />
          <RoundedButtonSM
            text={5}
            active={selectedPage === 4}
            onButtonClick={() => {
              selectPage(4);
            }}
          />
          <div
            className=" text-[#D3B789] mx-3 cursor-pointer"
            onClick={() => {
              if (selectedPage === 4) selectPage(0);
              else selectPage(selectedPage + 1);
            }}
          >
            Next
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityPart;
