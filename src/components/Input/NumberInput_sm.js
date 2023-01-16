import React from "react";
import { useState } from "react";

const NumberInputSM = ({ onChangeHandle, value }) => {
  const [number, setNumber] = useState(value?value:1);
  const testAndPut = (n) => {
    if(Number(n)>=0) { 
      setNumber(n)
      onChangeHandle(n)
    }
  }
  return (
    <div
      className={`relative w-full cursor-pointer px-2 py-1  bg-[#4a5367] border border-[#818895]`}
    >
      <div className="flex w-full">
        <input
          className="w-full border-none bg-[#4a5367] text-white mr-2 sm:text-sm"
          value={number}
          onChange={(e) => {
            testAndPut(Number(e.target.value));
          }}
        />
        <img
          loading="lazy"
          src={process.env.PUBLIC_URL + "/img/triangle.svg"}
          alt=""
          className={`absolute w-3 h-3 right-3 top-1`}
          onClick={() => {
            testAndPut(number + 1);
          }}
        />
        <img
          loading="lazy"
          src={process.env.PUBLIC_URL + "/img/triangle.svg"}
          alt=""
          className={`absolute w-3 h-3 right-3 bottom-1 rotate-180`}
          onClick={() => {
            testAndPut(number - 1);
          }}
        />
      </div>
    </div>
  );
};

export default NumberInputSM;
