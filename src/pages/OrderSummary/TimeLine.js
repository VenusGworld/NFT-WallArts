import React from "react";

const TimeLine = ({ info, last }) => {
  const { title, description, time, detail } = info;
  return (
    <div className="flex flex-col relative items-start pl-9">
      {!last && (
        <div className=" absolute h-full left-0 border border-[#4bbd5d] top-2 -translate-x-1/2" />
      )}
      <div className="absolute p-2 bg-[#4bbd5d] left-0 -translate-x-1/2 translate-y-1/2 rounded-full hover:scale-125 transition-all cursor-pointer" />
      <span className="text-[#D3B789] text-xl">{title}</span>
      <div className=" my-7 flex flex-col items-start space-y-2">
        <span>{description}</span>
        <div>
          <img
            src={process.env.PUBLIC_URL + "/img/clock.svg"}
            alt=""
            className=" mr-2 inline-block"
          />
          <span>{
            new Date(time).toLocaleDateString() +" " +new Date(time).toLocaleTimeString()
          }</span>
        </div>
        {detail && (
          <span className=" xl:absolute xl:left-96   xl:top-1/2 xl:-translate-y-1/2 w-56">
            {detail}
          </span>
        )}
      </div>
    </div>
  );
};

export default TimeLine;
